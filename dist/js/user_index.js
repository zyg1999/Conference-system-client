/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./js/user_index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./js/init.js":
/*!********************!*\
  !*** ./js/init.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("(function (doc, win) {\r\n    var docEl = doc.documentElement,\r\n        recalc = function () {\r\n            var clientWidth = docEl.clientWidth;\r\n            if (!clientWidth) return;\r\n            if (clientWidth >= 640) {\r\n                docEl.style.fontSize = '100px';\r\n            } else {\r\n                docEl.style.fontSize = 100 * (clientWidth / 640) + 'px';\r\n            }\r\n        };\r\n    if (!doc.addEventListener) return;\r\n   /*  win.addEventListener(resizeEvt, recalc, false);*/\r\n    doc.addEventListener('DOMContentLoaded', recalc, false); \r\n})(document, window);\r\nwindow.addEventListener(\r\n    \"touchmove\",\r\n    function (event) {\r\n      if (event.touches.length > 1) {\r\n        event.preventDefault();\r\n    }\r\n    },\r\n    { passive: false }\r\n  );\r\n  \n\n//# sourceURL=webpack:///./js/init.js?");

/***/ }),

/***/ "./js/public_Ajax.js":
/*!***************************!*\
  !*** ./js/public_Ajax.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/*\r\najax({\r\n    url: \"\", //请求地址\r\n\ttype: 'get',   //请求方式\r\n\tcontenttype:form,urlencode;\r\n    data: { name: 'zhangsan', age: '23', email: '2372734044@qq.com' }, //请求json参数\r\n    async: false,   //是否异步\r\n    success: function (xhr) {\r\n        //   此处执行请求成功后的代码\r\n    },\r\n    fail: function (err) {\r\n        // 此处为执行成功后的代码 \r\n    }\r\n}); */\r\nexports.ajax = function Ajax(object) {\r\n\txhr = new XMLHttpRequest();\r\n\txhr.withCredentials = true; //携带cookie\r\n\tvar message = getParmer(object.data);\r\n\txhr.onreadystatechange = function() {\r\n\t\tif (xhr.readyState == 4) {\r\n\t\t\tvar status = xhr.status;\r\n\t\t\tif (status >= 200 && status < 300) {\r\n\t\t\t\tobject.success(xhr);\r\n\t\t\t} else {\r\n\t\t\t\tobject.fail(xhr.status);\r\n\t\t\t}\r\n\t\t}\r\n\t};\r\n\r\n\tif (object.type == 'get') {\r\n\t\txhr.open(\"get\", object.url + \"?\" + message, object.async);\r\n\t\txhr.send(null);\r\n\t} else if (object.type == 'post') {\r\n\t\txhr.open(\"post\", object.url, object.async);\r\n\t\tif(object.token){\r\n\t\t\tlet token = localStorage.getItem('token');\r\n\t\t\txhr.setRequestHeader('token',token);\t\r\n\t\t}\r\n\t\tif(object.contenttype=='form'){\r\n\t\t\txhr.setRequestHeader(\"Content-Type\", \"multipart/form-data\");\r\n\t\t}\r\n\t\telse{\r\n\t\t\txhr.setRequestHeader(\"Content-Type\", \"application/x-www-form-urlencoded\");\r\n\t\t}\r\n\t\txhr.send(message);\r\n\t}\r\n\tfunction getParmer(data) {\r\n\t\tvar arr = [];\r\n\t\tfor (var thing in data) {\r\n\t\t\tarr.push(encodeURIComponent(thing) + '=' + encodeURIComponent(data[thing]));\r\n\t\t}\r\n\t\treturn arr.join('&');\r\n\t}\r\n\t\r\n}\r\n\n\n//# sourceURL=webpack:///./js/public_Ajax.js?");

/***/ }),

