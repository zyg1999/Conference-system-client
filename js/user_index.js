import '../style/reset.css'
import '../style/user_index.css'
require('./init.js');

var ajax = require('./public_Ajax.js').ajax;

//顶部点击切换
let page1topspan = document.getElementsByClassName('page1top')[0].children;
let parts = document.getElementsByClassName('partbox')[0].children;
let topflag = 1;
for(let i=0;i<parts.length;i++){
    page1topspan[i].addEventListener('click',function(){
        if(i==topflag)
          return;
        else{
            page1topspan[topflag].className='';
            page1topspan[i].className='topselect';

            parts[topflag].style='display:none';
            parts[i].style='display:block';
            topflag=i;
        }
        
    },false)
    parts
}
//bottom部分切换
let bottoms = document.getElementsByClassName('bottombox')[0].children;
let pages = document.getElementsByClassName('pagebox')[0].children;
let bottomflag=0;
for(let i=0;i<bottoms.length;i++){
    bottoms[i].addEventListener('click',function(){
        if(i==bottomflag){
            return;
        }else{
            bottoms[bottomflag].style="color:#666;";
            bottoms[bottomflag].children[0].className='bottomlogo'+(bottomflag+1);
            pages[bottomflag].style='display:none;';
            bottoms[i].style="color:#1EACF6;";
            bottoms[i].children[0].className='bottomlogo'+(i+1)+'select';
            pages[i].style='display:block;';
            bottomflag=i;
        }
    },false)
}

//环形图
let width = document.body.clientWidth;
let mountNode = document.getElementById('mountNode');
mountNode.style='width:'+width+'px;'+'height:'+(width/3*2)+'px';

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
  chart.interval().position('a*percent').color('name', ['#8CEBFF', '#C5FF8C', '#FED28B','#FFF786']).adjust('stack');

  chart.guide().html({
    position: ['50%', '55%'],
    html: '<div style="width: 250px;height: 40px;text-align: center;">' + '<div style="font-size: 15px">出勤情况</div>' +  '</div>'
  });
  chart.render();