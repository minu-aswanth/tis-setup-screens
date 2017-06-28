function openModal(){
	$("#myModal").modal();
}
function openEditModal() {
	try{
		var sr = $("input[type='radio'][name='mds']:checked").parent().parent().children()[1].innerHTML
		var module = $("input[type='radio'][name='mds']:checked").parent().parent().children()[2].innerHTML
		var device = $("input[type='radio'][name='mds']:checked").parent().parent().children()[3].innerHTML
		var subject = $("input[type='radio'][name='mds']:checked").parent().parent().children()[4].innerHTML
		var status = $("input[type='radio'][name='mds']:checked").parent().parent().children()[5].innerHTML
		$("#editModal").modal();
		$(".modal-body #srNumber_modal")[0].innerHTML = sr
		$(".modal-body #module_modal")[0].innerHTML = module
		$(".modal-body #device_modal")[0].innerHTML = device
		$(".modal-body #subject_modal")[0].innerHTML = subject
		$(".modal-body #status").val(status)
	}
	catch(e){
		alert("Please select a device to edit")
	}
}

function editRow(){
	var sr=$('#srNumber_modal')[0].innerHTML;
	var module=$('#module_modal')[0].innerHTML;
	var device=$('#device_modal')[0].innerHTML;
	var subject=$('#subject_modal')[0].innerHTML;
	var status=$('#status').val();
	var observation=$('#observation').val();
	var action=$('#action').val();

	if(observation == ""){
		alert("Please Enter Observation");
		return;
	}
	if(action == ""){
		alert("Please Enter Action Taken");
		return;
	}
	
	$.ajax({
		url: '../utils/get_username.php',
		success: function(result){
			username = result;
			$.ajax({
				url: '../utils/edit_existingSR.php',
				data :{sr:sr,module:module,device:device,subject:subject,status:status,username:username,observation:observation,action:action},
				type: 'POST',
				success: function(result) {
					$("#cancelModal_edit").click();
					alert("Selected Device has been edited")
					fetch_devices();
				}
			});
		}
	});

}

