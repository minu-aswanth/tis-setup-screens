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
	edit_cycle = function(cycle_id,cycles_stages_str){
		$.ajax({
			url: '../utils/edit_cycle.php',
			type: 'POST',
			data:{cycle_id:cycle_id,cycles_stages_str:cycles_stages_str},
			success: function(result) {
				if(result.includes("success")){
					alert("Cycle has been Updated Successfully")
					location.reload()
				}
				else{
					alert("Update Failed")
				}
			}
		});
	}
	$('.edit_cycle').click(function(){
		var cycle_id = $('.edit_cycle').attr('cycle_id');
		var cycle_elements = []
		var num_stages = $('.edit_phase_info_body')[0].rows.length
		for (var i = 1; i < num_stages; i++) {
			var veh_movements = $($('.edit_phase_info_body')[0].rows[i].cells[1]).find('span')
			var ped_movements = $($('.edit_phase_info_body')[0].rows[i].cells[2]).find('span')
			if(veh_movements.length == 0 && ped_movements.length == 0){
				alert("Please Add Atleast One Phase to All Stages");
				return;
			}
			var num_movements = veh_movements.length + ped_movements.length
			var stage_time = $('.edit_stage_'+i).val();
			if(stage_time == ""){
				alert("Please Enter Stage Time");
				$('.edit_stage_'+i).focus();
				return;
			}
			var inter_stage_time = $('.edit_inter_stage_'+i).val();
			if(inter_stage_time == ""){
				alert("Please Enter Inter Stage Time");
				$('.edit_inter_stage_'+i).focus();
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
		console.log(cycles_stages_str);
		edit_cycle(cycle_id, cycles_stages_str)
	});
});