const express = require('express');
const compression = require('compression');
const {ws,server,app} = require('./websocket');

app.use(express.static('./'));
let {port} = require('./config.json');
let routers = require('./routers');
app.use(routers);
app.use(compression());
server.listen(port,()=>{
    console.log(port+'serve is running');
})