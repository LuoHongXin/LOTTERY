const express = require('express');
const router = express.Router();
const {formatData} = require('../utils');
const fs = require('fs');
const path = require('path');
const {ws} = require('../websocket');
// 读取backendComutil文件中的配置对像返回给前台
router.get('/readConsole',async (req,res,next)=>{
    try {
        // fs.readFile(path.resolve(__dirname,'../backendComutil.json'),'utf-8',(err,data)=>{
        //     res.send(formatData({
        //         data:JSON.parse(data)
        //     }))
        // })
        const data = require(path.resolve(__dirname,'../backendComutil.json'));
        res.send(formatData({
                    data
                }))
    } catch (err) {
        res.send(formatData({code:0,msg:err}));
    }
})

// 修改backendComutil文件中的配置对像
router.post('/update',async (req,res,next)=>{
    let {
        lotteryName,
        autoLottery,
        countDownTime,
        timeOut,
        stopTimeOut,
        luckyMan
    } = req.body;
    let data = require(path.resolve(__dirname,'../backendComutil.json'));
    data.lotteryName = lotteryName || data.lotteryName;
    data.autoLottery = autoLottery || data.autoLottery;
    data.countDownTime = countDownTime || data.countDownTime;
    data.timeOut = timeOut || data.timeOut;
    data.stopTimeOut = stopTimeOut || data.stopTimeOut;
    data.luckyMan = luckyMan || data.luckyMan;
    data = JSON.stringify(data);
    fs.writeFile(path.resolve(__dirname,'../backendComutil.json'),data,'utf-8',(err,data2)=>{
        if(err) {res.send(formatData({msg:err}))}
        else {
            ws.clients.forEach(item => {
                item.send('updateSuccess')
            })
            res.send(formatData({data:data2,msg:'修改成功'}))
        }
    })
    
})
module.exports = router;