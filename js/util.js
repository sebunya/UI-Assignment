writeCookie = function(cookieName,cookieContent){
	document.cookie = escape(cookieName) + "=" + escape(cookieContent);
};

readCookie = function(cookieName){
	var allCookies = document.cookie,
		cookieArray = allCookies.split(";"),
		cookieName,
		cookieValue;
	for(var i=0,len=cookieArray.length;i<len;i++){
		cookieName = cookieArray[i].split('=')[0];
		if(cookieName.match(cookieName)==null){
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