function openModal(){
	$("#myModal").modal();
}
function openEditModal() {
	try{
		var rowID = $("input[type='radio'][name='mds']:checked").parent().parent().children()[5].innerHTML
		var ip = $("input[type='radio'][name='mds']:checked").parent().parent().children()[2].innerHTML
		var desc1 = $("input[type='radio'][name='mds']:checked").parent().parent().children()[3].innerHTML
		var desc2 = $("input[type='radio'][name='mds']:checked").parent().parent().children()[4].innerHTML
		
		$.ajax({
            url: '../utils/profile_met.php',
            data: {profileID:profileID},
            type: 'POST',
            success: function(result) {
                var devices_set = jQuery.parseJSON(result);
                for(i=devices_set.length-1; i>=0;i--){
                    
                    $("#editModal").modal();
                    $(".modal-body #rowID_modal")[0].innerHTML = rowID
                    $(".modal-body #ip_modal").val(scn)
                    $(".modal-body #desc1_modal").val(desc1)
                    $(".modal-body #desc2_modal").val(desc2)
                }
            }
        });
    }
    catch(e){
        alert("Please select an IP address to edit")
    }
}

function editRow(){
	var rowID=$('#rowID_modal')[0].innerHTML;
	var ip=$('#ip_modal').val();
	var desc1=$('#desc1_modal').val();
	var desc2=$('#desc2_modal').val();

	$.ajax({
		url: '../utils/edit_profile_met.php',
		data :{profileID:profileID,scn:scn,shortDescription:shortDescription,longDescription:longDescription},
		type: 'POST',
		success: function(result) {
			$("#cancelModal_edit").click();
			alert("Selected IP Address has been edited")
			fetch_devices();
		}
	});
}
function deleteRow() {
	try{
		var profileID = $("input[type='radio'][name='mds']:checked").parent().parent().children()[5].innerHTML
		$.ajax({
				url: '../utils/del_nmsIP.php',
				data :{profileID:profileID},
				type: 'POST',
				success: function(result) {
					if(result.length == 2){
						alert("Connection Error please try again");
					}
					else{
						alert("Deleted the Device Entry Succesfully");
						fetch_devices();
					}
				}
            });
	}
	catch(e){
		alert("Please select an IP to delete")
	}
}
		
$(document).ready(function(){
    fetchdata = function(){
        var ip=$('#ip').val();
		var desc1=$('#desc1').val();
		var desc2=$('#desc2').val();
		
		$.ajax({
			url: '../utils/add_nmsIP.php',
			data :{ip:ip,desc1:desc1,desc2:desc2},
			type: 'POST',
			success: function(result) {
				$("#cancelModal").click();
				alert("New IP Address has been added")
				fetch_devices();
			}
        });
    }
    $("#addDevice").click(function() {
            fetchdata();
    });
    $("#edit").click(function() {
            fetchdata();
    });

});


$(document).ready(function(){
	fetch_devices = function(){
		$('#profile_met').empty();
        $.ajax({
        	url: '../utils/nms_IP.php',
        	success: function(result) {
				var devices_set2 = jQuery.parseJSON(result);
				for(i=devices_set2.length-1; i>=0;i--){
					append = '<tr>'
					append += '<td><input type="radio" name="mds"></td>'
					append += '<td>'+(devices_set2.length - i)+'</td>'
					append += '<td>'+devices_set2[i].IPAddress+'</td>'
					append += '<td>'+devices_set2[i].Description1+'</td>'
					append += '<td>'+devices_set2[i].Description2+'</td>'
					append += '<td style="display:none;">'+devices_set2[i].RowId+'</td>'
					append += '</tr>'
					$('#profile_met').append(append);
				}
        	}
        });
        }
    fetch_devices();
});

function ChangeNMSFrequency(){

	var frequency=$('#frequency').val();

	$.ajax({
		url: '../utils/nmsFrequency.php',
		data :{frequency:frequency},
		type: 'POST',
		success: function(result) {
			$("#cancelModal_edit").click();
			alert("Selected Frequency has been updated")
			fetch_devices();
		}
	});

}
