$( document ).ready(function() {
	$('.up_proceed').click(function(){
		up_ip = $('.up_ip_address').val()
		if(up_ip == ""){
			alert("Please Enter IP address")
			$('.ip_address').focus()
			return;
		}
		if(!verifyip(up_ip)){
			alert("Please Enter a Valid IP Address")
			$('.ip_address').focus()
			return;
		}
		up_scn = $('.up_scn').val()
		if(up_scn == ""){
			alert("Please Enter System Code Number")
			$('.up_ip_address').focus()
			return;
		}
		$.ajax({
			url: '../utils/check_scn.php',
			data :{up_scn:up_scn},
			type: 'POST',
			success: function(result) {
				if(result != 0){
					alert("SCN Already Exists try again.");
					$('.scn').val("")
					$('.scn').focus();
					return;
				}
				else{
					up_signal_group = $( ".up_signal_grp_drop option:selected" ).val();
					if(up_signal_group == ""){
						alert("Please Select a Signal Group");
						$('.up_signal_grp_drop').focus();
						return;
					}
					up_short_desc = $( ".up_short_desc" ).val();
					if(up_short_desc == ""){
						alert("Please Enter Short Description");
						$('.up_short_desc').focus();
						return;
					}
					up_long_desc = $( ".up_long_desc" ).val();
					if(up_long_desc == ""){
						alert("Please Enter Long Description");
						$('.up_long_desc').focus();
						return;
					}
					up_supplier = $( ".up_supplier" ).val();
					if(up_supplier == ""){
						alert("Please Enter supplier Name");
						$('.up_supplier').focus();
						return;
					}
					up_lat = $( ".up_lat" ).val();
					if(up_lat == ""){
						alert("Please Enter Juntion Latitude");
						$('.up_lat').focus();
						return;
					}
					if(up_lat < 0){
						alert("Please Enter Valid Juntion Latitude");
						$('.up_lat').val("");
						$('.up_lat').focus();
						return;
					}
					up_lng = $( ".up_lng" ).val();
					if(up_lng == ""){
						alert("Please Enter Juntion Longitude");
						$('.up_lng').focus();
						return;
					}
					if(up_lng < 0){
						alert("Please Enter Valid Juntion Longitude");
						$('.up_lng').val("");
						$('.up_lng').focus();
						return;
					}
					up_num_links = $( ".up_num_links option:selected" ).text();
					if(up_num_links == " -- select number of links -- "){
						alert("Please Select a Signal Group");
						$('.up_num_links').focus();
						return;
					}
					up_offset = $( ".up_signal_offset" ).val();
					if(up_offset == ""){
						alert("Please Enter Signal Offset");
						$('.up_signal_offset').focus();
						return;
					}
					var planname_elems = $("input[class^='up_plan']")
					var plans = []
					for (var i = 0; i < planname_elems.length; i++) {
						var plan_name = planname_elems[i].value
						if(plan_name == ""){
							alert("Enter Plan Name");
							planname_elems[i].focus();
							return;
						}
						var order = i+1
						plans.push([plan_name, order])
					}
					up_links_json = get_json_from_array(plans);
					var phase_elems = $('.up_phases_tabs').find('li')
					var plan_ids = []
					for (var i = 0; i < phase_elems.length; i++) {
						plan_ids.push(phase_elems[i].value)
					}
					var plan_stages = []
					var plan_stage_menus = $("div[id^='up_menu']")
					for (var i = 0; i < plan_stage_menus.length; i++) {
						var num_stages = parseInt($(plan_stage_menus[i]).find('.up_stages_drop').val())
						if(isNaN(num_stages)){
							alert("Please Select Number of Stages");
							$(plan_stage_menus[i]).find('.up_stages_drop').focus()
							return;
						}
						for (var j = 1; j <= num_stages; j++) {
							var stage_time = $(plan_stage_menus[i]).find('.up_stage_timings').find('.up_stage_'+j).val()
							if(stage_time == ""){
								alert("Please Enter Stage Time")
								$(plan_stage_menus[i]).find('.up_stage_timings').find('.up_stage_'+j).focus()
								return;
							}
							if(j==num_stages)
								var inter_stage_time = $(plan_stage_menus[i]).find('.up_inter_stage_timings').find('.up_stage_'+j+'_'+1).val()
							else
								var inter_stage_time = $(plan_stage_menus[i]).find('.up_inter_stage_timings').find('.up_stage_'+j+'_'+(j+1)).val()
							if(inter_stage_time == ""){
								alert("Please Enter Inter Stage Time")
								if(j==num_stages){
									$(plan_stage_menus[i]).find('.up_inter_stage_timings').find('.up_stage_'+j+'_'+1).focus()
								}
								else{
									$(plan_stage_menus[i]).find('.up_inter_stage_timings').find('.up_stage_'+j+'_'+(j+1)).focus()
								}
								return;
							}
							var num_movements = $($(plan_stage_menus[i]).find('.up_stage_movements').find('tr')[j-1]).find('span').length/2
							if(num_movements == 0){
								alert("Please Add Movements to Stages");
								return;
							}
							var veh_movements = $($(plan_stage_menus[i]).find('.up_stage_movements').find('tr')[j-1].cells[1]).find('span')
							var veh_movements_str = ""
							if(veh_movements.length == 0){
								veh_movements = ""
							}
							else{
								for(var vn=0;vn<veh_movements.length;vn+=2){
									veh_movements_str += veh_movements[vn].id.replace(/\n|<.*?>/g,'')+";";
								}
							}
							var ped_movements = $($(plan_stage_menus[i]).find('.up_stage_movements').find('tr')[j-1].cells[2]).find('span')
							var ped_movements_str = ""
							if(ped_movements.length == 0){
								ped_movements = ""
							}
							else{
								for(var vn=0;vn<ped_movements.length;vn+=2){
									ped_movements_str += ped_movements[vn].id.replace(/\n|<.*?>/g,'')+";";
								}
							}
							plan_stages.push([plan_ids[i], j, num_movements, stage_time, inter_stage_time, veh_movements_str, ped_movements_str])
						}
					}
					up_plan_stage_json = get_json_from_plan_stages(plan_stages);
					console.log($('.up_proceed').attr('signal_id'))
					delete_signal($('.up_proceed').attr('signal_id'), "");
					update_add_signal();
				}
			}
		});
	});
	update_add_signal = function(){
		signal_id = $('.up_proceed').attr('signal_id');
		$.ajax({
				url: '../utils/add_signal.php',
				data :{ip:up_ip,scn:up_scn,signal_id:signal_id,signal_group:up_signal_group,short_desc:up_short_desc,long_desc:up_long_desc,supplier:up_supplier,lat:up_lat,lng:up_lng,num_links:up_num_links,offset:up_offset,links_json:up_links_json,plan_stage_json:up_plan_stage_json},
				type: 'POST',
				success: function(result) {
					alert("Signal has been Updated Successfully")
				}
		});
	}
});