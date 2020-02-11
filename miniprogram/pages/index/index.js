const db = wx.cloud.database();
const todos = db.collection("todos");
Page({

  data: {
    tasks:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData();
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

  onReachBottom:function(){
    this.getData();
  },
  // 下拉刷新
  onPullDownRefresh: function () {
    this.getData(res => {
      wx.stopPullDownRefresh();
      this.pageData.skip = 0;
    });
    
  },
  //抽象出来刷新数据函数
  getData: function (callback) {
    if(!callback){
      callback = res =>{}
    }
    wx.showLoading({
      title: '数据加载中',
    })
    todos.skip(this.pageData.skip).get().then(res => {
      let oldData = this.data.tasks;
      this.setData({
        tasks: this.data.tasks.concat(res.data)
      },res =>{
        this.pageData.skip = this.pageData.skip + 20
        wx.hideLoading()
        callback();
      })
    })
  },
  pageData:{
    skip:0
  }
})