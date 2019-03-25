import '../style/reset.css'
import '../style/user_index.css'

require('./init.js');

var ajax = require('./public_Ajax.js').ajax;


//顶部点击切换
let page1topspan = document.getElementsByClassName('page1top')[0].children;
let parts = document.getElementsByClassName('partbox')[0].children;
let topflag = 1;
for (let i = 0; i < parts.length; i++) {
  page1topspan[i].addEventListener('click', function () {
    if (i == topflag)
      return;
    else {
      page1topspan[topflag].classList.remove('topselect');
      page1topspan[i].classList.add ('topselect');
      parts[topflag].style = 'display:none';
      parts[i].style = 'display:block';
      topflag = i;
    }
  }, false)
}
//bottom部分切换
let bottoms = document.getElementsByClassName('bottombox')[0].children;
let pages = document.getElementsByClassName('pagebox')[0].children;
let bottomflag = 0;
for (let i = 0; i < bottoms.length; i++) {
  bottoms[i].addEventListener('click', function () {
    if (i == bottomflag) {
      return;
    } else {
      bottoms[bottomflag].style = "color:#666;";
      bottoms[bottomflag].children[0].className = 'bottomlogo' + (bottomflag + 1);
      pages[bottomflag].style = 'display:none;';
      bottoms[i].style = "color:#1EACF6;";
      bottoms[i].children[0].className = 'bottomlogo' + (i + 1) + 'select';
      pages[i].style = 'display:block;';
      bottomflag = i;
    }
  }, false)
}

//环形图
let width = document.body.clientWidth;
let mountNode = document.getElementById('mountNode');
mountNode.style = 'width:' + width + 'px;' + 'height:' + (width / 3 * 2) + 'px';
var data = [{
  name: '缺勤',
  percent: 10.00,
  a: '1'
}, {
  name: '请假',
  percent: 10.00,
  a: '1'
}, {
  name: '迟到',
  percent: 10.00,
  a: '1'
}, {
  name: '正常',
  percent: 70.00,
  a: '1'
}];

var map = {};
data.map(function (obj) {
  map[obj.name] = obj.percent + '%';
});

var chart = new F2.Chart({
  id: 'mountNode',
  pixelRatio: window.devicePixelRatio,
  padding: [20, 'auto']
});
chart.source(data, {
  percent: {
    formatter: function formatter(val) {
      return val + '%';
    }
  }
});
chart.tooltip(false);
chart.legend({
  position: 'right',
  itemFormatter: function itemFormatter(val) {
    return val + '  ' + map[val];
  }
});
chart.coord('polar', {
  transposed: true,
  innerRadius: 0.7,
  radius: 1
});
chart.axis(false);
chart.interval().position('a*percent').color('name', ['#8CEBFF', '#C5FF8C', '#FED28B', '#FFF786']).adjust('stack');

chart.guide().html({
  position: ['50%', '55%'],
  html: '<div style="width: 250px;height: 40px;text-align: center;">' + '<div style="font-size: 15px">出勤情况</div>' + '</div>'
});
chart.render();

//修改信息
let infomodifica = document.getElementsByClassName('infomodifica')[0];
let inputs = infomodifica.getElementsByTagName('input');
let circles = document.getElementsByClassName('circle');
let emailinput = document.getElementsByClassName('emailinput')[0];
let wrongtips = document.getElementsByClassName('wrongtips')[0];

for (let i = 0; i < inputs.length; i++) {
  inputs[i].addEventListener('focus', function () {
    wrongtips.innerHTML = '';
  })
}
//先请求当前用户信息
let selfinfo = {};
selfinfo.sex = 'man';
let ajaxflag = 1;
function tokenExist(dom,token){
  if(!token){
        selfinfo.id=localStorage.getItem('id');
        dom.innerHTML='非正常登陆';
        setTimeout(function(){
          window.location.href='http://localhost:8888/login.html';
        },3000);
        return;
    }
}
//通信失败
function deilefail(info){
  pageboxwrongtips.innerHTML=info;
  pageboxwrongtips.style='opacity: 1;';

  setTimeout(function(){
    pageboxwrongtips.style='opacity: 0;';
  },3000)
}
//请求会议室信息ajax
function modifyInformationAjax(emailstr) {
  const reg = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  if (inputs[1].value.length == 0) {
    wrongtips = '手机号码不能为空';
    return;
  }
  else if (!reg.test(emailstr)) {
    wrongtips.innerHTML = '邮箱格式有误';
    return;
  } else {
    selfinfo.phone = inputs[1].value;
    selfinfo.email = inputs[2].value;
    if (ajaxflag == 0) {
      wrongtips.innerHTML = '不能多次发送';
      return;
    } else {
      ajaxflag = 0;
      let token = localStorage.getItem('token'); 
      tokenExist(wrongtips,token);   
      ajax({
        url: 'http://www.shidongxuan.top/smartMeeting_Web/user/update.do',
        type: 'post',
        data: selfinfo,
        contenttype:form,
        async: true,
        token:token,
        success: function (xhr) {
          ajaxflag = 1;
          let res = JSON.parse(xhr.responseText);
          if (res.status == 0) {
            wrongtips.innerHTML = '信息修改成功√';
          } else {
            wrongtips.innerHTML = '信息修改失败请重试';
          }
        },
        fail: function (err) {
          ajaxflag = 1;
          wrongtips.innerHTML = '通信失败，请重试';
        }
      })
    }
  }
}
//保存信息修改
let savebtn = document.getElementsByClassName('savemodf')[0];
savebtn.addEventListener('click', function () {
  let mailstr = inputs[2].value;
  modifyInformationAjax(mailstr);
})
//性别选择按钮切换
let sexflag = 0;
for (let i = 0; i < circles.length; i++) {
  circles[i].addEventListener('click', function () {
    if (sexflag == i)
      return;
    circles[sexflag].children[0].className = '';
    circles[i].children[0].className = 'circleselect';
    sexflag = i;
    if (i == 0) {
      selfinfo.sex = 'man';
    } else if (i == 1) {
      selfinfo.sex = 'woman';
    }
  })
}
//信息修改页面跳转
let moreinfoicon = document.getElementsByClassName('moreinfoicon')[0];
moreinfoicon.addEventListener('click',function(){
  warp.style="display:none;";
  infomodifica.style='display:block;';
});

