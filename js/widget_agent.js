var WidgetAgent = function(){
	var currentWidget,
		thisOverlay,
		data = {},
		templates = new Template(),
		allWidgetButtons;
	var attachEventHandlers = function(){
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
			showGlobalWidgetButtons();
			GlobalWidgets.push(currentWidget);
			document.body.removeChild(thisOverlay);
		};
	},
	renderOverlay = function(){
		var overlayTemplate = templates.getOverlayTemplate(),
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
	var attachGlobalWidgetHandlers = function(){
		var minimizeAllButton = getElementsByClassName(allWidgetButtons,'minimize-all')[0],
			closeAllButton = getElementsByClassName(allWidgetButtons,'close-all')[0];

		minimizeAllButton.onclick = function(){
			for(var i=0,len = GlobalWidgets.length;i<len;i++){
				var minimizeButton = getElementsByClassName(GlobalWidgets[i].widget.widgetDiv,'window-minimize')[0];
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
	};
	var removeGlobalWidgetButtons = function(){
		while(allWidgetButtons.hasChildNodes()){
			allWidgetButtons.removeChild(allWidgetButtons.childNodes[0]);
		}
	}
	var showGlobalWidgetButtons = function(){
		var globalWidgetButtonsTemplate = templates.getGlobalWidgetButtonTemplate(),
			allWidgetButtonsHTML = templates.render(globalWidgetButtonsTemplate,{
				MinimizeAllClass: 'minimize-all',
				CloseAllClass: 'close-all'
			});
		allWidgetButtons = getElementsByClassName(document.body,'all-widgets-buttons')[0];
		allWidgetButtons.innerHTML = allWidgetButtonsHTML;
		attachGlobalWidgetHandlers(allWidgetButtons);
	}
	this.render = function(){
		renderOverlay();
	};

}

//What is better??? OnClick create object OR onclick show the overlay
window.onload = function(){
	var me = this,
		addGadget = document.getElementById("addGadget"),
		widgetAgent = new WidgetAgent();
	
	me.GlobalWidgets = [];
	addGadget.onclick = function(){
		widgetAgent.render();
	}
}