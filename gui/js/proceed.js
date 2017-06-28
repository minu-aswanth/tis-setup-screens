$( document ).ready(function() {
	$('.proceed').click(function(){
		ip = $('.ip_address').val()
		if(ip == ""){
			alert("Please Enter IP address")
			$('.ip_address').focus()
			return;
		}
		if(!verifyip(ip)){
			alert("Please Enter a Valid IP Address")
			$('.ip_address').focus()
			return;
		}
		scn = $('.scn').val()
		if(scn == ""){
			alert("Please Enter System Code Number")
			$('.scn').focus()
			return;
		}
		$.ajax({
			url: '../utils/check_scn.php',
			data :{scn:scn},
			type: 'POST',
			success: function(result) {
				if(result != 0){
					alert("SCN Already Exists try again.");
					$('.scn').val("")
					$('.scn').focus();
					return;
				}
				else{
					signal_group = $( ".signal_grp_drop option:selected" ).val();
					if(signal_group == ""){
						alert("Please Select a Signal Group");
						$('.signal_grp_drop').focus();
						return;
					}
					short_desc = $( ".short_desc" ).val();
					if(short_desc == ""){
						alert("Please Enter Short Description");
						$('.short_desc').focus();
						return;
					}
					long_desc = $( ".long_desc" ).val();
					if(long_desc == ""){
						alert("Please Enter Long Description");
						$('.long_desc').focus();
						return;
					}
					supplier = $( ".supplier" ).val();
					if(supplier == ""){
						alert("Please Enter supplier Name");
						$('.supplier').focus();
						return;
					}
					lat = $( ".lat" ).val();
					if(lat == ""){
						alert("Please Enter Juntion Latitude");
						$('.lat').focus();
						return;
					}
					if(lat < 0){
						alert("Please Enter Valid Juntion Latitude");
						$('.lat').val("");
						$('.lat').focus();
						return;
					}
					lng = $( ".lng" ).val();
					if(lng == ""){
						alert("Please Enter Juntion Longitude");
						$('.lng').focus();
						return;
					}
					if(lng < 0){
						alert("Please Enter Valid Juntion Longitude");
						$('.lng').val("");
						$('.lng').focus();
						return;
					}
					num_links = $( ".num_links option:selected" ).text();
					if(num_links == " -- select number of links -- "){
						alert("Please Select a Signal Group");
						$('.num_links').focus();
						return;
					}
					offset = $( ".signal_offset" ).val();
					if(offset == ""){
						alert("Please Enter Signal Offset");
						$('.signal_offset').focus();
						return;
					}
					var planname_elems = $("input[class^='plan']")
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
					links_json = get_json_from_array(plans);
					var phase_elems = $('.phases_tabs').find('li')
					var plan_ids = []
					for (var i = 0; i < phase_elems.length; i++) {
						plan_ids.push(phase_elems[i].value)
					}
					var plan_stages = []
					var plan_stage_menus = $("div[id^='menu']")
					for (var i = 0; i < plan_stage_menus.length; i++) {
						var num_stages = parseInt($(plan_stage_menus[i]).find('.stages_drop').val())
						if(isNaN(num_stages)){
							alert("Please Select Number of Stages");
							$(plan_stage_menus[i]).find('.stages_drop').focus()
							return;
						}
						for (var j = 1; j <= num_stages; j++) {
							var stage_time = $(plan_stage_menus[i]).find('.stage_timings').find('.stage_'+j).val()
							if(stage_time == ""){
								alert("Please Enter Stage Time")
								$(plan_stage_menus[i]).find('.stage_timings').find('.stage_'+j).focus()
								return;
							}
							if(j==num_stages)
								var inter_stage_time = $(plan_stage_menus[i]).find('.inter_stage_timings').find('.stage_'+j+'_'+1).val()
							else
								var inter_stage_time = $(plan_stage_menus[i]).find('.inter_stage_timings').find('.stage_'+j+'_'+(j+1)).val()
							if(inter_stage_time == ""){
								alert("Please Enter Inter Stage Time")
								if(j==num_stages){
									$(plan_stage_menus[i]).find('.inter_stage_timings').find('.stage_'+j+'_'+1).focus()
								}
								else{
									$(plan_stage_menus[i]).find('.inter_stage_timings').find('.stage_'+j+'_'+(j+1)).focus()
								}
								return;
							}
							var num_movements = $($(plan_stage_menus[i]).find('.stage_movements').find('tr')[j-1]).find('span').length/2
							if(num_movements == 0){
								alert("Please Add Movements to Stages");
								return;
							}
							var veh_movements = $($(plan_stage_menus[i]).find('.stage_movements').find('tr')[j-1].cells[1]).find('span')
							var veh_movements_str = ""
							if(veh_movements.length == 0){
								veh_movements = ""
							}
							else{
								for(var vn=0;vn<veh_movements.length;vn+=2){
									veh_movements_str += veh_movements[vn].innerHTML.replace(/\n|<.*?>/g,'')+";";
								}
							}
							var ped_movements = $($(plan_stage_menus[i]).find('.stage_movements').find('tr')[j-1].cells[2]).find('span')
							var ped_movements_str = ""
							if(ped_movements.length == 0){
								ped_movements = ""
							}
							else{
								for(var vn=0;vn<ped_movements.length;vn+=2){
									ped_movements_str += ped_movements[vn].innerHTML.replace(/\n|<.*?>/g,'')+";";
								}
							}
							plan_stages.push([plan_ids[i], j, num_movements, stage_time, inter_stage_time, veh_movements_str, ped_movements_str])
						}
					}
					plan_stage_json = get_json_from_plan_stages(plan_stages);
					add_signal();
				}
			}
		});
	});
	get_json_from_plan_stages = function(array){
		var string = '{'
		for (var i = 0; i < array.length; i++) {
			string += '"'+i+'":'+'{'
			string += '"plan_id":"'+array[i][0]+'",'
			string += '"stage_order":"'+array[i][1]+'",'
			string += '"num_movements":"'+array[i][2]+'",'
			string += '"stage_time":"'+array[i][3]+'",'
			string += '"inter_stage_time":"'+array[i][4]+'",'
			string += '"veh_movements_str":"'+array[i][5]+'",'
			string += '"ped_movements_str":"'+array[i][6]+'"'
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
	get_json_from_array = function(array){
		var string = '{'
		for (var i = 0; i < array.length; i++) {
			string += '"'+i+'":'+'{'
			string += '"order":"'+array[i][1]+'",'
			string += '"link_name":"'+array[i][0]+'"'
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
	add_signal = function(){
		$.ajax({
				url: '../utils/add_signal.php',
				data :{ip:ip,scn:scn,signal_group:signal_group,short_desc:short_desc,long_desc:long_desc,supplier:supplier,lat:lat,lng:lng,num_links:num_links,offset:offset,links_json:links_json,plan_stage_json:plan_stage_json},
				type: 'POST',
				success: function(result) {
					if(result.includes("success")){
						alert("Signal has been Added Successfully")
						location.reload()
					}
					else{
						alert("Signal Adding Failed")
					}
				}
		});
	}
	verifyip = function(ip)
	{
	    return /^(?=\d+\.\d+\.\d+\.\d+$)(?:(?:25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]|[0-9])\.?){4}$/.test(ip);
	}
});