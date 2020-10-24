// components/buuton/btn.js
import {getSetting, chooseAddress, openSetting} from "../../utils/fecth"
//引入async配置js
import regeneratorRuntime from "../../lib/runtime/runtime"
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    address:{
      type:Object,
      value:{}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    
  },

  /**
   * 组件的方法列表
   */
  methods: {
   async handleAddress(){
     //引用try catch 主要是解决点击取消出现的报错信息
      try {
        // 1 获取 权限状态
        const res1 = await getSetting();
        const scopeAddress = res1.authSetting["scope.address"];
        console.log(res1)
        // 2 判断 权限状态
        if (scopeAddress === true) {
          await openSetting();
        }
        // 3 调用获取收货地址的 api
        let address = await chooseAddress();
        address.all = address.provinceName + address.cityName + address.countyName + address.detailInfo;
         // 4 存入到缓存中
        wx.setStorageSync("address", address);
      } catch (error) {
        chooseAddress()
      }
    }
  }
})
