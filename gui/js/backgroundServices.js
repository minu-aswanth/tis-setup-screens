$(document).ready(function(){
	fetch_devices = function(){
				$('#backgroundServices').empty();
                $.ajax({
                	url: '../utils/backgroundServices.php',
                	success: function(result) {
						var devices_set = jQuery.parseJSON(result);
						for(i=devices_set.length-1; i>=0;i--){
							var status = null;
							
							var currentTime = Math.round(new Date().getTime()/1000);
							var endDateTime = Math.round(new Date(devices_set[i].LastUpdated).getTime()/1000);
							if((currentTime-endDateTime)/60 > devices_set[i].Frequency){
								status = '<img src="../images/offline.png"/>';
							} else{
								status = '<img src="../images/online.png"/>';
							}

							append = '<tr>'
							append += '<td>'+(devices_set.length - i)+'</td>'
							append += '<td>'+devices_set[i].Service+'</td>'
							append += '<td>'+status+'</td>'
							append += '<td>'+devices_set[i].LastUpdated+'</td>'
							append += '</tr>'
							$('#backgroundServices').append(append);
						}
                	}
                });
        }
    fetch_devices();
});
