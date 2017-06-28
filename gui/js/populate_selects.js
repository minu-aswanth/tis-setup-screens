$( document ).ready(function() {
	$.ajax({
		url: '../utils/get_groups.php',
		type: 'POST',
		success: function(result) {
			result = JSON.parse(result)
			for (var i = 0; i < result.length; i++) {
				$(".signal_grp_drop").append("<option value='"+result[i].GroupID+"'>"+result[i].GroupName+"</option>");
				$(".up_signal_grp_drop").append("<option value='"+result[i].GroupID+"'>"+result[i].GroupName+"</option>");
			}
		}
	});
	for (var j = 3; j < 9; j++) {
		$(".num_links").append("<option value='"+j+"'>"+j+"</option>");
		$(".up_num_links").append("<option value='"+j+"'>"+j+"</option>");
	}
	$('.num_links').change(function(){
		var num_links = $( ".num_links option:selected" ).text();
		$('.assign_links').empty();
		$(".assign_links").append('<tr><td colspan="2" rowspan="9"><img class="plans_img"></td></tr>')
		$('.plans_img').attr("src","../images/"+num_links+"leg.png");
		for (var i = 1; i <= num_links; i++) {
			$(".assign_links").append('<tr><td colspan="1">Link - '+i+'</td><td colspan="1"><input type="text" class="plan'+i+'" placeholder="Enter Link '+i+' Name"></td></tr>')
		}
		
 	});
 	$('.signal_grp_drop').change(function(){
 		$('.add_tab').empty()
 		$('.phases_tabs').empty()
		var group_id = $( ".signal_grp_drop option:selected" ).val();
		$.ajax({
			url: '../utils/get_plans.php',
			data:{group_id:group_id},
			type: 'POST',
			success: function(result) {
				result = JSON.parse(result)
				for (var i = 0; i < result.length; i++) {
					if(i==0){
						var divs = '<div id="menu'+i+'" class="tab-pane fade active in"><table class="table table-bordered"><tbody value="home"><tr><td colspan="2">Number of Stages</td><td colspan="2"><select class="stages_drop"><option disabled selected value> -- select number of stages -- </option></select></td><td colspan="2">&nbsp;</td><td colspan="2">&nbsp;</td></tr><tr><td colspan="1">Movement Mode</td><td colspan="1"><select class="movement_mode"><option disabled selected value> -- Mode -- </option><option value="1">Vehicle</option><option value="2">Pedestrain</option></select></td><td colspan="1">Stage</td><td colspan="1"><select class="num_stage_drop"><option disabled selected value> -- Stage -- </option></select></td><td colspan="2">Link</td><td colspan="2"><select class="link_drop"><option disabled selected value> -- Link -- </option></select></td></tr><tr><td colspan="1"><button class="btn btn-danger add_phase">Add Phase</button></td><td colspan="7">&nbsp;</td></tr></tbody></table><table class="table table-bordered"><thead><tr><td colspan="1">Stages</td><td colspan="1">Vehicle Phases</td><td colspan="1">Pedestrain Phases</td></tr></thead><tbody class="stage_movements"></tbody></table><br><br><h3>Stage Timings</h3><table class="table table-bordered"><thead><tr><td colspan="1">Stage</td><td colspan="1">Time(in seconds)</td></tr></thead><tbody class="stage_timings"></tbody></table><br><br><h3>InterStage Timings</h3><table class="table table-bordered"><thead><tr><td colspan="1">End of Stage</td><td colspan="1">Start of Stage</td><td colspan="1">Time(in seconds)</td></tr></thead><tbody class="inter_stage_timings"></tbody></table>'
						$('.add_tab').append(divs)
						$('.phases_tabs').append('<li class="active" value="'+result[i].PlanID+'"><a data-toggle="pill" href="#menu0">'+result[i].StartTime+'-'+result[i].EndTime+'</a></li>')
					}
					else{
						var divs = '<div id="menu'+i+'" class="tab-pane fade"><table class="table table-bordered"><tbody value="home"><tr><td colspan="2">Number of Stages</td><td colspan="2"><select class="stages_drop"><option disabled selected value> -- select number of stages -- </option></select></td><td colspan="2">&nbsp;</td><td colspan="2">&nbsp;</td></tr><tr><td colspan="1">Movement Mode</td><td colspan="1"><select class="movement_mode"><option disabled selected value> -- Mode -- </option><option value="1">Vehicle</option><option value="2">Pedestrain</option></select></td><td colspan="1">Stage</td><td colspan="1"><select class="num_stage_drop"><option disabled selected value> -- Stage -- </option></select></td><td colspan="2">Link</td><td colspan="2"><select class="link_drop"><option disabled selected value> -- Link -- </option></select></td></tr><tr><td colspan="1"><button class="btn btn-danger add_phase">Add Phase</button></td><td colspan="7">&nbsp;</td></tr></tbody></table><table class="table table-bordered"><thead><tr><td colspan="1">Stages</td><td colspan="1">Vehicle Phases</td><td colspan="1">Pedestrain Phases</td></tr></thead><tbody class="stage_movements"></tbody></table><br><br><h3>Stage Timings</h3><table class="table table-bordered"><thead><tr><td colspan="1">Stage</td><td colspan="1">Time(in seconds)</td></tr></thead><tbody class="stage_timings"></tbody></table><br><br><h3>InterStage Timings</h3><table class="table table-bordered"><thead><tr><td colspan="1">End of Stage</td><td colspan="1">Start of Stage</td><td colspan="1">Time(in seconds)</td></tr></thead><tbody class="inter_stage_timings"></tbody></table>'
						$('.add_tab').append(divs)
						$('.phases_tabs').append('<li value="'+result[i].PlanID+'"><a data-toggle="pill" href="#menu'+i+'">'+result[i].StartTime+'-'+result[i].EndTime+'</a></li>')
					}
				}
				if($('.num_links').val() != "")
					$('.num_links').val(parseInt($('.num_links').val())).change()
				for (var j = 1; j < 11; j++) {
					$(".stages_drop").append("<option value='"+j+"'>"+j+"</option>");
				}
				stages_drop_bind();
				add_phase_bind();
			}
		});
 	});
	stages_drop_bind = function(){
		$('.stages_drop').change(function(){
	 		$(this).closest('div').find('.num_stage_drop').empty();
			var signal_stages = $(this).find('option:selected').html();
			$(this).closest('div').find('.num_stage_drop').append("<option disabled selected value> -- Stage -- </option>")
			for (var j = 1; j <= signal_stages; j++) {
				$(this).closest('div').find('.num_stage_drop').append("<option value='"+j+"'>Stage - "+j+"</option>");
			}
			$(this).closest('div').find('.stage_movements').empty()
			for (var j = 1; j <= signal_stages; j++) {
				$(this).closest('div').find('.stage_movements').append('<tr value='+j+'><td colspan="1">Stage - '+j+'</td><td colspan="1">&nbsp;</td><td colspan="1">&nbsp;</td></tr>');		
			}
			$(this).closest('div').find('.stage_timings').empty()
			for (var j = 1; j <= signal_stages; j++) {
				$(this).closest('div').find('.stage_timings').append('<tr><td colspan="1">Stage - '+j+'</td><td colspan="1"><input type="number" placeholder="Enter Stage '+j+' Time" class="stage_'+j+'"</td></tr>');		
			}
			$(this).closest('div').find('.inter_stage_timings').empty()
			for (var j = 1; j <= signal_stages; j++) {
				if(j == signal_stages){
					$(this).closest('div').find('.inter_stage_timings').append('<tr><td colspan="1">Stage - '+j+'</td><td colspan="1">Stage - '+1+'</td><td colspan="1"><input type="number" placeholder="Enter Inter Stage Time" class="stage_'+j+'_'+1+'"</td></tr>');		
				}
				else{
					$(this).closest('div').find('.inter_stage_timings').append('<tr><td colspan="1">Stage - '+j+'</td><td colspan="1">Stage - '+(j+1)+'</td><td colspan="1"><input type="number" placeholder="Enter Inter Stage Time" class="stage_'+j+'_'+(j+1)+'"</td></tr>');
				}
			}
 		});
	}
	add_phase_bind = function(){
		$('.add_phase').click(function(){
	 		var movement_mode = $(this).closest('div').find('.movement_mode').find('option:selected').val();
	 		if(movement_mode == 0){
	 			alert("Please Enter Phase Mode");
	 			$(this).closest('div').find('.movement_mode').focus();
	 			return;
	 		}
	 		var num_stage_drop = $(this).closest('div').find('.num_stage_drop').find('option:selected').val();
	 		if(num_stage_drop == 0){
	 			alert("Please Enter Stage of Phase");
	 			$(this).closest('div').find('.num_stage_drop').focus();
	 			return;
	 		}
	 		var link_drop = $(this).closest('div').find('.link_drop').find('option:selected').val();
	 		if(link_drop == 0){
	 			alert("Please Enter Starting Link of Phase");
	 			$(this).closest('div').find('.link_drop').focus();
	 			return;
	 		}
	 		var to_link_drop = $(this).closest('div').find('.to_link_drop').find('option:selected').val();
	 		if(to_link_drop == 0){
	 			alert("Please Enter Ending Link of Phase");
	 			$(this).closest('div').find('.to_link_drop').focus();
	 			return;
	 		}
	 		if(to_link_drop == link_drop){
	 			alert("From and To Links should be different");
	 			$(this).closest('div').find('.to_link_drop').focus();
	 			return;
	 		}
	 		if($(this).closest('div').find('.stage_movements').find('tr')[num_stage_drop-1].cells[movement_mode].innerHTML.includes(' <span class="movement deletable">Link-'+link_drop+' to Link-'+to_link_drop+'<span class="glyphicon glyphicon-remove"></span></span>')){
	 			alert('Phase Already Exists');
	 		}
	 		else{
	 			$(this).closest('div').find('.stage_movements').find('tr')[num_stage_drop-1].cells[movement_mode].innerHTML += " <span class='movement deletable'>Link-"+link_drop+" to Link-"+to_link_drop+"<span class='glyphicon glyphicon-remove'></span></span>" 
	 			delete_bind();
	 		}
 		});
	}
 	delete_bind = function(){
 		$('.deletable').click(function(){
 			$(this).remove();
 		});
 	}
});

