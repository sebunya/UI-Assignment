var Widget = function(){
	this.parent = undefined;
	this.columnNumber = 0;
	this.widget = {};
	this.addNewWidget(this.columnNumber);
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
		minimizeButton = getElementsByClassName(this.widget.widgetDiv,'window-maximize')[0],
		WidgetBody =getElementsByClassName(this.widget.widgetDiv, 'body')[0];
	WidgetBody.style.display = "block";
	contentWindow.style.minHeight = "220px";
	minimizeButton.className = 'window-minimize';
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
		me.parent.removeChild(widgetDiv);
	};
};

Widget.prototype.createNewWidget = function(parentElement,columnNumber) {
	this.parent = parentElement;
	var templates = new Template(),
		widgetTemplate = templates.getWidgetTemplate(),
		widgetDiv = document.createElement('div'),
		thisWidget = templates.render(widgetTemplate,{
			VShadowClass:'V-shadow',
			WindowClass:'window',
			TitleBarClass:'title-bar clearfix',
			TitleBarAnchor: '#',
			WidgetIconClass: 'widget-icon',
			TitleClass:'title',
			Title:"Date And Time",
			WindowButtonsClass:'window-buttons',
			WidgetMenuClass:'widget-menu',
			WidgetMenuAnchor: '#',
			WindowSettingsClass:'window-settings',
			WindowSettingsMenuClass:'window-settings-menu',
			WindowMinimizeClass: 'window-minimize',
			WindowCloseClass: 'window-close',
			BodyClass:'body',
			body:'Hello World'
		});

	widgetDiv.className='H-shadow';
	widgetDiv.innerHTML = thisWidget
	this.parent.appendChild(widgetDiv);
	this.widget.widgetDiv = widgetDiv;
	this.attachEventHandlers();
};

window.onload = function(){
	var addGadget = document.getElementById("addGadget");
	this.widgets = [];
	var me = this;
	addGadget.onclick = function(){
		me.widgets.push(new Widget());
	};
};

