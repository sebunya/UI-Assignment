var Template = function(){
	var templates = {
			widget: "<div class = {{VShadowClass}}>"+
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
									"<span class={{WindowCloseClass}}></span>"+
								"</div>"+
							"</div>"+
							"<div class={{BodyClass}}>"+
								"{{body}}"+
							"</div>"+
						"</div>"+
					"</div>",
			overlayTemplate: "<div class = {{WidgetOverlayClass}}>"+
								"<div class={{WidgetFormClass}}>"+
									"<div class={{OverlayTitleClass}}>"+
										"<span>{{OverlayTitle}}</span>"+
									"</div>"+
									"<div class={{WidgetInputClass}}>"+
										"<span class={{LabelClass}}>Title:</span>"+
										"<input class={{TitleInputClass}} type='text'></input>"+
									"</div>"+
									"<div class={{WidgetInputClass}}>"+
										"<span class = {{LabelClass}}>Body:</span>"+
										"<textarea class={{BodyInputClass}}></textarea>"+
									"</div>"+
									"<div class={{WidgetInputClass}}>"+
										"<span class={{LabelClass}}>Column</span>"+
										"<select class={{OptionsClass}}>"+
										  "<option>column1</option>"+
										  "<option>column2</option>"+
										  "<option>column3</option>"+
										"</select>"+
									"</div>"+
									"<div class={{WidgetInputClass}}>"+
										"<button class={{CancelClass}}><span>Cancel</span></button>"+
										"<button class={{SubmitClass}}><span>OK</span></button>"+
									"</div>"+
								"</div>"+
							"</div>"+
							"<div class={{OverlayBackgroundClass}}></div>",
			globalWidgetButtonTemplate: "<button class={{MinimizeAllClass}}> v </button>"+
										"<button class = {{CloseAllClass}}> X </button>"
		};
	return {
		render: function(template,data){
			var regExp;
			for(var temp in data){
				regExp = new RegExp("[{][{]" + temp + "[}][}]",'g');
				template = template.replace(regExp,"'"+ data[temp] +"'");
			}
			return template;
		},	
		getWidgetTemplate: function(){
			return templates.widget;
		},
		getOverlayTemplate: function(){
			return templates.overlayTemplate;
		},
		getGlobalWidgetButtonTemplate: function(){
			return templates.globalWidgetButtonTemplate;
		}
	};
};