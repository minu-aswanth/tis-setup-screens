function openModal(){
	$("#myModal").modal();
}
function openEditModal() {
	try{
		var profileID = $("input[type='radio'][name='mds']:checked").parent().parent().children()[5].innerHTML
		var scn = $("input[type='radio'][name='mds']:checked").parent().parent().children()[2].innerHTML
		var sh_des = $("input[type='radio'][name='mds']:checked").parent().parent().children()[3].innerHTML
		var ln_des = $("input[type='radio'][name='mds']:checked").parent().parent().children()[4].innerHTML
		
		var sun_from="";
        var sun_to="";
        var mon_from="";
        var mon_to="";
        var tue_from="";
        var tue_to="";
        var wed_from="";
        var wed_to="";
        var thu_from="";
        var thu_to="";
        var fri_from="";
        var fri_to="";
        var sat_from="";
        var sat_to="";
        var road_temp_lb="";
        var road_temp_ub="";
        var road_temp_pr="";
		//var vis_dist_lb="";
        //var vis_dist_ub="";
        //var vis_dist_pr="";
        var ppt_lb="";
        var ppt_ub="";
        var ppt_pr="";
        //var air_temp_lb="";
        //var air_temp_ub="";
        //var air_temp_pr="";
        //var wind_speed_lb="";
        //var wind_speed_ub="";
        //var wind_speed_pr="";
                

        $.ajax({
            url: '../utils/profile_atcc.php',
            data: {profileID:profileID},
            type: 'POST',
            success: function(result) {
                var devices_set = jQuery.parseJSON(result);
                for(i=devices_set.length-1; i>=0;i--){
                    sun_from=devices_set[i].FromTimeSun
                    sun_to=devices_set[i].ToTimeSun
                    mon_from=devices_set[i].FromTimeMon
                    mon_to=devices_set[i].ToTimeMon
                    tue_from=devices_set[i].FromTimeTue
                    tue_to=devices_set[i].ToTimeTue
                    wed_from=devices_set[i].FromTimeWed
                    wed_to=devices_set[i].ToTimeWed
                    thu_from=devices_set[i].FromTimeThu
                    thu_to=devices_set[i].ToTimeThu
                    fri_from=devices_set[i].FromTimeFri
                    fri_to=devices_set[i].ToTimeFri
                    sat_from=devices_set[i].FromTimeSat
                    sat_to=devices_set[i].ToTimeSat
                    road_temp_lb=devices_set[i].TotalFlowLb
			        road_temp_ub=devices_set[i].TotalFlowUb
			        road_temp_pr=devices_set[i].TotalFlowPr
					//vis_dist_lb=devices_set[i].OccupancyLb
			        //vis_dist_ub=devices_set[i].OccupancyUb
			        //vis_dist_pr=devices_set[i].OccupancyPr
			        ppt_lb=devices_set[i].SpeedLb
			        ppt_ub=devices_set[i].SpeedUb
			        ppt_pr=devices_set[i].SpeedPr
			        //air_temp_lb=devices_set[i].HeadwayLb
			        //air_temp_ub=devices_set[i].HeadwayUb
			        //air_temp_pr=devices_set[i].HeadwayPr
			        //wind_speed_lb=devices_set[i].WindSpeedLb
			        //wind_speed_ub=devices_set[i].WindSpeedUb
			        //wind_speed_pr=devices_set[i].WindSpeedPr


                    $("#editModal").modal();
                    $(".modal-body #profileID_modal")[0].innerHTML = profileID
                    $(".modal-body #scn_modal").val(scn)
                    $(".modal-body #shortDescription_modal").val(sh_des)
                    $(".modal-body #longDescription_modal").val(ln_des)
                    $(".modal-body #OTsundayFrom_modal").val(sun_from)
                    $(".modal-body #OTsundayTo_modal").val(sun_to)
                    $(".modal-body #OTmondayFrom_modal").val(mon_from)
                    $(".modal-body #OTmondayTo_modal").val(mon_to)
                    $(".modal-body #OTtuesdayFrom_modal").val(tue_from)
                    $(".modal-body #OTtuesdayTo_modal").val(tue_to)
                    $(".modal-body #OTwednesdayFrom_modal").val(wed_from)
                    $(".modal-body #OTwednesdayTo_modal").val(wed_to)
                    $(".modal-body #OTthursdayFrom_modal").val(thu_from)
                    $(".modal-body #OTthursdayTo_modal").val(thu_to)
                    $(".modal-body #OTfridayFrom_modal").val(fri_from)
                    $(".modal-body #OTfridayTo_modal").val(fri_to)
                    $(".modal-body #OTsaturdayFrom_modal").val(sat_from)
                    $(".modal-body #OTsaturdayTo_modal").val(sat_to)
                    $(".modal-body #lbRoadTemp_modal").val(road_temp_lb)
                    $(".modal-body #ubRoadTemp_modal").val(road_temp_ub)
                    $(".modal-body #prRoadTemp_modal").val(road_temp_pr)
                    //$(".modal-body #lbVisDist_modal").val(vis_dist_lb)
                    //$(".modal-body #ubVisDist_modal").val(vis_dist_ub)
                    //$(".modal-body #prVisDist_modal").val(vis_dist_pr)
                    $(".modal-body #lbPpt_modal").val(ppt_lb)
                    $(".modal-body #ubPpt_modal").val(ppt_ub)
                    $(".modal-body #prPpt_modal").val(ppt_pr)
                    //$(".modal-body #lbAirTemp_modal").val(air_temp_lb)
                    //$(".modal-body #ubAirTemp_modal").val(air_temp_ub)
                    //$(".modal-body #prAirTemp_modal").val(air_temp_pr)
                    //$(".modal-body #lbWindSpeed_modal").val(wind_speed_lb)
                    //$(".modal-body #ubWindSpeed_modal").val(wind_speed_ub)
                    //$(".modal-body #prWindSpeed_modal").val(wind_speed_pr)
                }
            }
        });
    }
    catch(e){
        alert("Please select a profile to edit")
    }
}

