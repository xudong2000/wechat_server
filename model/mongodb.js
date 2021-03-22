const mongoose = require('mongoose')
const db = mongoose.createConnection(
  'mongodb://localhost:27017/wechat',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) {
      return console.log('数据库连接失败！' + err)
    }
    return console.log('数据库连接成功')
  }
)

module.exports = {
  db,
}
