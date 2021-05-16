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
    var ws = new WebSocket('ws://'+comutil.wsservice+'/console/update');
    createWebSocket();   //连接ws
    function createWebSocket() {
        try{
            if('WebSocket' in window){
                ws = new WebSocket('ws://'+comutil.wsservice+'/console/update');
            }
            initEventHandle();
        }catch(e){
            console.log(e);
        }     
    }
    function initEventHandle() {
        ws.onopen = function(evt) { 
            console.log("Connection open ..."); 
            heartCheck.reset().start();      //心跳检测重置
            ws.send("Hello WebSockets!");
          };
          
        ws.onmessage = function(evt) {
            console.log( "Received Message: " + evt.data);
            if (evt.data == 'updateSuccess') {
                globalmodule.lottery.first = true;
                globalmodule.lottery.init();
                globalmodule.lottery.event();
            }
            heartCheck.reset().start();      //拿到任何消息都说明当前连接是正常的
        };
        ws.onclose = function (e) {
            console.log('websocket 断开: ' + e.code + ' ' + e.reason + ' ' + e.wasClean)
            console.log(e)
        }
    }
    // 监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
    window.onbeforeunload = function() {
        ws.close();
    }  
    //心跳检测
    var heartCheck = {
        timeout: 1000,        //1分钟发一次心跳
        timeoutObj: null,
        serverTimeoutObj: null,
        reset: function(){
            clearTimeout(this.timeoutObj);
            clearTimeout(this.serverTimeoutObj);
            return this;
        },
        start: function(){
            var self = this;
            this.timeoutObj = setTimeout(function(){
                //这里发送一个心跳，后端收到后，返回一个心跳消息，
                //onmessage拿到返回的心跳就说明连接正常
                ws.send("ping");
                console.log("ping!")
                self.serverTimeoutObj = setTimeout(function(){//如果超过一定时间还没重置，说明后端主动断开了
                    ws.close();     //如果onclose会执行reconnect，我们执行ws.close()就行了.如果直接执行reconnect 会触发onclose导致重连两次
                }, self.timeout)
            }, this.timeout)
        }
    }

