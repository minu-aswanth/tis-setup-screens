$(document).ready(function(){
	$.ajax({
		url: '../utils/get_signals.php',
		type: 'POST',
		success: function(result) {
			var signals = jQuery.parseJSON(result);
			for (var i = 0; i < signals.length; i++) {
				$('.signal_table tbody').append('<tr><td colspan="1"><input type="radio" name="signals"></td><td colspan="2" group_id='+signals[i].GroupID+' ip_address='+signals[i].IPAddress+' ip_address='+signals[i].IPAddress+' long_description='+signals[i].LongDescription+' signal_id='+signals[i].SignalID+' signal_offset='+signals[i].SignalOffset+'>'+(i+1)+'</td><td colspan="4">'+signals[i].SCN+'</td><td colspan="4">'+signals[i].GroupName+'</td><td colspan="4">'+signals[i].ShortDescription+'</td><td colspan="3">'+signals[i].Latitude+'</td><td colspan="3">'+signals[i].Longitude+'</td><td colspan="3">'+signals[i].NumLinks+'</td><td colspan="4">'+signals[i].Supplier+'</td></tr>')
			}
		}
	});
	$('.delete_signal_modal').click(function(){
		if($('input[name=signals]:checked').val() == undefined){
			alert("Select an signal to delete");
		}
		else{
			var signal_name = $($('input[name=signals]:checked').closest("tr").find("td")[2]).html()
			var r = confirm("Do you really want to delete Signal: "+ signal_name +" ?");
			if (r == true) {
				var signal_id = $($('input[name=signals]:checked').closest("tr").find("td")[1]).attr("signal_id");
				delete_signal(signal_id,"Signal has been Deleted Successfully");
			}
			else {
			    alert("Delete Aborted");
			}
		}
	});
	delete_signal = function(signal_id, message){
		$.ajax({
			url: '../utils/delete_signal.php',
			data:{signal_id:signal_id},
			type: 'POST',
			success: function(result) {
				if(result.includes("success")){
					if(message != ""){
						alert(message);
					}
					location.reload();
				}
				else{
					alert("Signal Deleting Failed");
				}
			}
		});
	}
	get_link = function(link_id){
		$.ajax({
			url: '../utils/get_signal_movements.php',
			data:{link_id:link_id},
			type: 'POST',
			success: function(result) {
				link_data = jQuery.parseJSON(result);
				link_name = "link-"+link_data[0].from_link+" to link-"+link_data[0].to_link;
			},
			async: false
		});
		return link_name;
	}
	$('.update_signal_modal').click(function(){
		if($('input[name=signals]:checked').val() == undefined){
			alert("Select an signal to update");
		}
		else{
			$("#update_modal").modal();
			$('.up_ip_address').val($($('input[name=signals]:checked').closest("tr").find("td")[1]).attr("ip_address"))
			$('.up_scn').val($($('input[name=signals]:checked').closest("tr").find("td")[2]).html())
			$(".up_scn").prop("readonly", true);
			$('.up_lat').val($($('input[name=signals]:checked').closest("tr").find("td")[5]).html())
			$('.up_lng').val($($('input[name=signals]:checked').closest("tr").find("td")[6]).html())
			$('.up_short_desc').val($($('input[name=signals]:checked').closest("tr").find("td")[4]).html())
			$('.up_long_desc').val($($('input[name=signals]:checked').closest("tr").find("td")[1]).attr("long_description"))
			$('.up_supplier').val($($('input[name=signals]:checked').closest("tr").find("td")[8]).html())
			$(".up_signal_grp_drop").val($($('input[name=signals]:checked').closest("tr").find("td")[1]).attr("group_id")).change();
			$(".up_num_links").val($($('input[name=signals]:checked').closest("tr").find("td")[7]).html()).change();
			$(".up_signal_offset").val($($('input[name=signals]:checked').closest("tr").find("td")[1]).attr("signal_offset"));
			var signal_id = $($('input[name=signals]:checked').closest("tr").find("td")[1]).attr("signal_id");
			$('.up_proceed').attr('signal_id',signal_id)
			$.ajax({
				url: '../utils/get_link_names.php',
				data:{signal_id:signal_id},
				type: 'POST',
				success: function(result) {
					var link_names = jQuery.parseJSON(result);
					for (var i = 0; i < link_names.length; i++) {
						$('.up_plan'+(i+1)).val(link_names[i].LinkName)
					}
				}
			});
			$.ajax({
				url: '../utils/get_signal_stage_info.php',
				data:{signal_id:signal_id},
				type: 'POST',
				success: function(result) {
					var stages = jQuery.parseJSON(result);
					var plan_ids = []
					for (var i = 0; i < stages.length; i++) {
						plan_ids.push(stages[i].PlanID)
					}
					var counts = {};
					plan_ids.forEach(function(x) { counts[x] = (counts[x] || 0)+1; });
					var keys = []
					for(var key in counts) keys.push( key );
					for (var i = 0; i < keys.length; i++) {
						$($('.up_stages_drop')[i]).val(counts[keys[i]]).change();
						var super_iter = 0; 
						for (var j = 0; j < stages.length; j++) {
							if(stages[j].PlanID == keys[i]){
								super_iter++;
								$($('.up_stage_timings')[i]).find('.up_stage_'+super_iter).val(stages[j].Time)
								if($($('.up_stage_timings')[i]).find('.up_stage_'+super_iter+'_'+(super_iter+1)).length != 0){
									$($('.up_stage_timings')[i]).find('.up_stage_'+super_iter+'_'+(super_iter+1)).val(stages[j].InterStageTime)	
								}
								else{
									$($('.up_stage_timings')[i]).find('.up_stage_'+super_iter+'_'+(super_iter-1)).val(stages[j].InterStageTime)
								}
								
								var veh_movements = stages[j].VehicleMovements.split(";")
								veh_movements = veh_movements.filter(function(str) {
    								return /\S/.test(str);
								});
								for (var z = 0; z < veh_movements.length; z++) {
									$($($($('.up_stage_movements')[i]).find('tr')[super_iter-1]).find('td')[1]).append('&nbsp;<span class="movement deletable" id="'+veh_movements[z]+'">'+get_link(veh_movements[z])+'<span class="glyphicon glyphicon-remove"></span></span>')
									
								}
								var ped_movements = stages[j].PedestrainMovements.split(";")
								ped_movements = ped_movements.filter(function(str) {
    								return /\S/.test(str);
								});
								for (var z = 0; z < ped_movements.length; z++) {
									$($($($('.up_stage_movements')[i]).find('tr')[super_iter-1]).find('td')[2]).append('&nbsp;<span class="movement deletable">'+get_link(ped_movements[z])+'<span class="glyphicon glyphicon-remove"></span></span>')
								}
								var inter_ops = [];
								if(counts[keys[i]] == 1){
									inter_ops.push('1_1');
								}
								else{
									for (var z = 1; z <= counts[keys[i]]; z++) {
										if(z == counts[keys[i]]){
											inter_ops.push(z+'_1')
										}
										else{
											inter_ops.push(z+'_'+(z+1))
										}
									}
								}
								
								$($('.up_inter_stage_timings')[i]).find('.up_stage_'+inter_ops[super_iter-1]).val(stages[j].InterStageTime);
								
							}
						}
					}
					delete_bind();
				}
			});
		}
	});
	$('.up_signal_grp_drop').change(function(){
 		$('.up_tab').empty()
 		$('.up_phases_tabs').empty()
		var group_id = $( ".up_signal_grp_drop option:selected" ).val();
		$.ajax({
			url: '../utils/get_plans.php',
			data:{group_id:group_id},
			type: 'POST',
			success: function(result) {
				result = JSON.parse(result)
				for (var i = 0; i < result.length; i++) {
					if(i==0){
						var divs = '<div id="up_menu'+i+'" class="tab-pane fade active in"><table class="table table-bordered"><tbody value="home"><tr><td colspan="2">Number of Stages</td><td colspan="2"><select class="up_stages_drop"><option disabled selected value> -- select number of stages -- </option></select></td><td colspan="2">&nbsp;</td><td colspan="2">&nbsp;</td></tr><tr><td colspan="1">Movement Mode</td><td colspan="1"><select class="up_movement_mode"><option disabled selected value> -- Mode -- </option><option value="1">Vehicle</option><option value="2">Pedestrain</option></select></td><td colspan="1">Stage</td><td colspan="1"><select class="up_num_stage_drop"><option disabled selected value> -- Stage -- </option></select></td><td colspan="2">Link</td><td colspan="2"><select class="up_link_drop"><option disabled selected value> -- Link -- </option></select></td></tr><tr><td colspan="1"><button class="btn btn-danger up_add_phase">Add Phase</button></td><td colspan="7">&nbsp;</td></tr></tbody></table><table class="table table-bordered"><thead><tr><td colspan="1">Stages</td><td colspan="1">Vehicle Phases</td><td colspan="1">Pedestrain Phases</td></tr></thead><tbody class="up_stage_movements"></tbody></table><br><br><h3>Stage Timings</h3><table class="table table-bordered"><thead><tr><td colspan="1">Stage</td><td colspan="1">Time(in seconds)</td></tr></thead><tbody class="up_stage_timings"></tbody></table><br><br><h3>InterStage Timings</h3><table class="table table-bordered"><thead><tr><td colspan="1">End of Stage</td><td colspan="1">Start of Stage</td><td colspan="1">Time(in seconds)</td></tr></thead><tbody class="up_inter_stage_timings"></tbody></table>'
						$('.up_tab').append(divs)
						$('.up_phases_tabs').append('<li class="active" value="'+result[i].PlanID+'"><a data-toggle="pill" href="#up_menu0">'+result[i].StartTime+'-'+result[i].EndTime+'</a></li>')
					}
					else{
						var divs = '<div id="up_menu'+i+'" class="tab-pane fade"><table class="table table-bordered"><tbody value="home"><tr><td colspan="2">Number of Stages</td><td colspan="2"><select class="up_stages_drop"><option disabled selected value> -- select number of stages -- </option></select></td><td colspan="2">&nbsp;</td><td colspan="2">&nbsp;</td></tr><tr><td colspan="1">Movement Mode</td><td colspan="1"><select class="up_movement_mode"><option disabled selected value> -- Mode -- </option><option value="1">Vehicle</option><option value="2">Pedestrain</option></select></td><td colspan="1">Stage</td><td colspan="1"><select class="up_num_stage_drop"><option disabled selected value> -- Stage -- </option></select></td><td colspan="2">Link</td><td colspan="2"><select class="up_link_drop"><option disabled selected value> -- Link -- </option></select></td></tr><tr><td colspan="1"><button class="btn btn-danger up_add_phase">Add Phase</button></td><td colspan="7">&nbsp;</td></tr></tbody></table><table class="table table-bordered"><thead><tr><td colspan="1">Stages</td><td colspan="1">Vehicle Phases</td><td colspan="1">Pedestrain Phases</td></tr></thead><tbody class="up_stage_movements"></tbody></table><br><br><h3>Stage Timings</h3><table class="table table-bordered"><thead><tr><td colspan="1">Stage</td><td colspan="1">Time(in seconds)</td></tr></thead><tbody class="up_stage_timings"></tbody></table><br><br><h3>InterStage Timings</h3><table class="table table-bordered"><thead><tr><td colspan="1">End of Stage</td><td colspan="1">Start of Stage</td><td colspan="1">Time(in seconds)</td></tr></thead><tbody class="up_inter_stage_timings"></tbody></table>'
						$('.up_tab').append(divs)
						$('.up_phases_tabs').append('<li value="'+result[i].PlanID+'"><a data-toggle="pill" href="#up_menu'+i+'">'+result[i].StartTime+'-'+result[i].EndTime+'</a></li>')
					}
				}
				if($('.up_num_links').val() != "")
					$('.up_num_links').val(parseInt($('.up_num_links').val())).change()
				for (var j = 1; j < 11; j++) {
					$(".up_stages_drop").append("<option value='"+j+"'>"+j+"</option>");
				}
				up_stages_drop_bind();
				up_add_phase_bind();
				add_movement_mode_change_function();
			}
		});
 	});
	up_stages_drop_bind = function(){
		$('.up_stages_drop').change(function(){
	 		$(this).closest('div').find('.up_num_stage_drop').empty();
			var signal_stages = $(this).find('option:selected').html();
			$(this).closest('div').find('.up_num_stage_drop').append("<option disabled selected value> -- Stage -- </option>")
			for (var j = 1; j <= signal_stages; j++) {
				$(this).closest('div').find('.up_num_stage_drop').append("<option value='"+j+"'>Stage - "+j+"</option>");
			}
			$(this).closest('div').find('.up_stage_movements').empty()
			for (var j = 1; j <= signal_stages; j++) {
				$(this).closest('div').find('.up_stage_movements').append('<tr value='+j+'><td colspan="1">Stage - '+j+'</td><td colspan="1">&nbsp;</td><td colspan="1">&nbsp;</td></tr>');		
			}
			$(this).closest('div').find('.up_stage_timings').empty()
			for (var j = 1; j <= signal_stages; j++) {
				$(this).closest('div').find('.up_stage_timings').append('<tr><td colspan="1">Stage - '+j+'</td><td colspan="1"><input type="number" placeholder="Enter Stage '+j+' Time" class="up_stage_'+j+'"</td></tr>');		
			}
			$(this).closest('div').find('.up_inter_stage_timings').empty()
			for (var j = 1; j <= signal_stages; j++) {
				if(j == signal_stages){
					$(this).closest('div').find('.up_inter_stage_timings').append('<tr><td colspan="1">Stage - '+j+'</td><td colspan="1">Stage - '+1+'</td><td colspan="1"><input type="number" placeholder="Enter Inter Stage Time" class="up_stage_'+j+'_'+1+'"</td></tr>');		
				}
				else{
					$(this).closest('div').find('.up_inter_stage_timings').append('<tr><td colspan="1">Stage - '+j+'</td><td colspan="1">Stage - '+(j+1)+'</td><td colspan="1"><input type="number" placeholder="Enter Inter Stage Time" class="up_stage_'+j+'_'+(j+1)+'"</td></tr>');
				}
			}
 		});
	}
	up_add_phase_bind = function(){
		$('.up_add_phase').click(function(){
	 		var movement_mode = $(this).closest('div').find('.up_movement_mode').find('option:selected').val();
	 		if(movement_mode == 0){
	 			alert("Please Enter Phase Mode");
	 			$(this).closest('div').find('.up_movement_mode').focus();
	 			return;
	 		}
	 		var num_stage_drop = $(this).closest('div').find('.up_num_stage_drop').find('option:selected').val();
	 		if(num_stage_drop == 0){
	 			alert("Please Enter Stage of Phase");
	 			$(this).closest('div').find('.up_num_stage_drop').focus();
	 			return;
	 		}
	 		var link_drop = $(this).closest('div').find('.up_link_drop').find('option:selected').val();
	 		var link_html = $(this).closest('div').find('.up_link_drop').find('option:selected').html();
	 		if(link_drop == 0){
	 			alert("Please Enter Starting Link of Phase");
	 			$(this).closest('div').find('.up_link_drop').focus();
	 			return;
	 		}
	 		$(this).closest('div').find('.up_stage_movements').find('tr')[num_stage_drop-1].cells[movement_mode].innerHTML += " <span class='movement deletable' id='"+link_drop+"'>"+link_html+"<span class='glyphicon glyphicon-remove'></span></span>" 
	 		delete_bind();
	 		
 		});
	}
 	delete_bind = function(){
 		$('.deletable').click(function(){
 			$(this).remove();
 		});
 	}
 	$('.up_num_links').change(function(){
		var num_links = $( ".up_num_links option:selected" ).text();
		$('.up_assign_links').empty();
		$(".up_assign_links").append('<tr><td colspan="2" rowspan="9"><img class="up_plans_img"></td></tr>')
		$('.up_plans_img').attr("src","../images/"+num_links+"leg.png");
		for (var i = 1; i <= num_links; i++) {
			$(".up_assign_links").append('<tr><td colspan="1">Link - '+i+'</td><td colspan="1"><input type="text" class="up_plan'+i+'" placeholder="Enter Link '+i+' Name"></td></tr>')
		}
		
		var signal_id = $($('input[name=signals]:checked').closest("tr").find("td")[1]).attr("signal_id");
		
		$.ajax({
			url: '../utils/get_signal_movements.php',
			data:{signal_id:signal_id},
			type: 'POST',
			success: function(result) {
				var movements = jQuery.parseJSON(result);
				$('.up_link_drop').empty();
				$(".up_link_drop").append("<option disabled selected value> -- Link -- </option>")
				for (var z = 0; z < movements.length; z++){
					$(".up_link_drop").append("<option value='"+movements[z].id+"'>link-"+movements[z].from_link+" to link-"+movements[z].to_link+"</option>");
				}
				
			}
		});		
 	});
 	function add_movement_mode_change_function(){
	 	$('.up_movement_mode').change(function(){
			var signal_id = $($('input[name=signals]:checked').closest("tr").find("td")[1]).attr("signal_id");
			var movement_type = $('.up_movement_mode').find('option:selected').html();
			var is_vehicle = 1;
			if(movement_type != "Vehicle"){
				is_vehicle = 0;
			}
			$('.up_link_drop').empty();
			$.ajax({
				url: '../utils/get_signal_movements.php',
				data:{signal_id:signal_id},
				type: 'POST',
				success: function(result) {
					var movements = jQuery.parseJSON(result);
					$(".up_link_drop").append("<option disabled selected value> -- Select a Link -- </option>")
					for (var z = 0; z < movements.length; z++){
						if(is_vehicle == movements[z].is_vehicle){
							$(".up_link_drop").append("<option value='"+movements[z].id+"'>link-"+movements[z].from_link+" to link-"+movements[z].to_link+"</option>");
						}
					}
					
				}
			});

	 	});
 	}
});