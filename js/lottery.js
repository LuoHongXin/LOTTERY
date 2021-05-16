var lottery = function (opts){
    comutil.updateComutil(); // 根据后端的comutil更新本地的comutil
    this.$el = opts.$ele||$("body");
    this.index = opts.index || ''; // 区别的key
    this.dataArr = opts.data || [{name:'小明',id:1},{name:'小红',id:2},{name:'小爱',id:3}]; // 参与抽奖的人员
    this.winners = ''; // 中奖人
    this.lotteryName = comutil.lotteryName; // 抽奖活动名字
    this.luckyMan = comutil.filterLuckyMan(this.dataArr)[0]; // 设置为必中奖的人
    this.luckyIndex = '';
    this.timer = '';
    this.first = true; // 是否是第一次，还没开始选任何一个人
}
lottery.prototype.init = function () {
    comutil.updateComutil();
    this.lotteryName = comutil.lotteryName; // 抽奖活动名字
    this.luckyMan = comutil.filterLuckyMan(this.dataArr)[0]; // 设置为必中奖的人
   var html = comutil.syncGet(comutil.origin+'/html/lottery.html');
   var lotteryBox = $(".lottery-box");
   if(lotteryBox[0]) {
        lotteryBox.replaceWith(tmpl(html,this));
   } else {
       this.$el.append(tmpl(html,this));
   }
}
lottery.prototype.event = function(){
    let _this = this;
    let luckyIndex = ''; // 该数字-1既是中奖人下标
    let transIndex = '';
    $(".start-btn").on("click",function(){ // 开始抽奖事件
        if (_this.luckyMan && !_this.first) {
            delUser(_this.luckyMan._id,_this)
        } else if (_this.luckyIndex&&!_this.first) {
            delUser(_this.dataArr[_this.luckyIndex]._id,_this)
            _this.luckyIndex = ''
        }
        luckyIndex = comutil.randomNumber(0,_this.dataArr.length)
        if (comutil.autoLottery=='true') { // 是否自动抽奖
            if (comutil.countDownTime) { // 设置倒计时，则直接显示中奖人
                setTimeout(function(){ // 自动抽奖 countDownTime 秒后抽中
                    var winners= _this.luckyMan? _this.luckyMan:comutil.randomArr(_this.dataArr);
                    _this.winners =  winners.name; // 中奖人名字
                    $("#winners").text(winners.name);
                    delUser(winners._id,_this)
                },comutil.countDownTime * 1000)
            } else {
                for (let i = 0; i < luckyIndex;i++){
                    setTimeout(function(){
                        $(".lottery-people-item").eq(i).addClass('active').siblings().removeClass('active');
                        if (_this.luckyMan) {
                            $("#winners").text(_this.luckyMan.name);
                            delUser(_this.luckyMan._id,_this)
                        } else {
                            if (_this.dataArr.length>0) {
                                $("#winners").text(_this.dataArr[i].name);
                                delUser(_this.dataArr[i]._id,_this)
                            }
                        }
                    },comutil.timeOut*i) // 500 即 0.5s 记得与样式的 transition 对应上
                }
            }
        } else { // 不是自动抽奖需要将开始按钮显示为停止按钮
            $(".start-btn").addClass("hide").siblings(".stop-btn").removeClass("hide");
            transIndex = 0;
            _this.timer = setInterval(function(){
                $(".lottery-people-item").eq(i).addClass('active').siblings().removeClass('active');
                if (_this.luckyMan) {
                    $("#winners").text(_this.luckyMan.name);
                } else {
                    if (_this.dataArr.length>0) {
                        $("#winners").text(_this.dataArr[i].name);
                    }
                }
                if (transIndex===_this.dataArr.length-1) {
                    transIndex = 0;
                } else {
                    transIndex ++;
                }
                _this.luckyIndex = transIndex;
            },comutil.timeOut) 
        }
    });
    $(".stop-btn").on("click",function(){
        _this.first = false;
        if (comutil.stopTimeOut=='false') {
            if (_this.luckyIndex) {
                setTimeout(function(){clearInterval(_this.timer);},(_this.luckyIndex+(_this.dataArr.length-transIndex-1))*comutil.timeOut)
            } else {
                setTimeout(function(){clearInterval(_this.timer);},(_this.luckyIndex+(_this.dataArr.length-transIndex-1))*comutil.timeOut)
            }
        } else {
            clearInterval(_this.timer);
        }
        $(".stop-btn").addClass("hide").siblings(".start-btn").removeClass("hide");
    });
    // 删除后台中奖人数据
    function delUser (id,_this) {
        if (id) {
            comutil.delUser(id,_this);
             _this.init();
             _this.event();
        }
    }
}