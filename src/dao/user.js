const User = require('../models/user.js')
const key = []
// 根据用户名判断用户是否存在, 存在返回用户
const isExisted = async (userName) => {
  return await User.findOne({
    where: {
      userName: userName
    },
    raw: true,
  })
}

// 添加用户
const addUser = async (userInfo) => {
  return await User.create(userInfo)
}
//获取所有公钥
const getKey = async () => {
  try {
    // 等待findAll的Promise解决，并获取解决后的值
    const users = await User.findAll({
      attributes: ['key']
    });
    // 映射users数组来获取所有的key
    const keys = users.map(user => user.key);
    // 打印或返回keys数组
    console.log(keys);
    return keys; // 可以返回这个数组
  } catch (error) {
    // 错误处理
    console.error('Error fetching users:', error);
    throw error; // 可以抛出错误，调用者需要处理这个错误
  }
};
// 根据id获取用户
const getUserById = async (id) => {
  return await User.findOne({
    where: {
      id: id
    },
    raw: true,
  })
}

// 用户列表
const list = async (pagenum, pagesize) => {
  return await User.findAll({
    attributes: ['id', 'userName', 'createdAt', 'avatar', 'email'],
    order: [
      ['id', 'DESC']
    ],
    offset: (pagenum - 1) * pagesize,
    limit: pagesize,
    raw: true, // 设置为 true，即可返回源数据
  })
};


// 删除用户
const remove = async (userName) => {
  // 物理删除
  // 判断是否为数组 若为数组则进行批量删除
  if (userName instanceof Array) {
    let arr = [];
    userName.forEach(item => {
      let p = User.destroy({
        where: {
          userName: item,
        }
      })
      arr.push(p);
    })
    return await Promise.all(arr)
  } else {
    return await User.destroy({
      where: {
        userName: userName,
      },
    })
  }

}


module.exports = {
  isExisted,
  addUser,
  // login,
  list,
  remove,
  getUserById,
  getKey,
  key
}