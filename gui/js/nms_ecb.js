$(document).ready(function(){
	fetch_ecbraw = function(){
				$('#nms_ecb').empty();
                $.ajax({
                	url: '../utils/nms_ecb.php',
                	success: function(result) {
						var raw_set = jQuery.parseJSON(result);
                        var faultText = null;
						for(i=raw_set.length-1; i>=0;i--){
                            if(raw_set[i].mst_online_offline === "0"){
                                faultText = '<img src="../images/offline.png"/>';
                            }else{
                                faultText = '<img src="../images/online.png"/>';
                            }
							append = '<tr>'
							append += '<td>'+raw_set[i].mst_chainage+'</td>'
							append += '<td>'+faultText+'</td>'
							append += '<td>'+raw_set[i].mst_onoff_updated_date +'</td>'
							append += '</tr>'
							$('#nms_ecb').append(append);
						}
                	}
                });
        }
    fetch_ecbraw();
    var timeout = setTimeout("location.reload(true);",300000);
});

$(document).ready(function(){
    $.ajax({
        url: '../utils/nms_ecb_devices.php',
        success: function(result) {
            if(result.length == 2){
                alert("Connection Error please try again");
            }
            else{
                var scns = JSON.parse(result);
                $("#scns").append('<option>All</option>');
                for(i=0;i<scns.length;i++){
                    $("#scns").append('<option>'+scns[i].SystemCodeNumber+'</option>');
                }
            }
        }
    });
});


$(document).ready(function(){
        create_report = function(){
            var fromDate=$('#from').val();
            var toDate=$('#to').val();
            var device = document.getElementById("scns").options[document.getElementById("scns").selectedIndex].text;
            var status=$('#status').val();
            if(fromDate == ""){
                alert("Please Enter From Date");
                return;
            }
            if(toDate == ""){
                alert("Please Enter To Date");
                return;
            }
            formatted_fromDate = fromDate.substr(fromDate.lastIndexOf("-")+1,fromDate.length) + "-" + fromDate.substr(fromDate.indexOf("-")+1,fromDate.lastIndexOf("-")-3)+ "-" + fromDate.substr(0,fromDate.indexOf("-"))
            formatted_toDate = toDate.substr(toDate.lastIndexOf("-")+1,toDate.length) + "-" + toDate.substr(toDate.indexOf("-")+1,toDate.lastIndexOf("-")-3)+ "-" + toDate.substr(0,toDate.indexOf("-")) + " 23:59:59"
            if(formatted_fromDate > formatted_toDate){
                alert("From Date should be less than To Date");
                return;
            }
            else{

                $('#searchResult').empty();
                $('#searchResult').append('<tr><td bgcolor="#993232"><font color="white">SCN</td><td bgcolor="#993232"><font color="white">Fault_Text</td><td bgcolor="#993232"><font color="white">Last_Updated</td></tr>');

                $.ajax({
                    url: '../utils/createreport_nms_ecb.php',
                    data :{fromDate:formatted_fromDate,toDate:formatted_toDate,device:device,status:status},
                    type: 'POST',
                    success: function(result) {
                        if(result.length == 2){
                            alert("Connection Error please try again");
                        }
                        else{
                            var devices_set = jQuery.parseJSON(result);
                            if(devices_set.length > 0){
                                for(i=devices_set.length-1; i>=0;i--){
                            
                                    append = '<tr>'
                                    append += '<td>'+devices_set[i].SCN+'</td>'
                                    append += '<td>'+devices_set[i].Fault_Text+'</td>'
                                    append += '<td>'+devices_set[i].Last_Updated+'</td>'
                                    append += '</tr>'

                                    $('#searchResult').append(append);
                                }

                                append += '<tr>'
                                append += '<td colspan="3">&nbsp;</td></tr>'
                                $('#searchResult').append(append);      
                            } else{
                                append = '<tr>'
                                append += '<td colspan="3">No Results</td></tr>'
                                $('#searchResult').append(append);
                            }
                            
                        }
                    }
                });
            }
        }
        $("#createReport").click(function() {
                create_report();
        });
        
});


$(document).ready(function(){
        download_report = function(){
            var fromDate=$('#from').val();
            var toDate=$('#to').val();
            var device = document.getElementById("scns").options[document.getElementById("scns").selectedIndex].text;
            var status=$('#status').val();
            if(fromDate == ""){
				alert("Please Enter From Date");
				return;
			}
			if(toDate == ""){
				alert("Please Enter To Date");
				return;
			}
			//var timerange=$("#timerange :selected").val();
			formatted_fromDate = fromDate.substr(fromDate.lastIndexOf("-")+1,fromDate.length) + "-" + fromDate.substr(fromDate.indexOf("-")+1,fromDate.lastIndexOf("-")-3)+ "-" + fromDate.substr(0,fromDate.indexOf("-"))
			formatted_toDate = toDate.substr(toDate.lastIndexOf("-")+1,toDate.length) + "-" + toDate.substr(toDate.indexOf("-")+1,toDate.lastIndexOf("-")-3)+ "-" + toDate.substr(0,toDate.indexOf("-")) + " 23:59:59"
			if(formatted_fromDate > formatted_toDate){
				alert("From Date should be less than To Date");
				return;
			}
			else{
				$.ajax({
					url: '../utils/createreport_nms_ecb.php',
					data :{fromDate:formatted_fromDate,toDate:formatted_toDate,device:device,status:status},
					type: 'POST',
					success: function(result) {
						if(result.length == 2){
							alert("Connection Error please try again");
						}
						else{
							json_to_csv(result, "Fault Report - ECB", true,fromDate,toDate);
						}
					}
            	});
			}
        }
        $("#downloadReport").click(function() {
                download_report();
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
    for (var i = 0; i < arr_data.length; i++) {
        var row = "";        
        for (var index in arr_data[i]) {
            row += '"' + arr_data[i][index] + '",';
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
    var file_name = "fault_report_ecb_"+fromDate+"_"+toDate;  
    var uri = 'data:text/csv;charset=utf-8,' + escape(csv);    
    var link = document.createElement("a");    
    link.href = uri;
    link.style = "visibility:hidden";
    link.download = file_name + ".csv";    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
