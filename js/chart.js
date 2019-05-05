var ajax = require('./public_Ajax.js').ajax;

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

function updateToken(msg, fun) {
    sessionStorage.removeItem('token');
    sessionStorage.setItem('token', msg);
    fun();
}
let pageboxwrongtips = document.getElementsByClassName('pageboxwrongtips')[0];
let bottoms = document.getElementsByClassName('bottombox')[0].children;
bottoms[1].addEventListener('click', function() {
    attendanceDetail();
});

let attendanceAll;
let attendanceCount;
let attenddetailtextchil = document.getElementsByClassName('statedetails');
let proportion = document.getElementById('proportion');
//第二大页出勤情况筛选

function attendanceDetail() {
    attendanceCount = [0, 0, 0, 0, 0];
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
            if (res.status == 100) {
                updateToken(res.msg, getHistoryRecord);
            } else if (res.status == 0) {
                let data = res.data;
                if (data.length == 0) {
                    deilefail(pageboxwrongtips, '暂无记录');
                    return;
                }
                attendanceAll = data.length;
                for (let i = 0; i < data.length; i++) {
                    attendanceCount[data[i].userStatus]++;
                }
                chartP();
                for (let i = 0; i < attenddetailtextchil.length; i++) {
                    attenddetailtextchil[i].setAttribute('data-text', attendanceCount[i + 1] + '次>');
                }
                proportion.innerHTML = attendanceCount[4] + '&nbsp;/&nbsp;' + attendanceAll;
                attendanceDetailFill(data);
            }
        },
        fail: function() {
            deilefail(pageboxwrongtips, '通信失败');
        }
    })
}
//环形图
function chartP() { 
    let width = document.body.clientWidth;
    let mountNode = document.getElementById('mountNode');
    mountNode.style = 'width:' + width + 'px;' + 'height:' + (width / 3 * 2) + 'px';
    var data = [{
        name: '缺勤',
        percent:  parseFloat(((attendanceCount[1] / attendanceAll)* 100).toFixed(2)),
        a: '1'
    }, {
        name: '请假',
        percent:  parseFloat(((attendanceCount[2] / attendanceAll)* 100).toFixed(2)) ,
        a: '1'
    }, {
        name: '迟到',
        percent:  parseFloat(((attendanceCount[3] / attendanceAll)* 100).toFixed(2) ),
        a: '1'
    }, {
        name: '正常',
        percent:  parseFloat(((attendanceCount[4] / attendanceAll)* 100).toFixed(2) ),
        a: '1'
    }];

    var map = {};
    data.map(function(obj) {
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
}
let attendbox = document.getElementsByClassName('attendbox');

function attendanceDetailFill(data) {
    let lackinner = '';
    let askflvinner = '';
    let lateinner = '';
    let normalinner = '';

    for (let i = 0; i < data.length; i++) {
        if (data[i].userStatus == 1) {
            lackinner += '<div class="absent"><p class="charttittle">会议名称：' + data[i].meetingName + '</p><p class="chartstart">开始时间：' + data[i].startTime + '</p><p class="chartend">结束时间：' +data[i].endTime + '</p></div>';
        } else if (data[i].userStatus == 2) {
            askflvinner += '<div class="askleave"><p class="charttittle">会议名称：' + data[i].meetingName + '</p><p class="chartstart">开始时间：' + data[i].startTime + '</p><p class="chartend">结束时间：' +data[i].endTime + '</p></div>';
        } else if (data[i].userStatus == 3) {
            lateinner += '<div class="lateat"><p class="charttittle">会议名称：' + data[i].meetingName + '</p><p class="chartstart">开始时间：' + data[i].startTime + '</p><p class="chartend">结束时间：' +data[i].endTime + '</p></div>';
        } else if (data[i].userStatus == 4) {
            normalinner += '<div class="normalat"><p class="charttittle">会议名称：' + data[i].meetingName + '</p><p class="chartstart">开始时间：' + data[i].startTime + '</p><p class="chartend">结束时间：' +data[i].endTime + '</p></div>';
        }
    }
    attendbox[0].innerHTML = lackinner;
    attendbox[1].innerHTML = askflvinner;
    attendbox[2].innerHTML = lateinner;
    attendbox[3].innerHTML = normalinner;
    let anflag = 0;
    for (let i = 0; i < attenddetailtextchil.length; i++) {
        attenddetailtextchil[i].addEventListener('click', function() {
            if (anflag == 0) {
                attendbox[i].style = 'display:block;';
                anflag = 1;
                return;
            }
            attendbox[i].style = 'display:none;';
            anflag = 0;

        }, false)
    }
}