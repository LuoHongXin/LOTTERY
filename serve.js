const express = require('express');
const compression = require('compression');
const app = express();

app.use(express.static('./'));
app.use(compression());
let{port} = require('./config.json');
app.listen(port,()=>{
    console.log(port+'serve is running');
})