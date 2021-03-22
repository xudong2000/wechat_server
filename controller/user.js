// 导入模型
const { createUser, selectUser, selectUserByParams } = require(process.cwd() +
  '/model/user')

// 添加用户
const addUser = async (req, res) => {
  // 接收post请求的数据
  const postData = req.body
  console.log(postData)

  //接收数据库返回的数据
  const result = await createUser(postData)

  // 判断数据库返回的数据是否为空
  if (result) {
    res.send({
      meta: {
        state: 200,
        msg: '数据添加成功',
      },
      data: result,
    })
  } else {
    res.send({
      meta: {
        state: 500,
        msg: '数据添加失败',
      },
      data: null,
    })
  }
}

// 查询用户
const findUser = async (req, res) => {
  // 接收数据
  const getData = req.query
  console.log(getData)

  // 接收数据库返回的数据
  let result = await selectUser()
  // 响应数据
  res.send({
    meta: {
      state: 200,
      msg: '查询成功',
    },
    data: result,
  })
}

// 根据参数查询用户
const findUserByParams = async (req, res) => {
  // 接收数据
  const getData = req.query
  console.log(getData)

  // 接收数据库返回的数据
  let result = await selectUserByParams(getData)
  // 响应数据
  res.send({
    meta: {
      state: 200,
      msg: '查询成功',
    },
    data: result,
  })
}

// 导出模型
module.exports = {
  addUser,
  findUser,
  findUserByParams,
}
