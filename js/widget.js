var widget = {
	columnNumber: 0,
	createElement: function(){
		var parent = arguments[0];
		var tagName = arguments[1];
		// console.log("in createElement");
		var element = document.createElement(tagName);
		for(var i=2, len=arguments.length; i<len;i=i+2){
			element.setAttribute(arguments[i],arguments[i+1]);
		}
		parent.appendChild(element);
		return element;
	},
	addMenuItems: function(){
		var parent = arguments[0];
		var listElement;
		for(var i=1;i<arguments.length;i++){
			listElement = document.createElement("li");
			listElement.innerHTML = arguments[i];
			parent.appendChild(listElement);
		}
		return false;
	},
	createNewWidget: function(parent,columnNo){
		// console.log("in createNewWidget");
		var hShadow = widget.createElement(parent,"div","class","H-shadow"); 
		var vShadow = widget.createElement(hShadow,"div","class","V-shadow"); 
		var contentWindow = widget.createElement(vShadow,"div","class","window");
		var titleBar = widget.createElement(contentWindow,"div","class","title-bar clearfix");
		var anchor = widget.createElement(titleBar,"a","href","#");
		var widgetIcon = widget.createElement(titleBar,"div","class","widget-icon");
		var title = widget.createElement(titleBar,"div","class","title");
		title.innerHTML = "TITLE" + columnNo;
		var windowButtons = widget.createElement(titleBar,"div","class","window-buttons");
		var widgetMenu = widget.createElement(windowButtons,"a","class","widget-menu","href","#");
		var windowSettings = widget.createElement(widgetMenu,"div","class","window-settings");
		var windowSettingsMenu = widget.createElement(windowSettings,"ul","class","window-settings-menu");
		widget.addMenuItems(windowSettingsMenu,"Delete this Gadget","Minimize this Gadget","Maximize this Gadget");
		var minimizeButton = widget.createElement(windowButtons,"span", "class","window-minimize");
		var closeButton = widget.createElement(windowButtons,"span", "class","window-close");
		var body = widget.createElement(contentWindow,"div","class","body");
		body.innerHTML = "Hello Vishnu";

	},
	addNewWidget: function(){
		// console.log("in addNewWidget");
		widget.columnNumber=(widget.columnNumber+1)%4;
		if(widget.columnNumber==0){ widget.columnNumber=1;}
		console.log("column"+widget.columnNumber);
		var column = document.getElementById("column"+widget.columnNumber);
		widget.createNewWidget(column, widget.columnNumber);
		
	},

	// Doubtful if this way is correct
	init: function(){
		// console.log("in init");
		var addGadget = document.getElementById("addGadget");
		addGadget.onclick = this.addNewWidget;
	}
};
window.onload = widget.init();