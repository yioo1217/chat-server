// 生成uuid
const guid = function () {
  function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
  }
  return (S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4())
}

// 生成sessionId
const createSessionId = function () {
  return Math.round(Math.random() * Math.pow(10, 6)).toString()
}
//生成rsa密钥
// const createRsaKey = function () {
//   const key = new NodeRSA({ b: 512 });
//   key.setOptions({ encryptionScheme: 'pkcs1' });
//   key.generateKeyPair();
//   return key;
// }
const crypto = require('crypto');


const {
  publicKey,
  privateKey,
} = crypto.generateKeyPairSync('rsa', {
  modulusLength: 512,
  publicKeyEncoding: {
    type: 'spki',
    format: 'pem'
  },
  privateKeyEncoding: {
    type: 'pkcs8',
    format: 'pem',
    cipher: 'aes-256-cbc',
    passphrase: 'top secret'
  }
});
// const createRsaKey = function () {
//   const key = crypto.generateKeyPairSync('rsa', {
//     modulusLength: 2048,
//     publicExponent: 65537,
//   });
//   const publicKeyPem = key.publicKey.export({
//     type: 'spki',
//     format: 'pem'
//   });
//   console.log(publicKeyPem);
//   const privateKeyPem = key.privateKey.export({
//     type: 'spki',
//     format: 'pem'
//   });
//   return publicKeyPem;
// }
module.exports = {
  guid,
  createSessionId,
  // createRsaKey,
  publicKey,
  privateKey
}