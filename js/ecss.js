(function(window, document) {
	var ecss = {
		privateParam: {
			// 绗笁鏂规棩蹇楀悗鍙拌姹傜粷瀵瑰湴鍧€
			logURL: "http://10.31.23.209:9000/ecss/web/useropLog/insertUserOperationReq"
		},
		ajax: function(options) {
            alert("已经进入ajax方法");
			/**
			 * 浼犲叆鏂瑰紡榛樿涓哄璞�
			 * */
			options = options || {};
			/**
			 * 榛樿涓篏ET璇锋眰
			 * */
			options.type = (options.type || "GET").toUpperCase();
			/**
			 * 杩斿洖鍊肩被鍨嬮粯璁や负json
			 * */
			options.dataType = options.dataType || 'json';
			/**
			 * 榛樿涓哄紓姝ヨ姹�
			 * */
			options.async = options.async || true;
			/**
			 * 瀵归渶瑕佷紶鍏ョ殑鍙傛暟鐨勫鐞�
			 * */
			var params = this.getParams(options.data);
			//   var params = options.data;
			var xhr;
			/**
			 * 鍒涘缓涓€涓� ajax璇锋眰
			 * W3C鏍囧噯鍜孖E鏍囧噯
			 */
			if(window.XMLHttpRequest) {
				/**
				 * W3C鏍囧噯
				 * */
                alert("window.XMLHttpRequest这个方法判断成功")
				xhr = new XMLHttpRequest();
			} else {
				/**
				 * IE鏍囧噯
				 * @type {ActiveXObject}
				 */
				xhr = new ActiveXObject('Microsoft.XMLHTTP')
			}
			xhr.onreadystatechange = function() {
                alert(xhr.readyState+"---------xhr.readyState")
				if(xhr.readyState == 4) {
                    alert("xhr.readyState判断成功")
                    var status = xhr.status;
                    alert(status+"---------status")
					if(status >= 200 && status < 300) {
                        alert("status >= 200 && status < 300判断进去")
						options.success && options.success(xhr.responseText, xhr.responseXML);
					} else {
						options.error && options.error(status);
					}
				}
			};
			if(options.type == 'GET') {
				xhr.open("GET", options.url + '?' + params, options.async);
				xhr.send(null)
			} else if(options.type == 'POST') {
                alert("options.type == 'POST'判断成功")
				/**
				 *鎵撳紑璇锋眰
				 * */
				xhr.open('POST', options.url, options.async);
				/**
				 * POST璇锋眰璁剧疆璇锋眰澶�
				 * */
				xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
				/**
				 * 鍙戦€佽姹傚弬鏁�
				 */
				xhr.send(JSON.stringify(options.data));
			}
		},
		/**
		 * 瀵硅薄鍙傛暟鐨勫鐞�
		 * @param data
		 * @returns {string}
		 */
		getParams: function(data) {
            alert("进入getParams方法")
			var arr = [];
			for(var param in data) {
				arr.push(encodeURIComponent(param) + '=' + encodeURIComponent(data[param]));
			}
			arr.push(('randomNumber=' + Math.random()).replace('.'));
			return arr.join('&');
		},

		/**
		 * 鍓嶇鏃ュ織鍐欏叆
		 * @param {Object} logData
		 */
		log: function(logData) {
			var _this = this;
			_this.ajax({
				url: _this.privateParam.logURL,
				type: "POST",
				dataType: "json",
				data: logData,
				success:function(data){}
			});
		}
	};

	window.ecss = ecss;
})(window, document);