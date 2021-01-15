$(function(){
    $("#autoLottery").bootstrapSwitch();
    $("#stopTimeOut").bootstrapSwitch();
    $('#autoLottery').on('switchChange.bootstrapSwitch', function (event,state) {
        window.console.log(state);
    });
    $('#stopTimeOut').on('switchChange.bootstrapSwitch', function (event,state) {
        window.console.log(state);
    });
})
