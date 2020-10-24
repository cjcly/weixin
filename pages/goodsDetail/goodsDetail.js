// pages/goodsDetail/goodsDetail.js
import {request} from "../../utils/fecth"
//引入async配置js
import regeneratorRuntime from "../../lib/runtime/runtime"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsObj:{},
    isCollect:false//是否收藏
  },
  goodsInfo:{},//商品对象
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },
  async getDetail(goods_id){
    const res=await request({url:"/goods/detail",data:{goods_id}});
    this.goodsInfo=res;
    //获取缓存中的收藏
    let collect=wx.getStorageSync('collect')||[];
    //判断商品是否被收藏
    let isCollect=collect.some(v=>v.goods_id===this.goodsInfo.goods_id);
    this.setData({
      //只获取用的到的数据
      goodsObj:{
        goods_name: res.goods_name,
        goods_price: res.goods_price,
        // iphone部分手机 不识别 webp图片格式 
        // 最好找到后台 让他进行修改 
        // 临时自己改 确保后台存在 1.webp => 1.jpg 
        goods_introduce: res.goods_introduce.replace(/\.webp/g, '.jpg'),
        pics: res.pics
      },
      isCollect
    })
  },
  //点击轮播图 放大预览
  handlePrevewImage(e){
    const urls=this.goodsInfo.pics.map(v=>v.pics_mid);
    const current=e.currentTarget.dataset.url;
    wx.previewImage({
      urls,
      current
    })
  },
  //点击 加入购物车
  handleCartAdd(){
    // 1 获取缓存中的购物车 数组
    let cart = wx.getStorageSync("cart") || [];
    // 2 判断 商品对象是否存在于购物车数组中
    let index=cart.findIndex(v=>v.goods_id===this.goodsInfo.goods_id);
    if(index===-1){
      //3  不存在 第一次添加
      this.goodsInfo.num = 1;
      this.goodsInfo.checked = true;
      cart.push(this.goodsInfo);
    }else{
      // 4 已经存在购物车数据 执行 num++
      cart[index].num++;
    }
     // 5 把购物车重新添加回缓存中
     wx.setStorageSync('cart', cart);
      // 6 弹窗提示
    wx.showToast({
      title: '加入成功',
      icon: 'success',
      // true 防止用户 手抖 疯狂点击按钮 
      mask: true
    });
  },
  // 点击 商品收藏图标
  handleCollect(){
    let isCollect=false;
    // 1 获取缓存中的商品收藏数组
    let collect=wx.getStorageSync("collect")||[];
    // 2 判断该商品是否被收藏过
    let index=collect.findIndex(v=>v.goods_id===this.goodsInfo.goods_id);
    // 3 当index！=-1表示 已经收藏过 
    if(index!==-1){
      // 能找到 已经收藏过了  在数组中删除该商品
      collect.splice(index,1);
      isCollect=false;
      wx.showToast({
        title: '取消成功',
        icon: 'success',
        mask: true
      });
        
    }else{
      // 没有收藏过
      collect.push(this.goodsInfo);
      isCollect=true;
      wx.showToast({
        title: '收藏成功',
        icon: 'success',
        mask: true
      });
    }
     // 4 把数组存入到缓存中
     wx.setStorageSync("collect", collect);
     // 5 修改data中的属性  isCollect
     this.setData({
       isCollect
     })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let pages = getCurrentPages();//获取周期函数对象
    let current=pages[pages.length-1];
    const {goods_id}=current.options
    this. getDetail(goods_id)
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})