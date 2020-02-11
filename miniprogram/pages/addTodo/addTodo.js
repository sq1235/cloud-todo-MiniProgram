// pages/addTodo/addTodo.js
//连接数据库
const db = wx.cloud.database();
const todos = db.collection("todos");

Page({

  onSubmit:function(e){
    // console.log(e.detail.value.title)
    todos.add({
      data:{
        title: e.detail.value.title
      }
    }).then(res =>{
      // console.log(res)
      wx.showToast({
        title:"Success",
        icon:"success"
      })
    })
  },



  /**
   * 页面的初始数据
   */
  data: {

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