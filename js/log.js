$(function(){
    $("#login").click(function(){
        let userName = $("#userName").val()
        let userPhone = $("#userPhone").val()
        $.ajax({
            type:'post',
            url:comutil.service+'/user/login',
            async:false,
            data:{
                userName,
                userPhone
            },
            success:function(data){
                if(data.code==1){
                    alert(data.msg);
                } else {
                    alert(data.msg)
                }
                console.log(data);
            },
            fail:function(){
                console.log(123)
            }
        })
    })
})