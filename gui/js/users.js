$(document).ready(function(){
	fetch_devices = function(){
				$('#users').empty();
                $.ajax({
                	url: '../utils/users.php',
                	success: function(result) {
						var devices_set = jQuery.parseJSON(result);
						for(i=devices_set.length-1; i>=0;i--){
							var role;
							if(devices_set[i].Role.startsWith("Operator")){
								role = "Operator";
							} else if (devices_set[i].Role.startsWith("Manager")){
								role = "Manager";
							} else if (devices_set[i].Role.startsWith("Admin")){
								role = "Admin";
							}

							append = '<tr>'
							append += '<td><input type="radio" name="mds"></td>'
							append += '<td>'+(devices_set.length - i)+'</td>'
							append += '<td>'+devices_set[i].Username+'</td>'
							append += '<td>'+devices_set[i].user+'</td>'
							append += '<td>'+devices_set[i].Email+'</td>'
							//append += '<td>'+devices_set[i].Role+'</td>'
							append += '<td>'+role+'</td>'
							append += '<td>'+devices_set[i].Module+'</td>'
							append += '<td style="display:none;">'+devices_set[i].ID+'</td>'
							//append += '<td>'+devices_set[i].Module+'</td>'
							//append += '<td>'+devices_set[i].Created+'</td>'
							//append += '<td>'+devices_set[i].Modified+'</td>'
							append += '</tr>'
							$('#users').append(append);
						}
                	}
                });
        }
    fetch_devices();
});
