var Widget = function(data){
	this.data = data;
	this.parent = $("#"+this.data.columnElement)[0];
	this.el;
	this.template = this.templates.getWidgetTemplate()
	this.widgetManager = WidgetManager,
	this.addNewWidget();
}
Widget.prototype = new Dialog;
var WidgetPrototype = Widget.prototype;

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

WidgetPrototype.addMenuItems = function(){
	var parent = arguments[0];
	for(var i=1;i<arguments.length;i++){
		$(parent).append("<li>" + arguments[i] + "</li>")
	}
	return false;
};

WidgetPrototype.minimize = function() {
	$('.body',this.el).css('display',"None");
	$('.window',this.el).css('minHeight','40px');
	$('.window-minimize',this.el).attr('class','window-maximize');
};

WidgetPrototype.maximize = function() {
	$('.body',this.el).css('display',"block");
	$('.window',this.el).css('minHeight','220px');
	$('.window-maximize',this.el).attr('class','window-minimize');
};

WidgetPrototype.close = function(){
	$(this.el).remove();
	this.widgetManager.removeWidget(this);
};
WidgetPrototype.attachEventHandlers = function(){
	var me = this;
	$('.window-minimize',this.el).click(function(){
		if(this.className == 'window-minimize'){	
			me.minimize();
			return false;
		}
 		me.maximize();
		return false;
	});
	$('.window-close',this.el).click(function(){
		me.close();
		return false;
	});
};