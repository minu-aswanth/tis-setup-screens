$(document).ready(function() {

	var groupSCN = window.location.href.split('=')[1];
	// console.log(groupSCN);
	var allSignalsSCN = [];
	var planScns = '';
	var startingTimetableCount = 0;

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
			var signalOptions = '';
			for (var i = 0; i < addedSignals.length; i++) {
				signalOptions += '<option value="'+ addedSignals[i].SCN +'">'+ addedSignals[i].SCN +'</option>'
				allSignalsSCN.push(addedSignals[i].SCN);
			}
			$('.offset_info_container').append('<table class="table table-bordered"><thead><tr><td colspan="1">Signal 1</td><td colspan="1">Signal 2</td><td colspan="1">Offset time(in seconds)</td></tr></thead><tbody class="offset_info_container_tbody"></tbody></table>')
			$('.offset_info_container_update').append('<table class="table table-bordered"><thead><tr><td colspan="1">Signal 1</td><td colspan="1">Signal 2</td><td colspan="1">Offset time(in seconds)</td></tr></thead><tbody class="offset_info_container_update_tbody"></tbody></table>')
			for (var i = 0; i < addedSignals.length; i++) {
				$('.signal_table tbody').append('<tr><td colspan="1"><input type="radio" name="groups"></td><td colspan="2">'+(i+1)+'</td><td colspan="4">'+addedSignals[i].SCN+'</td><td colspan="4">'+addedSignals[i].ShortDescription+'</td></tr>');				
				if(i==0){
					var divs = '<div id="up_menu'+i+'" class="tab-pane fade active in"><table class="table table-bordered"><thead><tr><td colspan="1">Stage</td><td colspan="1">Time(in seconds)</td></tr></thead><tbody class="up_stage_timings"></tbody></table></div>'
					var divs_update = '<div id="up_menu_update'+i+'" class="tab-pane fade active in"><table class="table table-bordered"><thead><tr><td colspan="1">Stage</td><td colspan="1">Time(in seconds)</td></tr></thead><tbody class="up_stage_timings"></tbody></table></div>'
					$('.up_tab').append(divs)
					$('.up_tab_update').append(divs_update)
					$('.up_phases_tabs').append('<li class="active"><a data-toggle="pill" signal-id='+ addedSignals[i].SignalID +' href="#up_menu0">'+addedSignals[i].SCN+'</a></li>')
					$('.up_phases_tabs_update').append('<li class="active"><a data-toggle="pill" signal-id='+ addedSignals[i].SignalID +' href="#up_menu_update0">'+addedSignals[i].SCN+'</a></li>')
				}
				else{
					$('.offset_info_container_tbody').append('<tr><td><select>'+ signalOptions +'</select></td><td><select>'+ signalOptions +'</select></td><td><input style="width:150px" type="number"></td></tr>');
					$('.offset_info_container_update_tbody').append('<tr><td><select>'+ signalOptions +'</select></td><td><select>'+ signalOptions +'</select></td><td><input style="width:150px" type="number"></td></tr>');
					var divs = '<div id="up_menu'+i+'" class="tab-pane fade"><table class="table table-bordered"><thead><tr><td colspan="1">Stage</td><td colspan="1">Time(in seconds)</td></tr></thead><tbody class="up_stage_timings"></tbody></table></div>'
					var divs_update = '<div id="up_menu_update'+i+'" class="tab-pane fade"><table class="table table-bordered"><thead><tr><td colspan="1">Stage</td><td colspan="1">Time(in seconds)</td></tr></thead><tbody class="up_stage_timings"></tbody></table></div>'
					$('.up_tab').append(divs)
					$('.up_tab_update').append(divs_update)
					$('.up_phases_tabs').append('<li><a data-toggle="pill" signal-id='+ addedSignals[i].SignalID +' href="#up_menu'+i+'">'+addedSignals[i].SCN+'</a></li>')
					$('.up_phases_tabs_update').append('<li><a data-toggle="pill" signal-id='+ addedSignals[i].SignalID +' href="#up_menu_update'+i+'">'+addedSignals[i].SCN+'</a></li>')
				}
				for (var j = 1; j <= addedSignals[i].StagesNumber; j++) {
					$('#up_menu' + i).find('.up_stage_timings').append('<tr><td colspan="1">Stage - '+j+'</td><td colspan="1"><input type="number" placeholder="Enter Stage '+j+' Time" class="up_stage_'+j+'"</td></tr>');		
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
			// console.log(signals);
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
				$('.timetable_scn_select_update').append('<option value="'+ timetables[i].timetable_scn +'">'+ timetables[i].timetable_scn +'</option>')
			}
			$('.timetable_table tbody').append(rows);
			$('.timetable_scn_select').change();
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
			// console.log(plans);
			for (var i = 0; i < plans.length; i++) {
				$('.plan_table tbody').append('<tr><td colspan="1"><input type="radio" name="groups"></td><td colspan="2">'+(i+1)+'</td><td colspan="4">'+plans[i].PlanSCN+'</td><td colspan="4">'+plans[i].CycleTime+'</td></tr>')
				planScns += '<option value="'+ plans[i].PlanSCN +'">'+ plans[i].PlanSCN +'</option>'
			}
		}
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
			var totalTime = 0;
			$($("#up_menu" + count).find('input')).each(function(){
				timings.push($(this).val());
				totalTime += parseInt($(this).val());
			});
			// console.log(totalTime);
			if(totalTime != cycle_time){
				alert("The sum of stage times is not equal to the cycle time");
				return false;
			}
			obj.timings = timings;
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
					// console.log(planDetails);
					var count = 0;
					var count2 = 0;
					$($(".up_phases_tabs_update").find('a')).each(function(){
						$($("#up_menu_update" + count).find('input')).each(function(){
							$(this).val(planDetails.signals[count2].StageTime);
							count2++;
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
			$($("#up_menu_update" + count).find('input')).each(function(){
				timings.push($(this).val());
				totalTime += parseInt($(this).val());
			});
			// console.log(totalTime);
			if(totalTime != cycle_time){
				alert("The sum of stage times is not equal to the cycle time");
				return false;
			}
			obj.timings = timings;
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
			console.log(calendars);
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