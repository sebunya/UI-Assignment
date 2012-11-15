//Job: global minimize and global close functionalities. Managing all the widgets.
var WidgetManager = (function(){
	var instance,
		manager = this,
		init = function(){
			var allWidgetButtons,
				templates = new Template(),
				thisTemplate = templates.getGlobalWidgetButtonTemplate(),
				attachGlobalWidgetHandlers = function(){
					var minimizeAllButton = getElementsByClassName(allWidgetButtons,'minimize-all')[0],
						closeAllButton = getElementsByClassName(allWidgetButtons,'close-all')[0];

					minimizeAllButton.onclick = function(){
						for(var i=0,len = GlobalWidgets.length;i<len;i++){
							var minimizeButton = getElementsByClassName(GlobalWidgets[i].el,'window-minimize')[0];
							if(minimizeButton != undefined && minimizeButton.className == 'window-minimize'){
								GlobalWidgets[i].minimize();
							}
						};
						return false;
					};
					closeAllButton.onclick = function(){
						var length = GlobalWidgets.length;
						for(var index=length-1;index>=0;index--){
							if(GlobalWidgets[index])
								GlobalWidgets[index].close();
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