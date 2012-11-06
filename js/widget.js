var Widget = function(){
	this.columnNumber = 0;
	this.widget = {};
	//this.init = function(){
		this.addNewWidget(this.columnNumber);
	//};
	//init();
}
Widget.prototype.addMenuItems = function(){
	var parent = arguments[0],
		listElement;
	for(var i=1;i<arguments.length;i++){
		listElement = document.createElement("li");
		listElement.innerHTML = arguments[i];
		parent.appendChild(listElement);
	}
	return false;
};
Widget.prototype.addNewWidget = function(columnNumber){
	columnNumber=(columnNumber+1)%4;
	if(columnNumber==0){ columnNumber=1;}
	var column = document.getElementById("column"+columnNumber);
	this.createNewWidget(column,columnNumber);		
};
Widget.prototype.createElement = function(){
	var parameters = arguments[0];
	var parent = parameters['parent'],
		tagName = parameters['tagName'],
		element = document.createElement(tagName),
		attributes = parameters['attributes'];
	for(var thisAttribute in attributes){
		var attribute = (thisAttribute=="className")?"class":thisAttribute;
		element.setAttribute(attribute,attributes[thisAttribute]);
	}
	parent.appendChild(element);
	return element;
};

Widget.prototype.minimize = function() {
	this.widget.contentWindow.style.minHeight = "40px";
	this.widget.body.style.display = "none";
	this.widget.minimizeButton.setAttribute('class','window-maximize');
};

Widget.prototype.maximize = function() {
	this.widget.contentWindow.style.minHeight = "220px";
	this.widget.body.style.display = "block";
	this.widget.minimizeButton.setAttribute('class','window-minimize');
};
Widget.prototype.attachEventHandlers = function(thisWidget){
	me = this;
	thisWidget.minimizeButton.onclick = function(){
		var currentClass = thisWidget.minimizeButton.getAttribute('class');
		if(currentClass == 'window-minimize')	
		{	
			me.minimize();
			return false;
		}
		me.maximize();
		return false;
	};
	thisWidget.closeButton.onclick = function(){
		thisWidget.parent.removeChild(thisWidget.hShadow);
	};
};

Widget.prototype.createNewWidget = function(parentElement,columnNumber) {
		var widget = this.widget
		widget.parent = parentElement;
		widget.hShadow = this.createElement({'parent':widget.parent,'tagName':"div",attributes:{"className":"H-shadow"}});
		widget.vShadow = this.createElement({'parent':widget.hShadow,'tagName':"div",attributes:{"className":"V-shadow"}});
		widget.contentWindow = this.createElement({'parent':widget.vShadow,'tagName':"div",attributes:{"className":"window"}});
		widget.titleBar = this.createElement({'parent':widget.contentWindow,'tagName':"div",attributes:{"className":"title-bar clearfix"}});
		widget.anchor = this.createElement({'parent':widget.titleBar,'tagName':"a",attributes:{"href":"#"}});
		widget.widgetIcon = this.createElement({'parent':widget.titleBar,'tagName':"div",attributes:{"className":"widget-icon"}});
		widget.title = this.createElement({'parent':widget.titleBar,'tagName':"div",attributes:{"className":"title"}});
		widget.windowButtons = this.createElement({'parent':widget.titleBar,'tagName':"div",attributes:{"className":"window-buttons"}});
		widget.widgetMenu = this.createElement({'parent':widget.windowButtons,'tagName':"a",attributes:{"className":"widget-menu","href":"#"}});
		widget.windowSettings = this.createElement({'parent':widget.widgetMenu,'tagName':"div",attributes:{"className":"window-settings"}});
		widget.windowSettingsMenu = this.createElement({'parent':widget.windowSettings,'tagName':"ul",attributes:{"className":"window-settings-menu"}});
		widget.minimizeButton = this.createElement({'parent':widget.windowButtons,'tagName':"span",attributes: {"className":"window-minimize"}});
		widget.closeButton = this.createElement({'parent':widget.windowButtons,'tagName':"span", attributes:{"className":"window-close"}});
		widget.body = this.createElement({'parent':widget.contentWindow,'tagName':"div",attributes:{"className":"body"}});
		this.attachEventHandlers(widget);
		this.addMenuItems(widget.windowSettingsMenu,"Delete this Gadget","Minimize this Gadget","Maximize this Gadget");
		widget.title.innerHTML = "TITLE" + columnNumber;
		widget.body.innerHTML = "Hello Vishnu";
};

window.onload = function(){
	addGadget = document.getElementById("addGadget");
	this.widgets = [];
	var me = this;
	addGadget.onclick = function(){
		me.widgets.push(new Widget());
	};
};

