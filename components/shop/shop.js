// components/shop/shop.js
import {
  showModal,
  showToast,
  request,
  requestPayment
} from "../../utils/fecth"
//引入async配置js
import regeneratorRuntime from "../../lib/runtime/runtime"
Component({
  /**
   * 组件的属性列表 
   */
  //properties相当于data 通过this.data.cat获取
  properties: {
    cart: {
      type: Array,
      value: []
    },
    allChecked: {
      type: Boolean,
      value: false
    },
    totalPrice: {
      type: Number,
      value: 0
    },
    totalNum: {
      type: Number,
      value: 0
    },
    show: {
      type: Boolean,
      value: true
    },
    address:{
      type:Object,
      value:{}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {},
  /**
   * 组件的方法列表
   */
  methods: {
    //点击选中按钮
    handeChange(e) {
      //获取点击的id名
      const id = e.currentTarget.dataset.id;
      //properties里的数据相当于data里的数据，获取都是一样的途径
      let cart = this.data.cart;
      //获取商品的索引
      let index = cart.findIndex(v => id === v.goods_id)
      //状态取反
      cart[index].checked = !cart[index].checked;
      //保存状态，更新视图
      this.setCart(cart)
    },

    //点击加减按钮改变数量
    async handleNum(e) {
      const {
        id,
        opretion
      } = e.currentTarget.dataset;
      let cart = this.data.cart;
      let index = cart.findIndex(v => v.goods_id === id);
      if (cart[index].num === 1 && opretion === -1) {
        const res = await showModal({
          content: "您是否要删除？"
        });
        //console.log(res)
        if (res.confirm) {
          cart.splice(index, 1);
          this.setCart(cart);
        }
      } else {
        cart[index].num += opretion;
        this.setCart(cart)
      }
    },

    //合计总价的方法
    setCart(cart) {
      let allChecked = true;
      let totalPrice = 0,
        totalNum = 0;
      //当cart为空或者不为空的时候的时候
      if (cart.length != 0) {
        cart.forEach(v => {
          if (v.checked) {
            totalPrice += v.num * v.goods_price;
            totalNum += v.num;
          } else {
            allChecked = false;
          }
        })
      } else {
        allChecked = false;
      }

      //保存状态 更新视图
      this.setData({
        cart,
        allChecked,
        totalPrice,
        totalNum
      })
      //保存到缓存中
      wx.setStorageSync('cart', cart)
    },

    //点击全选按钮
    handleAllCheck() {
      //获取data里面的值
      let {
        cart,
        allChecked
      } = this.data;
      allChecked = !allChecked;
      cart.forEach(v => v.checked = allChecked)
      this.setCart(cart)
    },

    //点击去结算
    async handlePay() {
      let {
        totalNum
      } = this.data;
      let address = wx.getStorageSync('address');
      //判断有没有地址
      if (!address.userName) {
        await showToast({
          title: "您还没有选择收货地址"
        });
        return;
      }
      //判断有没有选择商品 
      if (totalNum === 0) {
        await showToast({
          title: "您还没有选择收货地址"
        });
        return;
      }
      // 3 跳转到 支付页面
      wx.navigateTo({
        url: '/pages/pay/pay'
      });
    },
    
    async handleAuth() {
      try {
        //由于个人账号无法获取token所以这就直接赋值了
        //1.token数据
        const tokenData = "BearereyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo";
        //存储token
        wx.setStorageSync('token', tokenData)
        //获取token
        const token = wx.getStorageSync('token');
        if (!token) {
          wx.navigateTo({
            url: '/pages/auth/auth',
          })
        }
        // 3 创建订单
        // 3.1 准备 请求头参数
        // const header = { Authorization: token };
        // 3.2 准备 请求体参数
        const order_price = this.data.totalPrice; //价格
        const consignee_addr = this.data.address.all; //地址
        const cart = this.data.cart; //购买的商品
        let goods = [];
        cart.forEach(v => goods.push({
          goods_id: v.goods_id,
          goods_number: v.num,
          goods_price: v.goods_price
        }))
        const orderParams = {
          order_price,
          consignee_addr,
          goods
        };
        // 4 准备发送请求 创建订单 获取订单编号
        const {
          order_number
        } = await request({
          url: "/my/orders/create",
          method: "POST",
          data: orderParams
        });
        // 5 发起 预支付接口
        const {
          pay
        } = await request({
          url: "/my/orders/req_unifiedorder",
          method: "POST",
          data: {
            order_number
          }
        });
        // 6 发起微信支付 
        await requestPayment(pay);
        // 7 查询后台 订单状态
        const res = await request({
          url: "/my/orders/chkOrder",
          method: "POST",
          data: {
            order_number
          }
        });
        await showToast({
          title: "支付成功"
        });
        // 8 手动删除缓存中 已经支付了的商品
        let newCart = wx.getStorageSync("cart");
        newCart = newCart.filter(v => !v.checked);
        wx.setStorageSync("cart", newCart);

        // 8 支付成功了 跳转到订单页面
        wx.navigateTo({
          url: '/pages/order/order'
        });
      } catch (error) {
        await showToast({
          title: "支付失败"
        })
        wx.navigateTo({
          url: '/pages/order/order'
        });
        console.log(error);
      }
    },
  }
})