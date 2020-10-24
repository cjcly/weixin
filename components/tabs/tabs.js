// components/tabs/tabs.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tab:{
      type:Array,
      value:[]
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
    handleTabs(e){
      const index=e.currentTarget.dataset.index;
      //触发子组件向父组件传递事件
      this.triggerEvent("handleItem",index);
    }
  }
})
