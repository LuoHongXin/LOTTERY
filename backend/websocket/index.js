const express = require('express');
const app = express();
const http = require('http');
const SocketServer = require('ws').Server;
let server = http.createServer(app);
const ws = new SocketServer({server});
ws.on('connection',client => {
    console.log('客户端连接成功1');
    client.on('message',msg => { // 监听前端发送的心跳检测，确保连接
        ws.clients.forEach(item => { // 给每一个连接的客户端发信息，告诉客户端后台的 socket 一直在开
            item.send('connecting')
        })
    })
})
module.exports = {ws,server,app};