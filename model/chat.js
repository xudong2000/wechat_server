const { db } = require(process.cwd() + '/model/mongodb')

// 设计用户表
const chatModel = db.model('chat', {
  from: { type: String, default: '' }, // 消息发送者的id
  to: { type: String, default: '' }, // 消息接收者的id
  message: {
    type: Array,
    default: [
      {
        content: '在吗？',
        time: '2021-03-23 10:00',
        isRead: false,
        isDelete: false,
      },
    ],
  }, // 消息列表
  isDelete: { type: Boolean, default: false }, // 是否删除
})

// 创建chat表
const createChat = (data) => {
  const insertObj = new chatModel(data)
  return insertObj
    .save()
    .then((res) => {
      return res
    })
    .catch((err) => {
      console.log('数据插入失败' + err)
      return false
    })
}

// 根据参数查询chat表
const selectChatByParams = (data) => {
  return chatModel
    .find(data)
    .then((res) => {
      return res
    })
    .catch((err) => {
      console.log('数据查询失败' + err)
      return []
    })
}

// 导出模型
module.exports = {
  createChat,
  selectChatByParams,
}
