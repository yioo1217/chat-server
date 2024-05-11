const dao_chat = require('../dao/chat')
// const dao_user = require('../dao/user')
// const socket_user = require('../websocket/user')
const crypto = require('crypto');
const { key } = require('../utils/utils')
// 获取聊天记录
const getChatList = async (req, res, next) => {
  res.set('content-type', 'application/json;charset=utf-8')
  // const user = await dao_user.getUserById(userId)

  const query = req.query;
  if (!query.sessionId) {
    res.end(JSON.stringify({
      code: 400,
      msg: '缺少必要参数: sessionId',
    }))
    return
  }
  query.lastTime = query.lastTime || new Date().getTime()
  // AES解密函数
  // 解密函数
  function aesDecrypt(encryptedText, key) {
    const decipher = crypto.createDecipheriv('aes-256-ecb', key, null); // 将IV设为null
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  }

  const list = await dao_chat.getChatList(query.sessionId, query.lastTime)
  const list_a = list.map(item => {
    item.content = aesDecrypt(item.content, key)
    return item
  })
  res.end(JSON.stringify({
    code: list ? 200 : 400,
    list: list_a
  }))
}

module.exports = {
  getChatList,
}