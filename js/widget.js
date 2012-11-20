var Widget = function(data){
	this.data = data;
	this.parent = document.getElementById(this.data.columnElement);
	this.el;
	this.template = this.templates.getWidgetTemplate()
	this.widgetManager = WidgetManager,
	this.addNewWidget();
}
Widget.prototype = new Dialog;
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
	var data = {
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
			};
	this.el = this.render({template:this.template,
			className: 'H-shadow',
			classData: data,
			parent: this.parent
		});
	this.attachEventHandlers();
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
	this.parent.removeChild(this.el);
	this.widgetManager.removeWidget(this);
};
WidgetPrototype.attachEventHandlers = function(){
	var minimizeButton = getElementsByClassName(this.el,'window-minimize')[0],
		closeButton = getElementsByClassName(this.el,'window-close')[0],
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