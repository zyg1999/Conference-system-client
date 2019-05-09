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
/******/ 	return __webpack_require__(__webpack_require__.s = "./js/findpswd.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./js/findpswd.js":
/*!************************!*\
  !*** ./js/findpswd.js ***!
  \************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _style_reset_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../style/reset.css */ \"./style/reset.css\");\n/* harmony import */ var _style_reset_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_style_reset_css__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _style_findpswd_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../style/findpswd.css */ \"./style/findpswd.css\");\n/* harmony import */ var _style_findpswd_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_style_findpswd_css__WEBPACK_IMPORTED_MODULE_1__);\n\r\n\r\n\r\n__webpack_require__(/*! ./init.js */ \"./js/init.js\");\r\nlet url = 'http://www.shidongxuan.top/pages/'; //'http://192.168.137.1:8888/'\r\nvar ajax = __webpack_require__(/*! ./public_Ajax.js */ \"./js/public_Ajax.js\").ajax;\r\nlet returninco = document.getElementsByClassName('returninco')[0];\r\nreturninco.addEventListener('click', function() {\r\n    window.location.href = url + 'login.html';\r\n});\r\nlet del = document.getElementsByClassName('del')[0];\r\nlet inputs = document.getElementsByTagName('input');\r\nlet eye = document.getElementsByClassName('eye')[0];\r\nlet ajaxflag = 1;\r\ninputs[1].onfocus = function() {\r\n    wrongtips.innerHTML = '';\r\n    del.style = 'display:block;';\r\n};\r\n\r\ndel.addEventListener('click', function() {\r\n    inputs[1].value = '';\r\n    del.style = 'display:none;';\r\n});\r\n\r\nlet eyeflag = 1;\r\neye.addEventListener('click', function() {\r\n    if (eyeflag) {\r\n        eye.id = 'eye2'\r\n        inputs[2].type = 'text';\r\n        eyeflag = 0;\r\n    } else {\r\n        eye.id = '';\r\n        inputs[2].type = 'password';\r\n        eyeflag = 1;\r\n    }\r\n}, false);\r\n\r\n//获取验证码\r\nlet forgetinfo = {};\r\nlet yzmbtn = document.getElementsByClassName('yzmbtn')[0];\r\nlet wrongtips = document.getElementsByClassName('wrongtips')[0];\r\nlet yzmflag = 1;\r\nyzmbtn.addEventListener('click', function() {\r\n    forgetinfo.phoneNumber = inputs[1].value;\r\n    if (inputs[1].value.length != 11) {\r\n        wrongtips.innerHTML = '请输入正确手机号';\r\n    } else {\r\n        if (ajaxflag == 0) {\r\n            wrongtips.innerHTML = '不能多次发送';\r\n        } else if (yzmflag == 0) {\r\n            wrongtips.innerHTML = '发送太过频繁，请一分钟后重试';\r\n        } else {\r\n            ajaxflag = 0;\r\n            yzmflag = 0;\r\n            yzmbtn.style = 'background-color:#999;';\r\n            ajax({\r\n                url: 'http://www.shidongxuan.top/smartMeeting_Web/phone/getVerificationCode.do',\r\n                type: 'post',\r\n                data: { phoneNumber: forgetinfo.phoneNumber },\r\n                contenttype: 'urlencode',\r\n                async: false,\r\n                success: function(xhr) {\r\n                    ajaxflag = 1;\r\n                    let res = JSON.parse(xhr.responseText);\r\n                    if (res.status != 0) {\r\n                        wrongtips.innerHTML = '获取失败，请稍后重试';\r\n                        return;\r\n                    } else {\r\n                        wrongtips.innerHTML = '验证码已发送，请注意查收';\r\n                    }\r\n                    setTimeout(function() {\r\n                        yzmflag = 1;\r\n                        yzmbtn.style = 'background-color:rgb(81, 119, 235);';\r\n                    }, 60000)\r\n                },\r\n                fail: function() {\r\n                    ajaxflag = 1;\r\n                    wrongtips.innerHTML = '通信错误';\r\n                    return;\r\n                }\r\n            })\r\n        }\r\n\r\n    }\r\n});\r\n\r\nfunction judgeCode() {\r\n    forgetinfo.code = inputs[2].value;;\r\n    ajaxflag = 0;\r\n    ajax({\r\n        url: 'http://www.shidongxuan.top/smartMeeting_Web/phone/getVerificationCode.do',\r\n        type: 'post',\r\n        data: { phoneNumber: forgetinfo.phoneNumber, code: forgetinfo.code },\r\n        contenttype: 'urlencode',\r\n        async: false,\r\n        success: function(xhr) {\r\n            ajaxflag = 1;\r\n            let res = JSON.parse(xhr.responseText);\r\n            if (res.status != 0) {\r\n                wrongtips.innerHTML = res.mag;\r\n\r\n                return;\r\n            } else {\r\n                wrongtips.innerHTML = res.mag;\r\n\r\n            }\r\n        },\r\n        fail: function(err) {\r\n            ajaxflag = 1;\r\n            wrongtips.innerHTML = '通信错误';\r\n            return;\r\n        }\r\n    })\r\n}\r\nlet confirmchange = document.getElementsByClassName('confirmchange')[0];\r\nconfirmchange.addEventListener('click', function() {\r\n    if (inputs[1].value.length != 11) {\r\n        wrongtips.innerHTML = '请输入正确手机号';\r\n        return;\r\n    } else if (inputs[2].value.length == 0) {\r\n        wrongtips.innerHTML = '验证码不能为空';\r\n        return;\r\n    } else if (inputs[3].value.length < 6) {\r\n        wrongtips.innerHTML = '密码过短,请重置';\r\n        return;\r\n    } else if (inputs[3].value.length > 16) {\r\n        wrongtips.innerHTML = '密码过长,请重置';\r\n        return;\r\n    } else {\r\n        forgetinfo.phoneNumber = inputs[1].value;\r\n        forgetinfo.code = inputs[2].value;\r\n        forgetinfo.newPassword = inputs[3].value;\r\n        judgeCode();\r\n        if (ajaxflag == 0) {\r\n            wrongtips.innerHTML = '不能多次发送';\r\n            return;\r\n        } else {\r\n            ajaxflag = 0;\r\n            ajax({\r\n                url: 'http://www.shidongxuan.top/smartMeeting_Web/user/forgetPassword.do',\r\n                type: 'post',\r\n                data: forgetinfo,\r\n                contenttype: 'urlencode',\r\n                async: false,\r\n                success: function(xhr) {\r\n                    ajaxflag = 1;\r\n                    let res = JSON.parse(xhr.responseText);\r\n                    if (res.status == 0) {\r\n                        wrongtips.innerHTML = '修改成功';\r\n                    } else {\r\n                        wrongtips.innerHTML = '修改失败，请重试';\r\n                        return;\r\n                    }\r\n                },\r\n                fail: function() {\r\n                    ajaxflag = 1;\r\n                    wrongtips.innerHTML = '通信错误';\r\n                    return;\r\n                }\r\n            })\r\n        }\r\n    }\r\n})\n\n//# sourceURL=webpack:///./js/findpswd.js?");

