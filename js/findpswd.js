import '../style/reset.css';
import '../style/findpswd.css';

require('./init.js');

var ajax = require('./public_Ajax.js').ajax;
let returninco = document.getElementsByClassName('returninco')[0];
returninco.addEventListener('click',function(){
    window.location.href='http://localhost:8888/login.html';
});
let del = document.getElementsByClassName('del')[0];
let inputs = document.getElementsByTagName('input');
let eye = document.getElementsByClassName('eye')[0];
let ajaxflag=1;
inputs[1].onfocus = function () {
    wrongtips.innerHTML='';
    del.style='display:block;';
};

del.addEventListener('click', function () {
    inputs[1].value = '';
    del.style='display:none;';
});

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

//获取验证码
let forgetinfo={};
let yzmbtn = document.getElementsByClassName('yzmbtn')[0];
let wrongtips = document.getElementsByClassName('wrongtips')[0];

yzmbtn.addEventListener('click',function(){
    forgetinfo.phone=inputs[1].value;
    if (inputs[1].value.length != 11) {
        wrongtips.innerHTML = '请输入正确手机号';
    }else{
        if(ajaxflag==0){
            wrongtips.innerHTML = '不能多次发送';
        }else{
            ajaxflag=0;
            ajax({
                url:'http://www.shidongxuan.top/smartMeeting_Web/phone/getVerificationCode.do',
                type:'post',
                data:forgetinfo.phone,
                async: false,
                success: function (xhr) {
                    ajaxflag=1;
                    let res = JSON.parse(xhr.responseText);
                    if(res.status!=0){
                        wrongtips.innerHTML='获取失败，请稍后重试';
                        return;
                    }
                },
                fail:function(){
                    ajaxflag=1;
                    wrongtips.innerHTML='通信错误'; 
                    return;
                }
            })
        }
        
    } 
});

let confirmchange = document.getElementsByClassName('confirmchange')[0];
confirmchange.addEventListener('click',function(){
    console.log(inputs[0].value.length);
    if(inputs[1].value.length!=11){
        wrongtips.innerHTML = '请输入正确手机号';
    }
    else if(inputs[2].value.length==0){
        wrongtips.innerHTML = '验证码不能为空';
    }
    else if(inputs[3].value.length < 6){
        wrongtips.innerHTML = '密码过短,请重置';
    }else if(inputs[3].value.length>16){
        wrongtips.innerHTML = '密码过长,请重置';
    }
    else {
        forgetinfo.phoneNumber=inputs[1].value;
        forgetinfo.code=inputs[2].value;
        forgetinfo.newPassword=inputs[3].value;
        if(ajaxflag==0){
            wrongtips.innerHTML = '不能多次发送';
        }else{
            ajaxflag=0;
            ajax({
                url:'http://www.shidongxuan.top/smartMeeting_Web/user/forgetPassword.do',
                type:'post',
                data:forgetinfo,
                async: false,
                success: function (xhr) {
                    ajaxflag=1;
                    let res = JSON.parse(xhr.responseText);
                    if(res.status == 0){
                        wrongtips.innerHTML='修改成功';
                    }else{
                        wrongtips.innerHTML='修改失败，请重试';
                    }
                },
                fail:function(){
                    ajaxflag=1;
                    wrongtips.innerHTML='通信错误'; 
                    return;
                }
            })
        }
    }
})