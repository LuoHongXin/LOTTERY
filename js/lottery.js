var lottery = function (opts){
    this.$el = opts.$ele||$("body");
    this.index = opts.index || ''; // 区别的key
    this.dataArr = opts.data|| [{name:'小明',id:1},{name:'小红',id:2},{name:'小爱',id:3}]; // 参与抽奖的人员
    this.lotteryName = comutil.lotteryName; // 抽奖活动名字
    this.winners = ''; // 中奖人
}
lottery.prototype.init = function () {
   var html = comutil.syncGet(comutil.origin+'/html/lottery.html');
   var lotteryBox = $(".lottery-box");
   if(lotteryBox[0]) {
        lotteryBox.replaceWith(tmpl(html,this));
   } else {
       this.$el.append(tmpl(html,this));
   }
}
lottery.prototype.event = function(){
    var _this = this;
    let timer = '';
    let luckyIndex = ''; // 该数字-1既是中奖人下标
    $(".start-btn").on("click",function(){ // 开始抽奖事件
        luckyIndex = comutil.randomNumber(0,_this.dataArr.length)
        if (comutil.autoLottery) { // 是否自动抽奖
            if (comutil.countDownTime) { // 设置倒计时，则直接显示中奖人
                setTimeout(function(){ // 自动抽奖 countDownTime 秒后抽中
                    var winners = comutil.randomArr(_this.dataArr);
                    _this.winners =  winners.name; // 中奖人名字
                    $("#winners").text(winners.name);
                    // _this.init();
                    // _this.event();
                    console.log(_this.winners)
                },comutil.countDownTime * 1000)
            } else {
                for (let i = 0; i < luckyIndex;i++){
                    setTimeout(function(){
                        console.log(i);
                        $(".lottery-people-item").eq(i).addClass('active').siblings().removeClass('active');
                        $("#winners").text(_this.dataArr[i].name);
                    },comutil.timeOut*i) // 500 即 0.5s 记得与样式的 transition 对应上
                }
            }
        } else { // 不是自动抽奖需要将开始按钮显示为停止按钮
            $(".start-btn").addClass("hide").siblings(".stop-btn").removeClass("hide");
            let i = 0;
            timer = setInterval(function(){
                console.log(i);
                $(".lottery-people-item").eq(i).addClass('active').siblings().removeClass('active');
                $("#winners").text(_this.dataArr[i].name);
                if (i===_this.dataArr.length-1) {
                    i = 0;
                } else {
                    i ++;
                }
            },comutil.timeOut) 
        }
    });
    $(".stop-btn").on("click",function(){
        if (comutil.stopTimeOut) {
            setTimeout(function(){clearInterval(timer);},luckyIndex*comutil.timeOut)
        } else {
            clearInterval(timer);
        }
        $(".stop-btn").addClass("hide").siblings(".start-btn").removeClass("hide");
    })
}