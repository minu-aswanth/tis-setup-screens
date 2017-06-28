function populateSCN(){
	var module = document.getElementById("module").options[document.getElementById("module").selectedIndex].text;

	if(module == "All"){
		$('#device').empty();
	}

	/*if(module == "VMS"){
		$('#device').empty();
		$('#device').append('<option value="All">All</option>');

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
	}*/

	if(module == "MET"){
		$('#device').empty();
		$('#device').append('<option value="All">All</option>');
		
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
		$('#device').append('<option value="All">All</option>');
		
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
		$('#device').append('<option value="All">All</option>');
		
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
		$('#device').append('<option value="All">All</option>');

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
		$('#device').append('<option value="All">All</option>');
		
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

$(document).ready(function(){
    create_report = function(){
        var startDate=$('#startDate').val();
        var endDate=$('#endDate').val();
        var fromTime=$('#fromTime').val();
        var toTime=$('#toTime').val();
        if(startDate == ""){
			alert("Please Enter Start Date");
			return;
		}
		if(endDate == ""){
			alert("Please Enter End Date");
			return;
		}
		if(fromTime == ""){
            fromTime = "00:00:00"
        }
        if(toTime == ""){
            toTime = "23:59:59"
        }
		var deviceType=$("#module :selected").val();
		var scn=$("#device :selected").val();
		var creator=$("#creator :selected").val();
		var status=$("#status :selected").val();
		//var device = document.getElementById("ecb_device_chainage").options[document.getElementById("ecb_device_chainage").selectedIndex].text;
		
		formatted_startDate = startDate.substr(startDate.lastIndexOf("-")+1,startDate.length) + "-" + startDate.substr(startDate.indexOf("-")+1,startDate.lastIndexOf("-")-3)+ "-" + startDate.substr(0,startDate.indexOf("-")) + " " + fromTime;
		formatted_endDate = endDate.substr(endDate.lastIndexOf("-")+1,endDate.length) + "-" + endDate.substr(endDate.indexOf("-")+1,endDate.lastIndexOf("-")-3)+ "-" + endDate.substr(0,endDate.indexOf("-")) + " " + toTime;

		var allowReport = false;

		$.ajax({
            url: '../utils/get_roles.php',
            success: function(result1) {
				var id_set = jQuery.parseJSON(result1);
				for(i=0; i<id_set.length;i++){
					if(id_set[i].role == "Admin"){
						allowReport = true;
					} else if(id_set[i].role.endsWith(deviceType)) {
						allowReport = true;
					}
				}

				if(formatted_startDate > formatted_endDate){
					alert("From Date should be less than To Date");
					return;
				}else{
					
					if(allowReport){

						$('#searchResult').empty();
						$('#searchResult').append('<tr><td bgcolor="#993232"><font color="white">SR Number</td><td bgcolor="#993232"><font color="white">Module</td><td bgcolor="#993232"><font color="white">Device</td><td bgcolor="#993232"><font color="white">Created By</td><td bgcolor="#993232"><font color="white">Created Date</td><td bgcolor="#993232"><font color="white">Status</td><td bgcolor="#993232"><font color="white">Closed By</td><td bgcolor="#993232"><font color="white">Closed Date</td><td bgcolor="#993232"><font color="white">Subject</td><td bgcolor="#993232"><font color="white">Details</td><td bgcolor="#993232"><font color="white">Observation</td><td bgcolor="#993232"><font color="white">Action Taken</td></tr>');
						$.ajax({
							url: '../utils/createreport_SR.php',
							data :{formatted_startDate:formatted_startDate,formatted_endDate:formatted_endDate,deviceType:deviceType,scn:scn,creator:creator,status:status},
							type: 'POST',
							success: function(result) {
								if(result.length == 2){
									alert("Connection Error please try again");
								}
								else{
									var devices_set = jQuery.parseJSON(result);
									if(document.getElementById("des").checked == true){
										for(i=devices_set.length-1; i>=0;i--){
											append = '<tr>'
											append += '<td>'+devices_set[i].sr_number+'</td>'
											append += '<td>'+devices_set[i].module+'</td>'
											append += '<td>'+devices_set[i].device+'</td>'
											append += '<td>'+devices_set[i].user_created+'</td>'
											append += '<td>'+devices_set[i].created_date+'</td>'
											append += '<td>'+devices_set[i].status+'</td>'
											if(devices_set[i].user_closed != null){
												append += '<td>'+devices_set[i].user_closed+'</td>'
											} else{
												append += '<td>--</td>'
											}
											if(devices_set[i].closed_date != null){
												append += '<td>'+devices_set[i].closed_date+'</td>'
											} else{
												append += '<td>--</td>'
											}
											append += '<td>'+devices_set[i].subject+'</td>'
											append += '<td>'+devices_set[i].details+'</td>'
											if(devices_set[i].Observation != null){
												append += '<td>'+devices_set[i].Observation+'</td>'
											} else{
												append += '<td>--</td>'
											}
											if(devices_set[i].Action != null){
												append += '<td>'+devices_set[i].Action+'</td>'
											} else{
												append += '<td>--</td>'
											}
											append += '</tr>'
											$('#searchResult').append(append);	
										}
									}
									else{
										for(i=0; i<devices_set.length;i++){
											append = '<tr>'
											append += '<td>'+devices_set[i].sr_number+'</td>'
											append += '<td>'+devices_set[i].module+'</td>'
											append += '<td>'+devices_set[i].device+'</td>'
											append += '<td>'+devices_set[i].user_created+'</td>'
											append += '<td>'+devices_set[i].created_date+'</td>'
											append += '<td>'+devices_set[i].status+'</td>'
											if(devices_set[i].user_closed != null){
												append += '<td>'+devices_set[i].user_closed+'</td>'
											} else{
												append += '<td>--</td>'
											}
											if(devices_set[i].closed_date != null){
												append += '<td>'+devices_set[i].closed_date+'</td>'
											} else{
												append += '<td>--</td>'
											}
											append += '<td>'+devices_set[i].subject+'</td>'
											append += '<td>'+devices_set[i].details+'</td>'
											if(devices_set[i].Observation != null){
												append += '<td>'+devices_set[i].Observation+'</td>'
											} else{
												append += '<td>--</td>'
											}
											if(devices_set[i].Action != null){
												append += '<td>'+devices_set[i].Action+'</td>'
											} else{
												append += '<td>--</td>'
											}
											append += '</tr>'
											$('#searchResult').append(append);	
										}
									}
									append = '<tr>'
									append += '<td colspan="12">&nbsp;</td></tr>'

									$('#searchResult').append(append);
								}
							}
			        	});

					} else{
						alert("Please select the 'Device Type' for which you are authorized to download the report.");
					}
					
				}

			}
        });

        
	}
    $("#createReport").click(function() {
            create_report();
    });
});



$(document).ready(function(){
    download_report = function(){

    	var startDate=$('#startDate').val();
        var endDate=$('#endDate').val();
        var fromTime=$('#fromTime').val();
        var toTime=$('#toTime').val();
        if(startDate == ""){
			alert("Please Enter Start Date");
			return;
		}
		if(endDate == ""){
			alert("Please Enter End Date");
			return;
		}
		if(fromTime == ""){
            fromTime = "00:00:00"
        }
        if(toTime == ""){
            toTime = "23:59:59"
        }
		var deviceType=$("#module :selected").val();
		var scn=$("#device :selected").val();
		var creator=$("#creator :selected").val();
		var status=$("#status :selected").val();
		//var device = document.getElementById("ecb_device_chainage").options[document.getElementById("ecb_device_chainage").selectedIndex].text;
		
		formatted_startDate = startDate.substr(startDate.lastIndexOf("-")+1,startDate.length) + "-" + startDate.substr(startDate.indexOf("-")+1,startDate.lastIndexOf("-")-3)+ "-" + startDate.substr(0,startDate.indexOf("-")) + " " + fromTime;
		formatted_endDate = endDate.substr(endDate.lastIndexOf("-")+1,endDate.length) + "-" + endDate.substr(endDate.indexOf("-")+1,endDate.lastIndexOf("-")-3)+ "-" + endDate.substr(0,endDate.indexOf("-")) + " " + toTime;

		var allowReport = false;

		$.ajax({
            url: '../utils/get_roles.php',
            success: function(result1) {
				var id_set = jQuery.parseJSON(result1);
				for(i=0; i<id_set.length;i++){
					if(id_set[i].role == "Admin"){
						allowReport = true;
					} else if(id_set[i].role.endsWith(deviceType)) {
						allowReport = true;
					}
				}

				if(formatted_startDate > formatted_endDate){
					alert("From Date should be less than To Date");
					return;
				}else{
					
					if(allowReport){

						$.ajax({
							url: '../utils/createreport_SR.php',
							data :{formatted_startDate:formatted_startDate,formatted_endDate:formatted_endDate,deviceType:deviceType,scn:scn,creator:creator,status:status},
							type: 'POST',
							success: function(result) {
								if(result.length == 2){
									alert("Connection Error please try again");
								}
								else{
									json_to_csv(result, "SR Report", true,startDate,endDate);
								}
							}
			        	});

					} else{
						alert("Please select the 'Device Type' for which you are authorized to download the report.");
					}
					
				}

			}
        });
	}
    $("#downloadReport").click(function() {
            download_report();
    });
});




$(document).ready(function(){
    download_pdf = function(){
        
    	var startDate=$('#startDate').val();
        var endDate=$('#endDate').val();
        var fromTime=$('#fromTime').val();
        var toTime=$('#toTime').val();
        if(startDate == ""){
			alert("Please Enter Start Date");
			return;
		}
		if(endDate == ""){
			alert("Please Enter End Date");
			return;
		}
		if(fromTime == ""){
            fromTime = "00:00:00"
        }
        if(toTime == ""){
            toTime = "23:59:59"
        }
		var deviceType=$("#module :selected").val();
		var scn=$("#device :selected").val();
		var creator=$("#creator :selected").val();
		var status=$("#status :selected").val();
		//var device = document.getElementById("ecb_device_chainage").options[document.getElementById("ecb_device_chainage").selectedIndex].text;
		
		formatted_startDate = startDate.substr(startDate.lastIndexOf("-")+1,startDate.length) + "-" + startDate.substr(startDate.indexOf("-")+1,startDate.lastIndexOf("-")-3)+ "-" + startDate.substr(0,startDate.indexOf("-")) + " " + fromTime;
		formatted_endDate = endDate.substr(endDate.lastIndexOf("-")+1,endDate.length) + "-" + endDate.substr(endDate.indexOf("-")+1,endDate.lastIndexOf("-")-3)+ "-" + endDate.substr(0,endDate.indexOf("-")) + " " + toTime;

		var allowReport = false;

		$.ajax({
            url: '../utils/get_roles.php',
            success: function(result1) {
				var id_set = jQuery.parseJSON(result1);
				for(i=0; i<id_set.length;i++){
					if(id_set[i].role == "Admin"){
						allowReport = true;
					} else if(id_set[i].role.endsWith(deviceType)) {
						allowReport = true;
					}
				}

				if(formatted_startDate > formatted_endDate){
					alert("From Date should be less than To Date");
					return;
				}else{
					
					if(allowReport){

						$.ajax({
			               url: '../utils/get_username.php',
			               success: function(result_username) {
								var username = result_username;
								//window.location = "../utils/createreport_SR_pdf.php?fromDate=" + formatted_startDate +"&toDate=" + formatted_endDate + "&username="+username + "&deviceType="+deviceType + "&scn="+scn + "&creator="+creator + "&status="+status
								window.open("../utils/createreport_SR_pdf.php?fromDate=" + formatted_startDate +"&toDate=" + formatted_endDate + "&username="+username + "&deviceType="+deviceType + "&scn="+scn + "&creator="+creator + "&status="+status,'_blank');
							}
			            });

					} else{
						alert("Please select the 'Device Type' for which you are authorized to download the report.");
					}
					
				}

			}
        });

	}
   $("#downloadPDF").click(function() {
           download_pdf();
   });
});





function json_to_csv(json_data, title, label, fromDate, toDate) {
    //Json  Parser
    var arr_data = JSON.parse(json_data);
    var csv = '';    
    
    //Title of the csv file, utilize it if needed 
    //csv += title + '\r\n\n';
    
    // column labels extraction
    if (label) {
        var row = "";
        for (var index in arr_data[0]) {
            row += index + ',';
        }
        row = row.slice(0, -1);
        //new line
        csv += row + '\r\n';
    }

    //Traffic data extraction
    if(document.getElementById("des").checked == true){
	    for (var i = arr_data.length-1; i >=0; i--) {
	        var row = "";        
	        for (var index in arr_data[i]) {
	            row += '"' + arr_data[i][index] + '",';
	        }
	        row.slice(0, row.length - 1);
	        //add a line break after each row
	        csv += row + '\r\n';
	    }
	}
	else{
		for (var i = 0; i < arr_data.length; i++) {
	        var row = "";        
	        for (var index in arr_data[i]) {
	            row += '"' + arr_data[i][index] + '",';
	        }
	        row.slice(0, row.length - 1);
	        //add a line break after each row
	        csv += row + '\r\n';
	    }
	}
    if (csv == '') {        
        alert("No data found");
        return;
    }   
    
    // file name declaration change accordingly
    var file_name = "sr_report_"+fromDate+"_"+toDate;  
    var uri = 'data:text/csv;charset=utf-8,' + escape(csv);    
    var link = document.createElement("a");    
    link.href = uri;
    link.style = "visibility:hidden";
    link.download = file_name + ".csv";    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}