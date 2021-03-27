// 引入插件
const express = require('express')
const app = express()
const server = require('http').createServer(app)

// 使用中间件
app.use(express.urlencoded({ extende: true }))
app.use(express.json())

// 获取io对象
const io = require('socket.io')(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
})

//允许跨域
app.use(require('cors')())

let userList = []

// 监视所有连接(当有一个客户端连接上时回调)
io.on('connection', (socket) => {
  console.log('客户端已经连接')
  updateUser()
  let userName = ''

  // 绑定自定义事件监听，接收客户端发送的消息
  socket.on('user', (name, callback) => {
    if (name === null) {
      return
    }
    callback(true)
    userName = name
    userList = userName
    console.log(userList)
    updateUser()
  })

  socket.on('disconnect', () => {
    console.log('客户端断开连接')
    userList.splice(userList.indexOf(userName), 1)
    console.log(userList)
    updateUser()
  })

  function updateUser() {
    // 向客户端发送消息
    io.emit('allUser', userList)
  }
})

server.listen(2077, () => {
  console.log(`服务器已经启动,请访问http://localhost:2077`)
})

// 设置路由
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

// 用户
const userController = require(process.cwd() + '/controller/user')
app.post('/user', userController.addUser)
app.get('/user', userController.findUser)
app.get('/findUser', userController.findUserByParams)

// chat
const chatController = require(process.cwd() + '/controller/chat')
app.post('/chat', chatController.addChat)
app.get('/findChat', chatController.findChatByParams)
