// pages/goodsList/goodsList.js
import {request} from "../../utils/fecth"
//引入async配置js
import regeneratorRuntime from "../../lib/runtime/runtime"
Page({

      /**
       * 页面的初始数据
       */
      data: {
        tabs: [{
            id: 0,
            value: "综合",
            isActive: true
          },
          {
            id: 1,
            value: "销量",
            isActive: false
          },
          {
            id: 2,
            value: "价格",
            isActive: false
          }
        ],
        goodsList: [],
        goods1:[],
        goods2:[]
      },
      //这里的数据都是写在data外面的，所以调用cid的时候是this.QueryParams.cid
      QueryParams: { // 接口要的参数
        query: "",
        cid: "",
        pagenum: 1,
        pagesize: 10
      },
      allPage: 1,
      /**
       * 生命周期函数--监听页面加载
       */
      onLoad: function (options) {
        // console.log(options);
        this.QueryParams.cid = options.cid || "";
        this.QueryParams.query = options.query || "";
        this.getGoods();
      },
      async getGoods() {
        const res = await request({url: "/goods/search",data: this.QueryParams
        });
        //res数据太多但是大部分用不着，只提取页面所用的数据
        let good = [];
        res.goods.forEach((v,i) => {
          good.push({
            goods_id :v.goods_id,
            cat_id  :v.cat_id,
            goods_name :v.goods_name,
            //生成20000之间的随机整数
            goods_number :parseInt(20000*Math.random()),
            goods_price :v.goods_price,
            goods_small_logo :v.goods_small_logo,
          })
        })
    // 获取 总条数
    const total = res.total;
    // 计算总页数 Math.ceil向上取整
    this.allPage = Math.ceil(total / this.QueryParams.pagesize); this.setData({
      goodsList: [...this.data.goodsList, ...good] //数组的拼接
    })
    this.max(this.data.goodsList)
    this.min(this.data.goodsList)
  },
  //点击tabs标签
  handleItem(e) {
    //console.log(e);
    let index = e.detail
    let {
      tabs
    } = this.data //解构赋值
    tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false)
    this.setData({
      tabs
    }) 
  },
  //让数组从大到小的顺序排列
  max(res){
    var arr1=res,max;
    for(var i=0;i<arr1.length;i++){
      for(var j=i;j<arr1.length;j++){
        if(arr1[i].goods_number<arr1[j].goods_number){
          max=arr1[j];
          arr1[j]=arr1[i];
          arr1[i]=max
        }
      }
    }
    this.setData({
      goods1:arr1
    })
  },
  //让数组从小到大的顺序排列
  min(res){
    var arr2=res,min;
    for(var i=0;i<arr2.length;i++){
      for(var j=i;j<arr2.length;j++){
        if(arr2[i].goods_price>arr2[j].goods_price){
          min=arr2[j];
          arr2[j]=arr2[i];
          arr2[i]=min
        }
      }
    }
    this.setData({
      goods2:arr2
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
     // 1 重置数组
     this.setData({
      goodsList:[]
    })
    // 2 重置页码
    this.QueryParams.pagenum=1;
    // 3 发送请求
    this.getGoods();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
     //  1 判断还有没有下一页数据
     if(this.QueryParams.pagenum>=this.allPage){
       wx.showToast({
         title: '没有下一页数据了',
       })
     }else{
      this.QueryParams.pagenum++;
      this.getGoods();
     }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})