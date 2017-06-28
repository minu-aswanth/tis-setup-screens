$( document ).ready(function() {
	cycle_stages_json = function(array){
		var string = '{'
		for (var i = 0; i < array.length; i++) {
			string += '"'+i+'":'+'{'
			string += '"stage_order":"'+array[i][0]+'",'
			string += '"num_movements":"'+array[i][1]+'",'
			string += '"stage_time":"'+array[i][2]+'",'
			string += '"inter_stage_time":"'+array[i][3]+'",'
			string += '"veh_movements_str":"'+array[i][4]+'",'
			string += '"ped_movements_str":"'+array[i][5]+'"'
			if(i == array.length-1){
				string += '}'
			}
			else{
				string += '},'
			}
		}
		string += '}'
		return string;
	}
	add_cycle = function(cycle_scn,cycle_desc,signal_id,cycles_stages_str){
		$.ajax({
			url: '../utils/add_cycle.php',
			type: 'POST',
			data:{cycle_scn:cycle_scn,cycle_desc:cycle_desc,signal_id:signal_id,cycles_stages_str:cycles_stages_str},
			success: function(result) {
				if(result.includes("success")){
					alert("Cycle has been Added Successfully")
					location.reload()
				}
				else{
					alert("Cycle Adding Failed")
				}
			}
		});
	}
	$('.add_cycle').click(function(){
		var cycle_scn = $('.cycle_scn_field').val()
		if(cycle_scn == ""){
			alert("Please Enter Cycle SCN");
			return;
		}
		$.ajax({
			url: '../utils/check_cycle_scn.php',
			type: 'POST',
			data:{cycle_scn:cycle_scn},
			success: function(result) {
				if(result != 0){
					alert("SCN Already Exists Please Choose Another SCN");
					$('.cycle_scn').focus();
				}
				else{
					var cycle_desc = $('.cycle_desc_field').val()
					if(cycle_desc == ""){
						alert("Please Enter Cycle Description");
						$('.cycle_desc').focus();
						return;
					}
					var signal_id = $('.signal_scns').find('option:selected').val()
					if(signal_id == ""){
						alert("Please Select a Signal");
						$('.signal_scns').focus();
						return;
					}
					var cycle_stages = $('.cycle_stages').find('option:selected').val()
					if(cycle_stages == ""){
						alert("Please Select Number of Stages in Cycle");
						$('.cycle_stages').focus();
						return;
					}
					var cycle_elements = []
					var num_stages = $('.phase_info_body')[0].rows.length
					for (var i = 1; i < num_stages; i++) {
						var veh_movements = $($('.phase_info_body')[0].rows[i].cells[1]).find('span')
						var ped_movements = $($('.phase_info_body')[0].rows[i].cells[2]).find('span')
						if(veh_movements.length == 0 && ped_movements.length == 0){
							alert("Please Add Atleast One Phase to All Stages");
							return;
						}
						var num_movements = veh_movements.length + ped_movements.length
						var stage_time = $('.stage_'+i).val();
						if(stage_time == ""){
							alert("Please Enter Stage Time");
							$('.stage_'+i).focus();
							return;
						}
						var inter_stage_time = $('.inter_stage_'+i).val();
						if(inter_stage_time == ""){
							alert("Please Enter Inter Stage Time");
							$('.inter_stage_'+i).focus();
							return;
						}
						var veh_movements_str = ""
						for (var vn=0;vn<veh_movements.length;vn+=2) {
							veh_movements_str = veh_movements[vn].id.replace(/\n|<.*?>/g,'')+";";
						}
						var ped_movements_str = ""
						for (var pn=0;pn<ped_movements.length;pn+=2) {
							ped_movements_str = ped_movements[pn].id.replace(/\n|<.*?>/g,'')+";";
						}
						cycle_elements.push([i,num_movements,stage_time,inter_stage_time,veh_movements_str, ped_movements_str])
					}
					var cycles_stages_str = cycle_stages_json(cycle_elements);
					add_cycle(cycle_scn,cycle_desc,signal_id,cycles_stages_str)
				}
			}
		});
	});
});