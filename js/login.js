import '../style/reset.css';
import '../style/login.css';
require('./init.js');
var ajax = require('./public_Ajax.js').ajax;
let ajaxflag=1;
let eye = document.getElementsByClassName('eye')[0];
let inputs = document.getElementsByTagName('input');
let loginbnt = document.getElementsByClassName('loginBotton')[0];
let del = document.getElementsByClassName('del')[0];
let wrongtips = document.getElementsByClassName('wrongtips')[0];
let url = 'http://localhost:8888/';//'http://192.168.137.1:8888/'

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
        if(ajaxflag==0){
            wrongtips.innerHTML = '不能多次发送';
            return;
        }else{
            ajaxflag=0;
            ajax({
                url:'http://www.shidongxuan.top/smartMeeting_Web/user/login.do',
                type:'post',
                data:useraccount,
                async: false,
                contenttype:'urlencode',
                success: function (xhr) {
                    ajaxflag=1;
                    let res = JSON.parse(xhr.responseText);
                    if(res.status==0){//登陆成功时获取token
                        let token = res.msg;
                        if(token!=null){
                            sessionStorage.setItem('token',token);//保存token
                            sessionStorage.setItem('id',res.data.id);//保存id
                            sessionStorage.setItem('phone',res.data.phone);//保存用户手机号
                            window.location.href=url+'user_index.html'; 
                        }else{
                            wrongtips.innerHTML='登录失败';
                        }
                    }else{
                        wrongtips.innerHTML='账户名或密码错误';
                    } 
                },
                fail: function (err) {   
                    ajaxflag=1;
                    wrongtips.innerHTML='通信错误';                                                                                                       
                    window.location.href=url+'login.html';
                }
            }) 
        }       
    }
})
let forget = document.getElementsByClassName('forget')[0];
forget.addEventListener('click',function(){
    window.location.href=url+'findpswd.html';
})