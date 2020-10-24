// pages/category/category.js
import { request} from "../../utils/fecth"
//引入async配置js
import regeneratorRuntime from "../../lib/runtime/runtime"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //左边的数据
    leftList: [],
    //右侧的数据
    rightList: [],
    //点击左侧菜单的索引
    currentIndex: 0,
    //滚动的初始高度
    top: 0
  },
  //全部数据 因为定义在data外面，所以下面用拿到这个值就用this.cates
  cates: [],
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let Cates = wx.getStorageSync("cates")
    if (Cates) {//如果本地有数据
      if (Date.now() - Cates.time > 1000 * 10*60) {//这是10分钟可以自己改
        //本地数据超过10分钟 就过期了重新获取
        this.getLeft();
      } else {//本地数据没有超过10分钟，就用本地的数据
        this.cates = Cates.data;
        let leftList = this.cates.map(v => v.cat_name),
          rightList = this.cates[0].children;
        this.setData({
          leftList,
          rightList
        })
      }
    } else {//本地没有数据重新获取数据存到本地
      this.getLeft();
    }
  },
  //获取数据
  async getLeft() {
    //用async、await来发送请求，只有await后的代码执行完成后才会执行下面的代码；这个不兼容低配置，如无需求可以删去配置直接使用首页里的promis
      let res =await request({ url: '/categories'});
      this.cates=res
      this.setData({
        leftList: res.map(v => v.cat_name),
        rightList: res[0].children,
      })
      //获取到数据后立马存储到本地
      wx.setStorageSync('cates', {
        time: Date.now(),
        data: res
      })
  },
  // 点击事件
  handleTap(e) {
    //console.log(e)
    // console.log(this.data.leftList)打印data里面的数据
    const {index} = e.currentTarget.dataset;
    let rightList = this.cates[index].children;
    this.setData({
      currentIndex: index,
      top: 0,
      rightList
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