let selfinfomation = document.getElementById('selfinfomation');
selfinfomation.addEventListener('click',function(){
  warp.style="display:none;";
  infomodifica.style='display:block;';
})

let warp = document.getElementsByClassName('warp')[0];
let returnlastbtn = document.getElementsByClassName('returnlastpage')[0];
returnlastbtn.addEventListener('click',function(){
  warp.style="display:block;";
  infomodifica.style='display:none;';
});

//会议室使用频率排序
function ConferenceRoomSequencing(data){
  function comper(a,b){
    return b.meetingLists.length-a.meetingLists.length;
  }
  data.sort(comper);
}

let pageboxwrongtips =document.getElementsByClassName('pageboxwrongtips')[0];
//获取会议室信息
let meetingroomtop = document.getElementsByClassName('meetingroomtop')[0];
meetingroomtop.addEventListener('click',function(){
  getAllMeetingRomInfo();
});
getAllMeetingRomInfo();
function getAllMeetingRomInfo(){
  if (ajaxflag == 0) {
    pageboxwrongtips.innerHTML = '不能多次发送';
    pageboxwrongtips.style='opacity:1';
    return;
  }
  ajaxflag=0;
  let token = localStorage.getItem('token');
  tokenExist(pageboxwrongtips,token);
  
  ajax({
    url:'http://www.shidongxuan.top/smartMeeting_Web/room/getAllRooms.do',
    type:'post',
    contenttype:'urlencode',
    async: false,
    token:token,
    success: function (xhr) {
        ajaxflag=1;
        let res = JSON.parse(xhr.responseText);
        let status=['','空闲','占用','维护'];
        let color=['','#669900','#e80a0a','#EBA704'];
        if(res.status==0){
          let data=res.data;
          ConferenceRoomSequencing(data);
          let part2innerH='';
          let appointtime='';
          for(let i=0;i<data.length;i++){
            if(data[i].meetingLists.length>50)
              appointtime='少';
            else
              appointtime='多';
            part2innerH += '<div class="item"><h2>'+data[i].roomNumber+'</h2><div class="mtroomstatus" style="background-color:'+color[res.data[i].status]+'";>'+ 
            status[res.data[i].status] +'</div><div class="details"><span class="hot pic2">使用排名第'+(i+1)+
            '名</span></div><div class="details"><span class="time pic2">可预约时段较'+appointtime+'</span></div>'+
            '<div class="details"><span class="accommodate pic2">可容纳人数'+data[i].content+'人</span></div></div>';
          }
          parts[1].innerHTML=part2innerH;
        }
    },
    fail:function(){
      ajaxflag=1;
      let ajaxinfo='通信失败';
      deilefail(ajaxinfo);
    }
  })
}

let add=document.getElementsByClassName('add')[0];
let reservationbox =document.getElementsByClassName('reservationbox')[0];
let partbox = document.getElementsByClassName('partbox')[0];
add.onclick=function(){
  reservationbox.style='display:block;';
}
partbox.addEventListener('click',function(){
  reservationbox.style='display:none;';
});
//获取我正在进行或还未进行的会议
function getMyMeetingNow(){
  if (ajaxflag == 0) {
    pageboxwrongtips.innerHTML = '不能多次发送';
    return;
  }
  ajaxflag=0;
  let token = localStorage.getItem('token');
  tokenExist(pageboxwrongtips,token);
  let ID = localStorage.getItem('id');
  ajax({
    url:'http://www.shidongxuan.top/smartMeeting_Web/meeting/getUserMeetings.do',
    type:'post',
    contenttype:'urlencode',
    async: false,
    data:{userId:ID,type:1},
    token:token,
    success: function (xhr) {
      let res = JSON.parse(xhr.responseText);
      ajaxflag=1;
      if(res.status==0){
        let data=res.data;
        let part1IneerH='';
        let status=['','结束','正在进行','暂未开始'];
        let color=['','#e80a0a','#04C756','#EBA704'];
        for(let i=0;i<data.length;i++){
          part1IneerH +='<div class="item" nonce='+data[i].meetingId+'><span class="meetingtittle">'+data[i].meetingName+'</span><span class="meetingstatus" style="background-color:'+color[res.data[i].status]+'";>'+status[data[i].status]+'</span>'
          +'<div class="more "></div><div class="details"><span class="people pic1">'+data[i].peopleNum+'人</span><span class="myself pic1">'+ data[i].masterId+'</span></div>'
          +'<div class="details"><span class="adress pic1">'+data[i].roomName+'</span><span class="meettime pic1">'+countTime(data[i].endTime,data[i].startTime)+'分钟</span></div><div class="details">'
          +'<span class="sumtime pic1">'+data[i].startTime+'-'+data[i].endTime+'</span></div></div>'
        }
        parts[0].innerHTML=part1IneerH;
      }
    }
  })
}
function countTime(endTime,startTime){
  return Number.parseInt((new Date(endTime)-new Date(startTime))/1000/60);
}
let mymeetingtop = document.getElementsByClassName('mymeetingtop')[0];
mymeetingtop.addEventListener('click',function(){
  getMyMeetingNow();
})

//获取会议历史
