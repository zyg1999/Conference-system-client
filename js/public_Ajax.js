/*
ajax({
    url: "", //请求地址
	type: 'get',   //请求方式
	contenttype:'form','urlencode';
    data: { name: 'zhangsan', age: '23', email: '2372734044@qq.com' }, //请求json参数
    async: false,   //是否异步
    success: function (xhr) {
        //   此处执行请求成功后的代码
    },
    fail: function (err) {
        // 此处为执行成功后的代码 
    }
}); */
exports.ajax = function Ajax(object) {
	var xhr = new XMLHttpRequest();
	xhr.withCredentials = true; //携带cookie
	var message = getParmer(object.data);
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4) {
			var status = xhr.status;
			if (status >= 200 && status < 300) {
				object.success(xhr);
			} else {
				object.fail(xhr.status);
			}
		}
	};

	if (object.type == 'get') {
		xhr.open("get", object.url + "?" + message, object.async);
		xhr.send(null);
	} else if (object.type == 'post') {
		xhr.open("post", object.url, object.async);
		if(object.token){
			let token = sessionStorage.getItem('token');
			xhr.setRequestHeader('token',token);	
		}
		if(object.contenttype=='form'){
			xhr.setRequestHeader("Content-Type", "multipart/form-data");
		}
		else{
			xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		}
		xhr.send(message);
	}
	function getParmer(data) {
		var arr = [];
		for (var thing in data) {
			arr.push(encodeURIComponent(thing) + '=' + encodeURIComponent(data[thing]));
		}
		return arr.join('&');
	}
	
}

exports.ajax2=function Ajax2(object){
	var xhr = new XMLHttpRequest();
	xhr.withCredentials = true; //携带cookie
	var message = object.data;
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4) {
			var status = xhr.status;
			if (status >= 200 && status < 300) {
				object.success(xhr);
			} else {
				object.fail(xhr.status);
			}
		}
	};

	if (object.type == 'get') {
		xhr.open("get", object.url + "?" + message, object.async);
		xhr.send(null);
	} else if (object.type == 'post') {
		xhr.open("post", object.url, object.async);
		if(object.token){
			let token = sessionStorage.getItem('token');
			xhr.setRequestHeader('token',token);	
		}
		if(object.contenttype=='form'){
			xhr.setRequestHeader("Content-Type", "multipart/form-data");
		}
		else{
			xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		}
		xhr.send(message);
	}
	
}