$(document).ready(function(){
	fetch_devices = function(){
			$('#existingSR').empty();
			$('#existingOnlineSR').empty();
			$.ajax({
		    	url: '../utils/get_username.php',
		        success: function(result) {
					username=result;
					$.ajax({
						url: '../utils/existingSR_cctv.php',
						data :{username:username},
						type: 'POST',
						success: function(result2) {
							var devices_set = jQuery.parseJSON(result2);
							for(i=devices_set.length-1; i>=0;i--){

								if(devices_set[i].online == "0"){
									append = '<tr>'
									append += '<td>'+devices_set[i].sr_number+'</td>'
									append += '<td>'+devices_set[i].module+'</td>'
									append += '<td>'+devices_set[i].SystemCodeNumber+'</td>'
									append += '<td>'+devices_set[i].subject+'</td>'
									append += '<td>'+devices_set[i].status+'</td>'
									append += '<td>'+devices_set[i].user_created+'</td>'
									append += '<td>'+devices_set[i].created_date+'</td>'
									append += '<td>'+'<img src="../images/offline.png"/>'+'</td>'
									append += '<td>'+devices_set[i].LastUpdated+'</td>'
									append += '</tr>'
									$('#existingSR').append(append);	
								} else if(devices_set[i].online == "1"){
									append = '<tr>'
									append += '<td><input type="radio" name="mds"></td>'
									append += '<td>'+devices_set[i].sr_number+'</td>'
									append += '<td>'+devices_set[i].module+'</td>'
									append += '<td>'+devices_set[i].SystemCodeNumber+'</td>'
									append += '<td>'+devices_set[i].subject+'</td>'
									append += '<td>'+devices_set[i].status+'</td>'
									append += '<td>'+devices_set[i].user_created+'</td>'
									append += '<td>'+devices_set[i].created_date+'</td>'
									append += '<td>'+'<img src="../images/online.png"/>'+'</td>'
									append += '<td>'+devices_set[i].LastUpdated+'</td>'
									append += '</tr>'
									$('#existingOnlineSR').append(append);
								}
							}
						}
		            });
		            $.ajax({
						url: '../utils/existingSR_vms.php',
						data :{username:username},
						type: 'POST',
						success: function(result2) {
							var devices_set = jQuery.parseJSON(result2);
							for(i=devices_set.length-1; i>=0;i--){

								if(devices_set[i].online == "0"){
									append = '<tr>'
									append += '<td>'+devices_set[i].sr_number+'</td>'
									append += '<td>'+devices_set[i].module+'</td>'
									append += '<td>'+devices_set[i].SystemCodeNumber+'</td>'
									append += '<td>'+devices_set[i].subject+'</td>'
									append += '<td>'+devices_set[i].status+'</td>'
									append += '<td>'+devices_set[i].user_created+'</td>'
									append += '<td>'+devices_set[i].created_date+'</td>'
									append += '<td>'+'<img src="../images/offline.png"/>'+'</td>'
									append += '<td>'+devices_set[i].LastUpdated+'</td>'
									append += '</tr>'
									$('#existingSR').append(append);	
								} else if(devices_set[i].online == "1"){
									append = '<tr>'
									append += '<td><input type="radio" name="mds"></td>'
									append += '<td>'+devices_set[i].sr_number+'</td>'
									append += '<td>'+devices_set[i].module+'</td>'
									append += '<td>'+devices_set[i].SystemCodeNumber+'</td>'
									append += '<td>'+devices_set[i].subject+'</td>'
									append += '<td>'+devices_set[i].status+'</td>'
									append += '<td>'+devices_set[i].user_created+'</td>'
									append += '<td>'+devices_set[i].created_date+'</td>'
									append += '<td>'+'<img src="../images/online.png"/>'+'</td>'
									append += '<td>'+devices_set[i].LastUpdated+'</td>'
									append += '</tr>'
									$('#existingOnlineSR').append(append);
								}
							}
						}
		            });
		            $.ajax({
						url: '../utils/existingSR_atcc.php',
						data :{username:username},
						type: 'POST',
						success: function(result2) {
							var devices_set = jQuery.parseJSON(result2);
							for(i=devices_set.length-1; i>=0;i--){

								if(devices_set[i].online == "0"){
									append = '<tr>'
									append += '<td>'+devices_set[i].sr_number+'</td>'
									append += '<td>'+devices_set[i].module+'</td>'
									append += '<td>'+devices_set[i].SystemCodeNumber+'</td>'
									append += '<td>'+devices_set[i].subject+'</td>'
									append += '<td>'+devices_set[i].status+'</td>'
									append += '<td>'+devices_set[i].user_created+'</td>'
									append += '<td>'+devices_set[i].created_date+'</td>'
									append += '<td>'+'<img src="../images/offline.png"/>'+'</td>'
									append += '<td>'+devices_set[i].LastUpdated+'</td>'
									append += '</tr>'
									$('#existingSR').append(append);	
								} else if(devices_set[i].online == "1"){
									append = '<tr>'
									append += '<td><input type="radio" name="mds"></td>'
									append += '<td>'+devices_set[i].sr_number+'</td>'
									append += '<td>'+devices_set[i].module+'</td>'
									append += '<td>'+devices_set[i].SystemCodeNumber+'</td>'
									append += '<td>'+devices_set[i].subject+'</td>'
									append += '<td>'+devices_set[i].status+'</td>'
									append += '<td>'+devices_set[i].user_created+'</td>'
									append += '<td>'+devices_set[i].created_date+'</td>'
									append += '<td>'+'<img src="../images/online.png"/>'+'</td>'
									append += '<td>'+devices_set[i].LastUpdated+'</td>'
									append += '</tr>'
									$('#existingOnlineSR').append(append);
								}
							}
						}
		            });
		            $.ajax({
						url: '../utils/existingSR_met.php',
						data :{username:username},
						type: 'POST',
						success: function(result2) {
							var devices_set = jQuery.parseJSON(result2);
							for(i=devices_set.length-1; i>=0;i--){

								if(devices_set[i].online == "0"){
									append = '<tr>'
									append += '<td>'+devices_set[i].sr_number+'</td>'
									append += '<td>'+devices_set[i].module+'</td>'
									append += '<td>'+devices_set[i].SystemCodeNumber+'</td>'
									append += '<td>'+devices_set[i].subject+'</td>'
									append += '<td>'+devices_set[i].status+'</td>'
									append += '<td>'+devices_set[i].user_created+'</td>'
									append += '<td>'+devices_set[i].created_date+'</td>'
									append += '<td>'+'<img src="../images/offline.png"/>'+'</td>'
									append += '<td>'+devices_set[i].LastUpdated+'</td>'
									append += '</tr>'
									$('#existingSR').append(append);	
								} else if(devices_set[i].online == "1"){
									append = '<tr>'
									append += '<td><input type="radio" name="mds"></td>'
									append += '<td>'+devices_set[i].sr_number+'</td>'
									append += '<td>'+devices_set[i].module+'</td>'
									append += '<td>'+devices_set[i].SystemCodeNumber+'</td>'
									append += '<td>'+devices_set[i].subject+'</td>'
									append += '<td>'+devices_set[i].status+'</td>'
									append += '<td>'+devices_set[i].user_created+'</td>'
									append += '<td>'+devices_set[i].created_date+'</td>'
									append += '<td>'+'<img src="../images/online.png"/>'+'</td>'
									append += '<td>'+devices_set[i].LastUpdated+'</td>'
									append += '</tr>'
									$('#existingOnlineSR').append(append);
								}
							}
						}
		            });
		            $.ajax({
						url: '../utils/existingSR_ecb.php',
						data :{username:username},
						type: 'POST',
						success: function(result2) {
							var devices_set = jQuery.parseJSON(result2);
							var fault_text=null;
							for(i=devices_set.length-1; i>=0;i--){

								if(devices_set[i].online == "0"){
									append = '<tr>'
									append += '<td>'+devices_set[i].sr_number+'</td>'
									append += '<td>'+devices_set[i].module+'</td>'
									append += '<td>'+devices_set[i].SystemCodeNumber+'</td>'
									append += '<td>'+devices_set[i].subject+'</td>'
									append += '<td>'+devices_set[i].status+'</td>'
									append += '<td>'+devices_set[i].user_created+'</td>'
									append += '<td>'+devices_set[i].created_date+'</td>'
									append += '<td>'+'<img src="../images/offline.png"/>'+'</td>'
									append += '<td>'+devices_set[i].LastUpdated+'</td>'
									append += '</tr>'
									$('#existingSR').append(append);	
								} else if(devices_set[i].online == "1"){
									append = '<tr>'
									append += '<td><input type="radio" name="mds"></td>'
									append += '<td>'+devices_set[i].sr_number+'</td>'
									append += '<td>'+devices_set[i].module+'</td>'
									append += '<td>'+devices_set[i].SystemCodeNumber+'</td>'
									append += '<td>'+devices_set[i].subject+'</td>'
									append += '<td>'+devices_set[i].status+'</td>'
									append += '<td>'+devices_set[i].user_created+'</td>'
									append += '<td>'+devices_set[i].created_date+'</td>'
									append += '<td>'+'<img src="../images/online.png"/>'+'</td>'
									append += '<td>'+devices_set[i].LastUpdated+'</td>'
									append += '</tr>'
									$('#existingOnlineSR').append(append);
								}
							}
						}
		            });
		        
				}
		    });

        }
    fetch_devices();
});




