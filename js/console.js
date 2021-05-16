$(function(){
    $("#autoLottery").bootstrapSwitch();
    $("#stopTimeOut").bootstrapSwitch();
    $('#autoLottery').on('switchChange.bootstrapSwitch', function (event,state) {
        window.console.log(state);
    });
    $('#stopTimeOut').on('switchChange.bootstrapSwitch', function (event,state) {
        window.console.log(state);
    });
    // 刷新事件
    $("#refresh").click(function(){
        init();
    })
    // 修改事件
    $("#update").click(function(){
        update();
    })
    init();
    function init () {
        $.ajax({
            type:'get',
            url:comutil.service+'/console/readConsole',
            async:false,
            success:function(res){
                const data = res.data;
                if (res.code == 1) {
                    $("#lotteryName").val(data.lotteryName)
                    $("#autoLottery").bootstrapSwitch('state',JSON.parse(data.autoLottery));
                    $("#stopTimeOut").bootstrapSwitch('state',JSON.parse(data.stopTimeOut));
                    $("#countDownTime").val(data.countDownTime)
                    $("#timeOut").val(data.timeOut)
                    $("#luckyMan").val(data.luckyMan)
                } else {
                    alert(res.code+'/n'+res.msg)
                }
            }
        })
    }
    function update () {
        let lotteryName = $("#lotteryName").val(),
            autoLottery = $("#autoLottery").bootstrapSwitch('state'),
            countDownTime =  $("#countDownTime").val(),
            timeOut = $("#timeOut").val(),
            stopTimeOut =  $("#stopTimeOut").bootstrapSwitch('state'),
            luckyMan = $("#luckyMan").val()
        const data = {
            lotteryName,
            autoLottery,
            countDownTime,
            timeOut,
            stopTimeOut,
            luckyMan
        }
        $.ajax({
            type:'post',
            url:comutil.service+'/console/update',
            data:data,
            async:false,
            success:function(res){
                if (res.code == 1) {
                    alert(res.msg);
                    init();
                } else {
                    alert(res.code+'/n'+res.msg)
                }
            }
        })
    }
})
