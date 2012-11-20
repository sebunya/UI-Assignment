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
					while(allWidgetButtons.hasChildNodes()){
						allWidgetButtons.removeChild(allWidgetButtons.childNodes[0]);
					}
				};
				return {
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