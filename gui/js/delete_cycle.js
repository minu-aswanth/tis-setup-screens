$( document ).ready(function() {
	$('.delete_profile').click(function(){
		if($('input[name=cycles]:radio:checked').val() == undefined){
			alert('Please Select a Cycle To Delete');
			return;
		}
		else{
			var r = confirm("Do you really want to delete this cycle");
   	 		if (r == true) {
        		var cycle_id = $('input[name=cycles]:radio:checked').val();
        		$.ajax({
					url: '../utils/delete_cycle.php',
					type: 'POST',
					data:{cycle_id:cycle_id},
					success: function(result) {
						if(result.includes("success")){
							alert("Cycle has been Deleted Successfully");
							location.reload();
						}
						else{
							alert("Cycle Deleting Failed");
						}	
					}
				});
    		} 
    		else {
        		alert("Delete Aborted")
    		}
		}
	});
});