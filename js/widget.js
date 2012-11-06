var widget = {
	columnNumber: 0,
	createElement: function(){
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
		thisWidget.hShadow = this.createElement({'parent':parent,'tagName':"div",attributes:{"className":"H-shadow"}});
		thisWidget.vShadow = this.createElement({'parent':thisWidget.hShadow,'tagName':"div",attributes:{"className":"V-shadow"}});
		thisWidget.contentWindow = this.createElement({'parent':thisWidget.vShadow,'tagName':"div",attributes:{"className":"window"}});
		thisWidget.titleBar = this.createElement({'parent':thisWidget.contentWindow,'tagName':"div",attributes:{"className":"title-bar clearfix"}});
		thisWidget.anchor = this.createElement({'parent':thisWidget.titleBar,'tagName':"a",attributes:{"href":"#"}});
		thisWidget.widgetIcon = this.createElement({'parent':thisWidget.titleBar,'tagName':"div",attributes:{"className":"widget-icon"}});
		thisWidget.title = this.createElement({'parent':thisWidget.titleBar,'tagName':"div",attributes:{"className":"title"}});
		thisWidget.windowButtons = this.createElement({'parent':thisWidget.titleBar,'tagName':"div",attributes:{"className":"window-buttons"}});
		thisWidget.widgetMenu = this.createElement({'parent':thisWidget.windowButtons,'tagName':"a",attributes:{"className":"widget-menu","href":"#"}});
		thisWidget.windowSettings = this.createElement({'parent':thisWidget.widgetMenu,'tagName':"div",attributes:{"className":"window-settings"}});
		thisWidget.windowSettingsMenu = this.createElement({'parent':thisWidget.windowSettings,'tagName':"ul",attributes:{"className":"window-settings-menu"}});
		thisWidget.minimizeButton = this.createElement({'parent':thisWidget.windowButtons,'tagName':"span",attributes: {"className":"window-minimize"}});
		thisWidget.closeButton = this.createElement({'parent':thisWidget.windowButtons,'tagName':"span", attributes:{"className":"window-close"}});
		thisWidget.body = this.createElement({'parent':thisWidget.contentWindow,'tagName':"div",attributes:{"className":"body"}});
		this.attachEventHandlers(thisWidget);
		this.addMenuItems(thisWidget.windowSettingsMenu,"Delete this Gadget","Minimize this Gadget","Maximize this Gadget");
		thisWidget.title.innerHTML = "TITLE" + columnNo;
		thisWidget.body.innerHTML = "Hello Vishnu";

	},
	addNewWidget: function(){
		widget.columnNumber=(widget.columnNumber+1)%4;
		if(widget.columnNumber==0){ widget.columnNumber=1;}
		var column = document.getElementById("column"+widget.columnNumber);
		widget.createNewWidget(column, widget.columnNumber);
		
	},
};
window.onload = function(){
	addGadget = document.getElementById("addGadget");
	addGadget.onclick = function(){
		widget.addNewWidget.call(widget);
	};
};

