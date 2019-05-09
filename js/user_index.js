import '../style/reset.css'
import '../style/user_index.css'


require('./init.js');
window.onload = function() {
    require('./chart.js');
}
window.addEventListener(
    "touchmove",
    function (event) {
      if (event.touches.length > 1) {
        event.preventDefault();
    }
    },
    { passive: false }
  );

var ajax = require('./public_Ajax.js').ajax;
var ajax2 = require('./public_Ajax.js').ajax2;
let url = 'http://www.shidongxuan.top/pages/'; //'http://192.168.137.1:8888/'
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
    page1topspan[i].addEventListener('click', function() {
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
    bottoms[i].addEventListener('click', function() {
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
let loading = document.getElementsByClassName('la-ball-clip-rotate-multiple')[0];
function setloading(){
    loading.style='display:block;'
}
function removeloading(){
    loading.style='display:none';
}
//修改信息
let infomodifica = document.getElementsByClassName('infomodifica')[0];
let inputs = infomodifica.getElementsByTagName('input');
let circles = document.getElementsByClassName('circle');
let wrongtips = document.getElementsByClassName('wrongtips')[0];

for (let i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener('focus', function() {
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
        setTimeout(function() {
            window.location.href = url + 'login.html';
        }, 3000);
        return;
    }
}

function updateToken(msg, fun,arg=undefined) {
    sessionStorage.removeItem('token');
    sessionStorage.setItem('token', msg);
    if(arg===undefined){
        fun();
        return;
    }else{
        fun(arg);
    }
    
}
//通信失败
function deilefail(dom, info) {
    dom.innerHTML = info;
    dom.style = 'opacity: 1;';
    setTimeout(function() {
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
    } else if (!reg.test(emailstr)) {
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
                success: function(xhr) {
                    ajaxflag = 1;
                    let res = JSON.parse(xhr.responseText);
                    if (res.status == 100) {
                        updateToken(res.msg, modifyInformationAjax);
                    } else if (res.status == 0) {
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
                fail: function(err) {
                    ajaxflag = 1;
                    deilefail(wrongtips, '通信失败，请重试')
                }
            })
        }
    }
}
//保存信息修改
let savebtn = document.getElementsByClassName('savemodf')[0];
savebtn.addEventListener('click', function() {
    modifyInformationAjax();
})

//信息修改页面跳转
let moreinfoicon = document.getElementsByClassName('moreinfoicon')[0];
moreinfoicon.addEventListener('click', function() {
    warp.style = "display:none;";
    infomodifica.style = 'display:block;';
});

let selfinfomation = document.getElementById('selfinfomation');
selfinfomation.addEventListener('click', function() {
    warp.style = "display:none;";
    infomodifica.style = 'display:block;';
})

let warp = document.getElementsByClassName('warp')[0];
let returnlastbtn = document.getElementsByClassName('returnlastpage')[0];
returnlastbtn.addEventListener('click', function() {
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
meetingroomtop.addEventListener('click', function() {
    getAllMeetingRomInfo();
    reservation();
});
getAllMeetingRomInfo();

function getAllMeetingRomInfo() {
    if (ajaxflag == 0) {
        return;
    }
    setloading();
    ajaxflag = 0;
    let token = sessionStorage.getItem('token');
    tokenExist(pageboxwrongtips, token);
    ajax({
        url: 'http://www.shidongxuan.top/smartMeeting_Web/room/getAllRooms.do',
        type: 'post',
        contenttype: 'urlencode',
        async: true,
        token: token,
        success: function(xhr) {
            ajaxflag = 1;
            let res = JSON.parse(xhr.responseText);
            let status = ['', '空闲', '占用', '维护'];
            let color = ['', '#669900', '#FFD38D', '#CDCDCD'];
            if (res.status == 100) {
                updateToken(res.msg, getAllMeetingRomInfo);
            } else if (res.status == 0) {
                let data = res.data;
                ConferenceRoomSequencing(data);
                let part2innerH = '';
                for (let i = 0; i < data.length; i++) {
                    part2innerH += '<div class="item" id=' + data[i].id + '><h2>' + data[i].roomNumber + '</p><div class="mtroomstatus" style="background-color:' + color[res.data[i].status] + ';">' +
                        status[res.data[i].status] + '</div><div class="details"><span class="hot pic2">使用排名第' + (i + 1) +
                        '名</span></div><div class="details"></div>' +
                        '<div class="details"><span class="accommodate pic2">可容纳' + data[i].content + '人</span></div><div class="reservationbtn" data-id="' + res.data[i].status + '"id=' + res.data[i].status + ' style="background-color:' + color[res.data[i].status] + ';">' + '预</div></div>';
                }
                parts[1].innerHTML = part2innerH;
                removeloading();
                reservation();
            }
        },
        fail: function() {
            removeloading();
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
let usertips = document.getElementsByClassName('usertips')[0];
let determine = document.getElementsByClassName('determine')[0];
//加号
add.onclick = function() {
        reservationbox.style = 'display:block;';
        partbox.addEventListener('click', function() {
            reservationbox.style = 'display:none;';
        }, { once: true });
    }
    //预定页面
var meetingroomid;

function reservation() {
    let part2Items = document.getElementsByClassName('part2')[0].getElementsByClassName('item');
    let reservationbtns = document.getElementsByClassName('reservationbtn');
    for (let i = 0; i < reservationbtns.length; i++) {
        reservationbtns[i].addEventListener('click', function() {
            let okid = reservationbtns[i].getAttribute("id");
            if (okid== 1||okid == 2) {
                reservationbigbox.style = 'display:block;';
                meetingroomid = part2Items[i].getAttribute("id");
                determine.addEventListener('click', function() {
                    scheduledMeeting();
                });
            } else {
                deilefail(pageboxwrongtips, '不能预订该会议室');
                return;
            }
        })
    }
}

let fork = document.getElementsByClassName('fork')[0];
let scheduledInputs = reservationbigbox.getElementsByTagName('input');
fork.addEventListener('click', function() {
    reservationbigbox.style = 'display:none;';
    for (let i = 0; i < scheduledInputs.length; i++)
        scheduledInputs[i].value = '';

});

function scheduledMeeting() {
    if (ajaxflag == 0) {
        deilefail(wrongtips, '不能多次发送');
        return;
    }
    ajaxflag = 0;
    let token = sessionStorage.getItem('token');
    tokenExist(pageboxwrongtips, token);
    let ID = sessionStorage.getItem('id');
    let meetinginfo = {};
    meetinginfo.roomId = meetingroomid;
    meetinginfo.meetingName = scheduledInputs[0].value;
    meetinginfo.meetingIntro = scheduledInputs[1].value;
    meetinginfo.masterId = ID;
    meetinginfo.startTime = scheduledInputs[2].value.replace(/-/g, '/');
    meetinginfo.endTime = scheduledInputs[3].value.replace(/-/g, '/');
    if (meetinginfo.startTime >= meetinginfo.endTime) {
        deilefail(usertips, '时间格式不正确');
        return;
    }
    ajax({
        url: 'http://www.shidongxuan.top/smartMeeting_Web/meeting/whetherBook.do',
        type: 'post',
        contenttype: 'urlencode',
        async: true,
        data: { roomId: meetinginfo.roomId, startTime: meetinginfo.startTime, endTime: meetinginfo.endTime },
        token: token,
        success: function(xhr) {
            let res = JSON.parse(xhr.responseText);
            ajaxflag = 1;
            if (res.status == 100) {
                updateToken(res.msg, scheduledMeeting);
            } else if (res.status == 0) {
                scheduled();
            } else {
                deilefail(usertips, res.msg);
            }
        }
    });

    function scheduled() {
        ajax({
            url: 'http://www.shidongxuan.top/smartMeeting_Web/meeting/bookMeeting.do',
            type: 'post',
            contenttype: 'urlencode',
            async: true,
            data: meetinginfo,
            token: token,
            success: function(xhr) {
                let res = JSON.parse(xhr.responseText);
                ajaxflag = 1;
                if (res.status == 100) {
                    updateToken(res.msg, scheduled);
                } else if (res.status == 0) {
                    deilefail(usertips, '预订成功√');
                } else {
                    deilefail(usertips, '预订失败×');
                }
            },
            fail: function() {
                deilefail(usertips, '通信失败');
            }
        })
    }
}
//获取我正在进行或还未进行的会议
function getMyMeetingNow() {
    if (ajaxflag == 0) {
        return;
    }
    setloading();
    ajaxflag = 0;
    let token = sessionStorage.getItem('token');
    tokenExist(pageboxwrongtips, token);
    let ID = sessionStorage.getItem('id');
    ajax({
        url: 'http://www.shidongxuan.top/smartMeeting_Web/meeting/getUserMeetings.do',
        type: 'post',
        contenttype: 'urlencode',
        async: true,
        data: { userId: ID, type: 1 },
        token: token,
        success: function(xhr) {
            let res = JSON.parse(xhr.responseText);
            ajaxflag = 1;
            if (res.status == 100) {
                updateToken(res.msg, getMyMeetingNow);
                removeloading();
            } else if (res.status == 0) {
                let data = res.data;
                if (data.length == 0) {
                    deilefail(pageboxwrongtips, '暂无记录');
                    return;
                }
                let part1IneerH = '';
                let status = ['', '结束', '正在进行', '暂未开始'];
                let color = ['', '#e80a0a', '#04C756', '#EBA704'];
                for (let i = 0; i < data.length; i++) {
                    part1IneerH += '<div class="item" data-id=' + data[i].meetingId + '><span class="meetingtittle">' + data[i].meetingName + '</span><span class="meetingstatus" style="background-color:' + color[res.data[i].status] + '";>' + status[data[i].status] + '</span>' +
                        '<div class="more"></div><ul class="userselect" style="display:none"><li class="askforleave">请假</li><li class="lookmore">查看详情</li></ul><div class="details"><span class="people pic1">' + data[i].peopleNum + '人</span><span class="myself pic1">' + data[i].masterName + '</span></div>' +
                        '<div class="details"><span class="adress pic1">' + data[i].roomName + '</span><span class="meettime pic1">' + countTime(data[i].endTime, data[i].startTime) + '分钟</span></div><div class="details">' +
                        '<span class="sumtime pic1">' + data[i].startTime + '-' + data[i].endTime + '</span></div></div>'
                }
                parts[0].innerHTML = part1IneerH;
                removeloading();
                clickMore();
                willMeeting();
            }
        },
        fail: function() {
            ajaxflag = 1
            deilefail(pageboxwrongtips, '通信失败');
        }
    })
}
function createData(timeString){
    var arr = timeString.split(/[- :]/)
    var s = new Date();
    s.setFullYear(arr[0]);
    s.setMonth(arr[1]);
    s.setDate(arr[2]);
    s.setHours(arr[3]);
    s.setMinutes(arr[4]);
    s.setSeconds(arr[5]);
    return s;
}

function countTime(endTime, startTime) {
    return Number.parseInt((Number.parseInt(createData(endTime)/ 1000) - Number.parseInt(createData(startTime)/ 1000))  / 60);
}
let mymeetingtop = document.getElementsByClassName('mymeetingtop')[0];
mymeetingtop.addEventListener('click', function() {
    getMyMeetingNow();
})
const attendance = ['', '正常','缺勤', '迟到','请假'];
//获取会议历史
function getHistoryRecord() {
    if (ajaxflag == 0) {
        return;
    }
    setloading();
    ajaxflag = 0;
    let token = sessionStorage.getItem('token');
    tokenExist(pageboxwrongtips, token);
    let ID = sessionStorage.getItem('id');
    ajax({
        url: 'http://www.shidongxuan.top/smartMeeting_Web/meeting/getUserMeetings.do',
        type: 'post',
        contenttype: 'urlencode',
        async: true,
        data: { userId: ID, type: 2 },
        token: token,
        success: function(xhr) {
            let res = JSON.parse(xhr.responseText);
            ajaxflag = 1;
            if (res.status == 100) {
                updateToken(res.msg, getHistoryRecord);
                removeloading();
            } else if (res.status == 0) {
                let data = res.data;
                if (data .length == 0) {
                    deilefail(pageboxwrongtips, '暂无记录');
                    return;
                }
                let part3IneerH = '';
                let part3role = ['', '组织者', '参与者'];
                let color = ['', '#EBA704', '#04C756'];
                let rolestatus;
                for (let i = 0; i < data.length; i++) {
                    rolestatus = 2;
                    if (ID == data[i].masterId)
                        rolestatus = 1;
                    part3IneerH += '<div class="item" data-id=' + data[i].meetingId + '><span style="display:line-block; font-size:0.28rem;">' + data[i].meetingName + '</span><span class="mtrole" style="background-color:' + color[rolestatus] + '">' + part3role[rolestatus] + '</span>' +
                        '<div class="details"><span class="people pic3">' + data[i].peopleNum + '人</span><span class="take pic3">' + attendance[data[i].userStatus] + '</span></div><div class="details">' +
                        '<span class="adress pic3">' + data[i].roomName + '</span><span class="meettime pic3">' + countTime(data[i].endTime, data[i].startTime) + '分钟</span></div><div class="details">' +
                        '<span class="myself pic3">' + data[i].masterName + '</span><span class="today pic3">' + data[i].endTime.substr(0, 10) + '</span></div><div class="details">' +
                        '<span class="sumtime pic3">' + data[i].startTime + '-' + data[i].endTime + '</span></div><div class="details"><span class="summary pic3">' + data[i].meetingIntro + '</span></div></div>'
                }
                parts[2].innerHTML = part3IneerH;
                removeloading();
                hisotyMeetDetils();
            }
        },
        fail: function() {
            ajaxflag = 1;
            removeloading();
            deilefail(pageboxwrongtips, '通信失败');
        }
    })
}
const historytop = document.getElementsByClassName('historytop')[0];
historytop.addEventListener('click', function() {
    getHistoryRecord();
})
let userInfo = {};
//根据手机号获取用户信息
function getSelfInfoByphoneNum() {
    let token = sessionStorage.getItem('token');
    tokenExist(pageboxwrongtips, token);
    let phone = sessionStorage.getItem('phone');
    ajax({
        url: 'http://www.shidongxuan.top/smartMeeting_Web/user/getOneByPhone.do',
        type: 'post',
        contenttype: 'urlencode',
        async: true,
        data: { phone: phone },
        token: token,
        success: function(xhr) {
            let res = JSON.parse(xhr.responseText);
            if (res.status == 0) {
                userInfo = res.data;
                fillInfo();
            } else if (res.status == 100) {
                updateToken(res.msg, getSelfInfoByphoneNum);
            }
        },
        fail: function() {
            deilefail(pageboxwrongtips, '通信失败');
        }
    })
}
getSelfInfoByphoneNum();
//第二页信息获取
let year = document.getElementsByClassName('year')[0];
year.innerHTML = new Date().getFullYear() + '年';
//填入个人信息
function fillInfo() {
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

//性别选择按钮切换
for (let i = 0; i < circles.length; i++) {
    circles[i].addEventListener('click', function() {
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
bottoms[0].addEventListener('click', function() {
    getAllMeetingRomInfo();
    reservation();
});

let meetingstarttime = document.getElementsByClassName('meetingstarttime')[0];
let meetingendtime = document.getElementsByClassName('meetingendtime')[0];
let meetingadress = document.getElementsByClassName('meetingadress')[0];
let introductioncontext = document.getElementsByClassName('introductioncontext')[0];
let peoplelist = document.getElementsByClassName('peoplelist')[0];
let meetingdetilname = document.getElementsByClassName('meetingdetilname')[0];
let attendancepeosum = document.getElementsByClassName('attendancepeosum')[0];

//会议详细信息
let metdetilsreturn = document.getElementsByClassName('metdetilsreturn')[0];
let meetingdetailspage = document.getElementsByClassName('meetingdetailspage')[0];
metdetilsreturn.addEventListener('click', function() {
    meetingdetailspage.style = 'display:none';
   /*  partsmask.style='display:none';  */
});
let clickflag;
let partsmask = document.getElementsByClassName('partsmask')[0];
partsmask.addEventListener('click',function(){
    partsmask.style='display:none';
    userselects[clickflag].style='display:none';
})
//请假或查看详细信息
let userselects;
function clickMore(){
    let mores = document.getElementsByClassName('more');
    userselects=document.getElementsByClassName('userselect');
    for(let i=0;i<mores.length;i++){
        mores[i].addEventListener('click',function(){
            userselects[i].style='display:block';
            partsmask.style='display:block';
            clickflag=i;
        })
    }
}



let meetingId;
let meetingPeoplealr;
let masterID;
let meetingnowstatus=document.getElementsByClassName('meetingnowstatus')[0];
//即将开的会议的详细信息
function willMeeting() {
    let part1Items = document.getElementsByClassName('part1')[0].children;
    let lookmores = document.getElementsByClassName('lookmore');
    let meetingdetailspage = document.getElementsByClassName('meetingdetailspage')[0];
    let meetingdetails;
    for (let i = 0; i < lookmores.length; i++) {
        lookmores[i].addEventListener('click', function() {
            meetingPeoplealr=[];
            peoplelist.innerHTML = '';
            meetingdetailspage.style = 'display:block';
            partsmask.style='display:none;';
            userselects[i].style='display:none';
            meetingId = part1Items[i].attributes.getNamedItem("data-id").nodeValue;//更新meetingID
            let token = sessionStorage.getItem('token');
            tokenExist(pageboxwrongtips, token);
            setloading();
            ajax({
                url: 'http://www.shidongxuan.top/smartMeeting_Web/meeting/getMeetingById.do',
                type: 'post',
                contenttype: 'urlencode',
                async: true,
                data: { meetingId: meetingId },
                token: token,
                success: function(xhr) {
                    let res = JSON.parse(xhr.responseText);
                    if (res.status == 0) {
                        meetingdetails = res.data;
                        meetingdetilname.innerHTML = meetingdetails.meetingName;
                        attendancepeosum.innerHTML = meetingdetails.memberStatus.length + '人';
                        meetingstarttime.innerHTML = '开始时间：' + meetingdetails.startTime;
                        meetingendtime.innerHTML = '结束时间：' + meetingdetails.endTime;
                        meetingadress.innerHTML = '会议地点：' + meetingdetails.roomName;
                        if(res.data.status==2)
                            meetingnowstatus.innerHTML='正在进行';
                        introductioncontext.innerHTML = meetingdetails.meetingIntro;
                        masterID=meetingdetails.masterId;
                        peoplelist.innerHTML = '<p> ' + meetingdetails.masterName + '&nbsp;&nbsp;(组织者)</p> <span class="peoplestatus"></span>';
                        for (let i = 0; i < meetingdetails.memberStatus.length; i++) {
                            if (meetingdetails.masterId != meetingdetails.memberStatus[i].userId)  
                               peoplelist.innerHTML += '<p> ' + meetingdetails.memberStatus[i].username + '</p>';
                            let {userId:userId,username:username}=meetingdetails.memberStatus[i];
                            let obj={
                                userId:userId,
                                username:username
                            }
                            meetingPeoplealr.push(obj);
                            lookAllPeopleStatus(meetingId);
                        }
                    } else if (res.status == 100) {
                        updateToken(res.msg, willMeeting);
                    }
                    removeloading();
                },
                fail: function() {
                    removeloading();
                    deilefail(pageboxwrongtips, '通信失败');
                }
            });
        })

    }
    let askforleaveWill = document.getElementsByClassName('askforleave');
    let leaveID;
    let id = sessionStorage.getItem('id');
    for(let i=0;i<askforleaveWill.length;i++){
        askforleaveWill[i].addEventListener('click',function(){
            leaveID=part1Items[i].attributes.getNamedItem("data-id").nodeValue;
            partsmask.style='display:none;';
            let token = sessionStorage.getItem('token');
            tokenExist(pageboxwrongtips, token);
            setloading();
            ajax({
                url:'http://www.shidongxuan.top/smartMeeting_Web/user/applyLeave.do',
                type:'post',
                contenttype: 'urlencode',
                async:true,
                data:{userId:id,meetingId:leaveID},
                token:token,
                success:function(xhr){
                    let res = JSON.parse(xhr.responseText);
                    if (res.status == 0) {
                        userselects[i].style='display:none';
                        partsmask.style='display:none';
                        deilefail(pageboxwrongtips,'请假成功');
                    }else if (res.status == 100) {
                        updateToken(res.msg, willMeeting);
                    }
                    removeloading();
                },
                fail: function() {
                    removeloading();
                    deilefail(pageboxwrongtips, '通信失败');
                }
            })
        });
    }
}

function updatePeopleList(){
    let meetingdetails;
    meetingPeoplealr=[];
    peoplelist.innerHTML = '';
    meetingdetailspage.style = 'display:block';
    let token = sessionStorage.getItem('token');
    tokenExist(pageboxwrongtips, token);
    ajax({
        url: 'http://www.shidongxuan.top/smartMeeting_Web/meeting/getMeetingById.do',
        type: 'post',
        contenttype: 'urlencode',
        async: true,
        data: { meetingId:  meetingId},
        token: token,
        success: function(xhr) {
            let res = JSON.parse(xhr.responseText);
            if (res.status == 0) {
                meetingdetails = res.data;
                meetingdetilname.innerHTML = meetingdetails.meetingName;
                attendancepeosum.innerHTML = meetingdetails.memberStatus.length + '人';
                meetingstarttime.innerHTML = '开始时间：' + meetingdetails.startTime;
                meetingendtime.innerHTML = '结束时间：' + meetingdetails.endTime;
                meetingadress.innerHTML = '会议地点：' + meetingdetails.roomName;
                introductioncontext.innerHTML = meetingdetails.meetingIntro;
                masterID=meetingdetails.masterId;
                peoplelist.innerHTML = '<p> ' + meetingdetails.masterName + '&nbsp;&nbsp;(组织者)</p><span class="peoplestatus"></span>';
                for (let i = 0; i < meetingdetails.memberStatus.length; i++) {
                    if (meetingdetails.masterId != meetingdetails.memberStatus[i].userId)  
                       peoplelist.innerHTML += '<p> ' + meetingdetails.memberStatus[i].username + '</p>';
                    let {userId:userId,username:username}=meetingdetails.memberStatus[i];
                    let obj={
                        userId:userId,
                        username:username
                    }
                    meetingPeoplealr.push(obj);
                }
                lookAllPeopleStatus(meetingId);
            } else if (res.status == 100) {
                updateToken(res.msg, updatePeopleList);
            }
        },
        fail: function() {
            deilefail(pageboxwrongtips, '通信失败');
        }
    });
}

let peopleSelectList = document.getElementsByClassName('peopleSelectList')[0];
let allPeople;
//请求所有人
function getAllPeople(){
    allPeople=new Map();
    setloading();
    let token = sessionStorage.getItem('token');
            tokenExist(pageboxwrongtips, token);
            ajax({
                url: "http://www.shidongxuan.top/smartMeeting_Web/user/getAll.do", 
                type: 'post',   
                contenttype:'urlencode',
                token:token,
                data: null, 
                async: true,   //是否异步
                success: function (xhr) {
                    let res = JSON.parse(xhr.responseText);
                    if (res.status == 0) {
                        for(let i=0;i<res.data.length;i++){
                            let {id:id,username:username}=res.data[i];
                            let obj={
                                id:id,
                                username:username,
                                add:false
                            }
                            allPeople.set(id,obj);
                            
                        }  
                        for(let i=0;i<meetingPeoplealr.length;i++){ 
                            allPeople.get(meetingPeoplealr[i].userId).add=true;
                        }
                        let peopleSelectListinner='';
                        for (let key of allPeople.keys()) {
                            if(allPeople.get(key).add===false){
                                peopleSelectListinner+='<label class="onepeople"><p class="peopleName">'+allPeople.get(key).username+'</p><input data-id="'+allPeople.get(key).id+'" type="checkbox" class="checkbox"></label>'
                            }else{
                                peopleSelectListinner+='<label class="onepeople"><p class="peopleName">'+allPeople.get(key).username+'</p><input data-id="'+allPeople.get(key).id+'" type="checkbox" class="checkbox" disabled="false" checked="true"></label>'
                            }
                        }
                        peopleSelectList.innerHTML=peopleSelectListinner;

                    }else if (res.status == 100) {
                        updateToken(res.msg, getAllPeople);
                    }
                    removeloading();
                },
                fail: function (err) {
                    removeloading();
                    deilefail(pageboxwrongtips, '通信失败');
                }
            })
}
//添加会议成员
let addPeoplbox = document.getElementsByClassName('addPeoplbox')[0];
let addpeople = document.getElementsByClassName('addpeople')[0]; //添加成员按钮
addpeople.addEventListener('click', function() {
    if(userInfo.id==masterID){
        addPeoplbox.style='display:flex;';
        getAllPeople();
    }else{
        deilefail(pageboxwrongtips, '非组织者无权限');
        return;
    }
})
let selectOk = document.getElementsByClassName('selectOk')[0];
selectOk.addEventListener('click',function(){
    addPeopleToMeet(meetingId);
})
//提交选择人员
function addPeopleToMeet(meetingId){
    let peopleAdd;
    let idsList=[];
    let checkboxs = document.getElementsByClassName('checkbox');
    let count=0;
    for(let i=0;i<checkboxs.length;i++){
        if(checkboxs[i].checked&&!checkboxs[i].disabled){
            if(count==0){
                peopleAdd='userIds='+checkboxs[i].attributes.getNamedItem("data-id").nodeValue;
                idsList.push(checkboxs[i].attributes.getNamedItem("data-id").nodeValue);
                count=1;
                continue;
            }
            peopleAdd+=','+checkboxs[i].attributes.getNamedItem("data-id").nodeValue;
            idsList.push(checkboxs[i].attributes.getNamedItem("data-id").nodeValue);
        }
        
    }
    peopleAdd+='&meetingId='+meetingId;
    let token = sessionStorage.getItem('token');
    tokenExist(pageboxwrongtips, token);
    let newid = arguments[0];
    //发送与会人员
    ajax2({
        url: "http://www.shidongxuan.top/smartMeeting_Web/meeting/inviteMembers.do", 
        type: 'post',   //请求方式
        contenttype:'urlencode',
        token:token,
        data:peopleAdd , //请求json参数
        async: true,   //是否异步
        success: function (xhr) {
            let res = JSON.parse(xhr.responseText);
            if (res.status == 0) {
                deilefail(pageboxwrongtips, '添加成功');
                addPeoplbox.style='display:none;';
                //添map
                for(let i=0;i<idsList.length;i++){
                    allPeople.get(Number.parseInt(idsList[i])).add=true;
                }
                //刷新列表
                updatePeopleList();
            }else if(res.status==100){
                updateToken(res.mag,addPeopleToMeet,newid);
            }
            
        },
        fail: function (err) {
            deilefail(pageboxwrongtips, '通信失败');
        }
    })
}
//添加与会人员返回健
let fork2 = document.getElementsByClassName('fork2')[0];
fork2.addEventListener('click',function(){
    addPeoplbox.style='display:none;';
});

//开始会议
let startandEnd = document.getElementsByClassName('startandEnd')[0];
let startFlag;
startandEnd.onclick=function(){
    startFlag=0;
    if(startFlag==0){
        let meetingstarttime=document.getElementsByClassName('meetingstarttime')[0].innerHTML.split('：')[1];
        meetingstarttime=meetingstarttime.replace(/-/g, '/');
        if(Number.parseInt(new Date(meetingstarttime)-new Date()/1000/60)<=10){
            startandEnd.style='background-image:url(../pic/icon_meeting_ending.png);';
            startEndMeeting(0);   
        }else{
            deilefail(pageboxwrongtips, '预约开始时间前10分钟可开始');
        }
    }
    else if(startFlag==1){
        let meetingendtime=document.getElementsByClassName('meetingendtime')[0].innerHTML.split('：')[1];
        meetingendtime=meetingendtime.replace(/-/g, '/');
        if(Number.parseInt(new Date(meetingendtime)-new Date()/1000/60)<=10){
            startandEnd.style='background-image:url(../pic/icon_meeting_start.png);';
            startEndMeeting(1);  
        }else{
            deilefail(pageboxwrongtips, '预约结束时间前10分钟可结束');
        }
    }
    
    
}
function startEndMeeting(flag){
    let token = sessionStorage.getItem('token');
    tokenExist(pageboxwrongtips, token);
    let newflag = arguments[0];
    let id = document.getElementsByClassName('meetingdetailspage')[0].id;
   let  thisreq=flag?'endMeeting':'startMeeting';
    ajax({
        url: 'http://www.shidongxuan.top/smartMeeting_Web/meeting//'+thisreq+'.do',
        type: 'post',
        contenttype: 'urlencode',
        async: true,
        data: { meetingId:id },
        token: token,
        success: function(xhr) {
            let res = JSON.parse(xhr.responseText);
            if (res.status == 0) {
                deilefail(pageboxwrongtips, res.msg);
            } else if (res.status == 100) {
                updateToken(res.msg, startEndMeeting,newflag);
            } 
            else if(res.status==1){
                deilefail(pageboxwrongtips, res.msg);
            }
        },
        fail: function() {
            deilefail(pageboxwrongtips, '通信失败');
        }
    })
}
let lookpeoplestatus = document.getElementsByClassName('lookpeoplestatus')[0];
//查看会议人员状态
let statusList = document.getElementsByClassName('statusList')[0];
function lookAllPeopleStatus(id){
    let peoplestatus = document.getElementsByClassName('peoplestatus')[0];
    peoplestatus.addEventListener('click',function(){
        setloading();
        lookpeoplestatus.style='display:flex';
        let token = sessionStorage.getItem('token');
        let newid = arguments[0];
    tokenExist(pageboxwrongtips, token);
    ajax({
        url: 'http://www.shidongxuan.top/smartMeeting_Web/meeting/getMeetingById.do',
        type: 'post',
        contenttype: 'urlencode',
        async: true,
        data: { meetingId:id },
        token: token,
        success: function(xhr) {
            let res = JSON.parse(xhr.responseText);
            if (res.status == 0) {
                let color=['','#9df0c0','#eea3a3', '#f4dca1','#faebd7'];
                let statusListinner='';
                for(let i=0;i<res.data.memberStatus.length;i++){
                    statusListinner+='<div class="onestatus"><span class="statuspic" style=" background-image:url('+res.data.memberStatus[i].avatarUrl+')"></span>'+
                    '<p class="statusname">'+res.data.memberStatus[i].username+'</p><span class="statusInner" style="background-color:'+color[res.data.memberStatus[i].userStatus]+'">'+attendance[res.data.memberStatus[i].userStatus]+'</span></div>';
                }
                statusList.innerHTML=statusListinner;
                removeloading();
            }else if(res.status==100){
                updateToken(res.msg,lookAllPeopleStatus,newid);
                removeloading();
            }
            
        },
        fail:function(){
            removeloading();
            deilefail(pageboxwrongtips, '通信失败');
        }
    })
    });
}


let fork3 = document.getElementsByClassName('fork3')[0];
fork3.addEventListener('click',function(){
    lookpeoplestatus.style='display:none';
})
//历史会议详情
function hisotyMeetDetils(){
    let part3Items = parts[2].getElementsByClassName('item');
    let hismetdetilsreturn = document.getElementsByClassName('hismetdetilsreturn')[0];
    let historymeetingbox = document.getElementsByClassName('historymeetingbox')[0];
    hismetdetilsreturn.addEventListener('click',function(){
        historymeetingbox.style='display:none';
    });
    for(let i=0;i<part3Items.length;i++){
        part3Items[i].addEventListener('click',function(){
            //获取历史会议详情
            setloading();
            let id = part3Items[i].attributes.getNamedItem("data-id").nodeValue;
            getHistoryDetails(id);
            historymeetingbox.style='display:block';
        })
    }
}

function getHistoryDetails(id){
    setloading();
    let token = sessionStorage.getItem('token');
    tokenExist(pageboxwrongtips, token);
    let newid = arguments[0];
    ajax({
        url: 'http://www.shidongxuan.top/smartMeeting_Web/meeting/getMeetingById.do',
        type: 'post',
        contenttype: 'urlencode',
        async: true,
        data: { meetingId:id },
        token: token,
        success: function(xhr) {
            let res = JSON.parse(xhr.responseText);
            if (res.status == 0) {
                let meetingName = document.getElementsByClassName('hismeetingdetilname')[0];
                meetingName.innerHTML=res.data.meetingName;
                let color=['','#04C756','#e80a0a', '#EBA704','#04d4eb'];
                let hispeodeatilsinner='';
                for(let i=0;i<res.data.memberStatus.length;i++){
                    hispeodeatilsinner+='<div class="onepeople"><span class="hisheadpic" style="background-image: url('+res.data.memberStatus[i].avatarUrl+');";></span>'+
                    '<p class="hispeople" >'+res.data.memberStatus[i].username+'</p><span class="hisstatus" style="background-color:'+color[res.data.memberStatus[i].userStatus]+'">'+attendance[res.data.memberStatus[i].userStatus]+'</span></div>'
                }
                let hispeoplelis=document.getElementsByClassName('hispeoplelist')[0];
                hispeoplelis.innerHTML=hispeodeatilsinner;
                showNotes(id,part3note)
                removeloading();
            } else if (res.status == 100) {
                updateToken(res.msg, getHistoryDetails,newid);
                removeloading();
            } 
            
        },
        fail: function() {
            removeloading();
            deilefail(pageboxwrongtips, '通信失败');
        }
    });
}

//part1会议笔记
let takenotes = document.getElementsByClassName('takenotes')[0];
let notebox = document.getElementsByClassName('notebox')[0];
document.getElementById('note').onkeyup = function() {        
    document.getElementById('text-count').innerHTML=this.value.length;
}
let notereturn= document.getElementsByClassName('notereturn')[0];
notereturn.addEventListener('click',function(){
    notebox.style='display:none;';
});
//显示笔记页面
takenotes.addEventListener('click',function(){
    showNotes(meetingId,part1note);
    notebox.style='display:block';
});
let notessave = document.getElementsByClassName('notessave')[0];
notessave.addEventListener('click',function(){
    editeUserNotes();
})
let notes = document.getElementsByClassName('notescontent')[0];
//保存笔记
function editeUserNotes(){
    let userId = sessionStorage.getItem('id');
    setloading();
    let token = sessionStorage.getItem('token');
    tokenExist(pageboxwrongtips, token);
    ajax({
        url: 'http://www.shidongxuan.top/smartMeeting_Web/meeting/editNote.do',
        type: 'post',
        contenttype: 'urlencode',
        async: true,
        data: { meetingId:meetingId,userId:userId,note:notes.value},
        token: token,
        success: function(xhr) {
            let res = JSON.parse(xhr.responseText);
            if (res.status == 0) {
                deilefail(pageboxwrongtips,'保存成功');
                removeloading();
            } else if (res.status == 100) {
                updateToken(res.msg, getHistoryDetails);
                removeloading();
            }  
        },
        fail: function() {
            removeloading();
            deilefail(pageboxwrongtips, '通信失败');
        }
    })
}
//显示笔记
function showNotes(meetingID,handle){
    let userId = sessionStorage.getItem('id');
    setloading();
    let token = sessionStorage.getItem('token');
    tokenExist(pageboxwrongtips, token);
    ajax({
        url: 'http://www.shidongxuan.top/smartMeeting_Web/meeting/getMeetingNote.do',
        type: 'post',
        contenttype: 'urlencode',
        async: true,
        data: { meetingId:meetingID,userId:userId},
        token: token,
        success: function(xhr) {
            let res = JSON.parse(xhr.responseText);
            if (res.status == 0) {
                handle(res.data);
                removeloading();
            } else if (res.status == 100) {
                updateToken(res.msg, getHistoryDetails);
                removeloading();
            }
        },
        fail: function() {
            removeloading();
            deilefail(pageboxwrongtips, '通信失败');
        }
    })
}
function part1note(note){
    notes.value=note;
}
let notesdetails = document.getElementsByClassName('notesdetails')[0];
function part3note(note){
    if(note=='')
     return;
    notesdetails.innerHTML=note;
}