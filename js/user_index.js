import '../style/reset.css'
import '../style/user_index.css'
require('./init.js');

var ajax = require('./public_Ajax.js').ajax;



//bottom部分
let bottoms = document.getElementsByClassName('bottombox')[0].children;

let bottomflag=0;
for(let i=0;i<bottoms.length;i++){
    bottoms[i].addEventListener('click',function(){
        if(i==bottomflag){
            return;
        }else{
            bottoms[bottomflag].style="color:#666;";
            bottoms[bottomflag].children[0].className='bottomlogo'+(bottomflag+1);
            bottoms[i].style="color:#1EACF6;";
            bottoms[i].children[0].className='bottomlogo'+(i+1)+'select';
            bottomflag=i;
        }
    })
}