/***/ }),

/***/ "./js/init.js":
/*!********************!*\
  !*** ./js/init.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("(function (doc, win) {\r\n    var docEl = doc.documentElement,\r\n        recalc = function () {\r\n            var clientWidth = docEl.clientWidth;\r\n            if (!clientWidth) return;\r\n            if (clientWidth >= 640) {\r\n                docEl.style.fontSize = '100px';\r\n            } else {\r\n                docEl.style.fontSize = 100 * (clientWidth / 640) + 'px';\r\n            }\r\n        };\r\n    if (!doc.addEventListener) return;\r\n    doc.addEventListener('DOMContentLoaded', recalc, false); \r\n})(document, window);\r\nwindow.addEventListener(\r\n    \"touchmove\",\r\n    function (event) {\r\n      if (event.touches.length > 1) {\r\n        event.preventDefault();\r\n    }\r\n    },\r\n    { passive: false }\r\n  );\r\n  \n\n//# sourceURL=webpack:///./js/init.js?");

/***/ }),

/***/ "./js/public_Ajax.js":
/*!***************************!*\
  !*** ./js/public_Ajax.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/*\r\najax({\r\n    url: \"\", //请求地址\r\n\ttype: 'get',   //请求方式\r\n\tcontenttype:'form','urlencode';\r\n    data: { name: 'zhangsan', age: '23', email: '2372734044@qq.com' }, //请求json参数\r\n    async: false,   //是否异步\r\n    success: function (xhr) {\r\n        //   此处执行请求成功后的代码\r\n    },\r\n    fail: function (err) {\r\n        // 此处为执行成功后的代码 \r\n    }\r\n}); */\r\nexports.ajax = function Ajax(object) {\r\n\tvar xhr = new XMLHttpRequest();\r\n\txhr.withCredentials = true; //携带cookie\r\n\tvar message = getParmer(object.data);\r\n\txhr.onreadystatechange = function() {\r\n\t\tif (xhr.readyState == 4) {\r\n\t\t\tvar status = xhr.status;\r\n\t\t\tif (status >= 200 && status < 300) {\r\n\t\t\t\tobject.success(xhr);\r\n\t\t\t} else {\r\n\t\t\t\tobject.fail(xhr.status);\r\n\t\t\t}\r\n\t\t}\r\n\t};\r\n\r\n\tif (object.type == 'get') {\r\n\t\txhr.open(\"get\", object.url + \"?\" + message, object.async);\r\n\t\txhr.send(null);\r\n\t} else if (object.type == 'post') {\r\n\t\txhr.open(\"post\", object.url, object.async);\r\n\t\tif(object.token){\r\n\t\t\tlet token = sessionStorage.getItem('token');\r\n\t\t\txhr.setRequestHeader('token',token);\t\r\n\t\t}\r\n\t\tif(object.contenttype=='form'){\r\n\t\t\txhr.setRequestHeader(\"Content-Type\", \"multipart/form-data\");\r\n\t\t}\r\n\t\telse{\r\n\t\t\txhr.setRequestHeader(\"Content-Type\", \"application/x-www-form-urlencoded\");\r\n\t\t}\r\n\t\txhr.send(message);\r\n\t}\r\n\tfunction getParmer(data) {\r\n\t\tvar arr = [];\r\n\t\tfor (var thing in data) {\r\n\t\t\tarr.push(encodeURIComponent(thing) + '=' + encodeURIComponent(data[thing]));\r\n\t\t}\r\n\t\treturn arr.join('&');\r\n\t}\r\n\t\r\n}\r\n\r\nexports.ajax2=function Ajax2(object){\r\n\tvar xhr = new XMLHttpRequest();\r\n\txhr.withCredentials = true; //携带cookie\r\n\tvar message = object.data;\r\n\txhr.onreadystatechange = function() {\r\n\t\tif (xhr.readyState == 4) {\r\n\t\t\tvar status = xhr.status;\r\n\t\t\tif (status >= 200 && status < 300) {\r\n\t\t\t\tobject.success(xhr);\r\n\t\t\t} else {\r\n\t\t\t\tobject.fail(xhr.status);\r\n\t\t\t}\r\n\t\t}\r\n\t};\r\n\r\n\tif (object.type == 'get') {\r\n\t\txhr.open(\"get\", object.url + \"?\" + message, object.async);\r\n\t\txhr.send(null);\r\n\t} else if (object.type == 'post') {\r\n\t\txhr.open(\"post\", object.url, object.async);\r\n\t\tif(object.token){\r\n\t\t\tlet token = sessionStorage.getItem('token');\r\n\t\t\txhr.setRequestHeader('token',token);\t\r\n\t\t}\r\n\t\tif(object.contenttype=='form'){\r\n\t\t\txhr.setRequestHeader(\"Content-Type\", \"multipart/form-data\");\r\n\t\t}\r\n\t\telse{\r\n\t\t\txhr.setRequestHeader(\"Content-Type\", \"application/x-www-form-urlencoded\");\r\n\t\t}\r\n\t\txhr.send(message);\r\n\t}\r\n\t\r\n}\r\n\n\n//# sourceURL=webpack:///./js/public_Ajax.js?");

/***/ }),

/***/ "./style/findpswd.css":
/*!****************************!*\
  !*** ./style/findpswd.css ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// removed by extract-text-webpack-plugin\n\n//# sourceURL=webpack:///./style/findpswd.css?");

/***/ }),

/***/ "./style/reset.css":
/*!*************************!*\
  !*** ./style/reset.css ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// removed by extract-text-webpack-plugin\n\n//# sourceURL=webpack:///./style/reset.css?");

/***/ })

/******/ });