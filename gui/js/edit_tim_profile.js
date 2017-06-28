$( document ).ready(function() {
	for (var j = 1; j < 9; j++) {
		$(".edit_cycle_stages").append("<option value='"+j+"'>"+j+"</option>");
	}
	$('.edit_cycle_stages').change(function(){
 		var num_stages = $('.edit_cycle_stages').find('option:selected').val()
 		$('.edit_select_stage').empty()
 		$('.edit_select_stage').append('<option disabled="" selected="" value="">select stage</option>');
 		for (var i = 1; i <= num_stages; i++) {
 			$('.edit_select_stage').append('<option value="'+i+'">Stage-'+i+'</option>');	
 		}
 		$('.edit_phase_info_body').empty()
 		$('.edit_phase_info_body').append("<tr><th colspan='1'>Stages</th><th colspan='1'>Vehicle Phases</th><th colspan='1'>Pedestrain Phases</th></tr>")
 		for (var i = 1; i <= num_stages; i++) {
 			$('.edit_phase_info_body').append("<tr><td colspan='1'>Stage-"+i+"</td><td colspan='1'>&nbsp;</td><td colspan='1'>&nbsp;</td></tr>")
 		}
 		$('.edit_stage_timings').empty()
 		$('.edit_stage_timings').append("<tr><td colspan='2'><h3>Stage Timings</h3></td><tr>")
 		for (var i = 1; i <= num_stages; i++) {
 			$('.edit_stage_timings').append("<tr><td colspan='1'>Stage-"+i+"</td><td colspan='1'><input type='number' class='edit_stage_"+i+"' placeholder='Enter Stage "+i+" Time'></td><tr>");
 		}
 		$('.edit_inter_stage_timings').empty()
 		$('.edit_inter_stage_timings').append("<tr><td colspan='3'><h3>Inter Stage Timings</h3></td><tr>")
 		for (var i = 1; i <= num_stages; i++) {
 			if(i != num_stages){
 				$('.edit_inter_stage_timings').append("<tr><td colspan='1'>Stage-"+i+"</td><td colspan='1'>Stage-"+(i+1)+"</td><td colspan='1'><input type='number' class='edit_inter_stage_"+i+"' placeholder='Enter Stage "+i+" Time'></td><tr>");
 			}
 			else{
 				$('.edit_inter_stage_timings').append("<tr><td colspan='1'>Stage-"+i+"</td><td colspan='1'>Stage-"+1+"</td><td colspan='1'><input type='number' class='edit_inter_stage_"+i+"' placeholder='Enter Stage "+i+" Time'></td><tr>");
 			}
 		}
 	});
 	$('.edit_add_phase').click(function(){
		if($('.edit_cycle_stages').find('option:selected').val() == ""){
			alert("Please Select Number of Stages");
			$('.edit_cycle_stages').focus();
			return;
		}
		if($('.edit_movement_type').find('option:selected').val() == ""){
			alert("Please Select Movement Type");
			$('.edit_movement_type').focus();
			return;
		}
		if($('.edit_select_stage').find('option:selected').val() == ""){
			alert("Please Select a Stage");
			$('.edit_select_stage').focus();
			return;
		}
		if($('.edit_from_links').find('option:selected').val() == ""){
			alert("Please Select a From Link");
			$('.edit_from_links').focus();
			return;
		}
		if($('.edit_to_links').find('option:selected').val() == ""){
			alert("Please Select a To Link");
			$('.edit_to_links').focus();
			return;
		}
		if($('.edit_to_links').find('option:selected').val() == $('.edit_from_links').find('option:selected').val()){
			alert("From Link and To Link Cannot be Same");
			$('.edit_to_links').focus();
			return;
		}
		var row_no = $('.edit_select_stage').find('option:selected').val();
		var col_no = $('.edit_movement_type').find('option:selected').val();
		var from_link = $('.edit_from_links').find('option:selected').html()
		var to_link = $('.edit_to_links').find('option:selected').html()
		if($('.edit_phase_info_body')[0].rows[row_no].cells[col_no].innerHTML.includes('<span class="movement deletable">'+from_link+' to '+to_link+'<span class="glyphicon glyphicon-remove"></span></span>')){
			alert("This Phase Movement Already Exists")
		}
		else{
			$($('.edit_phase_info_body')[0].rows[row_no].cells[col_no]).append('<span class="movement deletable">'+from_link+' to '+to_link+'<span class="glyphicon glyphicon-remove"></span></span>&nbsp;');
		}		
		delete_bind();
	});
	delete_bind = function(){
		$('.deletable').click(function(){
			$(this).remove();
		});
	}
	$('.edit_profile').click(function(){
		if($('input[name=cycles]:radio:checked').val() == undefined){
			alert('Please Select a Cycle To Edit');
			return;
		}
		var cycle_id = $('input[name=cycles]:radio:checked').val();
		var signal_id =  $($('input[name=cycles]:radio:checked').closest('tr')[0].cells[3]).attr('value');
		var num_links =  $($('input[name=cycles]:radio:checked').closest('tr')[0].cells[3]).attr('num_links');
		var signal_scn = $($('input[name=cycles]:radio:checked').closest('tr')[0].cells[3]).html();
		var cycle_desc = $($('input[name=cycles]:radio:checked').closest('tr')[0].cells[2]).html();
		var cycle_scn = $($('input[name=cycles]:radio:checked').closest('tr')[0].cells[1]).html();
		$('.edit_head').html("")
		$('.edit_head').append(cycle_scn)
		$('.cycle_scn').html("")
		$('.cycle_scn').append(cycle_scn)
		$('.cycle_desc').html("")
		$('.cycle_desc').append(cycle_desc)
		$('.signal_scn').html("")
		$('.signal_scn').append(signal_scn)
		$('.edit_cycle').attr('cycle_id',cycle_id);
		$('.edit_signal_img').attr("src","../images/"+num_links+"leg.png");
		$.ajax({
			url: '../utils/get_link_names.php',
			type: 'POST',
			data:{signal_id:signal_id},
			success: function(result) {
				$('.edit_link_names').empty()
				result = JSON.parse(result);
				$('.edit_link_names').append("<tr><td rowspan='9'><img class='edit_signal_img'></td></tr>")
				$('.edit_signal_img').attr("src","../images/"+num_links+"leg.png");
				for (var i = 0; i < result.length; i++) {
					$('.edit_link_names').append("<tr><td>LINK-"+(i+1)+"</td><td>"+result[i].LinkName+"</td></tr>")
				}
				$('.edit_from_links').empty();
				$('.edit_to_links').empty();
				$('.edit_from_links').append('<option disabled="" selected="" value="">select from link</option>');
				$('.edit_to_links').append('<option disabled="" selected="" value="">select to link</option>');
				for (var i = 0; i < result.length; i++) {
					$('.edit_from_links').append("<option value='"+(i+1)+"'>Link-"+(i+1)+"</option>");
					$('.edit_to_links').append("<option  value='"+(i+1)+"'>Link-"+(i+1)+"</option>");
				}
				$.ajax({
					url: '../utils/get_stage_info.php',
					type: 'POST',
					data:{cycle_id:cycle_id},
					success: function(result) {
						result = JSON.parse(result);
						var num_stages_back = result.length
						$('.edit_cycle_stages').val(num_stages_back);
						$('.edit_cycle_stages').change()
						for (var i = 1; i <= result.length; i++) {
							$('.edit_stage_'+i).val(result[i-1].StageTime)
							$('.edit_inter_stage_'+i).val(result[i-1].InterStageTime)
							if(result[i-1].VehicleMovements != ""){
								$($('.edit_phase_info_body')[0].rows[i].cells[1]).append('<span class="movement deletable">'+result[i-1].VehicleMovements.replace(";", "")+'<span class="glyphicon glyphicon-remove"></span></span>&nbsp;')
							}
							if(result[i-1].PedestrainMovements != ""){
								$($('.edit_phase_info_body')[0].rows[i].cells[2]).append('<span class="movement deletable">'+result[i-1].PedestrainMovements.replace(";", "")+'<span class="glyphicon glyphicon-remove"></span></span>&nbsp;')
							}
						}
						delete_bind();
					}
				});
			}
		});
		$('#editModal').modal()
	});
});