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
					"</div>"
		};
	return {
		render: function(template,data){
			var regExp;
			for(var temp in data){
				regExp = new RegExp("[{][{]" + temp + "[}][}]");
				template = template.replace(regExp,"'"+ data[temp] +"'");
			}
			return template;
		},	
		getWidgetTemplate: function(){
			return templates.widget;
		}
	};
};