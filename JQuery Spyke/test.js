$(document).ready(function function_name (argument) {
	$("a").click(function(){
		event.preventDefault();
		$(this).hide("slow");
	});
	$("div.test").click(function(){
		$('span',this).removeClass('bold');
		$('span',this).addClass('regular');

		$(this).slideUp("slow");
	});
});