$(document).ready(function(){
        download_report = function(){

        	$.ajax({
		    	url: '../utils/get_username.php',
		        success: function(result) {
					username=result;
					$.ajax({
						url: '../utils/existingSR_cctv.php',
						data :{username:username},
						type: 'POST',
						success: function(resultCCTV) {
							$.ajax({
								url: '../utils/existingSR_vms.php',
								data :{username:username},
								type: 'POST',
								success: function(resultVMS){
									$.ajax({
										url: '../utils/existingSR_atcc.php',
										data :{username:username},
										type: 'POST',
										success: function(resultATCC){
											$.ajax({
												url: '../utils/existingSR_met.php',
												data :{username:username},
												type: 'POST',
												success: function(resultMET){
													$.ajax({
														url: '../utils/existingSR_ecb.php',
														data :{username:username},
														type: 'POST',
														success: function(resultECB){
															var currentdate = new Date(); 
															var ts = "Downloaded at: " + currentdate.getDate() + "/"
															                + (currentdate.getMonth()+1)  + "/" 
															                + currentdate.getFullYear() + " @ "  
															                + currentdate.getHours() + ":"  
															                + currentdate.getMinutes() + ":" 
															                + currentdate.getSeconds();
															json_to_csv(result,resultCCTV,resultVMS,resultATCC,resultMET,resultECB,true,"Open SR Report",ts);

															// array to csv code to be written here.
															// Only online/offline data to be collected.
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
        $("#downloadReport").click(function() {
                download_report();
        });
});


$(document).ready(function(){
        download_pdf = function(){

			$.ajax({
		    	url: '../utils/get_username.php',
		        success: function(result) {
					username=result;
					window.open("../utils/createreport_existingSR_pdf.php?username=" + result,'_blank');
				}
			});

		}
        $("#downloadPDF").click(function() {
                download_pdf();
        });
});


function json_to_csv(username,resultCCTV1,resultVMS1,resultATCC1,resultMET1,resultECB1,label,title,ts) {
    var resultCCTV = JSON.parse(resultCCTV1);
    var resultVMS = JSON.parse(resultVMS1);
    var resultATCC = JSON.parse(resultATCC1);
    var resultMET = JSON.parse(resultMET1);
    var resultECB = JSON.parse(resultECB1);

    var csv = '';
    csv += 'Downloaded by: '+username+'\r\n';
    csv += ts+'\r\n\n';

    //Title of the csv file, utilize it if needed 
    csv += '\r\n\n'+title + '\r\n\n';

    /*var str1 = resultCCTV.toString();
    csv += str1;

    var str2 = resultVMS.toString();
    csv += str2;

    var str3 = resultATCC.toString();
    csv += str3;

    var str4 = resultMET.toString();
    csv += str4;

    var str5 = resultECB.toString();
    csv += str5;*/
    
    if (label) {
        var row = "";
        for (var index in resultCCTV[0]) {
            row += index + ',';
        }
        row = row.slice(0, -1);
        //new line
        csv += row + '\r\n';
    }

    //Traffic data extraction
    for (var i = 0; i < resultCCTV.length; i++) {
        var row = "";        
        for (var index in resultCCTV[i]) {
            row += '"' + resultCCTV[i][index] + '",';
        }
        row.slice(0, row.length - 1);
        //add a line break after each row
        csv += row + '\r\n';
    }

    // column labels extraction
    if (label) {
        var row = "";
        for (var index in resultVMS[0]) {
            row += index + ',';
        }
        row = row.slice(0, -1);
        //new line
        csv += row + '\r\n';
    }

    //Traffic data extraction
    for (var i = 0; i < resultVMS.length; i++) {
        var row = "";        
        for (var index in resultVMS[i]) {
            row += '"' + resultVMS[i][index] + '",';
        }
        row.slice(0, row.length - 1);
        //add a line break after each row
        csv += row + '\r\n';
    }

    // column labels extraction
    if (label) {
        var row = "";
        for (var index in resultATCC[0]) {
            row += index + ',';
        }
        row = row.slice(0, -1);
        //new line
        csv += row + '\r\n';
    }

    //Traffic data extraction
    for (var i = 0; i < resultATCC.length; i++) {
        var row = "";        
        for (var index in resultATCC[i]) {
            row += '"' + resultATCC[i][index] + '",';
        }
        row.slice(0, row.length - 1);
        //add a line break after each row
        csv += row + '\r\n';
    }

    // column labels extraction
    if (label) {
        var row = "";
        for (var index in resultMET[0]) {
            row += index + ',';
        }
        row = row.slice(0, -1);
        //new line
        csv += row + '\r\n';
    }

    //Traffic data extraction
    for (var i = 0; i < resultMET.length; i++) {
        var row = "";        
        for (var index in resultMET[i]) {
            row += '"' + resultMET[i][index] + '",';
        }
        row.slice(0, row.length - 1);
        //add a line break after each row
        csv += row + '\r\n';
    }

    // column labels extraction
    if (label) {
        var row = "";
        for (var index in resultECB[0]) {
            row += index + ',';
        }
        row = row.slice(0, -1);
        //new line
        csv += row + '\r\n';
    }

    //Traffic data extraction
    for (var i = 0; i < resultECB.length; i++) {
        var row = "";        
        for (var index in resultECB[i]) {
            row += '"' + resultECB[i][index] + '",';
        }
        row.slice(0, row.length - 1);
        //add a line break after each row
        csv += row + '\r\n';
    }

    if (csv == '') {        
        alert("No data found");
        return;
    }

    // file name declaration change accordingly
    var file_name = "sr_report_"+ts;  
    var uri = 'data:text/csv;charset=utf-8,' + escape(csv);    
    var link = document.createElement("a");    
    link.href = uri;
    link.style = "visibility:hidden";
    link.download = file_name + ".csv";    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}