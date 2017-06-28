function populateSCN(){
	var module = document.getElementById("module").options[document.getElementById("module").selectedIndex].text;

	if(module == "All"){
		$('#device').empty();
	}

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


    create_graph = function(){
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
		
		formatted_startDate = startDate.substr(startDate.lastIndexOf("-")+1,startDate.length) + "-" + startDate.substr(startDate.indexOf("-")+1,startDate.lastIndexOf("-")-3)+ "-" + startDate.substr(0,startDate.indexOf("-")) + " " + fromTime;
		formatted_endDate = endDate.substr(endDate.lastIndexOf("-")+1,endDate.length) + "-" + endDate.substr(endDate.indexOf("-")+1,endDate.lastIndexOf("-")-3)+ "-" + endDate.substr(0,endDate.indexOf("-")) + " " + toTime;

		var currentTime = Math.round(new Date().getTime()/1000);
		var endDateTime = Math.round(new Date(formatted_endDate).getTime()/1000);

		if(currentTime < endDateTime){
			var current = new Date();

			var year = current.getFullYear();
			var month = current.getMonth() + 1;
			var date = current.getDate();
			var hour = current.getHours();
			var minute = current.getMinutes();
			var seconds = current.getSeconds();
			
			if(month.toString().length==1) month="0"+month;
			if(date.toString().length==1) date="0"+date;
			if(hour.toString().length==1) hour="0"+hour;
			if(minute.toString().length==1) minute="0"+minute;
			if(seconds.toString().length==1) seconds="0"+seconds;

			formatted_endDate = year+"-"+month+"-"+date+" "+hour+":"+minute+":"+seconds;
		}

		var allowReport = false;

		$.ajax({
            url: '../utils/get_roles.php',
            success: function(result1) {
				var id_set = jQuery.parseJSON(result1);
				for(i=0; i<id_set.length;i++){
					var dt = deviceType;
					if(dt === "meteorological"){
						dt = "met";
					}else if(dt === "detector"){
						dt = "atcc";
					}
					
					if((id_set[i].role == "Admin") || (id_set[i].role == "Maintenance")) {
						allowReport = true;
					} else if(id_set[i].role.endsWith(dt.toUpperCase())) {
						allowReport = true;
					}
				}

				if(formatted_startDate > formatted_endDate){
					alert("From Date should be less than To Date");
					return;
				}else{
					
					if(allowReport){

						$.ajax({
							url: '../utils/uptimeReport.php',
							data :{formatted_startDate:formatted_startDate,formatted_endDate:formatted_endDate,deviceType:deviceType,scn:scn},
							type: 'POST',
							success: function(result) {
								if(result.length == 2){
									alert("Connection Error please try again");
								}
								else{
									var online = [];
									var offline = [];
									var devices = [];

									var totalOnline=0;
									var totalOffline=0;
									
									var devices_set = jQuery.parseJSON(result);
									if(document.getElementById("des").checked == false){
										for(i=devices_set.length-1; i>=0;i--){

											offlinePercent = (devices_set[i].OfflineCount*100)/(devices_set[i].TotalCount);
											onlinePercent = (devices_set[i].OnlineCount*100)/(devices_set[i].TotalCount);

											offlinePercent = +offlinePercent.toFixed(2);
											onlinePercent = +onlinePercent.toFixed(2);

											offline.push(offlinePercent);
											online.push(onlinePercent);
											devices.push(devices_set[i].SystemCodeNumber);

											totalOnline = totalOnline + parseInt(devices_set[i].OnlineCount);
											totalOffline = totalOffline + parseInt(devices_set[i].OfflineCount);

										}
									}
									else{
										for(i=0; i<devices_set.length;i++){

											offlinePercent = (devices_set[i].OfflineCount*100)/(devices_set[i].TotalCount);
											onlinePercent = (devices_set[i].OnlineCount*100)/(devices_set[i].TotalCount);

											offlinePercent = +offlinePercent.toFixed(2);
											onlinePercent = +onlinePercent.toFixed(2);

											offline.push(offlinePercent);
											online.push(onlinePercent);
											devices.push(devices_set[i].SystemCodeNumber);

											totalOnline = totalOnline + parseInt(devices_set[i].OnlineCount);
											totalOffline = totalOffline + parseInt(devices_set[i].OfflineCount);

										}
									}
									if(scn == 'All'){

										var overallTotal = totalOffline+totalOnline;

										totalOnlineP = totalOnline*100/overallTotal;
										totalOfflineP = totalOffline*100/overallTotal;

										totalOnlineP = +totalOnlineP.toFixed(2);
										totalOfflineP = +totalOfflineP.toFixed(2);

										online.push(totalOnlineP);
										offline.push(totalOfflineP);
										devices.push("All Devices");
									}

									var onlineGraph = {
										x: online,
										y: devices,
										name: 'Online',
										orientation:'h',
										marker:{
											color:'#25ED0B',
											width: 0.25
										},
										type:'bar'
									};

									var offlineGraph = {
										x: offline,
										y: devices,
										name: 'Offline',
										orientation:'h',
										type:'bar',
										marker:{
											color:'#7E2217',
											width: 0.25
										}
									};

									var data = [onlineGraph,offlineGraph];

									var layout = {
										title: 'Uptime Chart',
										barmode: 'stack'
									};

									Plotly.newPlot('myDiv', data, layout);

									var end = (new Date(formatted_endDate)).getTime() / 1000;
									var start = (new Date(formatted_startDate)).getTime() / 1000;
									var factor = ((end-start+1)/6000);

									$('#myDivTable').empty();
									append = '<table id="dataTable" width="100%" border="1" align="center" class="table"><br><br><br><br><br><tr><td bgcolor="#993232" rowspan="2" style="vertical-align:middle"><font color="white">Device</td><td bgcolor="#993232" colspan="2"><font color="white">Online Time</td><td bgcolor="#993232" colspan="2"><font color="white">Offline Time</td></tr><tr><td bgcolor="#993232"><font color="white">Time (min)</td><td bgcolor="#993232"><font color="white">%</td><td bgcolor="#993232"><font color="white">Time (min)</td><td bgcolor="#993232"><font color="white">%</td></tr>';
									var onlineSum = 0;
									var offlineSum = 0;
									var onlineP = 0;
									var offlineP = 0;
									for (var i=devices.length-1;i>=0;i--){
										if(devices[i] !='All Devices'){
											var on = online[i]*factor;
											on = +on.toFixed(0);
											onlineSum = onlineSum + on;
											var off = offline[i]*factor;
											off = +off.toFixed(0);
											offlineSum = offlineSum + off;
											append += '<tr><td>'+devices[i]+'</td><td>'+on+'</td><td>'+online[i]+'</td><td>'+off+'</td><td>'+offline[i]+'</td></tr>'	
										} else{
											onlineP=online[i];
											offlineP=offline[i];
										}
										
									}

									if(scn === "All"){
										append += '<tr bgcolor="#cc9999"><td>All Devices</td><td>'+onlineSum+'</td><td>'+onlineP+'</td><td>'+offlineSum+'</td><td>'+offlineP+'</td></tr>';	
									}
									append += '</table><br><br><br><br><br>';
									
									$('#myDivTable').append(append);

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
    $("#createGraph").click(function() {
            create_graph();
    });
});





$(document).ready(function(){
    downloadPDF = function(){

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
		
		formatted_startDate = startDate.substr(startDate.lastIndexOf("-")+1,startDate.length) + "-" + startDate.substr(startDate.indexOf("-")+1,startDate.lastIndexOf("-")-3)+ "-" + startDate.substr(0,startDate.indexOf("-")) + " " + fromTime;
		formatted_endDate = endDate.substr(endDate.lastIndexOf("-")+1,endDate.length) + "-" + endDate.substr(endDate.indexOf("-")+1,endDate.lastIndexOf("-")-3)+ "-" + endDate.substr(0,endDate.indexOf("-")) + " " + toTime;

		var currentTime = Math.round(new Date().getTime()/1000);
		var endDateTime = Math.round(new Date(formatted_endDate).getTime()/1000);

		if(currentTime < endDateTime){
			var current = new Date();

			var year = current.getFullYear();
			var month = current.getMonth() + 1;
			var date = current.getDate();
			var hour = current.getHours();
			var minute = current.getMinutes();
			var seconds = current.getSeconds();
			
			if(month.toString().length==1) month="0"+month;
			if(date.toString().length==1) date="0"+date;
			if(hour.toString().length==1) hour="0"+hour;
			if(minute.toString().length==1) minute="0"+minute;
			if(seconds.toString().length==1) seconds="0"+seconds;

			formatted_endDate = year+"-"+month+"-"+date+" "+hour+":"+minute+":"+seconds;
		}

		var allowReport = false;

		$.ajax({
            url: '../utils/get_roles.php',
            success: function(result1) {
				var id_set = jQuery.parseJSON(result1);
				for(i=0; i<id_set.length;i++){
					var dt = deviceType;
					if(dt === "meteorological"){
						dt = "met";
					}else if(dt === "detector"){
						dt = "atcc";
					}
					
					if(id_set[i].role == "Admin"){
						allowReport = true;
					} else if(id_set[i].role.endsWith(dt.toUpperCase())) {
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
								window.open("../utils/createreport_uptimeReport_pdf.php?fromDate=" + formatted_startDate +"&toDate=" + formatted_endDate + "&username="+username + "&deviceType="+deviceType + "&scn="+scn,'_blank');
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
            downloadPDF();
    });
});






$(document).ready(function(){
    downloadExcel = function(){

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
		
		formatted_startDate = startDate.substr(startDate.lastIndexOf("-")+1,startDate.length) + "-" + startDate.substr(startDate.indexOf("-")+1,startDate.lastIndexOf("-")-3)+ "-" + startDate.substr(0,startDate.indexOf("-")) + " " + fromTime;
		formatted_endDate = endDate.substr(endDate.lastIndexOf("-")+1,endDate.length) + "-" + endDate.substr(endDate.indexOf("-")+1,endDate.lastIndexOf("-")-3)+ "-" + endDate.substr(0,endDate.indexOf("-")) + " " + toTime;

		var currentTime = Math.round(new Date().getTime()/1000);
		var endDateTime = Math.round(new Date(formatted_endDate).getTime()/1000);

		if(currentTime < endDateTime){
			var current = new Date();

			var year = current.getFullYear();
			var month = current.getMonth() + 1;
			var date = current.getDate();
			var hour = current.getHours();
			var minute = current.getMinutes();
			var seconds = current.getSeconds();
			
			if(month.toString().length==1) month="0"+month;
			if(date.toString().length==1) date="0"+date;
			if(hour.toString().length==1) hour="0"+hour;
			if(minute.toString().length==1) minute="0"+minute;
			if(seconds.toString().length==1) seconds="0"+seconds;

			formatted_endDate = year+"-"+month+"-"+date+" "+hour+":"+minute+":"+seconds;
		}

		var allowReport = false;

		$.ajax({
            url: '../utils/get_roles.php',
            success: function(result1) {
				var id_set = jQuery.parseJSON(result1);
				for(i=0; i<id_set.length;i++){
					var dt = deviceType;
					if(dt === "meteorological"){
						dt = "met";
					}else if(dt === "detector"){
						dt = "atcc";
					}
					
					if(id_set[i].role == "Admin"){
						allowReport = true;
					} else if(id_set[i].role.endsWith(dt.toUpperCase())) {
						allowReport = true;
					}
				}
				if(formatted_startDate > formatted_endDate){
					alert("From Date should be less than To Date");
					return;
				}else{
					
					if(allowReport){

						$.ajax({
							url: '../utils/uptimeReportDownload.php',
							data :{formatted_startDate:formatted_startDate,formatted_endDate:formatted_endDate,deviceType:deviceType,scn:scn},
							type: 'POST',
							success: function(result) {
								if(result.length == 2){
									alert("Connection Error please try again");
								}
								else{
									$.ajax({
										url: '../utils/get_username.php',
										success: function(result_username){
											var username = result_username;
											var currentdate = new Date(); 
											var ts = "Downloaded at: " + currentdate.getDate() + "/"
											                + (currentdate.getMonth()+1)  + "/" 
											                + currentdate.getFullYear() + " @ "  
											                + currentdate.getHours() + ":"  
											                + currentdate.getMinutes() + ":" 
											                + currentdate.getSeconds();

											json_to_csv(result,"Uptime Report",true,startDate,endDate,username,ts);
										}
									});
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
    $("#downloadExcel").click(function() {
            downloadExcel();
    });
});


function json_to_csv(json_data, title, label, fromDate, toDate, username, timestamp) {
    //Json  Parser
    var arr_data = JSON.parse(json_data);
    var csv = '';
    csv += 'Downloaded by: '+username+'\r\n';
    csv += timestamp+'\r\n\n';
    
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
    if(document.getElementById("des").checked == false){
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
	else{
		for (var i = arr_data.length-1; i >= 0; i--) {
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
    var file_name = "uptime_report_"+fromDate+"_"+toDate;  
    var uri = 'data:text/csv;charset=utf-8,' + escape(csv);    
    var link = document.createElement("a");    
    link.href = uri;
    link.style = "visibility:hidden";
    link.download = file_name + ".csv";    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}