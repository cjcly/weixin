// pages/pay/pay.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    cart: [],
    totalPrice: 0,
    totalNum: 0,
    show:false
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
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
     // 1 获取缓存中的收货地址信息
     const address = wx.getStorageSync("address");
     // 1 获取缓存中的购物车数据
     let cart = wx.getStorageSync("cart") || [];
     this.getData(cart,address)
  },
  //获取要支付的商品、数量、总价
  getData(cart,address){
    //过滤checked为true的商品
    cart=cart.filter(v=>v.checked)
    //获取总数量,价格
    let totalPrice=0,totalNum=0;
    cart.forEach(v=>{
      totalPrice += v.num * v.goods_price;
      totalNum += v.num;
    })
    this.setData({
      cart,address,totalPrice,totalNum
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