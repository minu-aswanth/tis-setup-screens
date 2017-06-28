fetchheader = function(){
        
        $.ajax({
                url: '../utils/get_header.php',
                success: function(result) {
                	$("#title")[0].innerHTML='<b><font color="white" size="5em">'+result+'</font></b>';
                }  
                
        });
}