writeCookie = function(event,data){
	document.cookie = escape(data.cookieName) + "=" + escape(data.cookieContent);
};

readCookie = function(event,data){
	var allCookies = document.cookie,
		cookieArray = allCookies.split(";"),
		cookieValue,cookieName;
	for(var i=0,len=cookieArray.length;i<len;i++){
		cookieName = cookieArray[i].split('=')[0];
		if(cookieName.match(data.cookieName)==null){
			continue;
		}
		cookieValue = cookieArray[i].split('=')[1];
		if(cookieValue == undefined){
			return "";
		}
		return unescape(cookieValue);
	}
}

ajaxRequest = function(data){
	var AJAX = null;
	if(window.XMLHttpRequest){
		AJAX = new XMLHttpRequest();
	}else{
		AJAX = new ActiveXObject("MicrosoftXMLHTTP");
	}
	if(AJAX==null){
		alert("Your Browser does not support AJAX. Use Chrome, Firefox or Safari");
		return false;
	}
	AJAX.onreadystateChange = function(){
		if(AJAX.readyState == 4|| AJAX.readyState == "complete"){
			var callback = data.callback;
			callback(AJAX.responseText, AJAX.status);
		}
	}
	AJAX.open("GET",data.url,data.AsyncFlag);
	AJAX.send(null);
	return AJAX;
}