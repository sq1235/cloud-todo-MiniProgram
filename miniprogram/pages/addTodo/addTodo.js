// pages/addTodo/addTodo.js
//连接数据库
const db = wx.cloud.database();
const todos = db.collection("todos");

Page({

  data:{
    image:null
  },

  pageData:{
    locationObj:{}
  },
  

  selectImg:function(e){
    // var that = this
    wx.chooseImage({
      success: res => {
        // console.log(res.tempFilePaths[0])
        wx.cloud.uploadFile({
          //随机名称
          cloudPath: `${Math.floor(Math.random()*10000000)}.png`,
          filePath: res.tempFilePaths[0],
        }).then(res => {
          console.log(res.fileID)
          this.setData({
            image: res.fileID
          })
        }).catch(err => {
          console.error(err)
        })
      },
    })
  },


  onSubmit:function(e){

    todos.add({
      data:{
        title: e.detail.value.title,
        image:this.data.image,
        location:this.pageData.locationObj
      }
    }).then(res =>{
      //通知云函数
      // console.log(e.detail.formId)
      wx.cloud.callFunction({
        name: 'msgMe',
        data: {
          formId: e.detail.formId,
          taskId:res._id,
        }
      })
      // console.log(res._id)
      wx.showToast({
        title:"Success",
        icon:"success",
        success:res2 => {
          wx.redirectTo({
            url: `../todoinfo/todoinfo?id=${res._id}`,
          })
        }
      })
    })
  },

  chooseLocation:function(e){
    wx.chooseLocation({
      success: res => {
        // console.log(res)
        let locationObj={
          latitude:res.latitude,
          longitude: res.longitude,
          name:res.name,
          address:res.address
        }
        this.pageData.locationObj = locationObj
      },
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