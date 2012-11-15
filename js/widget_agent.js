var WidgetDialog = (function(){
	var instance,
		me = this,
		init = function(){
			var currentWidget,
				thisOverlay,
				data = {},
				templates = new Template(),
				thisTemplate = templates.getOverlayTemplate(),
				widgetManager = WidgetManager,
				attachEventHandlers = function(){
					var submitButton = getElementsByClassName(thisOverlay,'submit')[0],
						cancelButton = getElementsByClassName(thisOverlay,'cancel')[0];
					cancelButton.onclick = function(){
						document.body.removeChild(thisOverlay);
					};
					submitButton.onclick = function(){
						data.title = getElementsByClassName(thisOverlay,'title-input')[0].value;
						data.body = getElementsByClassName(thisOverlay,'body-input')[0].value;
						var columns = getElementsByClassName(thisOverlay,'options')[0];
						data.columnElement = columns.options[columns.selectedIndex].text;
						currentWidget = new Widget(data);
						widgetManager.showGlobalWidgetButtons();
						GlobalWidgets.push(currentWidget);
						document.body.removeChild(thisOverlay);
					};
				},
				renderOverlay = function(){
					var overlayTemplate = thisTemplate,
						overlayDiv = document.createElement('div'),	
						overlayHTML = templates.render(overlayTemplate,{
							WidgetOverlayClass: 'widget-overlay',
							WidgetFormClass: 'widget-form',
							OverlayTitleClass: 'overlay-title',
							OverlayTitle: 'New Widget',
							WidgetInputClass: 'widget-input',
							LabelClass: 'label',
							OptionsClass: 'options',
							TitleInputClass: 'title-input',
							BodyInputClass: 'body-input',
							SubmitClass: 'submit',
							CancelClass: 'cancel',
							OverlayBackgroundClass: 'overlay-background'
						});
					overlayDiv.className = 'overlay';
					overlayDiv.innerHTML = overlayHTML;
					thisOverlay = overlayDiv;
					document.body.appendChild(thisOverlay);
					attachEventHandlers();
				};
			return {
				setTemplate: function(template){
					thisTemplate = template;
				},
				render: function(){
					renderOverlay();
				},
				removeGlobalWidgetButtons: function(){
					widgetManager.removeGlobalWidgetButtons();
				}
			}
		};

	return getInstance = (function(){
			if(!instance){
				instance = init();
			}
			return instance;
		})();

})();

//What is better??? OnClick create object OR onclick show the overlay
window.onload = function(){
	var me = this,
		addGadget = document.getElementById("addGadget"),
		widgetDialog = WidgetDialog;
	me.GlobalWidgets = [];
	addGadget.onclick = function(){
		widgetDialog.render();
	}
}