function editRow(){
	var profileID=$('#profileID_modal')[0].innerHTML;
	var scn=$('#scn_modal').val();
	var shortDescription=$('#shortDescription_modal').val();
	var longDescription=$('#longDescription_modal').val();
	var sun_from=$('#OTsundayFrom_modal').val();
	var sun_to=$('#OTsundayTo_modal').val();
	var mon_from=$('#OTmondayFrom_modal').val();
	var mon_to=$('#OTmondayTo_modal').val();
	var tue_from=$('#OTtuesdayFrom_modal').val();
	var tue_to=$('#OTtuesdayTo_modal').val();
	var wed_from=$('#OTwednesdayFrom_modal').val();
	var wed_to=$('#OTwednesdayTo_modal').val();
	var thu_from=$('#OTthursdayFrom_modal').val();
	var thu_to=$('#OTthursdayTo_modal').val();
	var fri_from=$('#OTfridayFrom_modal').val();
	var fri_to=$('#OTfridayTo_modal').val();
	var sat_from=$('#OTsaturdayFrom_modal').val();
	var sat_to=$('#OTsaturdayTo_modal').val();
	var RoadTempLb=$('#lbRoadTemp_modal').val();
	var RoadTempUb=$('#ubRoadTemp_modal').val();
	var RoadTempPr=$('#prRoadTemp_modal').val();
	//var VisibilityDistLb=$('#lbVisDist_modal').val();
	//var VisibilityDistUb=$('#ubVisDist_modal').val();
	//var VisibilityDistPr=$('#prVisDist_modal').val();
	var PrecipitationLb=$('#lbPpt_modal').val();
	var PrecipitationUb=$('#ubPpt_modal').val();
	var PrecipitationPr=$('#prPpt_modal').val();
	//var AirTempLb=$('#lbAirTemp_modal').val();
	//var AirTempUb=$('#ubAirTemp_modal').val();
	//var AirTempPr=$('#prAirTemp_modal').val();
	//var WindSpeedLb=$('#lbWindSpeed_modal').val();
	//var WindSpeedUb=$('#ubWindSpeed_modal').val();
	//var WindSpeedPr=$('#prWindSpeed_modal').val();	

	$.ajax({
		url: '../utils/edit_profile_atcc.php',
		data :{profileID:profileID,scn:scn,shortDescription:shortDescription,longDescription:longDescription,sun_from:sun_from,sun_to:sun_to,mon_from:mon_from,mon_to:mon_to,tue_from:tue_from,tue_to:tue_to,wed_from:wed_from,wed_to:wed_to,thu_from:thu_from,thu_to:thu_to,fri_from:fri_from,fri_to:fri_to,sat_from:sat_from,sat_to:sat_to,RoadTempLb:RoadTempLb,RoadTempUb:RoadTempUb,RoadTempPr:RoadTempPr,PrecipitationLb:PrecipitationLb,PrecipitationUb:PrecipitationUb,PrecipitationPr:PrecipitationPr},
		type: 'POST',
		success: function(result) {
			$("#cancelModal_edit").click();
			alert("Selected Profile has been edited")
			fetch_devices();
		}
	});
}
function deleteRow() {
	try{
		var profileID = $("input[type='radio'][name='mds']:checked").parent().parent().children()[5].innerHTML
		$.ajax({
				url: '../utils/del_profile_atcc.php',
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
		alert("Please select a device to delete")
	}
}
		
$(document).ready(function(){
        fetchdata = function(){
            var scn=$('#scn').val();
			var shortDescription=$('#shortDescription').val();
			var longDescription=$('#longDescription').val();
			
			var sun_from=$('#OTsundayFrom').val();
			var sun_to=$('#OTsundayTo').val();
			var mon_from=$('#OTmondayFrom').val();
			var mon_to=$('#OTmondayTo').val();
			var tue_from=$('#OTtuesdayFrom').val();
			var tue_to=$('#OTtuesdayTo').val();
			var wed_from=$('#OTwednesdayFrom').val();
			var wed_to=$('#OTwednesdayTo').val();
			var thu_from=$('#OTthursdayFrom').val();
			var thu_to=$('#OTthursdayTo').val();
			var fri_from=$('#OTfridayFrom').val();
			var fri_to=$('#OTfridayTo').val();
			var sat_from=$('#OTsaturdayFrom').val();
			var sat_to=$('#OTsaturdayTo').val();
			var RoadTempLb=$('#lbRoadTemp').val();
			var RoadTempUb=$('#ubRoadTemp').val();
			var RoadTempPr=$('#prRoadTemp').val();
			//var VisibilityDistLb=$('#lbVisDist').val();
			//var VisibilityDistUb=$('#ubVisDist').val();
			//var VisibilityDistPr=$('#prVisDist').val();
			var PrecipitationLb=$('#lbPpt').val();
			var PrecipitationUb=$('#ubPpt').val();
			var PrecipitationPr=$('#prPpt').val();
			//var AirTempLb=$('#lbAirTemp').val();
			//var AirTempUb=$('#ubAirTemp').val();
			//var AirTempPr=$('#prAirTemp').val();
			//var WindSpeedLb=$('#lbWindSpeed').val();
			//var WindSpeedUb=$('#ubWindSpeed').val();
			//var WindSpeedPr=$('#prWindSpeed').val();

			if (sun_from == ""){
                sun_from = "00:00";
            }
            if (sun_to == ""){
                sun_to = "23:59";
            }
            if (mon_from == ""){
                mon_from = "00:00";
            }
            if (mon_to == ""){
                mon_to = "23:59";
            }
            if (tue_from == ""){
                tue_from = "00:00";
            }
            if (tue_to == ""){
                tue_to = "23:59";
            }
            if (wed_from == ""){
                wed_from = "00:00";
            }
            if (wed_to == ""){
                wed_to = "23:59";
            }
            if (thu_from == ""){
                thu_from = "00:00";
            }
            if (thu_to == ""){
                thu_to = "23:59";
            }
            if (fri_from == ""){
                fri_from = "00:00";
            }
            if (fri_to == ""){
                fri_to = "23:59";
            }
            if (sat_from == ""){
                sat_from = "00:00";
            }
            if (sat_to == ""){
                sat_to = "23:59";
            }

			$.ajax({
				url: '../utils/add_profile_atcc.php',
				data :{scn:scn,shortDescription:shortDescription,longDescription:longDescription,sun_from:sun_from,sun_to:sun_to,mon_from:mon_from,mon_to:mon_to,tue_from:tue_from,tue_to:tue_to,wed_from:wed_from,wed_to:wed_to,thu_from:thu_from,thu_to:thu_to,fri_from:fri_from,fri_to:fri_to,sat_from:sat_from,sat_to:sat_to,RoadTempLb:RoadTempLb,RoadTempUb:RoadTempUb,RoadTempPr:RoadTempPr,PrecipitationLb:PrecipitationLb,PrecipitationUb:PrecipitationUb,PrecipitationPr:PrecipitationPr},
				type: 'POST',
				success: function(result) {
					$("#cancelModal").click();
					alert("New Profile has been added")
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
		var profileID="";
		$('#profile_atcc').empty();
        $.ajax({
        	url: '../utils/profile_atcc.php',
        	data:{profileID:profileID},
        	type:'POST',
        	success: function(result) {
				var devices_set2 = jQuery.parseJSON(result);
				for(i=devices_set2.length-1; i>=0;i--){
					append = '<tr>'
					append += '<td><input type="radio" name="mds"></td>'
					append += '<td>'+(devices_set2.length - i)+'</td>'
					append += '<td>'+devices_set2[i].SystemCodeNumber+'</td>'
					append += '<td>'+devices_set2[i].ShortDescription+'</td>'
					append += '<td>'+devices_set2[i].LongDescription+'</td>'
					append += '<td style="display:none;">'+devices_set2[i].ProfileId+'</td>'
					append += '</tr>'
					$('#profile_atcc').append(append);
				}
        	}
        });
        }
    fetch_devices();
});

$(document).ready(function(){
	$('#scn').empty();

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
					$('#scn').append(append);
				}				
			}
	    });
});

