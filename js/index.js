var globalmodule = {};
$(function(){
    initLottery();

    function initLottery () {
        $.ajax({
            type:'get',
            url:comutil.service+'/user/all',
            async:false,
            success:function(res){
                if (res.code == 1) {
                    let dataArr = res.data.map(function(item){
                        item.name  = item.userName;
                        return item
                    })
                    globalmodule.lottery = new lottery({index:'_id',data:dataArr});
                    globalmodule.lottery.init();
                    globalmodule.lottery.event();
                } else {
                    alert('获取抽奖参与人员失败')
                }
            }
        })
    }
})