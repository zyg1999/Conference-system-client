
history.pushState(null, null, document.URL);
window.addEventListener('popstate', function () {
    history.pushState(null, null, document.URL);
});

let eye = document.getElementsByClassName('eye')[0];
let inputs = document.getElementsByTagName('input');
let phonebox = document.getElementsByClassName('phonebox')[0];
let loginbnt = document.getElementsByClassName('loginBotton')[0];
let del = document.getElementsByClassName('del')[0];
let wrongtips = document.getElementsByClassName('wrongtips')[0];
let height = document.documentElement.clientHeight;
let warp = document.getElementsByClassName('warp')[0];
warp.style.height = height + 'px';
let eyeflag = 0;
eye.addEventListener('click', function () {
    if (eyeflag) {
        eye.style = 'background-size:72%;background-image:url(./pic/biyan.png);';
        inputs[1].type = 'password';
        eyeflag = 0;
    } else {
        eye.style = 'background-size:90%;background-image:url(./pic/zhengyan.png);';
        inputs[1].type = 'text';
        eyeflag = 1;
    }

}, false);

inputs[0].onfocus = function () {
    wrongtips.innerHTML = '';
    del.style = "background-image:url(./pic/qingchu.png)";
};
inputs[1].onfocus = function () {
    wrongtips.innerHTML = '';
};
inputs[0].onblur = function () {
    del.style = "background-image:''";
};
inputs[1].onblur = function () {
};

del.addEventListener('click', function () {
    inputs[0].value = '';
});

loginbnt.addEventListener('click', function () {

    if (inputs[0].value.length != 11) {
        wrongtips.innerHTML = '请输入正确手机号';
    }
    else if (inputs[1].value.length == 0) {
        wrongtips.innerHTML = '密码不能为空';
    }
})

