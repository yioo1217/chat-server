# Socket-Chat-Server端

Socket-Chat的服务器，基于express+mysql+socket.io实现，目前实现了基本的用户登陆注册，会话列表逻辑，好友增删，好友私聊等功能。后期会继续完善现有功能，并添加群聊，视频通话，后台管理等功能。

## 安装步骤

1. mysql中创建一个名为socket_chat的数据库
2. 项目安装依赖 `npm install`
3. 运行src中的app.js `node src/app.js`

## 注意

1. 本项目需要node和mysql环境 node版本16.20.2