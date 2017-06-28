$( document ).ready(function() {

	goToGroupDetailsPage = function(){
		try{
			var group_scn = $('input[name=groups]:checked').closest('tr').find('td')[3].innerHTML
			location.href = "signal_group_control.html?groupSCN=" + group_scn;
		}
		catch(err){
			alert("Please select a group to fetch details");
		}
	}

	update_modal = function(){
		try{
			var group_scn = $('input[name=groups]:checked').closest('tr').find('td')[3].innerHTML
			var group_name = $('input[name=groups]:checked').closest('tr').find('td')[2].innerHTML
			var group_description = $('input[name=groups]:checked').closest('tr').find('td')[4].innerHTML
			// console.log(group_scn);
			$('.group_scn_update').val(group_scn);
			$('.group_name_update').val(group_name);
			$('.group_description_update').val(group_description);
			// $('.num_plans_drop_update option[value='+num_plans+']').attr("selected", "selected");
			// $('.num_plans_drop_update').change();
			// $('.group_name_update').html(group_name)
			// $.ajax({
			// 	url: '../utils/get_group.php',
			// 	data :{group_id:group_id},
			// 	type: 'POST',
			// 	success: function(result) {
			// 		var plans = jQuery.parseJSON(result)
			// 		for (var i = 0; i < plans.length; i++) {
			// 			var start_time = plans[i].StartTime.substr(0,5)
			// 			var end_time = plans[i].EndTime.substr(0,5)
			// 			$($($($('.plan_config_body_update').find('tr')[i]).find('td')[1]).find('select')[0]).find('option:contains("'+start_time+'")').attr('selected', 'selected')
			// 			$($($($('.plan_config_body_update').find('tr')[i]).find('td')[2]).find('select')[0]).find('option:contains("'+end_time+'")').attr('selected', 'selected')
			// 		}
			// 	}
			// });
			$("#update_modal").modal()
		}
		catch(err){
			alert("Please select a group to edit");
		}
	}
	$('.update_group').click(function(){
		var group_scn = $('.group_scn_update').val();
		var group_name = $('.group_name_update').val();
		var group_description = $('.group_description_update').val();
		var data = {
			group_scn: group_scn,
			group_name: group_name,
			group_description: group_description
		}
		$.ajax({
			url: '../utils/update_group.php',
			data : data,
			type: 'POST',
			success: function(result) {
				if(result.includes("success")){
					alert("Group has been updated successfully");
					location.reload();
					// insert_group(group_name, num_plans, post_times, message);
				}
				else{
					alert("Group Update Failed");
				}
			}
		});
		// var num_plans = $('.num_plans_drop_update').find(":selected").text();
		// var post_times = []
		// var time_arrays = []
		// for(var i=0;i<num_plans;i++){
		// 	var element = document.getElementsByClassName('plan_config_body_update')[0].rows[i]
		// 	var plan_no = element.cells[0].innerHTML
		// 	var start_time = $(element.cells[1]).find(":selected").text()
		// 	var end_time = $(element.cells[2]).find(":selected").text()
		// 	if(start_time == end_time){
		// 		alert("Start Time and End Time cannot be Equal")
		// 		return;
		// 	}
		// 	var start_datetime = new Date('2014','8','2',start_time.split(':')[0],start_time.split(':')[1])
		// 	var end_datetime = new Date('2014','8','2',end_time.split(':')[0],end_time.split(':')[1])
		// 	if(end_datetime < start_datetime){
		// 		alert("End Time cannot be less than Start Time")
		// 		return;
		// 	}
		// 	time_arrays.push([start_datetime, end_datetime])
		// 	post_times.push([start_time, end_time])
		// }
		// var check = false;
		// for (var i = 0; i < time_arrays.length; i++) {
		// 	for (var j = 0; j < time_arrays.length; j++) {
		// 		if(i!=j){
		// 			if(time_arrays[i][0] < time_arrays[j][0] && time_arrays[i][1] > time_arrays[j][0]){
		// 				check = true;
		// 			}
		// 			if(time_arrays[i][0] > time_arrays[j][1] && time_arrays[i][1] < time_arrays[j][1]){
		// 				check = true;
		// 			}
		// 		}
		// 	}
		// }
		// if(check){
		// 	alert("Plan Overlapped, Please Retry")
		// 	return;
		// }
		// var time_config = 0;
		// for (var i = 0; i < time_arrays.length; i++) {
		// 	time_config += time_arrays[i][1]-time_arrays[i][0]
		// }
		// time_config = time_config/3600000
		// if(time_config != 24){ 
		// 	alert("Please Schedule the group for 24 hr.");
		// 	return;
		// }
		// var group_id = $($('input[name=groups]:checked').closest('tr').find('td')[1]).attr('group_id')
		// var group_name = $('input[name=groups]:checked').closest('tr').find('td')[2].innerHTML
		// $.ajax({
		// 	url: '../utils/delete_group.php',
		// 	data :{group_id:group_id},
		// 	type: 'POST',
		// 	success: function(result) {
		// 		if(result.includes("success")){
		// 			var message = "Group has been updated successfully";
		// 			insert_group(group_name, num_plans, post_times, message);
		// 		}
		// 		else{
		// 			alert("Group Update Failed");
		// 		}
		// 	}
		// });
	})
	delete_modal = function(){
		try{
			var group_scn = $('input[name=groups]:checked').closest('tr').find('td')[3].innerHTML
			var group_name = $('input[name=groups]:checked').closest('tr').find('td')[2].innerHTML
			var r = confirm("Do you really want to delete Group: "+ group_name +" ?");
			if (r == true) {
			    $.ajax({
					url: '../utils/delete_group.php',
					data :{group_scn:group_scn},
					type: 'POST',
					success: function(result) {
						if(result.includes("success")){
							alert("Group has been Deleted Successfully");
							location.reload();
						}
						else{
							alert("Group Deleting Failed");
						}
					}
				});
			} else {
			    alert("Delete Aborted");
			}
		}
		catch(err){
			alert("Please select a group to delete");
		}
	}
	$.ajax({
		url: '../utils/group_details.php',
		type: 'POST',
		success: function(result) {
			var signals = jQuery.parseJSON(result)
			// console.log(signals);
			for (var i = 0; i < signals.length; i++) {
				$('.group_table tbody').append('<tr><td colspan="1"><input type="radio" name="groups"></td><td colspan="2">'+(i+1)+'</td><td colspan="4">'+signals[i].Name+'</td><td colspan="4">'+signals[i].SCN+'</td><td colspan="4">'+signals[i].Description+'</td></tr>')
			}
		}
	});
	$('.add_group').click(function(){
		var group_name = $('.group_name').val()
		var group_scn = $('.group_scn').val()
		var group_description = $('.group_description').val()
		if(group_name == ""){
			alert("Please Enter Group Name");
			return;
		}
		// var num_plans = $('.num_plans_drop').find(":selected").text();
		// var post_times = []
		// var time_arrays = []
		// for(var i=0;i<num_plans;i++){
		// 	var element = document.getElementsByClassName('plan_config_body')[0].rows[i]
		// 	var plan_no = element.cells[0].innerHTML
		// 	var start_time = $(element.cells[1]).find(":selected").text()
		// 	var end_time = $(element.cells[2]).find(":selected").text()
		// 	if(start_time == end_time){
		// 		alert("Start Time and End Time cannot be Equal")
		// 		return;
		// 	}
		// 	var start_datetime = new Date('2014','8','2',start_time.split(':')[0],start_time.split(':')[1])
		// 	var end_datetime = new Date('2014','8','2',end_time.split(':')[0],end_time.split(':')[1])
		// 	if(end_datetime < start_datetime){
		// 		alert("End Time cannot be less than Start Time")
		// 		return;
		// 	}
		// 	time_arrays.push([start_datetime, end_datetime])
		// 	post_times.push([start_time, end_time])
		// }
		// var check = false;
		// for (var i = 0; i < time_arrays.length; i++) {
		// 	for (var j = 0; j < time_arrays.length; j++) {
		// 		if(i!=j){
		// 			if(time_arrays[i][0] < time_arrays[j][0] && time_arrays[i][1] > time_arrays[j][0]){
		// 				check = true;
		// 			}
		// 			if(time_arrays[i][0] > time_arrays[j][1] && time_arrays[i][1] < time_arrays[j][1]){
		// 				check = true;
		// 			}
		// 		}
		// 	}
		// }
		// if(check){
		// 	alert("Plan Overlapped, Please Retry")
		// 	return;
		// }
		// var time_config = 0;
		// for (var i = 0; i < time_arrays.length; i++) {
		// 	time_config += time_arrays[i][1]-time_arrays[i][0]
		// }
		// time_config = time_config/3600000
		// if(time_config != 24){ 
		// 	alert("Please Schedule the group for 24 hr.");
		// 	return;
		// }
		$.ajax({
			url: '../utils/check_groupname.php',
			data :{group_scn: group_scn},
			type: 'POST',
			success: function(result) {
				console.log(result);
				if(result != 0){
					alert("Group SCN Already Exists try again.");
					$('.group_scn').val("")
					$('.group_scn').focus();
					return;
				}
				else{
					var message = "Group has been added successfully";
					insert_group(group_name, group_scn, group_description, message);
				}
			}
		});
	});
	insert_group = function(group_name, group_scn, group_description, message){
		// var string = '{'
		// for (var i = 0; i < post_times.length; i++) {
		// 	string += '"'+i+'":'+'{'
		// 	string += '"order":"'+(i+1)+'",'
		// 	string += '"start":"'+post_times[i][0]+'",'
		// 	string += '"end":"'+post_times[i][1]+'"'
		// 	if(i == post_times.length-1){
		// 		string += '}'
		// 	}
		// 	else{
		// 		string += '},'
		// 	}
		// }
		// string += '}'
		$.ajax({
			url: '../utils/add_group.php',
			data :{
				group_name: group_name,
				group_scn: group_scn,
				group_description: group_description
			},
			type: 'POST',
			success: function(result) {
				if(result.includes("success")){
					alert(message);
					location.reload();
				}
				else{
					alert("Server Connection Error");
				}
			}
		});
	}
});