import '../style/reset.css';
import '../style/login.css';
require('./init.js');

var ajax = require('./public_Ajax.js').ajax;

let eye = document.getElementsByClassName('eye')[0];
let inputs = document.getElementsByTagName('input');
let loginbnt = document.getElementsByClassName('loginBotton')[0];
let del = document.getElementsByClassName('del')[0];
let wrongtips = document.getElementsByClassName('wrongtips')[0];

let height = window.screen.height;
let warp=document.getElementsByClassName('warp')[0];
warp.style='height:'+height+'px';

let eyeflag = 1;
eye.addEventListener('click', function () {
    if (eyeflag) {
        eye.id='eye2'
        inputs[2].type = 'text';
        eyeflag = 0;
    } else {
        eye.id='';
        inputs[2].type = 'password';
        eyeflag = 1;
    }

}, false);

inputs[1].onfocus = function () {
    wrongtips.innerHTML = '';
    del.style='display:block;';
};

inputs[2].onfocus = function () {
    wrongtips.innerHTML = '';
};
inputs[1].onblur = function () {  
    inputs[1].value = '';
    del.style='display:none;';
};

del.addEventListener('click', function () {
    inputs[1].value = '';
});

loginbnt.addEventListener('click', function () {
    if (inputs[1].value.length != 11) {
        wrongtips.innerHTML = '请输入正确手机号';
    }
    else if (inputs[2].value.length == 0) {
        wrongtips.innerHTML = '密码不能为空';
    }else{
        let useraccount={};
        useraccount.phone=inputs[1].value;
        useraccount.password=inputs[2].value;
         ajax({
            url:'http://www.shidongxuan.top/smartMeeting_Web/user/login.do',
            type:'post',
            data:useraccount,
            async: false,
            success: function (xhr) {
                let res = JSON.parse(xhr.responseText);
                if(res.status==0){//登陆成功时获取token
                    let token = res.msg;
                    if(token!=null){
                        localStorage.setItem('token',token);//保存token
                        window.location.href='功能页面url';
                    }else{
                        wrongtips.innerHTML='登录失败';
                    }
                }else{
                    wrongtips.innerHTML='账户名或密码错误';
                } 
            },
            fail: function (err) {                                                                                                          
                console.log('通信错误');
                window.location.href='登录页面';
            }
        }) 
        
    }
})