/***/ "./js/user_index.js":
/*!**************************!*\
  !*** ./js/user_index.js ***!
  \**************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _style_reset_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../style/reset.css */ \"./style/reset.css\");\n/* harmony import */ var _style_reset_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_style_reset_css__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _style_user_index_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../style/user_index.css */ \"./style/user_index.css\");\n/* harmony import */ var _style_user_index_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_style_user_index_css__WEBPACK_IMPORTED_MODULE_1__);\n\r\n\r\n\r\n__webpack_require__(/*! ./init.js */ \"./js/init.js\");\r\n\r\nvar ajax = __webpack_require__(/*! ./public_Ajax.js */ \"./js/public_Ajax.js\").ajax;\r\n\r\n\r\n//顶部点击切换\r\nlet page1topspan = document.getElementsByClassName('page1top')[0].children;\r\nlet parts = document.getElementsByClassName('partbox')[0].children;\r\nlet topflag = 1;\r\nfor (let i = 0; i < parts.length; i++) {\r\n  page1topspan[i].addEventListener('click', function () {\r\n    if (i == topflag)\r\n      return;\r\n    else {\r\n      page1topspan[topflag].classList.remove('topselect');\r\n      page1topspan[i].classList.add ('topselect');\r\n      parts[topflag].style = 'display:none';\r\n      parts[i].style = 'display:block';\r\n      topflag = i;\r\n    }\r\n  }, false)\r\n}\r\n//bottom部分切换\r\nlet bottoms = document.getElementsByClassName('bottombox')[0].children;\r\nlet pages = document.getElementsByClassName('pagebox')[0].children;\r\nlet bottomflag = 0;\r\nfor (let i = 0; i < bottoms.length; i++) {\r\n  bottoms[i].addEventListener('click', function () {\r\n    if (i == bottomflag) {\r\n      return;\r\n    } else {\r\n      bottoms[bottomflag].style = \"color:#666;\";\r\n      bottoms[bottomflag].children[0].className = 'bottomlogo' + (bottomflag + 1);\r\n      pages[bottomflag].style = 'display:none;';\r\n      bottoms[i].style = \"color:#1EACF6;\";\r\n      bottoms[i].children[0].className = 'bottomlogo' + (i + 1) + 'select';\r\n      pages[i].style = 'display:block;';\r\n      bottomflag = i;\r\n    }\r\n  }, false)\r\n}\r\n\r\n//环形图\r\nlet width = document.body.clientWidth;\r\nlet mountNode = document.getElementById('mountNode');\r\nmountNode.style = 'width:' + width + 'px;' + 'height:' + (width / 3 * 2) + 'px';\r\nvar data = [{\r\n  name: '缺勤',\r\n  percent: 10.00,\r\n  a: '1'\r\n}, {\r\n  name: '请假',\r\n  percent: 10.00,\r\n  a: '1'\r\n}, {\r\n  name: '迟到',\r\n  percent: 10.00,\r\n  a: '1'\r\n}, {\r\n  name: '正常',\r\n  percent: 70.00,\r\n  a: '1'\r\n}];\r\n\r\nvar map = {};\r\ndata.map(function (obj) {\r\n  map[obj.name] = obj.percent + '%';\r\n});\r\n\r\nvar chart = new F2.Chart({\r\n  id: 'mountNode',\r\n  pixelRatio: window.devicePixelRatio,\r\n  padding: [20, 'auto']\r\n});\r\nchart.source(data, {\r\n  percent: {\r\n    formatter: function formatter(val) {\r\n      return val + '%';\r\n    }\r\n  }\r\n});\r\nchart.tooltip(false);\r\nchart.legend({\r\n  position: 'right',\r\n  itemFormatter: function itemFormatter(val) {\r\n    return val + '  ' + map[val];\r\n  }\r\n});\r\nchart.coord('polar', {\r\n  transposed: true,\r\n  innerRadius: 0.7,\r\n  radius: 1\r\n});\r\nchart.axis(false);\r\nchart.interval().position('a*percent').color('name', ['#8CEBFF', '#C5FF8C', '#FED28B', '#FFF786']).adjust('stack');\r\n\r\nchart.guide().html({\r\n  position: ['50%', '55%'],\r\n  html: '<div style=\"width: 250px;height: 40px;text-align: center;\">' + '<div style=\"font-size: 15px\">出勤情况</div>' + '</div>'\r\n});\r\nchart.render();\r\n\r\n//修改信息\r\nlet infomodifica = document.getElementsByClassName('infomodifica')[0];\r\nlet inputs = infomodifica.getElementsByTagName('input');\r\nlet circles = document.getElementsByClassName('circle');\r\nlet emailinput = document.getElementsByClassName('emailinput')[0];\r\nlet wrongtips = document.getElementsByClassName('wrongtips')[0];\r\n\r\nfor (let i = 0; i < inputs.length; i++) {\r\n  inputs[i].addEventListener('focus', function () {\r\n    wrongtips.innerHTML = '';\r\n  })\r\n}\r\n//先请求当前用户信息\r\nlet selfinfo = {};\r\nselfinfo.sex = 'man';\r\nlet ajaxflag = 1;\r\nfunction tokenExist(dom,token){\r\n  if(!token){\r\n        selfinfo.id=localStorage.getItem('id');\r\n        dom.innerHTML='非正常登陆';\r\n        setTimeout(function(){\r\n          window.location.href='http://localhost:8888/login.html';\r\n        },3000);\r\n        return;\r\n    }\r\n}\r\n//通信失败\r\nfunction deilefail(info){\r\n  pageboxwrongtips.innerHTML=info;\r\n  pageboxwrongtips.style='opacity: 1;';\r\n\r\n  setTimeout(function(){\r\n    pageboxwrongtips.style='opacity: 0;';\r\n  },3000)\r\n}\r\n//请求会议室信息ajax\r\nfunction modifyInformationAjax(emailstr) {\r\n  const reg = /^([a-zA-Z0-9_\\.\\-])+\\@(([a-zA-Z0-9\\-])+\\.)+([a-zA-Z0-9]{2,4})+$/;\r\n  if (inputs[1].value.length == 0) {\r\n    wrongtips = '手机号码不能为空';\r\n    return;\r\n  }\r\n  else if (!reg.test(emailstr)) {\r\n    wrongtips.innerHTML = '邮箱格式有误';\r\n    return;\r\n  } else {\r\n    selfinfo.phone = inputs[1].value;\r\n    selfinfo.email = inputs[2].value;\r\n    if (ajaxflag == 0) {\r\n      wrongtips.innerHTML = '不能多次发送';\r\n      return;\r\n    } else {\r\n      ajaxflag = 0;\r\n      let token = localStorage.getItem('token'); \r\n      tokenExist(wrongtips,token);   \r\n      ajax({\r\n        url: 'http://www.shidongxuan.top/smartMeeting_Web/user/update.do',\r\n        type: 'post',\r\n        data: selfinfo,\r\n        contenttype:form,\r\n        async: true,\r\n        token:token,\r\n        success: function (xhr) {\r\n          ajaxflag = 1;\r\n          let res = JSON.parse(xhr.responseText);\r\n          if (res.status == 0) {\r\n            wrongtips.innerHTML = '信息修改成功√';\r\n          } else {\r\n            wrongtips.innerHTML = '信息修改失败请重试';\r\n          }\r\n        },\r\n        fail: function (err) {\r\n          ajaxflag = 1;\r\n          wrongtips.innerHTML = '通信失败，请重试';\r\n        }\r\n      })\r\n    }\r\n  }\r\n}\r\n//保存信息修改\r\nlet savebtn = document.getElementsByClassName('savemodf')[0];\r\nsavebtn.addEventListener('click', function () {\r\n  let mailstr = inputs[2].value;\r\n  modifyInformationAjax(mailstr);\r\n})\r\n//性别选择按钮切换\r\nlet sexflag = 0;\r\nfor (let i = 0; i < circles.length; i++) {\r\n  circles[i].addEventListener('click', function () {\r\n    if (sexflag == i)\r\n      return;\r\n    circles[sexflag].children[0].className = '';\r\n    circles[i].children[0].className = 'circleselect';\r\n    sexflag = i;\r\n    if (i == 0) {\r\n      selfinfo.sex = 'man';\r\n    } else if (i == 1) {\r\n      selfinfo.sex = 'woman';\r\n    }\r\n  })\r\n}\r\n//信息修改页面跳转\r\nlet moreinfoicon = document.getElementsByClassName('moreinfoicon')[0];\r\nmoreinfoicon.addEventListener('click',function(){\r\n  warp.style=\"display:none;\";\r\n  infomodifica.style='display:block;';\r\n});\r\n\r\nlet selfinfomation = document.getElementById('selfinfomation');\r\nselfinfomation.addEventListener('click',function(){\r\n  warp.style=\"display:none;\";\r\n  infomodifica.style='display:block;';\r\n})\r\n\r\nlet warp = document.getElementsByClassName('warp')[0];\r\nlet returnlastbtn = document.getElementsByClassName('returnlastpage')[0];\r\nreturnlastbtn.addEventListener('click',function(){\r\n  warp.style=\"display:block;\";\r\n  infomodifica.style='display:none;';\r\n});\r\n\r\n//会议室使用频率排序\r\nfunction ConferenceRoomSequencing(data){\r\n  function comper(a,b){\r\n    return b.meetingLists.length-a.meetingLists.length;\r\n  }\r\n  data.sort(comper);\r\n}\r\n\r\nlet pageboxwrongtips =document.getElementsByClassName('pageboxwrongtips')[0];\r\n//获取会议室信息\r\nlet meetingroomtop = document.getElementsByClassName('meetingroomtop')[0];\r\nmeetingroomtop.addEventListener('click',function(){\r\n  getAllMeetingRomInfo();\r\n});\r\ngetAllMeetingRomInfo();\r\nfunction getAllMeetingRomInfo(){\r\n  if (ajaxflag == 0) {\r\n    pageboxwrongtips.innerHTML = '不能多次发送';\r\n    pageboxwrongtips.style='opacity:1';\r\n    return;\r\n  }\r\n  ajaxflag=0;\r\n  let token = localStorage.getItem('token');\r\n  tokenExist(pageboxwrongtips,token);\r\n  \r\n  ajax({\r\n    url:'http://www.shidongxuan.top/smartMeeting_Web/room/getAllRooms.do',\r\n    type:'post',\r\n    contenttype:'urlencode',\r\n    async: false,\r\n    token:token,\r\n    success: function (xhr) {\r\n        ajaxflag=1;\r\n        let res = JSON.parse(xhr.responseText);\r\n        let status=['','空闲','占用','维护'];\r\n        let color=['','#669900','#e80a0a','#EBA704'];\r\n        if(res.status==0){\r\n          let data=res.data;\r\n          ConferenceRoomSequencing(data);\r\n          let part2innerH='';\r\n          let appointtime='';\r\n          for(let i=0;i<data.length;i++){\r\n            if(data[i].meetingLists.length>50)\r\n              appointtime='少';\r\n            else\r\n              appointtime='多';\r\n            part2innerH += '<div class=\"item\"><h2>'+data[i].roomNumber+'</h2><div class=\"mtroomstatus\" style=\"background-color:'+color[res.data[i].status]+'\";>'+ \r\n            status[res.data[i].status] +'</div><div class=\"details\"><span class=\"hot pic2\">使用排名第'+(i+1)+\r\n            '名</span></div><div class=\"details\"><span class=\"time pic2\">可预约时段较'+appointtime+'</span></div>'+\r\n            '<div class=\"details\"><span class=\"accommodate pic2\">可容纳人数'+data[i].content+'人</span></div></div>';\r\n          }\r\n          parts[1].innerHTML=part2innerH;\r\n        }\r\n    },\r\n    fail:function(){\r\n      ajaxflag=1;\r\n      let ajaxinfo='通信失败';\r\n      deilefail(ajaxinfo);\r\n    }\r\n  })\r\n}\r\n\r\nlet add=document.getElementsByClassName('add')[0];\r\nlet reservationbox =document.getElementsByClassName('reservationbox')[0];\r\nlet partbox = document.getElementsByClassName('partbox')[0];\r\nadd.onclick=function(){\r\n  reservationbox.style='display:block;';\r\n}\r\npartbox.addEventListener('click',function(){\r\n  reservationbox.style='display:none;';\r\n});\r\n//获取我正在进行或还未进行的会议\r\nfunction getMyMeetingNow(){\r\n  if (ajaxflag == 0) {\r\n    pageboxwrongtips.innerHTML = '不能多次发送';\r\n    return;\r\n  }\r\n  ajaxflag=0;\r\n  let token = localStorage.getItem('token');\r\n  tokenExist(pageboxwrongtips,token);\r\n  let ID = localStorage.getItem('id');\r\n  ajax({\r\n    url:'http://www.shidongxuan.top/smartMeeting_Web/meeting/getUserMeetings.do',\r\n    type:'post',\r\n    contenttype:'urlencode',\r\n    async: false,\r\n    data:{userId:ID,type:1},\r\n    token:token,\r\n    success: function (xhr) {\r\n      let res = JSON.parse(xhr.responseText);\r\n      ajaxflag=1;\r\n      if(res.status==0){\r\n        let data=res.data;\r\n        let part1IneerH='';\r\n        let status=['','结束','正在进行','暂未开始'];\r\n        let color=['','#e80a0a','#04C756','#EBA704'];\r\n        for(let i=0;i<data.length;i++){\r\n          part1IneerH +='<div class=\"item\" nonce='+data[i].meetingId+'><span class=\"meetingtittle\">'+data[i].meetingName+'</span><span class=\"meetingstatus\" style=\"background-color:'+color[res.data[i].status]+'\";>'+status[data[i].status]+'</span>'\r\n          +'<div class=\"more \"></div><div class=\"details\"><span class=\"people pic1\">'+data[i].peopleNum+'人</span><span class=\"myself pic1\">'+ data[i].masterId+'</span></div>'\r\n          +'<div class=\"details\"><span class=\"adress pic1\">'+data[i].roomName+'</span><span class=\"meettime pic1\">'+countTime(data[i].endTime,data[i].startTime)+'分钟</span></div><div class=\"details\">'\r\n          +'<span class=\"sumtime pic1\">'+data[i].startTime+'-'+data[i].endTime+'</span></div></div>'\r\n        }\r\n        parts[0].innerHTML=part1IneerH;\r\n      }\r\n    }\r\n  })\r\n}\r\nfunction countTime(endTime,startTime){\r\n  return Number.parseInt((new Date(endTime)-new Date(startTime))/1000/60);\r\n}\r\nlet mymeetingtop = document.getElementsByClassName('mymeetingtop')[0];\r\nmymeetingtop.addEventListener('click',function(){\r\n  getMyMeetingNow();\r\n})\r\n\r\n//获取会议历史\r\n\n\n//# sourceURL=webpack:///./js/user_index.js?");

/***/ }),

/***/ "./style/reset.css":
/*!*************************!*\
  !*** ./style/reset.css ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// removed by extract-text-webpack-plugin\n\n//# sourceURL=webpack:///./style/reset.css?");

/***/ }),

/***/ "./style/user_index.css":
/*!******************************!*\
  !*** ./style/user_index.css ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// removed by extract-text-webpack-plugin\n\n//# sourceURL=webpack:///./style/user_index.css?");

/***/ })

/******/ });