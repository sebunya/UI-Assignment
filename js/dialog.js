var Dialog = function(){
	this.templates = new Template();
	this.render = function(data){
		var template = data.template,
			thisEl = document.createElement('div'),	
			thisHTML = this.templates.render(template,data.classData);
		$(thisEl).addClass(data.className).html(thisHTML);
		$(data.parent).append(thisEl);
		return thisEl;
	}
	this.setTemplate = function(thisTemplate){
		this.template = thisTemplate;
	};
}