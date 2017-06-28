function createSR(){
	var module=$("#module :selected").val();
	var device=$('#device').val();
	var subject=$('#subject').val();
	var details=$('#details').val();
	
	$.ajax({
    	url: '../utils/get_username.php',
        success: function(result) {
			username=result;
			$.ajax({
				url: '../utils/createSR.php',
				data :{module:module,device:device,subject:subject,details:details,username:username},
				type: 'POST',
				success: function(result2) {
					//console.log(result);
					if(result2.length == 2){
						alert("Connection Error please try again");
					} else {
						alert("Service Request created succesfully:"+result2);
						window.location = "../html/createSR.html"
					}
				}
            });
        
		}
    });

}

$(document).ready(function(){

	$('#device').empty();

	$.ajax({
		url: '../utils/vms_devices.php',
		success: function(result) {
			var devices_set = jQuery.parseJSON(result);
			for(i=devices_set.length-1; i>=0;i--){
				append = '<option value="'
				append += devices_set[i].SystemCodeNumber
				append += '">'
				append += devices_set[i].SystemCodeNumber
				append += '</option>'
				$('#device').append(append);
			}				
		}
    });

	$('#openSRCount').empty();
	$('#openSROnlineCount').empty();
	$('#closedSRCount').empty();

	var openSRCount = 0;
	var openSROnlineCount = 0;

	fetch_devices = function(){
		$.ajax({
	    	url: '../utils/get_username.php',
	        success: function(result) {
				username=result;
				$.ajax({
					url: '../utils/existingSR_cctv.php',
					data :{username:username},
					type: 'POST',
					success: function(result) {
						var devices_set = jQuery.parseJSON(result);
						for(i=devices_set.length-1; i>=0;i--){
							if(devices_set[i].online == "0"){
								openSRCount++;
							} else if(devices_set[i].online == "1"){
								openSROnlineCount++;
							}
						}
						$.ajax({
							url: '../utils/existingSR_vms.php',
							data :{username:username},
							type: 'POST',
							success: function(result2) {
								var devices_set2 = jQuery.parseJSON(result2);
								for(i=devices_set2.length-1; i>=0;i--){
									if(devices_set2[i].online == "0"){
										openSRCount++;
									} else if(devices_set2[i].online == "1"){
										openSROnlineCount++;
									}
								}

								$.ajax({
									url: '../utils/existingSR_atcc.php',
									data :{username:username},
									type: 'POST',
									success: function(result3) {
										var devices_set3 = jQuery.parseJSON(result3);
										for(i=devices_set3.length-1; i>=0;i--){
											if(devices_set3[i].online == "0"){
												openSRCount++;
											} else if(devices_set3[i].online == "1"){
												openSROnlineCount++;
											}
										}

										$.ajax({
											url: '../utils/existingSR_met.php',
											data :{username:username},
											type: 'POST',
											success: function(result4) {
												var devices_set4 = jQuery.parseJSON(result4);
												for(i=devices_set4.length-1; i>=0;i--){
													if(devices_set4[i].online == "0"){
														openSRCount++;
													} else if(devices_set4[i].online == "1"){
														openSROnlineCount++;
													}
												}

												$.ajax({
													url: '../utils/existingSR_ecb.php',
													data :{username:username},
													type: 'POST',
													success: function(result5) {
														var devices_set5 = jQuery.parseJSON(result5);
														var fault_text=null;
														for(i=devices_set5.length-1; i>=0;i--){
															if(devices_set5[i].online == "0"){
																openSRCount++;
															} else if(devices_set5[i].online == "1"){
																openSROnlineCount++;
															}
														}

														$.ajax({
															url: '../utils/closedSRCount.php',
															data :{username:username},
															type: 'POST',
															success: function(result6) {
																$('#closedSRCount').append('<a href="../html/createReportSR.html"><u>'+result6+'</u></a>');
																$('#openSRCount').append('<a href="../html/existingSR.html"><u>'+openSRCount+'</u></a>');
									            				$('#openSROnlineCount').append('<a href="../html/existingSR.html"><u>'+openSROnlineCount+'</u></a>');
															}
											            });
													}
									            });
											}
							            });
									}
					            });
							}
			            });
					}
	            });
			}
	    });
	}

    fetch_devices();

});


function populateSCN(){
	var module = document.getElementById("module").options[document.getElementById("module").selectedIndex].text;
	
	if(module == "VMS"){
		$('#device').empty();

		$.ajax({
			url: '../utils/vms_devices.php',
			success: function(result) {
				var devices_set = jQuery.parseJSON(result);
				for(i=devices_set.length-1; i>=0;i--){
					append = '<option value="'
					append += devices_set[i].SystemCodeNumber
					append += '">'
					append += devices_set[i].SystemCodeNumber
					append += '</option>'
					$('#device').append(append);
				}				
			}
	    });
	}

	if(module == "MET"){
		$('#device').empty();
		
		$.ajax({
			url: '../utils/met_devices.php',
			success: function(result) {
				var devices_set = jQuery.parseJSON(result);
				for(i=devices_set.length-1; i>=0;i--){
					append = '<option value="'
					append += devices_set[i].SystemCodeNumber
					append += '">'
					append += devices_set[i].SystemCodeNumber
					append += '</option>'
					$('#device').append(append);
				}				
			}
	    });

	} else if(module == "ATCC"){
		$('#device').empty();
		
		$.ajax({
			url: '../utils/atcc_devices.php',
			success: function(result) {
				var devices_set = jQuery.parseJSON(result);
				for(i=devices_set.length-1; i>=0;i--){
					append = '<option value="'
					append += devices_set[i].SystemCodeNumber
					append += '">'
					append += devices_set[i].SystemCodeNumber
					append += '</option>'
					$('#device').append(append);
				}				
			}
	    });
		
	} else if(module == "CCTV"){
		$('#device').empty();
		
		$.ajax({
			url: '../utils/cctv_devices.php',
			success: function(result) {
				var devices_set = jQuery.parseJSON(result);
				for(i=devices_set.length-1; i>=0;i--){
					append = '<option value="'
					append += devices_set[i].SystemCodeNumber
					append += '">'
					append += devices_set[i].SystemCodeNumber
					append += '</option>'
					$('#device').append(append);
				}				
			}
	    });
		
	}else if(module == "VMS"){
		$('#device').empty();

		$.ajax({
			url: '../utils/vms_devices.php',
			success: function(result) {
				var devices_set = jQuery.parseJSON(result);
				for(i=devices_set.length-1; i>=0;i--){
					append = '<option value="'
					append += devices_set[i].SystemCodeNumber
					append += '">'
					append += devices_set[i].SystemCodeNumber
					append += '</option>'
					$('#device').append(append);
				}				
			}
	    });
		
	}else if(module == "ECB"){

		$('#device').empty();
		
		$.ajax({
			url: '../utils/ecb_devices.php',
			success: function(result) {
				var devices_set = jQuery.parseJSON(result);
				for(i=devices_set.length-1; i>=0;i--){
					append = '<option value="'
					append += devices_set[i].mst_chainage
					append += '">'
					append += devices_set[i].mst_chainage
					append += '</option>'
					$('#device').append(append);
				}				
			}
	    });
		
	}

	
        
}