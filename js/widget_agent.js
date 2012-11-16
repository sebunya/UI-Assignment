var WidgetDialog = (function(){
	var instance,
		ThisDialog = function(){
			this.parent = document.body;
			this.template = this.templates.getOverlayTemplate();
			var me = this,
				currentWidget,
				el,
				data = {},
				widgetManager = WidgetManager,
				attachEventHandlers = function(){
					var submitButton = getElementsByClassName(el,'submit')[0],
						cancelButton = getElementsByClassName(el,'cancel')[0];
					cancelButton.onclick = function(){
						me.parent.removeChild(el);
					};
					submitButton.onclick = function(){
						data.title = getElementsByClassName(el,'title-input')[0].value;
						data.body = getElementsByClassName(el,'body-input')[0].value;
						var columns = getElementsByClassName(el,'options')[0];
						data.columnElement = columns.options[columns.selectedIndex].text;
						currentWidget = new Widget(data);
						widgetManager.showGlobalWidgetButtons();
						GlobalWidgets.push(currentWidget);
						me.parent.removeChild(el);
					};
				};
			this.renderOverlay = function(){
				var data = {
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
						};
				el = this.render({template:this.template,
					className: 'overlay',
					classData: data,
					parent: this.parent
				});
				attachEventHandlers();
			};
			this.removeGlobalWidgetButtons = function(){
				widgetManager.removeGlobalWidgetButtons();
			};
			this.setTemplate = function() {
				Dialog.prototype.setTemplate.call(this, arguments);

			}
		};
		ThisDialog.prototype = new Dialog;
	return getInstance = (function(){
			if(!instance){
				instance = new ThisDialog();
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
		widgetDialog.renderOverlay();
	}
}