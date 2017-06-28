fetchusername = function(){
        
        $.ajax({
                url: '../utils/get_username.php',
                success: function(result) {
        	    if(result.length > 30){
        	    	//console.log(result);
                    window.location = "../html/index.html"}
        			$("#usernameGet")[0].innerHTML=result;
        		}  
                
        });
}