$( document ).ready(function() {
	$.ajax({
		url: '../utils/get_signal_scns.php',
		type: 'POST',
		success: function(result) {
			result = JSON.parse(result)
			for (var i = 0; i < result.length; i++) {
				$(".signal_scns").append("<option value='"+result[i].SignalID+"' num_links ='"+result[i].NumLinks+"' >"+result[i].SCN+"</option>");
			}
		}
	});
	$.ajax({
		url: '../utils/get_cycles.php',
		type: 'POST',
		success: function(result) {
			result = JSON.parse(result);
			for (var i = 0; i < result.length; i++) {
				$('.cycles_table').append('<tr><td colspan="1"><input type="radio" name="cycles" value="'+result[i].CycleID+'"></td><td colspan="2">'+result[i].CycleSCN+'</td><td colspan="2">'+result[i].CycleDescription+'</td><td colspan="2" num_links="'+result[i].NumLinks+'" value="'+result[i].SignalID+'">'+result[i].SignalSCN+'</td></tr>')
			}
		}
	});
	$('.signal_scns').change(function(){
		var signal_id = $('.signal_scns').find('option:selected').val();
		var num_links = $('.signal_scns').find('option:selected').attr('num_links');
		$.ajax({
			url: '../utils/get_link_names.php',
			type: 'POST',
			data:{signal_id:signal_id},
			success: function(result) {
				$('.link_names').empty()
				result = JSON.parse(result)
				$('.link_names').append("<tr><td rowspan='9'><img class='signal_img'></td></tr>")
				for (var i = 0; i < result.length; i++) {
					$('.link_names').append("<tr><td>LINK-"+(i+1)+"</td><td>"+result[i].LinkName+"</td></tr>")
				}
				$('.from_links').empty();
				// $('.to_links').empty();
				// $('.from_links').append('<option disabled="" selected="" value="">select from link</option>');
				// $('.to_links').append('<option disabled="" selected="" value="">select to link</option>');
				// for (var i = 0; i < result.length; i++) {
				// 	$('.from_links').append("<option value='"+(i+1)+"'>Link-"+(i+1)+"</option>");
				// 	$('.to_links').append("<option  value='"+(i+1)+"'>Link-"+(i+1)+"</option>");
				// }
				$('.signal_img').attr("src","../images/"+num_links+"leg.png");
				$(".from_links").append("<option disabled selected value> Select a Link </option>")
			}
		});

		// $.ajax({
		// 	url: '../utils/get_signal_movements.php',
		// 	data:{signal_id:signal_id},
		// 	type: 'POST',
		// 	success: function(result) {
		// 		var movements = jQuery.parseJSON(result);
		// 		$(".from_links").append("<option disabled selected value> -- Select a Link -- </option>")
		// 		for (var z = 0; z < movements.length; z++){
		// 			$(".from_links").append("<option value='"+movements[z].id+"'>link-"+movements[z].from_link+" to link-"+movements[z].to_link+"</option>");
		// 		}
				
		// 	}
		// });

 	});
 	$('.movement_type').change(function(){
		var signal_id = $('.signal_scns').find('option:selected').val();
		var movement_type = $('.movement_type').find('option:selected').html();
		var is_vehicle = 1;
		if(movement_type != "Vehicle"){
			is_vehicle = 0;
		}
		$('.from_links').empty();
		$.ajax({
			url: '../utils/get_signal_movements.php',
			data:{signal_id:signal_id},
			type: 'POST',
			success: function(result) {
				var movements = jQuery.parseJSON(result);
				$(".from_links").append("<option disabled selected value> -- Select a Link -- </option>")
				for (var z = 0; z < movements.length; z++){
					console.log(movements[z].is_vehicle);
					if(is_vehicle == movements[z].is_vehicle){
						$(".from_links").append("<option value='"+movements[z].id+"'>link-"+movements[z].from_link+" to link-"+movements[z].to_link+"</option>");
					}
				}
				
			}
		});

 	});
 	$('.cycle_stages').change(function(){
 		var num_stages = $('.cycle_stages').find('option:selected').val()
 		$('.num_stages').empty()
 		$('.num_stages').append('<option disabled="" selected="" value="">select stage</option>');
 		for (var i = 1; i <= num_stages; i++) {
 			$('.num_stages').append('<option value="'+i+'">Stage-'+i+'</option>');	
 		}
 		$('.phase_info_body').empty()
 		$('.phase_info_body').append("<tr><th colspan='1'>Stages</th><th colspan='1'>Vehicle Phases</th><th colspan='1'>Pedestrain Phases</th></tr>")
 		for (var i = 1; i <= num_stages; i++) {
 			$('.phase_info_body').append("<tr><td colspan='1'>Stage-"+i+"</td><td colspan='1'>&nbsp;</td><td colspan='1'>&nbsp;</td></tr>")
 		}
 		$('.stage_timings').empty()
 		$('.stage_timings').append("<tr><td colspan='2'><h3>Stage Timings</h3></td><tr>")
 		for (var i = 1; i <= num_stages; i++) {
 			$('.stage_timings').append("<tr><td colspan='1'>Stage-"+i+"</td><td colspan='1'><input type='number' class='stage_"+i+"' placeholder='Enter Stage "+i+" Time'></td><tr>");
 		}
 		$('.inter_stage_timings').empty()
 		$('.inter_stage_timings').append("<tr><td colspan='3'><h3>Inter Stage Timings</h3></td><tr>")
 		for (var i = 1; i <= num_stages; i++) {
 			if(i != num_stages){
 				$('.inter_stage_timings').append("<tr><td colspan='1'>Stage-"+i+"</td><td colspan='1'>Stage-"+(i+1)+"</td><td colspan='1'><input type='number' class='inter_stage_"+i+"' placeholder='Enter Stage "+i+" Time'></td><tr>");
 			}
 			else{
 				$('.inter_stage_timings').append("<tr><td colspan='1'>Stage-"+i+"</td><td colspan='1'>Stage-"+1+"</td><td colspan='1'><input type='number' class='inter_stage_"+i+"' placeholder='Enter Stage "+i+" Time'></td><tr>");
 			}
 		}
 	});
 	for (var j = 1; j < 9; j++) {
		$(".cycle_stages").append("<option value='"+j+"'>"+j+"</option>");
	}
	$('.add_phase').click(function(){
		if($('.cycle_stages').find('option:selected').val() == ""){
			alert("Please Select Number of Stages");
			$('.cycle_stages').focus();
			return;
		}
		if($('.movement_type').find('option:selected').val() == ""){
			alert("Please Select Movement Type");
			$('.movement_type').focus();
			return;
		}
		if($('.num_stages').find('option:selected').val() == ""){
			alert("Please Select a Stage");
			$('.num_stages').focus();
			return;
		}
		if($('.from_links').find('option:selected').val() == ""){
			alert("Please Select a From Link");
			$('.from_links').focus();
			return;
		}
		if($('.to_links').find('option:selected').val() == ""){
			alert("Please Select a To Link");
			$('.to_links').focus();
			return;
		}
		if($('.to_links').find('option:selected').val() == $('.from_links').find('option:selected').val()){
			alert("From Link and To Link Cannot be Same");
			$('.to_links').focus();
			return;
		}
		var row_no = $('.num_stages').find('option:selected').val();
		var col_no = $('.movement_type').find('option:selected').val();
		var from_link = $('.from_links').find('option:selected').html();
		var from_link_id = $('.from_links').find('option:selected').val();
		if($('.phase_info_body')[0].rows[row_no].cells[col_no].innerHTML.includes('<span id="'+from_link_id+'" class="movement deletable">'+from_link+'<span class="glyphicon glyphicon-remove"></span></span>')){
			alert("This Phase Movement Already Exists")
		}
		else{
			$($('.phase_info_body')[0].rows[row_no].cells[col_no]).append('<span id="'+from_link_id+'" class="movement deletable">'+from_link+'<span class="glyphicon glyphicon-remove"></span></span>&nbsp;');
		}		
		delete_bind();
	});
	delete_bind = function(){
		$('.deletable').click(function(){
			$(this).remove();
		});
	}

});