//index.js
//引入封装后的发送请求
import {
  request
} from "../../utils/fecth"
//获取应用实例
const app = getApp()

Page({
  data: {
    //轮播图数据
    swiperList: [],
    //分类导航数据
    navList: [],
    //楼层数据
    floorList: []
  },
  onLoad: function () {
    //这里相当于调用了3次fecth里面的函数
    this.getSwiper()
    this.getNav()
    this.getFloor()
  },
  //获取轮播图数据
  getSwiper() {
    request({
      url: "/home/swiperdata"
    }).then(result => {
      this.setData({
        swiperList: result
      })
    })
  },
  //获取分类导航数据
  getNav() {
    request({
      url: "/home/catitems"
    }).then(result => {
      //console.log(result)
      this.setData({
        navList: result
      })
    })
  },
  //获取楼层
  getFloor() {
    request({
      url: "/home/floordata"
    }).then(result => {
      this.setData({
        floorList: result
      })
    })
  }
})