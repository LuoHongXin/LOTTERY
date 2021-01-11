const express = require('express');
const router = express.Router();
const mongo = require('../db');
const colName = 'user';
const {formatData} = require('../utils');

// 登记参与抽奖
router.post('/login',async (req,res,next)=>{ 
    let {
        userName,
        userPhone
    } = req.body;
    try {
        let isExit = await mongo.find(colName,{userName,userPhone});
        let result = null;
        if (isExit&&isExit.length>0) { // 已经存在
            res.send(formatData({
                msg:'用户已经登记过抽奖',
                data:isExit
            }))
        } else { // 未存在
            result = await mongo.create(colName,[{userName,userPhone}]);
            res.send(formatData({
                data:result,
                msg:'登记成功'
            }))
        }
    } catch (err) {
        res.send(formatData({
            code:0,
            data:err,
            msg:'登记失败'
        }))
    }
})

// 去除抽奖名
router.get('/del',async (req,res,next) => {
    let {
        id
    } = req.query;
    try {
        let result = await mongo.remove(colName,{_id:id});
        res.send(formatData({
            data:result
        }))
    } catch (err) {
        res.send(formatData({
            code:0,
            data:err,
            msg:'删除失败'
        }))
    }
})

// 查询所有的抽奖人
router.get('/all',async (req,res,next) => {
    try {
        let result = await mongo.find(colName);
        res.send(formatData({
            data:result
        }))
    } catch (err) {
        res.send(formatData({
            code:0,
            data:err,
            msg:'查询失败'
        }))
    }
})
module.exports = router;