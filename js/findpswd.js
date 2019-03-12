import '../style/reset.css';
import '../style/findpswd.css';
require('./init.js');

var ajax = require('./public_Ajax.js').ajax;

let del = document.getElementsByClassName('del')[0];
let inputs = document.getElementsByTagName('input');
let eye = document.getElementsByClassName('eye')[0];

inputs[1].onfocus = function () {
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
