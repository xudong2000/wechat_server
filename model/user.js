const { db } = require(process.cwd() + '/model/mongodb')

// 设计用户表
const userModel = db.model('user', {
  username: { type: String, default: '' }, // 用户名
  password: { type: String, default: '' }, // 密码
  telephone: { type: String, default: '' }, // 手机号
  wechat: { type: String, default: '' }, // 微信号
  sex: { type: String, default: '男' }, // 性别
  address: { type: String, default: '' }, // 地区
  signature: { type: String, default: '' }, // 个性签名
  avatar: { type: String, default: '' }, // 头像
  bgImg: { type: String, default: '' }, // 背景图片
  friends: { type: Array, default: [] }, // 我的好友
  isDelete: { type: Boolean, default: false }, // 是否注销账号
})

// 创建用户表
const createUser = (data) => {
  const insertObj = new userModel(data)
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

// 查询用户表
const selectUser = (_) => {
  return userModel
    .find()
    .then((res) => {
      return res
    })
    .catch((err) => {
      console.log('数据查询失败' + err)
      return []
    })
}

// 根据参数查询用户表
const selectUserByParams = (data) => {
  return userModel
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
  createUser,
  selectUser,
  selectUserByParams
}
