function getElementsByClassName(node, classname) {
    var a = [];
    var re = new RegExp('(^| )'+classname+'( |$)');
    var els = node.getElementsByTagName("*");
    for(var i=0,j=els.length; i<j; i++)
        if(re.test(els[i].className))a.push(els[i]);
    return a;
};

var Template = function(template){
	this.template = template;
	this.render = function(data){
		var regExp;
		for(var temp in data){
			regExp = new RegExp("[{][{]" + temp + "[}][}]");
			template = template.replace(regExp,"'"+ data[temp] +"'");
		}
		return template;
	};	
};
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
		minimizeButton = getElementsByClassName(this.widget.widgetDiv,'window-minimize')[0];
	contentWindow.style.minHeight = "40px";
	minimizeButton.setAttribute('class','window-maximize');
};

Widget.prototype.maximize = function() {
	var contentWindow = getElementsByClassName(this.widget.widgetDiv, 'window')[0],
		minimizeButton = getElementsByClassName(this.widget.widgetDiv,'window-maximize')[0];
	contentWindow.style.minHeight = "220px";
	minimizeButton.setAttribute('class','window-minimize');
};
Widget.prototype.attachEventHandlers = function(){
	var widgetDiv = this.widget.widgetDiv;
	var minimizeButton = getElementsByClassName(widgetDiv,'window-minimize')[0];
	var closeButton = getElementsByClassName(widgetDiv,'window-close')[0];

	var me = this;
	minimizeButton.onclick = function(){
		var currentClass = minimizeButton.getAttribute('class');
		if(currentClass == 'window-minimize')	
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
	var template = 	"<div class = {{VShadowClass}}>"+
						"<div class={{WindowClass}}>"+
							"<div class={{TitleBarClass}}>"+
								"<a href={{TitleBarAnchor}}></a>"+
								"<div class={{WidgetIconClass}}></div>"+
								"<div class={{TitleClass}}>{{Title}}</div>"+
								"<div class={{WindowButtonsClass}}>"+
									"<a class = {{WidgetMenuClass}} href={{WidgetMenuAnchor}}>"+
										"<div class={{WindowSettingsClass}}>"+
											"<ul class={{WindowSettingsMenuClass}}>"+
												"<li>Delete this Gadget</li>"+
												"<li>Minimize this Gadget</li>"+
												"<li>Maximize this Gadget</li>"+
												"<li>Share this Gadget</li>"+
											"</ul>"+
										"</div>"+
									"</a>"+
									"<span class={{WindowMinimizeClass}}></span>"+
									"<span class={{WindowCloseClass}}></span>"
								"</div>"+
							"</div>"+
							"<div class={{BodyClass}}>"+
								"{{body}}"+
							"</div>"+
						"</div>"+
					"</div>";

	var widgetHTML = new Template(template);

	var widgetDiv = document.createElement('div');
		widgetDiv.setAttribute('class','H-shadow');
	var thisWidget = widgetHTML.render({
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

	widgetDiv.innerHTML = thisWidget
	this.parent.appendChild(widgetDiv);
	this.widget.widgetDiv = widgetDiv;
	this.attachEventHandlers();
};

window.onload = function(){
	addGadget = document.getElementById("addGadget");
	this.widgets = [];
	var me = this;
	addGadget.onclick = function(){
		me.widgets.push(new Widget());
	};
};

