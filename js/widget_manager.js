//Job: global minimize and global close functionalities. Managing all the widgets.
var WidgetManager = (function(){
	var instance,
		init = function(){
			var allWidgetButtons,
				allWidgets = [],
				templates = new Template(),
				thisTemplate = templates.getGlobalWidgetButtonTemplate(),
				me = this,
				attachGlobalWidgetHandlers = function(){
					var minimizeAllButton = getElementsByClassName(allWidgetButtons,'minimize-all')[0],
						closeAllButton = getElementsByClassName(allWidgetButtons,'close-all')[0];

					minimizeAllButton.onclick = function(){
						for(var i=0,len = allWidgets.length;i<len;i++){
							var minimizeButton = getElementsByClassName(allWidgets[i].el,'window-minimize')[0];
							if(minimizeButton != undefined && minimizeButton.className == 'window-minimize'){
								allWidgets[i].minimize();
							}
						};
						return false;
					}; 
					closeAllButton.onclick = function(){
						var length = allWidgets.length;
						for(var index=length-1;index>=0;index--){
							if(allWidgets[index])
								allWidgets[index].close();
						};
						removeGlobalWidgetButtons();
						return false;
					};
				},
				removeGlobalWidgetButtons = function(){
					while(allWidgetButtons && allWidgetButtons.hasChildNodes()){
						allWidgetButtons.removeChild(allWidgetButtons.childNodes[0]);
					}
				},
				makeJsonString = function(){
					if(allWidgets.length==0){
						return "";
					}
					var str = "[";
					for(index=0,len=allWidgets.length;index<len;index++){
						widgetData = allWidgets[index].data;
						str += "{";
						for(var key in widgetData){
							str += '"' + key + '" :' + '"' + escape(escape(widgetData[key])) + '",';
						}
						str=str.substring(0,str.length-1);
						str += "}";
						str += ",";
					}
					str=str.substring(0,str.length-1);
					str += "]";
					return str;
				};
				return {
					getAllWidgets: function(){
						return allWidgets;
					},
					getWidgetCount: function(){
						return allWidgets.length;
					},
					setTemplate: function(template){
						thisTemplate = template;
					},
					attachGlobalWidgetHandlers: function(){
						attachGlobalWidgetHandlers();
					},
					removeGlobalWidgetButtons: function(){
						removeGlobalWidgetButtons();
					},
					showGlobalWidgetButtons: function(){
						var globalWidgetButtonsTemplate = thisTemplate,
							allWidgetButtonsHTML = templates.render(globalWidgetButtonsTemplate,{
								MinimizeAllClass: 'minimize-all',
								CloseAllClass: 'close-all'
							});
						allWidgetButtons = getElementsByClassName(document.body,'all-widgets-buttons')[0];
						allWidgetButtons.innerHTML = allWidgetButtonsHTML;
						attachGlobalWidgetHandlers(allWidgetButtons);

					},
					add: function(widget){
						allWidgets.push(widget);
						writeCookie("widgets",makeJsonString());
					},
					removeWidget: function(widget){
						for(var i=0,len=allWidgets.length;i<len;i++){
							if(allWidgets[i] == widget){
								allWidgets.splice(i,1);
							}
						}
						if(allWidgets.length == 0){
							removeGlobalWidgetButtons();
						}
						writeCookie("widgets",makeJsonString());
					},
					init: function(){
						var cookieContent = unescape(readCookie("widgets"));
						if(cookieContent){	
							var widgets = JSON.parse(cookieContent);
							for(var i=0,len=widgets.length;i<len;i++){
								var data={},
									thisWidget = widgets[i];
								for(var key in thisWidget){
									data[key] = unescape(unescape(thisWidget[key]));
								}
								allWidgets.push(new Widget(data));
							}
						}
					}
				};
		};
	return (getInstance = function(){
		if(!instance){
			instance = init();
		}
		return instance;
	})();
})();