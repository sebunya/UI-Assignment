var Dialog = function(){
	this.templates = new Template();
	this.render = function(data){
		var template = data.template,
			thisEl = document.createElement('div'),	
			thisHTML = this.templates.render(template,data.classData);
		thisEl.className = data.className;
		thisEl.innerHTML = thisHTML; //Inheritence possible at this point
		data.parent.appendChild(thisEl);
		return thisEl;
	}
	this.setTemplate = function(thisTemplate){
		this.template = thisTemplate;
	};
}