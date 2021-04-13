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

// 导入模型
const { updateUserInfo } = require(process.cwd() + '/model/user')

// 监视所有连接(当有一个客户端连接上时回调)
io.on('connection', (socket) => {
  console.log('客户端已经连接')

  let userData = []

  socket.on('login', async (data) => {
    userData = data
    console.log('当前登录用户' + data.username)
    const update = [{ username: data.username }, { $set: { isOnline: true } }]
    const res = await updateUserInfo(update[0], update[1])
    console.log(res)
  })

  socket.on('logout', async (data) => {
    console.log(data.username + '已退出登录')
    const update = [{ username: data.username }, { $set: { isOnline: false } }]
    const res = await updateUserInfo(update[0], update[1])
    console.log(res)
  })

  // socket.on('disconnect', async () => {
  //   console.log(userData.username + '客户端断开连接')
  //   const update = [
  //     { username: userData.username },
  //     { $set: { isOnline: false } },
  //   ]
  //   const res = await updateUserInfo(update[0], update[1])
  //   console.log(res)
  // })
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
