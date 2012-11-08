var Widget = function(data){
	var widgetId;
	this.data = data;
	this.parent = document.getElementById(this.data.columnElement);
	this.widget = {};
	this.addNewWidget();
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
Widget.prototype.addNewWidget = function(){
	this.createNewWidget();		
};

Widget.prototype.minimize = function() {
	var contentWindow = getElementsByClassName(this.widget.widgetDiv, 'window')[0],
		minimizeButton = getElementsByClassName(this.widget.widgetDiv,'window-minimize')[0],
		WidgetBody =getElementsByClassName(this.widget.widgetDiv, 'body')[0];
	WidgetBody.style.display = "None";
	contentWindow.style.minHeight = "40px";
	minimizeButton.className = 'window-maximize';	
};

Widget.prototype.maximize = function() {
	var contentWindow = getElementsByClassName(this.widget.widgetDiv, 'window')[0],
		maximizeButton = getElementsByClassName(this.widget.widgetDiv,'window-maximize')[0],
		WidgetBody =getElementsByClassName(this.widget.widgetDiv, 'body')[0];
	WidgetBody.style.display = "block";
	contentWindow.style.minHeight = "220px";
	maximizeButton.className = 'window-minimize';
};

Widget.prototype.close = function(){
	var thisWidget = this.widget.widgetDiv;
	for(var i=0,len=GlobalWidgets.length;i<len;i++){
		if(GlobalWidgets[i] == this){
			console.log(i);
			GlobalWidgets.splice(i,1);
		}
	}
	this.parent.removeChild(thisWidget);
};
Widget.prototype.attachEventHandlers = function(){
	var widgetDiv = this.widget.widgetDiv,
		minimizeButton = getElementsByClassName(widgetDiv,'window-minimize')[0],
		closeButton = getElementsByClassName(widgetDiv,'window-close')[0],
		me = this;
	minimizeButton.onclick = function(){
		if(this.className == 'window-minimize')	
		{	
			me.minimize();
			return false;
		}
 		me.maximize();
		return false;
	};
	closeButton.onclick = function(){
		me.close();
		return false;
	};
};

Widget.prototype.createNewWidget = function() {
	var templates = new Template(),
		widgetTemplate = templates.getWidgetTemplate(),
		widgetDiv = document.createElement('div'),
		thisWidget = templates.render(widgetTemplate,{
			VShadowClass: 'V-shadow',
			WindowClass: 'window',
			TitleBarClass: 'title-bar clearfix',
			TitleBarAnchor: '#',
			WidgetIconClass: 'widget-icon',
			TitleClass: 'title',
			Title: this.data.title,
			WindowButtonsClass: 'window-buttons',
			WidgetMenuClass: 'widget-menu',
			WidgetMenuAnchor: '#',
			WindowSettingsClass: 'window-settings',
			WindowSettingsMenuClass: 'window-settings-menu',
			WindowMinimizeClass: 'window-minimize',
			WindowCloseClass: 'window-close',
			BodyClass: 'body',
			body: this.data.body
		});

	widgetDiv.className='H-shadow';
	widgetDiv.innerHTML = thisWidget
	this.parent.appendChild(widgetDiv);
	this.widget.widgetDiv = widgetDiv;
	this.attachEventHandlers();
};

