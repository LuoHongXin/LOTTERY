var globalmodule = {};
// require.config({
//     'paths': {//设置短路径(方便后期使用):如果是以require所在文件夹为基础路径，后面的js文件不需要后缀，推荐这样写
//         'jq': './jquery-1.10.1.min',//一般放在js文件夹外的js文件才需要配置短路径
//         'tmpl': './tmpl',
//         'lc': './localComutil',
//         'lt': './lottery',
//     },
//     'shim': {//设置依赖关系，idx就依赖于common
//         'tmpl': ['jq'],
//         'lc': ['jq'],
//         'lt': ['tmpl','lc'],
//     }
// });
// require(['lt'],function(){
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
// })