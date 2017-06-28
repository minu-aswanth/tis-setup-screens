$(document).ready(function(){
	 logout = function(){
	 	$.ajax({
		    url: '../utils/get_username.php',
		    success: function(result) {
		    	logout_inside(result);
		    }  
        })
        function logout_inside(user){
	        $.ajax({
			    url: '../utils/logout.php',
			    data:{username:user},
			    type:'POST',
			    success: function(result) {
			    	window.location = "index.html";
			    }  
	        })
        }
	}
});