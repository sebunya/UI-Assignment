var WidgetDialog = (function(){
	var instance,
		ThisDialog = function(){
			this.parent = $('body');
			this.template = this.templates.getOverlayTemplate();
			var me = this,
				currentWidget,
				el,
				data = {},
				widgetManager = WidgetManager,
				attachEventHandlers = function(){
					$('.cancel',el).click(function(){
						$(el).remove();
					});
					$('.submit',el).click(function(){
						data = {};
						data.title = $('.title-input',el).val() || $.ajax({'url':'./data/title.txt','async':false}).responseText;
						data.body = $('.body-input',el).val() || $.ajax({'url':'./data/body.txt','async':false}).responseText;
						data.columnElement = $('.options>option:selected',el).text();
						currentWidget = new Widget(data);
						widgetManager.showGlobalWidgetButtons();
						widgetManager.add(currentWidget);
						$(el).remove();
					});
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
					parent: $('body')
				});
				attachEventHandlers();
			};
			this.setTemplate = function() {
				Dialog.prototype.setTemplate.call(this, arguments);

			}
		};
	ThisDialog.prototype = new Dialog();
	return getInstance = (function(){
		if(!instance){
			instance = new ThisDialog();
		}
		return instance;
	})();

})();

//What is better??? OnClick create object OR onclick show the overlay
window.onload = function(){
	var me = this;
	(WidgetManager).init();
	$('#addGadget').click(function(){
		(WidgetDialog).renderOverlay();
	});
}