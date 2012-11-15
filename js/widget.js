var Widget = function(data){
	var widgetId;
	this.data = data;
	this.parent = document.getElementById(this.data.columnElement);
	this.el;
	this.templates = new Template(),
	this.thisWidgetTemplate = this.templates.getWidgetTemplate()
	this.addNewWidget();
}
var WidgetPrototype = Widget.prototype;
WidgetPrototype.addMenuItems = function(){
	var parent = arguments[0],
		listElement;
	for(var i=1;i<arguments.length;i++){
		listElement = document.createElement("li");
		listElement.innerHTML = arguments[i];
		parent.appendChild(listElement);
	}
	return false;
};
WidgetPrototype.addNewWidget = function(){
	this.createNewWidget();		
};

WidgetPrototype.minimize = function() {
	var contentWindow = getElementsByClassName(this.el, 'window')[0],
		minimizeButton = getElementsByClassName(this.el,'window-minimize')[0],
		WidgetBody =getElementsByClassName(this.el, 'body')[0];
	WidgetBody.style.display = "None";
	contentWindow.style.minHeight = "40px";
	minimizeButton.className = 'window-maximize';	
};

WidgetPrototype.maximize = function() {
	var contentWindow = getElementsByClassName(this.el, 'window')[0],
		maximizeButton = getElementsByClassName(this.el,'window-maximize')[0],
		WidgetBody =getElementsByClassName(this.el, 'body')[0];
	WidgetBody.style.display = "block";
	contentWindow.style.minHeight = "220px";
	maximizeButton.className = 'window-minimize';
};

WidgetPrototype.close = function(){
	var thisWidget = this.el;
	for(var i=0,len=GlobalWidgets.length;i<len;i++){
		if(GlobalWidgets[i] == this){
			GlobalWidgets.splice(i,1);
		}
	}
	this.parent.removeChild(thisWidget);
	if(GlobalWidgets.length == 0){
		var widgetDialog = WidgetDialog;
		widgetDialog.removeGlobalWidgetButtons();
	}
};
WidgetPrototype.attachEventHandlers = function(){
	var widgetDiv = this.el,
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

WidgetPrototype.createNewWidget = function() {
	var widgetTemplate = this.thisWidgetTemplate,
		widgetDiv = document.createElement('div'),
		thisWidget = this.templates.render(widgetTemplate,{
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
	this.el = widgetDiv;
	this.attachEventHandlers();
};

WidgetPrototype.setTemplate = function(template){
	this.thisWidgetTemplate = template;
}