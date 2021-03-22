// 引入插件
const express = require('express')
const app = express()
const server = require('http').createServer(app)

// 使用中间件
app.use(express.urlencoded({ extende: true }))
app.use(express.json())

const io = require('socket.io')(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
})

//允许跨域
app.use(require('cors')())

let userList = []

io.on('connection', (socket) => {
  console.log('客户端已经连接')
  updateUser()
  let userName = ''

  socket.on('user', (name, callback) => {
    if (name.trim().length === 0) {
      return
    }
    callback(true)
    userName = name
    userList.push(userName)
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

const userController = require(process.cwd() + '/controller/user')
app.post('/user', userController.addUser)
app.get('/user', userController.findUser)
app.get('/findUser', userController.findUserByParams)

// app.listen(8000, () => {
//   console.log(`服务器已经启动,请访问http://localhost:8000`)
// })
