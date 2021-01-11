

//随机颜色
function randomColor(n) {
    var html = "";
    if (n == "16进制") {
        html = "#";
        var k = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "a", "b", "c", "d", "e", "f", "g"];
        for (var i = 1; i <= 6; i++) {
            html += k[parseInt(Math.random() * 16)];
        }
        return html;
    }
    else if (n == "rgb") {
        for (var i = 1; i <= 3; i++) {
            var r = parseInt(Math.random() * 256);
            var g = parseInt(Math.random() * 256);
            var b = parseInt(Math.random() * 256);
        }
        return html = "rgb(" + r + "," + g + "," + b + ")";
    }
}

//生成0到9和小写字母的随机验证码
function randomYzm(n) {
    var html = "";
    var k = [0, 9, 8, 7, 6, 5, 4, 3, 2, 1, "q", "w", "e", "r", 't', 'y', 'u', 'i', 'o', ' p', 'l', 'k', 'j', 'h', 'g', 'f', 'd', 's', 'a', 'z', 'x', 'c', 'v', 'b', 'n', 'm'];
    for (var i = 0; i < n; i++) {
        html += k[parseInt(Math.random() * k.length)];
    }
    // console.log(html);
    return html;
}

//生成min到max范围内的随机函数，包括max
function randomNumber(min, max) {
    var html = (parseInt(Math.random() * (max - min + 1)) + min);
    return html;
}

//has函数has（arr，a），判断arr数组是否包含a元素
function has(a, b) {
    for (var i = 0; i < a.length; i++) {
        if (a[i] == b) {
            return true;
        }
    }
    return false;
}

//对数组去重，并返回新数组的去重函数
function norepeat(arr) {
    var newarr = []
    arr.forEach(function (item) {
        if (newarr.includes(item) == false) {
            newarr.push(item);
        }
    })
    return newarr;

}


//过滤敏感词，得到一组字符串和想要过滤的敏感词数组
//将敏感内容替换成**
function filterStr(str, arr) {
    for (i = 0; i < arr.length; i++) {
        var reg = RegExp(arr[i], 'ig');
        str = str.replace(reg, '**');
    }
    return str;
}

//根据&和=，将字符串转换成对象
function strtoObj(str) {
    var arr = str.split('&');
    var obj = {};
    for (var i = 0; i < arr.length; i++) {
        var arr2 = arr[i].split('=');
        obj[arr2[0]] = arr2[1];
    }
    return obj;
}


//字符串去重
function strnorepeat(str) {
    var str1 = '';
    for (var i = 0; i < str.length; i++) {
        if (str1.includes(str[i]) == false) {
            str1 += str[i];
        }
    }
    return str1;
}



//对象转字符串
function objtoStr(obj) {
    var str = '';
    for (var key in obj) {
        str += key + "=" + obj[key] + '&&';
    }
    str = str.slice(0, -2);
    return str;
}

//大于等于0，小于10的数进行加0操作
function toDb(num) {
    if (num < 10 && num >= 0) {
        return '0' + num;
    } else {
        return num;
    }
}


//封装设置和获取样式
function css() {
    if (arguments.length == 2) {
        //获取样式
        if (getComputedStyle(arguments[0], false)) {
            return getComputedStyle(arguments[0], false)[arguments[1]];
        } else {
            return arguments[0].currentStyle[arguments[1]];
        }
    } else if (arguments.length == 3) {
        arguments[0].style[arguments[1]] = arguments[2];
    }
}
/*
   var div = document.getElementById('box');
    console.log(css(div, 'width'));
    css(div, 'background', 'black');
*/




/*
  封装函数：给你毫秒数(纪元时间)-转成  xx年xx月xx日xx时xx分xx秒
  */
function ms(n) {
    var html = '';
    var num = n / 1000;
    var sec = num % 60;
    var min = parseInt(num % 3600 / 60);
    var hour = parseInt(num % (24 * 60 * 60) / 3600);
    var day = parseInt(num % (30 * 24 * 60 * 60) / (24 * 60 * 60));
    var mon = parseInt(num % (12 * 30 * 24 * 60 * 60) / (30 * 24 * 60 * 60));
    var year = parseInt(num / (12 * 30 * 24 * 60 * 60));
    console.log(year, mon, day, hour, min, sec);
    return `有${year}年${mon}月${day}日${hour}时${min}分${sec}秒`
}

//封装正则验证：邮箱验证-手机-url-日期-中文-密码-身份证
var reg_verify = {
    email: function (str) {
        var reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
        return reg.test(str);
    },
    phone: function (str) {
        var reg = /^(13[0-9]|14[5|7]|15[0-9]{1}|18[0-9]{1})\d{8}$/;
        return reg.test(str);
    },
    url: function (str) {
        var reg = /^[a-zA-Z]+:\/\/[^\s]*$/;
        return reg.test(str);
    },
    date: function (str) {
        var reg = /^\d{4}[-\.\s]?\d{1,2}[-\.\s]?\d{1,2}$/;
        return reg.test(str);
    },
    chinese: function (str) {
        var reg = /^[\u4e00-\u9fa5]+$/;
        return reg.test(str);
    },
    password: function (str) {
        var reg = /^\w{6,12}$/;//6-12位密码
        return reg.test(str);
    },
    idcard: function (str) {
        var reg = /^\d{14}[\dx]{1}|\d{17}[\dx]{1}$/;
        return reg.test(str);
    }
}

//琳姐的startMove
function startMove(obj, json, fnend) {
    clearInterval(obj.timer); //防止定时器叠加
    var istrue = true; var cur = 0;
    obj.timer = setInterval(function () {
        //1.获取属性名，获取键名：属性名->初始值
        for (var key in json) { //key:键名   json[key] :键值
            //			console.log(key); //width heigth opacity
            //存初始值
            if (key == 'opacity') { //初始值
                cur = css(obj, key) * 100; //透明度
            } else {
                cur = parseInt(css(obj, key)); // 300px  300  width heigth borderwidth px为单位的
            }
            //2.根据初始值和目标值，进行判断确定speed方向，变形：缓冲运动
            //距离越大，速度越大,下面的公式具备方向
            var speed = (json[key] - cur) / 6; //出现小数
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed); //不要小数部分，没有这句话或晃动
            //保证上一个属性全部都达到目标值了
            if (cur != json[key]) { //width 200 heigth 400
                istrue = false; //如果没有达到目标值，开关false
            } else {
                istrue = true; //true true
            }
            //3、运动
            if (key == 'opacity') {
                obj.style.opacity = (cur + speed) / 100; //0-1
                obj.style.filter = 'alpha(opacity:' + (cur + speed) + ')'; //0-100
            } else {
                obj.style[key] = cur + speed + 'px'; //针对普通属性 left  top height 
            }
        }
        //4.回调函数:准备一个开关,确保以上json所有的属性都已经达到目标值,才能调用这个回调函数
        if (istrue) { //如果为true,证明以上属性都达到目标值了
            clearInterval(obj.timer);
            if (fnend) { //可选参数的由来
                fnend();
            }
        }
    }, 30); //obj.timer 每个对象都有自己定时器
}