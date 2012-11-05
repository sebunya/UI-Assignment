var widget = {
	columnNumber: 0,
	createElement: function(){
		var parent = arguments[0],
			tagName = arguments[1],
			element = document.createElement(tagName);
		for(var i=2, len=arguments.length; i<len;i=i+2){
			element.setAttribute(arguments[i],arguments[i+1]);
		}
		parent.appendChild(element);
		return element;
	},
	addMenuItems: function(){
		var parent = arguments[0],
			listElement;
		for(var i=1;i<arguments.length;i++){
			listElement = document.createElement("li");
			listElement.innerHTML = arguments[i];
			parent.appendChild(listElement);
		}
		return false;
	},
	attachEventHandlers: function(thisWidget){
		thisWidget.minimizeButton.onclick = function(){
			var currentClass = thisWidget.minimizeButton.getAttribute('class');
			if(currentClass == 'window-minimize')	
			{	
				thisWidget.contentWindow.style.minHeight = "40px";
				thisWidget.body.style.display = "none";
				thisWidget.minimizeButton.setAttribute('class','window-maximize');
				return false;
			}
			thisWidget.contentWindow.style.minHeight = "220px";
			thisWidget.body.style.display = "block";
			thisWidget.minimizeButton.setAttribute('class','window-minimize');
		};
		thisWidget.closeButton.onclick = function(){
			thisWidget.parent.removeChild(thisWidget.hShadow);
		};
	},
	createNewWidget: function(parent,columnNo){
		// console.log("in createNewWidget");
		var thisWidget = {};
		thisWidget.parent = parent;
		thisWidget.hShadow = widget.createElement(parent,"div","class","H-shadow"),
		thisWidget.vShadow = widget.createElement(thisWidget.hShadow,"div","class","V-shadow"), 
		thisWidget.contentWindow = widget.createElement(thisWidget.vShadow,"div","class","window"),
		thisWidget.titleBar = widget.createElement(thisWidget.contentWindow,"div","class","title-bar clearfix"),
		thisWidget.anchor = widget.createElement(thisWidget.titleBar,"a","href","#"),
		thisWidget.widgetIcon = widget.createElement(thisWidget.titleBar,"div","class","widget-icon"),
		thisWidget.title = widget.createElement(thisWidget.titleBar,"div","class","title"),
		thisWidget.windowButtons = widget.createElement(thisWidget.titleBar,"div","class","window-buttons"),
		thisWidget.widgetMenu = widget.createElement(thisWidget.windowButtons,"a","class","widget-menu","href","#"),
		thisWidget.windowSettings = widget.createElement(thisWidget.widgetMenu,"div","class","window-settings"),
		thisWidget.windowSettingsMenu = widget.createElement(thisWidget.windowSettings,"ul","class","window-settings-menu"),
		thisWidget.minimizeButton = widget.createElement(thisWidget.windowButtons,"span", "class","window-minimize"),
		thisWidget.closeButton = widget.createElement(thisWidget.windowButtons,"span", "class","window-close"),
		thisWidget.body = widget.createElement(thisWidget.contentWindow,"div","class","body")
		widget.attachEventHandlers(thisWidget);
		widget.addMenuItems(thisWidget.windowSettingsMenu,"Delete this Gadget","Minimize this Gadget","Maximize this Gadget");
		thisWidget.title.innerHTML = "TITLE" + columnNo;
		thisWidget.body.innerHTML = "Hello Vishnu";

	},
	addNewWidget: function(){
		// console.log("in addNewWidget");
		widget.columnNumber=(widget.columnNumber+1)%4;
		if(widget.columnNumber==0){ widget.columnNumber=1;}
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

