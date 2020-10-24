// pages/cart/cart.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address:{},
    cart:[],
    allChecked:false,
    totalPrice: 0,
    totalNum: 0,
    show:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示 每次数据改变都会调用此周期函数
   */
  onShow: function () {
     // 1 获取缓存中的收货地址信息
     const address = wx.getStorageSync("address");
     // 1 获取缓存中的购物车数据
    const cart = wx.getStorageSync("cart") || [];
    this.setData({ address });
    this.setdata(cart)

  },

  setdata(cart){
    let allChecked=true;
    let totalPrice=0,totalNum=0;
    //当cart为空或者不为空的时候的时候
    if(cart.length != 0){
      cart.forEach(v=>{
        if(v.checked){
          totalPrice+=v.num * v.goods_price;
          totalNum+=v.num;
        }else{
          allChecked=false;
        }
      })
    }else{
      allChecked=false;
    }
    //保存状态 更新视图
    this.setData({
      cart,allChecked,totalPrice,totalNum
    })
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