import '../style/reset.css'
import '../style/user_index.css'


require('./init.js');

var ajax = require('./public_Ajax.js').ajax;
let url = 'http://localhost:8888/';//'http://192.168.137.1:8888/'
let sexflag;
//顶部点击切换
let page1topspan = document.getElementsByClassName('page1top')[0].children;
let parts = document.getElementsByClassName('partbox')[0].children;
let modfname = document.getElementsByClassName('modfname')[0];
let circle = document.getElementsByClassName('circle');
let modfphone = document.getElementsByClassName('modfphone')[0];
let emailinput = document.getElementsByClassName('emailinput')[0];
let page3name = document.getElementById('page3name');
let page3email = document.getElementsByClassName('page3email')[0];
let page2name = document.getElementsByClassName('page2name')[0];
let modfheadpic = document.getElementsByClassName('modfheadpic')[0];
let page3headpic = document.getElementsByClassName('page3headpic')[0];
let page2headpic = document.getElementsByClassName('page2headpic')[0];
let topflag = 1;
for (let i = 0; i < parts.length; i++) {
  page1topspan[i].addEventListener('click', function () {
    if (i == topflag)
      return;
    else {
      page1topspan[topflag].classList.remove('topselect');
      page1topspan[i].classList.add('topselect');
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
function tokenExist(dom, token) {
  if (!token) {
    dom.innerHTML = '非正常登陆';
    dom.style = 'opacity: 1;';
    sessionStorage.clear();
    setTimeout(function () {
      window.location.href = url+'login.html';
    }, 3000);
    return;
  }
}

function updateToken(msg,fun){
    sessionStorage.removeItem('token');
    sessionStorage.setItem('token',msg);
    fun();
}
//通信失败
function deilefail(dom, info) {
  dom.innerHTML = info;
  dom.style = 'opacity: 1;';
  setTimeout(function () {
    dom.style = 'opacity: 0;';
  }, 3000)
}
//修改个人信息ajax
function modifyInformationAjax() {
  let emailstr = inputs[1].value;
  const reg = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  if (inputs[0].value.length == 0) {
    wrongtips.innerHTML = '手机号码不能为空';
    return;
  }
  else if (!reg.test(emailstr)) {
    wrongtips.innerHTML = '邮箱格式有误';
    return;
  } else {
    selfinfo.phone = inputs[0].value;
    selfinfo.email = inputs[1].value;
    if (ajaxflag == 0) {
      wrongtips.innerHTML = '不能多次发送';
      return;
    } else {
      ajaxflag = 0;
      let token = sessionStorage.getItem('token');
      tokenExist(wrongtips, token);
      let id = sessionStorage.getItem('id');
      selfinfo.id = id;
      ajax({
        url: 'http://www.shidongxuan.top/smartMeeting_Web/user/update.do',
        type: 'post',
        data: selfinfo,
        contenttype: 'urlencode',
        async: true,
        token: token,
        success: function (xhr) {
          ajaxflag = 1;
          let res = JSON.parse(xhr.responseText);
          if(res.status==100){
            updateToken(res.msg,modifyInformationAjax);
          }
          else if (res.status == 0) {
            wrongtips.innerHTML = '信息修改成功√';
            sessionStorage.removeItem('token');
            sessionStorage.setItem('token', res.msg);
            sessionStorage.removeItem('phone');
            sessionStorage.setItem('phone', inputs[0].value);
            fillInfo();
          } else {
            wrongtips.innerHTML = res.msg;
          }
        },
        fail: function (err) {
          ajaxflag = 1;
          deilefail(wrongtips, '通信失败，请重试')
        }
      })
    }
  }
}
//保存信息修改
let savebtn = document.getElementsByClassName('savemodf')[0];
savebtn.addEventListener('click', function () {
  modifyInformationAjax();
})

//信息修改页面跳转
let moreinfoicon = document.getElementsByClassName('moreinfoicon')[0];
moreinfoicon.addEventListener('click', function () {
  warp.style = "display:none;";
  infomodifica.style = 'display:block;';
});

let selfinfomation = document.getElementById('selfinfomation');
selfinfomation.addEventListener('click', function () {
  warp.style = "display:none;";
  infomodifica.style = 'display:block;';
})

let warp = document.getElementsByClassName('warp')[0];
let returnlastbtn = document.getElementsByClassName('returnlastpage')[0];
returnlastbtn.addEventListener('click', function () {
  warp.style = "display:block;";
  infomodifica.style = 'display:none;';
});

//会议室使用频率排序
function ConferenceRoomSequencing(data) {
  function comper(a, b) {
    return b.meetingLists.length - a.meetingLists.length;
  }
  data.sort(comper);
}

let pageboxwrongtips = document.getElementsByClassName('pageboxwrongtips')[0];
//获取会议室信息
let meetingroomtop = document.getElementsByClassName('meetingroomtop')[0];
meetingroomtop.addEventListener('click', function () {
  getAllMeetingRomInfo();
  reservation();
});
getAllMeetingRomInfo();
function getAllMeetingRomInfo() {
  if (ajaxflag == 0) {
    deilefail('不能多次发送');
    return;
  }
  ajaxflag = 0;
  let token = sessionStorage.getItem('token');
  tokenExist(pageboxwrongtips, token);
  ajax({
    url: 'http://www.shidongxuan.top/smartMeeting_Web/room/getAllRooms.do',
    type: 'post',
    contenttype: 'urlencode',
    async: false,
    token: token,
    success: function (xhr) {
      ajaxflag = 1;
      let res = JSON.parse(xhr.responseText);
      let status = ['', '空闲', '占用', '维护'];
      let color = ['', '#669900', '#FFD38D', '#CDCDCD'];
      if(res.status==100){
        updateToken(res.msg,getAllMeetingRomInfo);
      }
      else if (res.status == 0) {
        let data = res.data;
        ConferenceRoomSequencing(data);
        let part2innerH = '';
        for (let i = 0; i < data.length; i++) {
          part2innerH += '<div class="item" id='+data[i].id +'><h2>' + data[i].roomNumber + '</p><div class="mtroomstatus" style="background-color:' + color[res.data[i].status] + ';">' +
            status[res.data[i].status] + '</div><div class="details"><span class="hot pic2">使用排名第' + (i + 1) +
            '名</span></div><div class="details"></div>' +
            '<div class="details"><span class="accommodate pic2">可容纳' + data[i].content + '人</span></div><div class="reservationbtn" nonce="'+res.data[i].status+'"id='+res.data[i].status+' style="background-color:' + color[res.data[i].status] + ';">' +'预</div></div>';
        }
        parts[1].innerHTML = part2innerH;
      }
    },
    fail: function () {
      ajaxflag = 1;
      deilefail(pageboxwrongtips, '通信失败');
    }
  })
}

//会议室预定
let add = document.getElementsByClassName('add')[0];
let reservationbox = document.getElementsByClassName('reservationbox')[0];
let partbox = document.getElementsByClassName('partbox')[0];
let reservationbigbox = document.getElementsByClassName('reservationbigbox')[0];
let usertips  =document.getElementsByClassName('usertips')[0];
let determine = document.getElementsByClassName('determine')[0];
//加号
add.onclick = function () {
  reservationbox.style = 'display:block;';
  partbox.addEventListener('click', function () {
    reservationbox.style = 'display:none;';
  },{once:true});
}
//预定页面
var meetingroomid;
function reservation(){
  let part2Items = document.getElementsByClassName('part2')[0].getElementsByClassName('item');
  let reservationbtns = document.getElementsByClassName('reservationbtn');
  for(let i=0;i<reservationbtns.length;i++){
    reservationbtns[i].addEventListener('click',function(){
      if(reservationbtns[i].getAttribute("id")==1){
        reservationbigbox.style = 'display:block;';
        meetingroomid=part2Items[i].getAttribute("id");
        determine.addEventListener('click',function(){
          scheduledMeeting();
        });
      }else{
        deilefail(pageboxwrongtips, '不能预订该会议室');
        return;
      }
    }) 
  }
}
reservation();
let fork = document.getElementsByClassName('fork')[0];
fork.addEventListener('click',function(){
  reservationbigbox.style = 'display:none;';
});

function scheduledMeeting(){ 
  if (ajaxflag == 0) {
    deilefail(wrongtips,'不能多次发送');
    return;
  }
  ajaxflag = 0;
  let token = sessionStorage.getItem('token');
  tokenExist(pageboxwrongtips, token);
  let ID = sessionStorage.getItem('id');

  let scheduledInputs=reservationbigbox.getElementsByTagName('input');
  let meetinginfo={};
  meetinginfo.roomId=meetingroomid;
  meetinginfo.meetingName=scheduledInputs[0].value;
  meetinginfo.meetingIntro=scheduledInputs[1].value;
  meetinginfo.masterId=ID;
  meetinginfo.startTime=scheduledInputs[2].value;
  meetinginfo.endTime=scheduledInputs[3].value;
  ajax({
    url:'http://www.shidongxuan.top/smartMeeting_Web/meeting/whetherBook.do',
    type: 'post',
    contenttype: 'urlencode',
    async: false,
    data:{roomId:meetinginfo.roomId,startTime: meetinginfo.startTime,endTime:meetinginfo.endTime},
    token: token,
    success: function (xhr) {
      let res = JSON.parse(xhr.responseText);
      ajaxflag = 1;
      if(res.status==100){
        updateToken(res.msg,scheduledMeeting);
      }
      else if (res.status == 0) {
        scheduled();
      }else{
        deilefail(usertips, res.msg);
      }
    }
  });
  function scheduled(){
    ajax({
      url: 'http://www.shidongxuan.top/smartMeeting_Web/meeting/bookMeeting.do',
      type: 'post',
      contenttype: 'urlencode',
      async: false,
      data: meetinginfo,
      token: token,
      success: function (xhr) {
        let res = JSON.parse(xhr.responseText);
        ajaxflag = 1;
        if(res.status==100){
          updateToken(res.msg,scheduled);
        }
        else if (res.status == 0) {
          deilefail(usertips, '预订成功√');
        }else{
          deilefail(usertips, '预订失败×');
        }
      },
      fail:function(){
        deilefail(usertips, '通信失败');
      }
     })
  }
}
//获取我正在进行或还未进行的会议
function getMyMeetingNow() {
  if (ajaxflag == 0) {
    deilefail(pageboxwrongtips,'不能多次发送');
    return;
  }
  ajaxflag = 0;
  let token = sessionStorage.getItem('token');
  tokenExist(pageboxwrongtips, token);
  let ID = sessionStorage.getItem('id');
  ajax({
    url: 'http://www.shidongxuan.top/smartMeeting_Web/meeting/getUserMeetings.do',
    type: 'post',
    contenttype: 'urlencode',
    async: false,
    data: { userId: ID, type: 1 },
    token: token,
    success: function (xhr) {
      let res = JSON.parse(xhr.responseText);
      ajaxflag = 1;
      if(res.status==100){
        updateToken(res.msg,getMyMeetingNow);
      }
      else if (res.status == 0) {
        let data = res.data;
        if (data.length == 0) {
          deilefail(pageboxwrongtips, '暂无记录');
          return;
        }
        let part1IneerH = '';
        let status = ['', '结束', '正在进行', '暂未开始'];
        let color = ['', '#e80a0a', '#04C756', '#EBA704'];
        for (let i = 0; i < data.length; i++) {
          part1IneerH += '<div class="item" nonce=' + data[i].meetingId + '><span class="meetingtittle">' + data[i].meetingName + '</span><span class="meetingstatus" style="background-color:' + color[res.data[i].status] + '";>' + status[data[i].status] + '</span>'
            + '<div class="more "></div><div class="details"><span class="people pic1">' + data[i].peopleNum + '人</span><span class="myself pic1">' + data[i].masterName + '</span></div>'
            + '<div class="details"><span class="adress pic1">' + data[i].roomName + '</span><span class="meettime pic1">' + countTime(data[i].endTime, data[i].startTime) + '分钟</span></div><div class="details">'
            + '<span class="sumtime pic1">' + data[i].startTime + '-' + data[i].endTime + '</span></div></div>'
        }
        parts[0].innerHTML = part1IneerH;
      }
    },
    fail: function () {
      ajaxflag = 1
      deilefail(pageboxwrongtips, '通信失败');
    }
  })
}
function countTime(endTime, startTime) {
  return Number.parseInt((new Date(endTime) - new Date(startTime)) / 1000 / 60);
}
let mymeetingtop = document.getElementsByClassName('mymeetingtop')[0];
mymeetingtop.addEventListener('click', function () {
  getMyMeetingNow();
  willMeeting();
})

//获取会议历史
function getHistoryRecord() {
  if (ajaxflag == 0) {
    deilefail('不能多次发送');
    return;
  }
  ajaxflag = 0;
  let token = sessionStorage.getItem('token');
  tokenExist(pageboxwrongtips, token);
  let ID = sessionStorage.getItem('id');
  ajax({
    url: 'http://www.shidongxuan.top/smartMeeting_Web/meeting/getUserMeetings.do',
    type: 'post',
    contenttype: 'urlencode',
    async: false,
    data: { userId: ID, type: 2 },
    token: token,
    success: function (xhr) {
      let res = JSON.parse(xhr.responseText);
      ajaxflag = 1;
      if(res.status==100){
        updateToken(res.msg,getHistoryRecord);
      }
      else if (res.status == 0) {
        let data = res.data;
        if (data.length == 0) {
          deilefail(pageboxwrongtips, '暂无记录');
          return;
        }
        let part3IneerH = '';
        let part3role = ['', '组织者', '参与者'];
        let attendance = ['', '缺勤', '请假', '迟到', '正常'];
        let color = ['', '#EBA704', '#04C756'];
        let rolestatus = 2;
        for (let i = 0; i < data.length; i++) {
          if (ID == data[i].masterId)
            rolestatus = 1;
          part3IneerH += '<div class="item" nonce=' + data[i].meetingId + '><span style="display:line-block; font-size:0.28rem;">' + data[i].meetingName + '</span><span class="mtrole" style="background-color:' + color[rolestatus] + '">' + part3role[rolestatus] + '</span>' +
            '<div class="details"><span class="people pic3">' + data[i].peopleNum + '人</span><span class="take pic3">' + attendance[data[i].userStatus] + '</span></div><div class="details">' +
            '<span class="adress pic3">' + data[i].roomName + '</span><span class="meettime pic3">' + countTime(data[i].endTime, data[i].startTime) + '分钟</span></div><div class="details">' +
            '<span class="myself pic3">' + data[i].masterName + '</span><span class="today pic3">' + data[i].endTime.substr(0, 10) + '</span></div><div class="details">' +
            '<span class="sumtime pic3">' + data[i].startTime + '-' + data[i].endTime + '</span></div><div class="details"><span class="summary pic3">' + data[i].meetingIntro + '</span></div></div>'
        }
        parts[2].innerHTML = part3IneerH;
      }
    },
    fail: function () {
      ajaxflag = 1
      deilefail(pageboxwrongtips, '通信失败');
    }
  })
}
const historytop = document.getElementsByClassName('historytop')[0];
historytop.addEventListener('click', function () {
  getHistoryRecord();
})
let userInfo = {};
//根据手机号获取用户信息
function getSelfInfoByphoneNum() {
  if (ajaxflag == 0) {
    deilefail('不能多次发送');
    return;
  }
  ajaxflag = 0;
  let token = sessionStorage.getItem('token');
  tokenExist(pageboxwrongtips, token);
  let phone = sessionStorage.getItem('phone');
  ajax({
    url: 'http://www.shidongxuan.top/smartMeeting_Web/user/getOneByPhone.do',
    type: 'post',
    contenttype: 'urlencode',
    async: false,
    data: { phone: phone },
    token: token,
    success: function (xhr) {
      let res = JSON.parse(xhr.responseText);
      ajaxflag = 1;
      if(res.status==100){
        updateToken(res.msg,getSelfInfoByphoneNum);
      }
      else if (res.status == 0) {
        userInfo = res.data;
      }
    },
    fail: function () {
      ajaxflag = 1;
      deilefail(pageboxwrongtips, '通信失败');
    }
  })
}
getSelfInfoByphoneNum();
//第二页信息获取
let year = document.getElementsByClassName('year')[0];
year.innerHTML = new Date().getFullYear() + '年';

function fillInfo() {
  getSelfInfoByphoneNum();

  modfname.innerHTML = userInfo.username;
  page2name.innerHTML = userInfo.username;
  page3name.innerHTML = userInfo.username;

  page3email.innerHTML = '邮箱：' + userInfo.email;
  emailinput.value = userInfo.email;
  modfphone.value = userInfo.phone;
  modfheadpic.style = page3headpic.style = page2headpic.style = 'background-image:url(' + userInfo.avatarUrl + ')';
  if (userInfo.sex == 'man') {
    circle[0].getElementsByTagName('span')[0].className = 'circleselect';
    sexflag = 0;
  } else {
    circle[1].getElementsByTagName('span')[0].className = 'circleselect';
    sexflag = 1;
  }
}
fillInfo();
//性别选择按钮切换
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
bottoms[0].addEventListener('click', function () {
  getAllMeetingRomInfo();
  reservation();
});

//即将开的会议的详细信息
function willMeeting(){
  let part1Items = document.getElementsByClassName('part1')[0].children;
  let meetingdetailspage = document.getElementsByClassName('meetingdetailspage')[0];
  for(let i=0;i<part1Items.length;i++){
    part1Items[i].addEventListener('click',function(){
      meetingdetailspage.style='display:block';
    })
  }
}
//会议详细信息
let metdetilsreturn = document.getElementsByClassName('metdetilsreturn')[0];
let meetingdetailspage = document.getElementsByClassName('meetingdetailspage')[0];
metdetilsreturn.addEventListener('click',function(){
  meetingdetailspage.style='display:none';
});
