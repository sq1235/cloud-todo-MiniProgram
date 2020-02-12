// 云函数入口文件
const cloud = require('wx-server-sdk')
const {
  WXMINIUser,
  WXMINIMessage
} = require('wx-js-utils');

const appId = '	wx4cc83a83e0787404'; // 小程序 appId
const secret = '8d3409722de0b26c83d110e82085f210'; // 小程序 secret
const template_id = 'tIDglOJF3seGeZjK7JSFJlB87kocOHcXRMnTBmGjkIU'; // 小程序模板消息模板 id

cloud.init()

const db = cloud.database()
const todos = db.collection('todos')

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()


  let wXMINIUser = new WXMINIUser({
    appId,
    secret
  });

  let access_token = await wXMINIUser.getAccessToken();

  const touser = wxContext.OPENID; // 小程序用户 openId，从用户端传过来，指明发送消息的用户
  const form_id = event.form_id; // 小程序表单的 form_id，或者是小程序微信支付的 prepay_id
  let task = await todos.doc(event.taskId).get();

  // 发送模板消息
  let wXMINIMessage = new WXMINIMessage();
  let result = await wXMINIMessage.sendMessage({
    access_token,
    touser,
    form_id,
    template_id,
    data: {
      keyword1: {
        value: task.data.title // keyword1 的值
      },
      keyword2: {
        value: task.data._id // keyword2 的值
      },
      keyword3: {
        value: task.data._id // keyword2 的值
      },
      keyword4: {
        value: task.data.location.address // keyword2 的值
      }
    },
    page: `pages/todoinfo/todoinfo?id={{task.data._id}}`// 点击模板消息后，跳转的页面
  });
  return result;
  
}