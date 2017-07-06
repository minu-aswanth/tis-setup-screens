$(document).ready(function() {

	var groupSCN = window.location.href.split('=')[1];
	// console.log(groupSCN);
	var allSignalsSCN = [];
	var planScns = '';
	var startingTimetableCount = 0;
	var signalOptions = '';

	//getting all signals initially to display in the table
	$.ajax({
		url: '../utils/get_signals_in_group.php',
		type: 'POST',
		data: {
			group_scn: groupSCN
		},
		success: function(result) {
			var addedSignals = $.parseJSON(result);
			// console.log(addedSignals);
			for (var i = 0; i < addedSignals.length; i++) {
				signalOptions += '<option value="'+ addedSignals[i].SCN +'">'+ addedSignals[i].SCN +'</option>'
				allSignalsSCN.push(addedSignals[i].SCN);
			}
			$('.offset_info_container').append('<table class="table table-bordered"><thead><tr><td colspan="1">Signal 1</td><td colspan="1">Signal 2</td><td colspan="1">Offset time(in seconds)</td></tr></thead><tbody class="offset_info_container_tbody"></tbody></table>')
			$('.offset_info_container_update').append('<table class="table table-bordered"><thead><tr><td colspan="1">Signal 1</td><td colspan="1">Signal 2</td><td colspan="1">Offset time(in seconds)</td></tr></thead><tbody class="offset_info_container_update_tbody"></tbody></table>')
			for (var i = 0; i < addedSignals.length; i++) {
				$('.signal_table tbody').append('<tr><td colspan="1"><input type="radio" name="groups"></td><td colspan="2">'+(i+1)+'</td><td colspan="4">'+addedSignals[i].SCN+'</td><td colspan="4">'+addedSignals[i].ShortDescription+'</td></tr>');				
				if(i==0){
					var divs = '<div id="up_menu'+i+'" class="tab-pane fade active in"><table class="table table-bordered"><thead><tr><td colspan="1">Stage</td><td colspan="1">Time(in seconds)</td></tr></thead><tbody class="up_stage_timings"></tbody></table><h3>Interstage Timings</h3><table class="table table-bordered"><thead><tr><td colspan="1">Start Stage</td><td colspan="1">End Stage</td><td colspan="1">Time(in seconds)</td></tr></thead><tbody class="inter_stage_timings"></tbody></table></div>'
					var divs_update = '<div id="up_menu_update'+i+'" class="tab-pane fade active in"><table class="table table-bordered"><thead><tr><td colspan="1">Stage</td><td colspan="1">Time(in seconds)</td></tr></thead><tbody class="up_stage_timings"></tbody></table><h3>Interstage Timings</h3><table class="table table-bordered"><thead><tr><td colspan="1">Start Stage</td><td colspan="1">End Stage</td><td colspan="1">Time(in seconds)</td></tr></thead><tbody class="inter_stage_timings"></tbody></table></div>'
					$('.up_tab').append(divs)
					$('.up_tab_update').append(divs_update)
					$('.up_phases_tabs').append('<li class="active"><a data-toggle="pill" signal-id='+ addedSignals[i].SignalID +' href="#up_menu0">'+addedSignals[i].SCN+'</a></li>')
					$('.up_phases_tabs_update').append('<li class="active"><a data-toggle="pill" signal-id='+ addedSignals[i].SignalID +' href="#up_menu_update0">'+addedSignals[i].SCN+'</a></li>')
				}
				else{
					$('.offset_info_container_tbody').append('<tr><td><select>'+ signalOptions +'</select></td><td><select>'+ signalOptions +'</select></td><td><input style="width:150px" type="number"></td></tr>');
					$('.offset_info_container_update_tbody').append('<tr><td><select>'+ signalOptions +'</select></td><td><select>'+ signalOptions +'</select></td><td><input style="width:150px" type="number"></td></tr>');
					var divs = '<div id="up_menu'+i+'" class="tab-pane fade"><table class="table table-bordered"><thead><tr><td colspan="1">Stage</td><td colspan="1">Time(in seconds)</td></tr></thead><tbody class="up_stage_timings"></tbody></table><h3>Interstage Timings</h3><table class="table table-bordered"><thead><tr><td colspan="1">Start Stage</td><td colspan="1">End Stage</td><td colspan="1">Time(in seconds)</td></tr></thead><tbody class="inter_stage_timings"></tbody></table></div>'
					var divs_update = '<div id="up_menu_update'+i+'" class="tab-pane fade"><table class="table table-bordered"><thead><tr><td colspan="1">Stage</td><td colspan="1">Time(in seconds)</td></tr></thead><tbody class="up_stage_timings"></tbody></table><h3>Interstage Timings</h3><table class="table table-bordered"><thead><tr><td colspan="1">Start Stage</td><td colspan="1">End Stage</td><td colspan="1">Time(in seconds)</td></tr></thead><tbody class="inter_stage_timings"></tbody></table></div>'
					$('.up_tab').append(divs)
					$('.up_tab_update').append(divs_update)
					$('.up_phases_tabs').append('<li><a data-toggle="pill" signal-id='+ addedSignals[i].SignalID +' href="#up_menu'+i+'">'+addedSignals[i].SCN+'</a></li>')
					$('.up_phases_tabs_update').append('<li><a data-toggle="pill" signal-id='+ addedSignals[i].SignalID +' href="#up_menu_update'+i+'">'+addedSignals[i].SCN+'</a></li>')
				}
				for (var j = 1; j <= addedSignals[i].StagesNumber; j++) {
					$('#up_menu' + i).find('.up_stage_timings').append('<tr><td colspan="1">Stage - '+j+'</td><td colspan="1"><input type="number" placeholder="Enter Stage '+j+' Time" class="up_stage_'+j+'"</td></tr>');		
					if(j != addedSignals[i].StagesNumber){
						$('#up_menu' + i).find('.inter_stage_timings').append('<tr><td colspan="1">Stage - '+j+'</td><td colspan="1">Stage - '+(j+1)+'</td><td colspan="1"><input style="width:150px" type="number" placeholder="Enter Interstage Time" class="inter_stage_'+j+'"</td></tr>');		
						$('#up_menu_update' + i).find('.inter_stage_timings').append('<tr><td colspan="1">Stage - '+j+'</td><td colspan="1">Stage - '+(j+1)+'</td><td colspan="1"><input style="width:150px" type="number" placeholder="Enter Interstage Time" class="inter_stage_'+j+'"</td></tr>');		
					}
					else{
						$('#up_menu' + i).find('.inter_stage_timings').append('<tr><td colspan="1">Stage - '+j+'</td><td colspan="1">Stage - '+1+'</td><td colspan="1"><input style="width:150px" type="number" placeholder="Enter Interstage Time" class="inter_stage_'+j+'"</td></tr>');		
						$('#up_menu_update' + i).find('.inter_stage_timings').append('<tr><td colspan="1">Stage - '+j+'</td><td colspan="1">Stage - '+1+'</td><td colspan="1"><input style="width:150px" type="number" placeholder="Enter Interstage Time" class="inter_stage_'+j+'"</td></tr>');		
					}
					$('#up_menu_update' + i).find('.up_stage_timings').append('<tr><td colspan="1">Stage - '+j+'</td><td colspan="1"><input type="number" placeholder="Enter Stage '+j+' Time" class="up_stage_'+j+'"</td></tr>');		
				}
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
		// var plan_scn = $(".plan_scn").val();
		// var cycle_time = $(".cycle_time").val();
		// if(cycle_time == ""){
		// 	alert("Please Enter Cycle Time");
		// 	return false;
		// }
		// var stages_info = [];
		// var offset_info = [];
		// var allSignalsInPlan = [];
		
		var count = 0;
		var plan_info = [];
		var check = 0;
		$($(".up_phases_tabs_signal").find('a')).each(function(){
			var plan_scn = this.innerHTML;
			var cycle_time = $("#up_menu_signal" + count).attr("cycle-time");
			console.log(cycle_time);
			var obj = {};
			obj.plan_scn = plan_scn;
			var totalTime = 0;
			var timings = [];
			var inter_stage_timings = [];
			$($("#up_menu_signal" + count + " .up_stage_timings_signal").find('input')).each(function(){
				// console.log($(this).val());
				timings.push($(this).val());
				totalTime += parseInt($(this).val());
			});
			// // console.log(totalTime);
			if(totalTime != cycle_time){
				check = 1;
				alert("The sum of stage times is not equal to the cycle time");
				return false;
			}
			$($("#up_menu_signal" + count + " .inter_stage_timings_signal").find('input')).each(function(){
				inter_stage_timings.push($(this).val());
			});
			obj.timings = timings;
			obj.inter_stage_timings = inter_stage_timings;
			var obj2 = {};
			var start_signal_scn = $("#up_menu_signal" + count + " .offset_start_signal").val();
			var end_signal_scn = $("#up_menu_signal" + count + " .offset_end_signal").val();
			var offset_time = $("#up_menu_signal" + count + " .offset_time_signal").val();	
			if(start_signal_scn == end_signal_scn){
				check = 1;
				alert("Start and end signal cannot be same");
				return false;
			}
			if(offset_time == ""){
				check = 1;
				alert("Please Enter Offset Time");
				return false;
			}
			if(start_signal_scn != signal_scn && end_signal_scn != signal_scn){
				check = 1;
				alert("Offset information is insufficient");
				return false;
			}
			obj2.start_signal_scn = start_signal_scn;
			obj2.end_signal_scn = end_signal_scn;
			obj2.offset_time = offset_time;
			obj.offset_info = obj2;
			plan_info.push(obj);			
			count++;
		});
		// console.log(plan_info);
		if(check == 0){
			$.ajax({
				url: '../utils/update_signal_group.php',
				data: {
					signal_scn: signal_scn,
					group_scn: groupSCN,
					plan_info: JSON.stringify(plan_info)
				},
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
		}		
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

	//getting timetable to display
	$.ajax({
		url: '../utils/get_time_table_list.php',
		type: 'POST',
		data: {
			group_scn: groupSCN
		},
		success: function(result) {
			// console.log("allo");
			var timetables = jQuery.parseJSON(result)
			// console.log(timetables);
			var rows = '';
			for (var i = 0; i < timetables.length; i++) {
				rows += '<tr><td colspan="1"><input type="radio" name="groups"></td><td colspan="2">'+(i+1)+'</td><td colspan="4">'+timetables[i].timetable_scn+'</td><td colspan="4">'
				for(var j = 0; j < timetables[i].time_slots.length; j++)
					rows += '<span class="timetable_timings">' + timetables[i].time_slots[j][0] + ' to ' + timetables[i].time_slots[j][1] + '</span> '
				rows+='</td></tr>'
				$('.timetable_scn_select').append('<option value="'+ timetables[i].timetable_scn +'">'+ timetables[i].timetable_scn +'</option>')
				$('.timetable_scn_select_event').append('<option value="'+ timetables[i].timetable_scn +'">'+ timetables[i].timetable_scn +'</option>')
				$('.timetable_scn_select_update').append('<option value="'+ timetables[i].timetable_scn +'">'+ timetables[i].timetable_scn +'</option>')
				$('.timetable_scn_select_event_update').append('<option value="'+ timetables[i].timetable_scn +'">'+ timetables[i].timetable_scn +'</option>')
			}
			$('.timetable_table tbody').append(rows);
			$('.timetable_scn_select').change();
			$('.timetable_scn_select_event').change();
		}
	});

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
				time_slots: JSON.stringify(post_times)
			},
			type: 'POST',
			success: function(result) {
				if(result.includes("success")){
					alert("Timetable added successfully");
					location.reload();
				}
				else{
					alert("Some error occured. Please try again");
				}
			}
		});
	});

	update_timetable_modal = function(){
		try{
			var timetable_scn = $('input[name=groups]:checked').closest('tr').find('td')[2].innerHTML
			var spans = $('input[name=groups]:checked').closest('tr').find('span')
			// console.log(spans);
			var num_plans = spans.length;
			$('.num_plans_drop_update option[value='+num_plans+']').attr("selected", "selected");
			$('.num_plans_drop_update').change();
			$('.timetable_scn_update').val(timetable_scn);
			for (var i = 0; i < spans.length; i++) {
				// console.log(spans[i].innerHTML.split(" to ")[1]);
				var start_time = spans[i].innerHTML.split(" to ")[0]
				var end_time = spans[i].innerHTML.split(" to ")[1]
				$($($($('.plan_config_body_update').find('tr')[i]).find('td')[1]).find('select')[0]).find('option:contains("'+start_time+'")').attr('selected', 'selected')
				$($($($('.plan_config_body_update').find('tr')[i]).find('td')[2]).find('select')[0]).find('option:contains("'+end_time+'")').attr('selected', 'selected')
			}
			$("#update_timetable_modal").modal()
		}
		catch(err){
			alert("Please select a timetable to edit");
		}
	}

	$('.update_timetable').click(function(){
		var timetable_scn = $('.timetable_scn_update').val();
		var num_plans = $('.num_plans_drop_update').find(":selected").text();
		var post_times = []
		var time_arrays = []
		for(var i=0;i<num_plans;i++){
			var element = document.getElementsByClassName('plan_config_body_update')[0].rows[i]
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
			url: '../utils/update_time_table.php',
			data :{
				group_scn: groupSCN,
				timetable_scn: timetable_scn,
				time_slots: JSON.stringify(post_times)
			},
			type: 'POST',
			success: function(result) {
				if(result.includes("success")){
					alert("Timetable updated successfully");
					location.reload();
				}
				else{
					alert("Some error occured. Please try again");
				}
			}
		});
	})

	delete_timetable_modal = function(){
		try{
			var timetable_scn = $('input[name=groups]:checked').closest('tr').find('td')[2].innerHTML;
			$.ajax({
				url: '../utils/delete_time_table.php',
				data :{
					group_scn: groupSCN,
					timetable_scn:timetable_scn
				},
				type: 'POST',
				success: function(result) {
					if(result.includes("success")){
						alert("Timetable deleted successfully");
						location.reload();
					}
					else{
						alert("Some error occured. Please try again");
					}
				}
			});
		}
		catch(err){
			alert("Please select a timetable to delete");
		}
	}

	//getting all plans
	$.ajax({
		url: '../utils/get_plan_list.php',
		type: 'POST',
		data: {
			group_scn: groupSCN
		},
		success: function(result) {
			var plans = jQuery.parseJSON(result)
			console.log(plans);
			if(plans.length == 0){
				$("#new_signal_existing_plan_div").css('display', 'none');
			}
			for (var i = 0; i < plans.length; i++) {
				if(i == 0){
					var divs = '<div id="up_menu_signal'+i+'" cycle-time="'+ plans[i].CycleTime +'" class="tab-pane fade active in"><p>Cycle time: '+ plans[i].CycleTime +' seconds</p><table class="table table-bordered"><thead><tr><td colspan="1">Stage</td><td colspan="1">Time(in seconds)</td></tr></thead><tbody class="up_stage_timings_signal"></tbody></table><h3>Interstage Timings</h3><table class="table table-bordered"><thead><tr><td colspan="1">Start Stage</td><td colspan="1">End Stage</td><td colspan="1">Time(in seconds)</td></tr></thead><tbody class="inter_stage_timings_signal"></tbody></table><h3>Offset Information</h3><div class="offset_info_container_signal'+ i +'"><table class="table table-bordered"><thead><tr><td colspan="1">Signal 1</td><td colspan="1">Signal 2</td><td colspan="1">Offset time(in seconds)</td></tr></thead><tbody>';
					for(var j = 0; j < plans[i].Offsets.length; j++)
						divs += '<tr><td><input type="text" disabled value="'+ plans[i].Offsets[j].Origin_Signal_SCN +'"></td><td><input type="text" disabled value="'+ plans[i].Offsets[j].Destination_Signal_SCN +'"></td><td><input style="width:150px" disabled type="number" value="'+ plans[i].Offsets[j].OffsetTime +'"></td></tr>';
					divs += '<tr><td><select class="offset_start_signal">' + signalOptions + '</select></td><td><select class="offset_end_signal">' + signalOptions + '</select></td><td><input class="offset_time_signal" style="width:150px" type="number"></td></tr>';
					divs += '</tbody></table></div></div>'
					$('.up_tab_signal').append(divs)
					$('.up_phases_tabs_signal').append('<li class="active"><a data-toggle="pill" href="#up_menu_signal'+i+'">'+plans[i].PlanSCN+'</a></li>')
				}
				else{
					var divs = '<div id="up_menu_signal'+i+'" cycle-time="'+ plans[i].CycleTime +'" class="tab-pane fade"><p>Cycle time: '+ plans[i].CycleTime +' seconds</p><table class="table table-bordered"><thead><tr><td colspan="1">Stage</td><td colspan="1">Time(in seconds)</td></tr></thead><tbody class="up_stage_timings_signal"></tbody></table><h3>Interstage Timings</h3><table class="table table-bordered"><thead><tr><td colspan="1">Start Stage</td><td colspan="1">End Stage</td><td colspan="1">Time(in seconds)</td></tr></thead><tbody class="inter_stage_timings_signal"></tbody></table><h3>Offset Information</h3><div class="offset_info_container_signal'+ i +'"><table class="table table-bordered"><thead><tr><td colspan="1">Signal 1</td><td colspan="1">Signal 2</td><td colspan="1">Offset time(in seconds)</td></tr></thead><tbody>';
					for(var j = 0; j < plans[i].Offsets.length; j++)
						divs += '<tr><td><input type="text" disabled value="'+ plans[i].Offsets[j].Origin_Signal_SCN +'"></td><td><input type="text" disabled value="'+ plans[i].Offsets[j].Destination_Signal_SCN +'"></td><td><input style="width:150px" disabled type="number" value="'+ plans[i].Offsets[j].OffsetTime +'"></td></tr>';
					divs += '<tr><td><select class="offset_start_signal">' + signalOptions + '</select></td><td><select class="offset_end_signal">' + signalOptions + '</select></td><td><input class="offset_time_signal" style="width:150px" type="number"></td></tr>';
					divs += '</tbody></table></div></div>'
					$('.up_tab_signal').append(divs)
					$('.up_phases_tabs_signal').append('<li><a data-toggle="pill" href="#up_menu_signal'+i+'">'+plans[i].PlanSCN+'</a></li>')
				}
				$('.plan_table tbody').append('<tr><td colspan="1"><input type="radio" name="groups"></td><td colspan="2">'+(i+1)+'</td><td colspan="4">'+plans[i].PlanSCN+'</td><td colspan="4">'+plans[i].CycleTime+'</td></tr>')
				planScns += '<option value="'+ plans[i].PlanSCN +'">'+ plans[i].PlanSCN +'</option>'
			}
			$(".signal_scn_select").change();
		}
	});

	$(".signal_scn_select").change(function(){
		$(".extraSignal").remove();
		$(".offset_start_signal").append('<option class="extraSignal" value="' + $(this).val() + '">' + $(this).val() + '</option>');
		$(".offset_end_signal").append('<option class="extraSignal" value="' + $(this).val() + '">' + $(this).val() + '</option>');
		// console.log($(this).val());
		var signal_scn = $(this).val();
		$.ajax({
			url: '../utils/get_no_of_stages.php',
			data :{
				signal_scn: signal_scn
			},
			type: 'POST',
			success: function(result) {
				var noOfStages = $.parseJSON(result);
				console.log(noOfStages);
				var rows = '<tbody class="up_stage_timings_signal">';
				var rows2 = '<tbody class="inter_stage_timings_signal">'
				for (var j = 1; j <= noOfStages; j++) {
					rows += '<tr><td colspan="1">Stage - '+j+'</td><td colspan="1"><input type="number" placeholder="Enter Stage '+j+' Time" class="up_stage_'+j+'"</td></tr>';		
					if(j != noOfStages)
						rows2 += '<tr><td colspan="1">Stage - '+j+'</td><td colspan="1">Stage - '+(j+1)+'</td><td colspan="1"><input style="width:150px" type="number" placeholder="Enter Interstage Time" class="inter_stage_'+j+'"</td></tr>';
					else
						rows2 += '<tr><td colspan="1">Stage - '+j+'</td><td colspan="1">Stage - '+1+'</td><td colspan="1"><input style="width:150px" type="number" placeholder="Enter Interstage Time" class="inter_stage_'+j+'"</td></tr>';
				}
				rows += '</tbody>';
				rows2 += '</tbody>';
				$('.up_stage_timings_signal').replaceWith(rows);
				$('.inter_stage_timings_signal').replaceWith(rows2);
			}
		});
		
	});

	//adding a new plan
	$('.add_plan').click(function(){
		var plan_scn = $(".plan_scn").val();
		var cycle_time = $(".cycle_time").val();
		if(cycle_time == ""){
			alert("Please Enter Cycle Time");
			return false;
		}
		var stages_info = [];
		var offset_info = [];
		var count = 0;
		var allSignalsInPlan = [];
		
		$($(".up_phases_tabs").find('a')).each(function(){
			var signal_scn = this.innerHTML;
			var signal_id = $(this).attr("signal-id");
			var obj = {};
			obj.signal_scn = signal_scn;
			obj.signal_id = signal_id;
			var timings = [];
			var inter_stage_timings = [];
			var totalTime = 0;
			$($("#up_menu" + count + " .up_stage_timings").find('input')).each(function(){
				timings.push($(this).val());
				totalTime += parseInt($(this).val());
			});
			$($("#up_menu" + count + " .inter_stage_timings").find('input')).each(function(){
				inter_stage_timings.push($(this).val());
			});
			console.log(inter_stage_timings);
			if(totalTime != cycle_time){
				alert("The sum of stage times is not equal to the cycle time");
				return false;
			}
			obj.timings = timings;
			obj.inter_stage_timings = inter_stage_timings;
			stages_info.push(obj);
			count++;
		});
		$($(".offset_info_container_tbody").find('tr')).each(function(){
			var start_signal_scn = $(this).find('select')[0].value;
			var end_signal_scn = $(this).find('select')[1].value;
			var offset_time = $(this).find('input').val();
			if(start_signal_scn == end_signal_scn){
				alert("Start and end signal cannot be same");
				return false;
			}
			if(offset_time == ""){
				alert("Please Enter Offset Time");
				return false;
			}
			var found = jQuery.inArray(start_signal_scn, allSignalsInPlan);
			if(found < 0)
				allSignalsInPlan.push(start_signal_scn);
			var found = jQuery.inArray(end_signal_scn, allSignalsInPlan);
			if(found < 0)
				allSignalsInPlan.push(end_signal_scn);
			var obj = {};
			obj.start_signal_scn = start_signal_scn;
			obj.end_signal_scn = end_signal_scn;
			obj.offset_time = offset_time;
			offset_info.push(obj);
		});
		if(allSignalsSCN.length != allSignalsInPlan.length){
			alert("Offset information is insufficient");
			return false;
		}
		
		$.ajax({
			url: '../utils/add_plan.php',
			data: {
				group_scn: groupSCN,
				plan_scn: plan_scn,
				cycle_time: cycle_time,
				signals: JSON.stringify(stages_info),
				offsets: JSON.stringify(offset_info)
			},
			type: 'POST',
			success: function(result) {
				if(result.includes("success")){
					alert("Successfully added plan");
					location.reload();
				}
				else{
					alert("Some error occured. Please try again");
				}
			}
		});
	});

	//updating plans
	update_plan_modal = function(){
		try{
			var plan_scn = $('input[name=groups]:checked').closest('tr').find('td')[2].innerHTML
			var cycle_time = $('input[name=groups]:checked').closest('tr').find('td')[3].innerHTML
			$('.plan_scn_update').val(plan_scn);
			$('.cycle_time_update').val(cycle_time);
			
			$.ajax({
				url: '../utils/get_plan.php',
				type: 'POST',
				data: {
					plan_scn: plan_scn
				},
				success: function(result) {
					var planDetails = jQuery.parseJSON(result)
					console.log(planDetails);
					var count = 0;
					var count2 = 0;
					var count4 = 0;
					$($(".up_phases_tabs_update").find('a')).each(function(){
						$($("#up_menu_update" + count + " .up_stage_timings").find('input')).each(function(){
							$(this).val(planDetails.signals[count2].StageTime);
							count2++;
						});	
						$($("#up_menu_update" + count + " .inter_stage_timings").find('input')).each(function(){
							$(this).val(planDetails.signals[count4].InterStageTime);
							count4++;
						});						
						count++;
					});
					var count3 = 0;
					$($(".offset_info_container_update_tbody").find('tr')).each(function(){
						$(this).find('select')[0].value = planDetails.offsets[count3].Origin_Signal_SCN;
						$(this).find('select')[1].value = planDetails.offsets[count3].Destination_Signal_SCN;
						$(this).find('input').val(planDetails.offsets[count3].OffsetTime);
						count3++;
					});
				}
			});	

			$("#update_plan_modal").modal()
		}
		catch(err){
			alert("Please select a plan to edit");
		}
	}

	$('.update_plan').click(function(){
		var plan_scn = $(".plan_scn_update").val();
		var cycle_time = $(".cycle_time_update").val();
		if(cycle_time == ""){
			alert("Please Enter Cycle Time");
			return false;
		}
		var stages_info = [];
		var offset_info = [];
		var count = 0;
		var allSignalsInPlan = [];
		
		$($(".up_phases_tabs_update").find('a')).each(function(){
			var signal_scn = this.innerHTML;
			var signal_id = $(this).attr("signal-id");
			var obj = {};
			obj.signal_scn = signal_scn;
			obj.signal_id = signal_id;
			var timings = [];
			var totalTime = 0;
			var inter_stage_timings = [];
			$($("#up_menu_update" + count  + " .up_stage_timings").find('input')).each(function(){
				timings.push($(this).val());
				totalTime += parseInt($(this).val());
			});
			$($("#up_menu_update" + count + " .inter_stage_timings").find('input')).each(function(){
				inter_stage_timings.push($(this).val());
			});
			// console.log(totalTime);
			if(totalTime != cycle_time){
				alert("The sum of stage times is not equal to the cycle time");
				return false;
			}
			obj.timings = timings;
			obj.inter_stage_timings = inter_stage_timings;

			stages_info.push(obj);
			count++;
		});
		$($(".offset_info_container_update_tbody").find('tr')).each(function(){
			var start_signal_scn = $(this).find('select')[0].value;
			var end_signal_scn = $(this).find('select')[1].value;
			var offset_time = $(this).find('input').val();
			if(start_signal_scn == end_signal_scn){
				alert("Start and end signal cannot be same");
				return false;
			}
			if(offset_time == ""){
				alert("Please Enter Offset Time");
				return false;
			}
			var found = jQuery.inArray(start_signal_scn, allSignalsInPlan);
			if(found < 0)
				allSignalsInPlan.push(start_signal_scn);
			var found = jQuery.inArray(end_signal_scn, allSignalsInPlan);
			if(found < 0)
				allSignalsInPlan.push(end_signal_scn);
			var obj = {};
			obj.start_signal_scn = start_signal_scn;
			obj.end_signal_scn = end_signal_scn;
			obj.offset_time = offset_time;
			offset_info.push(obj);
		});
		if(allSignalsSCN.length != allSignalsInPlan.length){
			alert("Offset information is insufficient");
			return false;
		}
		
		$.ajax({
			url: '../utils/update_plan.php',
			data: {
				group_scn: groupSCN,
				plan_scn: plan_scn,
				cycle_time: cycle_time,
				signals: JSON.stringify(stages_info),
				offsets: JSON.stringify(offset_info)
			},
			type: 'POST',
			success: function(result) {
				if(result.includes("success")){
					alert("Successfully updated plan");
					location.reload();
				}
				else{
					alert("Some error occured. Please try again");
				}
			}
		});
	});

	//deleting plans
	delete_plan_modal = function(){
		try{
			var plan_scn = $('input[name=groups]:checked').closest('tr').find('td')[2].innerHTML
			$.ajax({
				url: '../utils/delete_plan.php',
				data :{
					plan_scn: plan_scn
				},
				type: 'POST',
				success: function(result) {
					if(result.includes("success")){
						alert("Plan deleted successfully");
						location.reload();
					}
					else{
						alert("Some error occured. Please try again");
					}
				}
			});
		}
		catch(err){
			alert("Please select a plan to delete");
		}
	}

	//getting all calendars
	$.ajax({
		url: '../utils/get_calendar.php',
		type: 'POST',
		data: {
			group_scn: groupSCN
		},
		success: function(result) {
			var calendars = jQuery.parseJSON(result)
			// console.log(calendars);
			var rows = '';
			for (var i = 0; i < calendars.length; i++) {
				rows += '<tr><td colspan="2">'+(i+1)+'</td><td colspan="4">'+calendars[i].day+'</td><td colspan="4">'+calendars[i].timetable_scn+'</td><td colspan="4">'
				for(var j = 0; j < calendars[i].plan_info.length; j++)
					rows += '<span class="plan_scns_calendar">' + calendars[i].plan_info[j].Plan_SCN + '</span> '
				rows+='</td></tr>'
			}
			$('.calendar_table tbody').append(rows);
		}
	});

	//function called when timetable is changed when adding calendar
	$('.timetable_scn_select').change(function(){
		var timetable_scn = $(this).val();
		var day = $(this)[0].id.replace('_select','');
		// console.log($(this)[0].id.replace('_select',''));
		$.ajax({
			url: '../utils/get_no_of_slots.php',
			data :{
				timetable_scn: timetable_scn
			},
			type: 'POST',
			success: function(result) {
				var timetableDetails = jQuery.parseJSON(result)
				// console.log(timetableDetails);
				var tds = '<tbody class="calendar_plan_select">';
				for(var j=0; j<timetableDetails.count; j++){
					tds += '<tr><td colspan="1" class="slot_details" slot-id="'+ timetableDetails.slots[j].SlotOrder +'">'+ timetableDetails.slots[j].StartTime +' - ' + timetableDetails.slots[j].EndTime + '</td><td colspan="1"><select class="plan_scn_select">'+ planScns +'</select></td></tr>'
				}
				tds += '</tbody>';
				$('#'+day+'_calendar').find('.calendar_plan_select').replaceWith(tds);
			}
		});		
	});

	$('.timetable_scn_select_update').change(function(){
		var timetable_scn = $(this).val();
		var day = $(this)[0].id.replace('_select_update','');
		$.ajax({
			url: '../utils/get_no_of_slots.php',
			data :{
				timetable_scn: timetable_scn
			},
			type: 'POST',
			success: function(result) {
				var timetableDetails = jQuery.parseJSON(result)
				// console.log(timetableDetails);
				var tds = '<tbody class="calendar_plan_select_update">';
				for(var j=0; j<timetableDetails.count; j++){
					tds += '<tr><td colspan="1" class="slot_details_update" slot-id="'+ timetableDetails.slots[j].SlotOrder +'">'+ timetableDetails.slots[j].StartTime +' - ' + timetableDetails.slots[j].EndTime + '</td><td colspan="1"><select class="plan_scn_select_update">'+ planScns +'</select></td></tr>'
				}
				tds += '</tbody>';
				$('#'+day+'_calendar_update').find('.calendar_plan_select_update').replaceWith(tds);				
				if(startingTimetableCount == 6)
					updatingPlansInUpdateCalendar();
				startingTimetableCount++;
			}
		});		
	});

	//function called when timetable is changed when adding special event
	$('.timetable_scn_select_event').change(function(){
		var timetable_scn = $(this).val();
		// console.log($(this)[0].id.replace('_select',''));
		$.ajax({
			url: '../utils/get_no_of_slots.php',
			data :{
				timetable_scn: timetable_scn
			},
			type: 'POST',
			success: function(result) {
				var timetableDetails = jQuery.parseJSON(result)
				// console.log(timetableDetails);
				var tds = '<tbody class="calendar_plan_select_event">';
				for(var j=0; j<timetableDetails.count; j++){
					tds += '<tr><td colspan="1" class="slot_details" slot-id="'+ timetableDetails.slots[j].SlotOrder +'">'+ timetableDetails.slots[j].StartTime +' - ' + timetableDetails.slots[j].EndTime + '</td><td colspan="1"><select class="plan_scn_select">'+ planScns +'</select></td></tr>'
				}
				tds += '</tbody>';
				// console.log(tds);
				$('.add_event_div').find('.calendar_plan_select_event').replaceWith(tds);
			}
		});		
	});

	$('.timetable_scn_select_event_update').change(function(){
		var timetable_scn = $(this).val();
		// console.log($(this)[0].id.replace('_select',''));
		$.ajax({
			url: '../utils/get_no_of_slots.php',
			data :{
				timetable_scn: timetable_scn
			},
			type: 'POST',
			success: function(result) {
				var timetableDetails = jQuery.parseJSON(result)
				// console.log(timetableDetails);
				var tds = '<tbody class="calendar_plan_select_event_update">';
				for(var j=0; j<timetableDetails.count; j++){
					tds += '<tr><td colspan="1" class="slot_details" slot-id="'+ timetableDetails.slots[j].SlotOrder +'">'+ timetableDetails.slots[j].StartTime +' - ' + timetableDetails.slots[j].EndTime + '</td><td colspan="1"><select class="plan_scn_select">'+ planScns +'</select></td></tr>'
				}
				tds += '</tbody>';
				// console.log(tds);
				$('.update_event_div').find('.calendar_plan_select_event_update').replaceWith(tds);
				updatingPlansInUpdateEvent();
			}
		});		
	});	

	//adding a new calendar
	$('.add_calendar').click(function(){
		var calendar_info = [];
		
		$($(".calendar_tabs").find('a')).each(function(){
			var day = this.innerHTML;
			var timetable_scn = $('' + $(this).attr("href")).find('.timetable_scn_select').val();
			var plan_info = [];
			$($('' + $(this).attr("href")).find('.calendar_plan_select tr')).each(function(){
				// console.log($(this).find('.slot_details').attr("slot-id"));
				var obj = {};				
				obj.plan_scn = $(this).find('select').val(); 
				obj.slot_order = $(this).find('.slot_details').attr("slot-id");
				plan_info.push(obj);
			});
			console.log(plan_info);
			var obj2 = {
				day: day,
				timetable_scn: timetable_scn,
				plan_info: plan_info
			}
			calendar_info.push(obj2);
		});
		console.log(calendar_info);
		
		$.ajax({
			url: '../utils/add_calendar.php',
			data: {
				group_scn: groupSCN,
				calendar: JSON.stringify(calendar_info)
			},
			type: 'POST',
			success: function(result) {
				if(result.includes("success")){
					alert("Successfully added calendar");
					location.reload();
				}
				else{
					alert("Some error occured. Please try again");
				}
			}
		});
	});

	//updating calendar
	update_calendar_modal = function(){
		var count = 0;
		$($(".calendar_tabs_update").find('a')).each(function(){
			var timetable_scn = $($('.calendar_table tbody').find('tr')[count]).find('td')[2].innerHTML
			// console.log(timetable_scn);
			$('' + $(this).attr("href")).find('.timetable_scn_select_update').val(timetable_scn);
			count++;			
		});
		$('.timetable_scn_select_update').change();
		$("#update_calendar_modal").modal();		
	}

	updatingPlansInUpdateCalendar = function(){
		var count = 0;		
		$($(".calendar_tabs_update").find('a')).each(function(){
			var rowInUpdateModal = $('' + $(this).attr("href")).find('.calendar_plan_select_update select');
			// console.log(rowInUpdateModal);
			var count2 = 0;
			var plan_scns = $($($('.calendar_table tbody').find('tr')[count]).find('span')).each(function(){
				// console.log($(this)[0].innerHTML);
				rowInUpdateModal[count2].value = $(this)[0].innerHTML;
				count2++;
			})
			count++;
		});
	}

	$('.update_calendar').click(function(){
		var calendar_info = [];
		
		$($(".calendar_tabs_update").find('a')).each(function(){
			var day = this.innerHTML;
			var timetable_scn = $('' + $(this).attr("href")).find('.timetable_scn_select_update').val();
			var plan_info = [];
			$($('' + $(this).attr("href")).find('.calendar_plan_select_update tr')).each(function(){
				// console.log($(this).find('.slot_details').attr("slot-id"));
				var obj = {};				
				obj.plan_scn = $(this).find('select').val(); 
				obj.slot_order = $(this).find('.slot_details_update').attr("slot-id");
				plan_info.push(obj);
			});
			console.log(plan_info);
			var obj2 = {
				day: day,
				timetable_scn: timetable_scn,
				plan_info: plan_info
			}
			calendar_info.push(obj2);
		});
		console.log(calendar_info);
		
		$.ajax({
			url: '../utils/update_calendar.php',
			data: {
				group_scn: groupSCN,
				calendar: JSON.stringify(calendar_info)
			},
			type: 'POST',
			success: function(result) {
				if(result.includes("success")){
					alert("Successfully updated calendar");
					location.reload();
				}
				else{
					alert("Some error occured. Please try again");
				}
			}
		});
	});

	//deleting calendar
	delete_calendar_modal = function(){
		$.ajax({
			url: '../utils/delete_calendar.php',
			data: {
				group_scn: groupSCN
			},
			type: 'POST',
			success: function(result) {
				if(result.includes("success")){
					alert("Successfully deleted calendar");
					location.reload();
				}
				else{
					alert("Some error occured. Please try again");
				}
			}
		});	
	}

	//fetch events to display in table
	$.ajax({
		url: '../utils/get_special_event_list.php',
		type: 'POST',
		data: {
			group_scn: groupSCN
		},
		success: function(result) {
			var events = jQuery.parseJSON(result)
			// console.log(events);
			var rows = '';
			for (var i = 0; i < events.length; i++) {
				rows += '<tr><td colspan="1"><input type="radio" name="groups"></td><td colspan="2">'+(i+1)+'</td><td colspan="4">'+events[i].day+'</td><td colspan="4">'+events[i].timetable_scn+'</td><td colspan="4">'
				for(var j = 0; j < events[i].plan_info.length; j++)
					rows += '<span class="plan_scns_event">' + events[i].plan_info[j].Plan_SCN + '</span> '
				rows+='</td></tr>'
			}
			$('.event_table tbody').append(rows);
		}
	});

	//add event
	$('.add_event').click(function(){
		var event_date = $(".event_date").val();
		var timetable_scn = $(".timetable_scn_select_event").val();
		var plan_info = [];
		$($(".calendar_plan_select_event").find("tr")).each(function(){
			var obj = {};				
			obj.plan_scn = $(this).find('select').val(); 
			obj.slot_order = $(this).find('.slot_details').attr("slot-id");
			plan_info.push(obj);
		});
		// console.log(plan_info);
		
		$.ajax({
			url: '../utils/add_special_event.php',
			data: {
				group_scn: groupSCN,
				event_date: event_date,
				timetable_scn: timetable_scn,
				calendar: JSON.stringify(plan_info)
			},
			type: 'POST',
			success: function(result) {
				if(result.includes("success")){
					alert("Successfully added special event");
					location.reload();
				}
				else{
					alert("Some error occured. Please try again");
				}
			}
		});
	});

	//updating event
	update_event_modal = function(){
		try{
			var date = $('input[name=groups]:checked').closest('tr').find('td')[2].innerHTML
			var timetable_scn = $('input[name=groups]:checked').closest('tr').find('td')[3].innerHTML			
			$(".event_date_update").val(date);
			$(".timetable_scn_select_event_update").val(timetable_scn);
			$('.timetable_scn_select_event_update').change();
			// $($('input[name=groups]:checked').closest('tr').find('span')).each(function(){
			// 	console.log($(".calendar_plan_select_event_update select"));
			// 	console.log($(this)[0].innerHTML);
			// })
			// console.log(timetable_scn);
		}
		catch(err){
			alert("Please select a special event to edit");
		}	
	}

	updatingPlansInUpdateEvent = function(){
		var count = 0;
		$($('input[name=groups]:checked').closest('tr').find('span')).each(function(){
			$(".calendar_plan_select_event_update select")[count].value = $(this)[0].innerHTML;
			count++;
		})
		$("#update_event_modal").modal()
	}

	$('.update_event').click(function(){
		var event_date = $(".event_date_update").val();
		var timetable_scn = $(".timetable_scn_select_event_update").val();
		var plan_info = [];
		$($(".calendar_plan_select_event_update").find("tr")).each(function(){
			var obj = {};				
			obj.plan_scn = $(this).find('select').val(); 
			obj.slot_order = $(this).find('.slot_details').attr("slot-id");
			plan_info.push(obj);
		});
		// console.log(plan_info);
		
		$.ajax({
			url: '../utils/update_special_event.php',
			data: {
				group_scn: groupSCN,
				event_date: event_date,
				timetable_scn: timetable_scn,
				calendar: JSON.stringify(plan_info)
			},
			type: 'POST',
			success: function(result) {
				if(result.includes("success")){
					alert("Successfully updated special event");
					location.reload();
				}
				else{
					alert("Some error occured. Please try again");
				}
			}
		});
	});

	//deleting event
	delete_event_modal = function(){
		try{
			var date = $('input[name=groups]:checked').closest('tr').find('td')[2].innerHTML
			$.ajax({
				url: '../utils/delete_special_event.php',
				data: {
					group_scn: groupSCN,
					event_date: date
				},
				type: 'POST',
				success: function(result) {
					if(result.includes("success")){
						alert("Successfully deleted special event");
						location.reload();
					}
					else{
						alert("Some error occured. Please try again");
					}
				}
			});	
		}
		catch(err){
			alert("Please select a special event to delete");
		}		
	}

});