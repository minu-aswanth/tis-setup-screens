$(document).ready(function() {

	var groupSCN = window.location.href.split('=')[1];
	console.log(groupSCN);

	//getting all signals initially to display in the table
	$.ajax({
		url: '../utils/get_signals_in_group.php',
		type: 'POST',
		data: {
			group_scn: groupSCN
		},
		success: function(result) {
			var addedSignals = $.parseJSON(result);
			console.log(addedSignals);
			for (var i = 0; i < addedSignals.length; i++) {
				$('.signal_table tbody').append('<tr><td colspan="1"><input type="radio" name="groups"></td><td colspan="2">'+(i+1)+'</td><td colspan="4">'+addedSignals[i].SCN+'</td><td colspan="4">'+addedSignals[i].ShortDescription+'</td></tr>');
			}
		}
	});

	//getting all signals to display for the select
	$.ajax({
		url: '../utils/get_ungrouped_signals.php',
		type: 'POST',
		success: function(result) {
			var signals = $.parseJSON(result);
			console.log(signals);
			for (var i = 0; i < signals.length; i++) {
				$('.signal_scn_select').append('<option value='+ signals[i].SCN +'>'+ signals[i].SCN +'</option>')
			}
		}
	});

	//adding a new signal
	$('.add_signal').click(function(){
		var signal_scn = $('.signal_scn_select').val();
		var data = {
			signal_scn: signal_scn,
			group_scn: groupSCN
		}
		$.ajax({
			url: '../utils/update_signal_group.php',
			data: data,
			type: 'POST',
			success: function(result) {
				if(result.includes("success")){
					alert("Successfully added signal");
					location.reload();
				}
				else{
					alert("Some error occured. Please try again");
				}
			}
		});
	});

	//removing a signal from signal group
	delete_signal_modal = function(){
		var signal_scn = $('input[name=groups]:checked').closest('tr').find('td')[2].innerHTML;
		// console.log(signal_scn);
		$.ajax({
			url: '../utils/remove_signal_from_group.php',
			data :{signal_scn:signal_scn},
			type: 'POST',
			success: function(result) {
				if(result.includes("success")){
					alert("Signal removed successfully");
					location.reload();
				}
				else{
					alert("Some error occured. Please try again");
				}
			}
		});
	}



	//adding a new timetable
	$('.add_timetable').click(function(){
		var timetable_scn = $('.timetable_scn').val();
		var num_plans = $('.num_plans_drop').find(":selected").text();
		var post_times = []
		var time_arrays = []
		for(var i=0;i<num_plans;i++){
			var element = document.getElementsByClassName('plan_config_body')[0].rows[i]
			var plan_no = element.cells[0].innerHTML
			var start_time = $(element.cells[1]).find(":selected").text()
			var end_time = $(element.cells[2]).find(":selected").text()
			if(start_time == end_time){
				alert("Start Time and End Time cannot be Equal")
				return;
			}
			var start_datetime = new Date('2014','8','2',start_time.split(':')[0],start_time.split(':')[1])
			var end_datetime = new Date('2014','8','2',end_time.split(':')[0],end_time.split(':')[1])
			if(end_datetime < start_datetime){
				alert("End Time cannot be less than Start Time")
				return;
			}
			time_arrays.push([start_datetime, end_datetime])
			post_times.push([start_time, end_time])
		}
		var check = false;
		for (var i = 0; i < time_arrays.length; i++) {
			for (var j = 0; j < time_arrays.length; j++) {
				if(i!=j){
					if(time_arrays[i][0] < time_arrays[j][0] && time_arrays[i][1] > time_arrays[j][0]){
						check = true;
					}
					if(time_arrays[i][0] > time_arrays[j][1] && time_arrays[i][1] < time_arrays[j][1]){
						check = true;
					}
				}
			}
		}
		if(check){
			alert("Plan Overlapped, Please Retry")
			return;
		}
		var time_config = 0;
		for (var i = 0; i < time_arrays.length; i++) {
			time_config += time_arrays[i][1]-time_arrays[i][0]
		}
		time_config = time_config/3600000
		if(time_config != 24){ 
			alert("Please Schedule the group for 24 hr.");
			return;
		}
		$.ajax({
			url: '../utils/add_timetable.php',
			data :{
				group_scn: groupSCN,
				timetable_scn: timetable_scn,
				time_slots: post_times
			},
			type: 'POST',
			success: function(result) {
				if(result.includes("success")){
					alert("Signal removed successfully");
					location.reload();
				}
				else{
					alert("Some error occured. Please try again");
				}
			}
		});
	});

	// update_timetable_modal = function(){
	// 	try{
	// 		var group_name = $('input[name=groups]:checked').closest('tr').find('td')[2].innerHTML
	// 		var num_plans = $('input[name=groups]:checked').closest('tr').find('td')[3].innerHTML
	// 		$('.num_plans_drop_update option[value='+num_plans+']').attr("selected", "selected");
	// 		$('.num_plans_drop_update').change();
	// 		$('.group_name_update').html(group_name)
	// 		$.ajax({
	// 			url: '../utils/get_group.php',
	// 			data :{group_id:group_id},
	// 			type: 'POST',
	// 			success: function(result) {
	// 				var plans = jQuery.parseJSON(result)
	// 				for (var i = 0; i < plans.length; i++) {
	// 					var start_time = plans[i].StartTime.substr(0,5)
	// 					var end_time = plans[i].EndTime.substr(0,5)
	// 					$($($($('.plan_config_body_update').find('tr')[i]).find('td')[1]).find('select')[0]).find('option:contains("'+start_time+'")').attr('selected', 'selected')
	// 					$($($($('.plan_config_body_update').find('tr')[i]).find('td')[2]).find('select')[0]).find('option:contains("'+end_time+'")').attr('selected', 'selected')
	// 				}
	// 			}
	// 		});
	// 		$("#update_timetable_modal").modal()
	// 	}
	// 	catch(err){
	// 		alert("Please select a group to edit");
	// 	}
	// }


	//not used yet
	//to get details and display in the update bus modal
	update_bus_modal = function(){
		var bus_registration_number = $('input[name=groups]:checked').closest('tr').find('td')[2].innerHTML;
		var depo_id = $('input[name=groups]:checked').closest('tr').find('td')[3].innerHTML;
		var scu_phone_number = $('input[name=groups]:checked').closest('tr').find('td')[5].innerHTML;
		console.log(depo_id);
		$('.bus_registration_number_update').val(bus_registration_number);
		$('.depo_name_select_update').val(depo_id);
		$('.scu_phone_number_update').val(scu_phone_number);
		$("#update_bus_modal").modal();
	}

	//button to update buses
	$('.update_bus').click(function(){
		var bus_registration_number = $('.bus_registration_number_update').val();
		var depo_id = $('.depo_name_select_update').val();
		var scu_phone_number = $('.scu_phone_number_update').val();
		var data = {
			regno: bus_registration_number,
			phoneno: scu_phone_number,
			depoid: depo_id
		}
		$.ajax({
			url: 'utils/update_bus.php',
			data: data,
			type: 'POST',
			success: function(result) {
				if(result.includes("success")){
					alert("Bus updated successfully");
					location.reload();
				}
				else{
					alert("Some error occured. Please try again");
				}
			}
		});
	})

	//gets triggered when delete bus button is clicked
	delete_bus_modal = function(){
		var bus_registration_number = $('input[name=groups]:checked').closest('tr').find('td')[2].innerHTML;
		$.ajax({
			url: 'utils/delete_bus.php',
			data :{regno:bus_registration_number},
			type: 'POST',
			success: function(result) {
				if(result.includes("success")){
					alert("Bus deleted successfully");
					location.reload();
				}
				else{
					alert("Some error occured. Please try again");
				}
			}
		});
	}

	//adding a new bus
	$('.add_depo').click(function(){
		var depo_name = $('.depo_name').val();
		var depo_lat = $('.depo_lat').val();
		var depo_long = $('.depo_long').val();
		var operator_phone_numbers = $('.operator_phone_numbers').val();
		var data = {
			name: depo_name,
			latitude: depo_lat,
			longitude: depo_long,
			contactno: operator_phone_numbers
		}
		$.ajax({
			url: 'utils/add_depo.php',
			data: data,
			type: 'POST',
			success: function(result) {
				if(result.includes("success")){
					alert("Successfully added depo");
					location.reload();
				}
				else{
					alert("Some error occured. Please try again");
				}
			}
		});
	});

	//to get details and display in the update depo modal
	update_depo_modal = function(){
		var depo_name = $('input[name=groups]:checked').closest('tr').find('td')[2].innerHTML;
		var depo_id = $('input[name=groups]:checked').closest('tr').find('td')[3].innerHTML;
		var depo_lat = $('input[name=groups]:checked').closest('tr').find('td')[4].innerHTML;
		var depo_long = $('input[name=groups]:checked').closest('tr').find('td')[5].innerHTML;
		var operator_phone_numbers = $('input[name=groups]:checked').closest('tr').find('td')[6].innerHTML;
		console.log(depo_id);
		$('.depo_id_update').val(depo_id);
		$('.depo_name_update').val(depo_name);
		$('.depo_lat_update').val(depo_lat);
		$('.depo_long_update').val(depo_long);
		$('.operator_phone_numbers_update').val(operator_phone_numbers);
		$("#update_depo_modal").modal();
	}

	//button to update buses
	$('.update_depo').click(function(){
		var depo_name = $('.depo_name_update').val();
		var depo_id = $('.depo_id_update').val();
		var depo_lat = $('.depo_lat_update').val();
		var depo_long = $('.depo_long_update').val();
		var operator_phone_numbers = $('.operator_phone_numbers_update').val();
		var data = {
			depoid: depo_id,
			name: depo_name,
			latitude: depo_lat,
			longitude: depo_long,
			contactno: operator_phone_numbers
		}
		$.ajax({
			url: 'utils/update_depo.php',
			data: data,
			type: 'POST',
			success: function(result) {
				if(result.includes("success")){
					alert("Depo updated successfully");
					location.reload();
				}
				else{
					alert("Some error occured. Please try again");
				}
			}
		});
	})

	//gets triggered when delete depo button is clicked
	delete_depo_modal = function(){
		var depo_id = $('input[name=groups]:checked').closest('tr').find('td')[3].innerHTML;
		$.ajax({
			url: 'utils/delete_depo.php',
			data :{depoid:depo_id},
			type: 'POST',
			success: function(result) {
				if(result.includes("success")){
					alert("Depo deleted successfully");
					location.reload();
				}
				else{
					alert("Some error occured. Please try again");
				}
			}
		});
	}

});