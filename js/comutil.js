var comutil = {
    origin:location.origin,//当前页面路径的origin
    service:'http://localhost:7519',//服务器地址
    wsservice:'localhost:7519',//websocket服务器地址
    lotteryName:'罗小呆抽奖平台', // 抽奖平台名字
    autoLottery:true, // 是否自动抽奖
    countDownTime:2, // 抽奖倒计时时间(单位秒),有数字则直接显示中奖人
    timeOut:500, // 即 0.5s 记得与样式的 transition 对应上
    stopTimeOut:true, // 点击停止时，是否要随机继续选，还是立即停止确定
    luckyMan:'请求', // 抽中的人
    filterLuckyMan:function(arr) { // 把数组中的lucky选出来
        if (this.luckyMan) {
            return arr.filter(item=>item.name == this.luckyMan);
        } else {
            return [''];
        }
    },
    syncGet:function(url) {// 请求模板方法
        var data=null;
        $.ajax({
            url: url,
            async: false,
            success: function (resp) {
                data=resp;
            },
            error: function (error) {
                data=error;
            }
        });
        return data;
    },
    renderTime:function (sec){//秒数转换为分钟
        var minute = Math.floor(sec/60);
        minute = minute<10?'0'+minute:minute;
        var second = Math.ceil(sec%60);
        if(second==60){
            second = '00';
            minute++; 
        }else{
            second = second<10?'0'+second:second
        }
        return minute+':'+second;
    },
    encrypt:function (content,key){//aes加密
            if(!content){return content;}
            key = CryptoJS.enc.Utf8.parse(key);
            var sContent = CryptoJS.enc.Utf8.parse(content);
            var encrypted = CryptoJS.AES.encrypt(sContent,key,{mode:CryptoJS.mode.ECB,padding:CryptoJS.pad.Pkcs7});
            var res = encrypted.toString();
            return res;
    },
    getUrlParams:function(name){
		var results = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(window.location.href);
		if (!results) {
			return '';
		}
		return decodeURIComponent(results[1]) || '';
    },
    randomArr:function (arr) { // 传入一个数组，随机返回数组中的一个
        arr = arr || [];
        var randomIndex = this.randomNumber(0,arr.length-1);
        return arr[randomIndex];
    },
    randomNumber:function (min, max) {//生成min到max范围内的随机正整数，包括max
        var num = (parseInt(Math.random() * (max - min + 1)) + min);
        return num;
    },
    // 请求去除抽奖名单
    delUser:function (id,_this) {
        $.ajax({
            type:'get',
            url:this.service+'/user/del?id='+id,
            async:false,
            success:function(data) {
                _this.dataArr = _this.dataArr.filter(item=>{
                    return item._id&&item._id!=id
                })
                console.log('删除成功',data,_this.dataArr);
            },
            fail:function(){
                alert('删除失败')
            }
        })
    },
    // 根据后端的backendComutil替换当前comutil部分属性
    updateComutil:function () {
        $.ajax({
            type:'get',
            url:comutil.service+'/console/readConsole',
            async:false,
            success:function(res){
                const data = res.data;
                if (res.code == 1) {
                    comutil = Object.assign(comutil,data);
                } else {
                    alert(res.code+'/n'+res.msg)
                }
            }
        })
    }
};    