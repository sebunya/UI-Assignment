var WidgetAgent = function(){
	var currentWidget,
		thisOverlay,
		data = {};
	var attachEventHandlers = function(){
		var submitButton = getElementsByClassName(thisOverlay,'submit')[0];
		submitButton.onclick = function(){
			data.title = getElementsByClassName(thisOverlay,'title-input')[0].value;
			data.body = getElementsByClassName(thisOverlay,'body-input')[0].value;
			var columns = getElementsByClassName(thisOverlay,'options')[0];
			data.columnElement = columns.options[columns.selectedIndex].text;
			currentWidget = new Widget(data);
			document.body.removeChild(thisOverlay);
		}
	},
	renderOverlay = function(){
		var templates = new Template(),
			overlayTemplate = templates.getOverlayTemplate(),
			overlayDiv = document.createElement('div'),	
			overlayHTML = templates.render(overlayTemplate,{
				WidgetOverlayClass: 'widget-overlay',
				WidgetFormClass: 'widget-form',
				WidgetInputClass: 'widget-input',
				LabelClass: 'label',
				OptionsClass: 'options',
				TitleInputClass: 'title-input',
				BodyInputClass: 'body-input',
				SubmitClass: 'submit',
				OverlayBackgroundClass: 'overlay-background'
			});
		overlayDiv.className = 'overlay';
		overlayDiv.innerHTML = overlayHTML;
		thisOverlay = overlayDiv;
		document.body.appendChild(thisOverlay);
		attachEventHandlers();
	};
	this.createWidget = function(widgets){
		widgets.push(currentWidget);
	};
	(function(){
		renderOverlay();
	})();
}

//What is better??? OnClick create object OR onclick show the overlay
window.onload = function(){
	var addGadget = document.getElementById("addGadget");
	this.widgets = [];
	var me = this;
	addGadget.onclick = function(){
		var widgetAgent = new WidgetAgent();
		widgetAgent.createWidget(me.widgets);
	}
}