let ajaxNum=0;//请求计数器，当一个页面有多个请求数据时，每个请求都会调用一次本函数，也就是说有多个loading组件在加载，但数据并不是同时返回，所以只有数据全部返回时我们才关闭loading组件

export const request=(params)=>{
  // 判断 url中是否带有 /my/ 请求的是私有的路径 带上header token
  let header={...params.header};
  if(params.url.includes("/my/")){
    // 拼接header 带上token
    header["Authorization"]=wx.getStorageSync("token");
  }
  const baseUrl="https://api-hmugo-web.itheima.net/api/public/v1";//提取url公共的部分
  ajaxNum++//记录有多少个请求
  wx.showLoading({//加载图标
    title: '加载中......',
    mask:true
  })
  return new Promise((resolve,reject)=>{
    wx.request({
      ...params,//解构参数 把形参结构出来
      header:header,
      url:baseUrl+params.url,//做url的拼接
      success:(resule)=>{
        resolve(resule.data.message)//直接返回想要的请求的数据
      },
      fail:(err)=>{
        reject(err)
      },
      complete:()=>{
        ajaxNum--
        if(ajaxNum===0){
          wx.hideLoading()
        }
      }
    })
  })
};

/** promise形式优化chooseAddress 获取地址 （不能点击取消，一旦点击的取消以后再点击获取地址没有反应）*/
export const chooseAddress=()=>{
  return new Promise((resolve,reject)=>{
    wx.chooseAddress({
      success: (result) => {
        resolve(result);
      },
      fail: (err) => {
        reject(err);
      }
    })
  })
};
/** promise形式优化openSetting用户操作设置后返回的结果，以获取地址为例：没有操作返回undefind,点击确定返回true，点击取消返回false**/
export const getSetting=()=>{
  return new Promise((resolve,reject)=>{
    wx.getSetting({
      success: (result) => {
        resolve(result);
      },
      fail: (err) => {
        reject(err);
      }
    });
  })
};
/** promise形式优化openSetting:调起客户端小程序设置界面,如果以前用户在获取地址的操作中点击了取消，那么需要此方法调用设置界面点击打开才能在继续点击获取地址操作**/
export const openSetting=()=>{
  return new Promise((resolve,reject)=>{
    wx.openSetting({
      success: (result) => {
        resolve(result);
      },
      fail: (err) => {
        reject(err);
      }
    });
  })
};

/** promise形式优化showModal：显示模态对话框 参数形式{}**/
export const showModal=({content})=>{
  return new Promise((resolve,reject)=>{
    wx.showModal({
      title: '提示',
      content: content,
      success :(res) =>{
        resolve(res);
      },
      fail:(err)=>{
        reject(err);
      }
    })
  })
};

/** promise形式优化showToast:显示消息提示框 参数形式{}**/
export const showToast=({title})=>{
  return new Promise((resolve,reject)=>{
    wx.showToast({
      title: title,
      icon: 'none',
      success :(res) =>{
        resolve(res);
      },
      fail:(err)=>{
        reject(err);
      }
    })
  })
};

/** promise形式优化wx.login**/
export const login=()=>{
  return new Promise((resolve,reject)=>{
    wx.login({
      timeout: 10000,
      success: (result) => {
        resolve(result)
      },
      fail: (res) => {
        reject(res)
      },
    })
  })
};

/**
 * promise 形式的 小程序的微信支付
 * @param {object} pay 支付所必要的参数
 */
export const requestPayment=(pay)=>{
  return new Promise((resolve,reject)=>{
   wx.requestPayment({
      ...pay,
     success: (result) => {
      resolve(result)
     },
     fail: (err) => {
       reject(err);
     }
   });
     
  })
}


