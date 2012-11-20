function getElementsByClassName(node, classname) {
    var a = [];
    var re = new RegExp('(^| )'+classname+'( |$)');
    var els = node.getElementsByTagName("*");
    for(var i=0,j=els.length; i<j; i++)
        if(re.test(els[i].className))a.push(els[i]);
    return a;
};

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