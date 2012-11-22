function callback(serverData, serverStatus) {
   if(serverStatus==200){
   		var div = document.getElementById("ajax");
   		div.innerText = serverData;
   }
   else{
   		alert('Ajax Call Failed');
   }
}

function ajaxRequest(url) {
   var AJAX = null;                                 // Initialize the AJAX variable.
   if (window.XMLHttpRequest) {                     // Does this browser have an XMLHttpRequest object?
      AJAX=new XMLHttpRequest();                    // Yes -- initialize it.
   } else {                                         // No, try to initialize it IE style
      AJAX=new ActiveXObject("Microsoft.XMLHTTP");  //  Wheee, ActiveX, how do we format c: again?
   }                                                // End setup Ajax.
   if (AJAX==null) {                                // If we couldn't initialize Ajax...
      alert("Your browser doesn't support AJAX.");  // Sorry msg.						
      return false                                  // Return false, couldn't set up ajax
   }
   AJAX.onreadystatechange = function() {                      // When the browser has the request info..
      if (AJAX.readyState==4 || AJAX.readyState=="complete") { //  see if the complete flag is set.
         callback(AJAX.responseText, AJAX.status);             // Pass the response to our processing function
      }                                                        // End Ajax readystate check.
   }
   AJAX.open("GET", url, true);                                  // Open the url this object was set-up with.
   AJAX.send(null);                                              // Send the request.
}

window.onload = function () {
	ajaxRequest('./data/body.txt');
}