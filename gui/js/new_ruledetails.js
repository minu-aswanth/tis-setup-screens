$(document).ready(function(){
	$('#cycles').closest('tr').hide()
	$('#addAction_tim').hide()
	$('#signal_scn_populate').closest('tr').hide()
	get_cycles = function(){
		$.ajax({
			url: '../utils/get_cycles.php',
			type: 'POST',
			success: function(result) {
				result = JSON.parse(result)
				for(var i = 0; i < result.length; i++) {
					$("#cycles").append("<option cycle_scn='"+result[i].CycleSCN+"' signal_scn ='"+result[i].SignalSCN+"' >"+result[i].CycleSCN+"</option>");
				}
				$('#signal_scn_populate').html(result[0].SignalSCN)
			}
		});
	}
	get_cycles();
	$("#addAction_tim").click(function(){
		add_tim_action();
	});
	$("#cycles").change(function(){
		$('#signal_scn_populate').empty();
		$('#signal_scn_populate').html($('#cycles').find('option:selected').attr('signal_scn'));
	});
	add_tim_action = function(){
		var ruleID = getUrlParameter("ruleID");
		var device = $('#cycles').find('option:selected').attr('signal_scn');
		var message = $('#cycles').find('option:selected').attr('cycle_scn')
		$.ajax({
			url: '../utils/add_rule_action.php',
			data :{message:message,action:"TIM",device:device,ruleID:ruleID},
			type: 'POST',
			success: function(result) {
				$("#cancelActionModal").click();
				alert("New action has been added")
				fetch_rule_actions();
			}
	    });
	}
	$('#action').change(function(){
		var option = $('#action').find('option:selected').attr('id');
		if(option == "tim"){
			$('#slide').closest('tr').hide()
			$('#device').closest('tr').hide()
			$('#message').closest('tr').hide()
			$('#cycles').closest('tr').show()
			$('#addAction').hide()
			$('#addAction_tim').show()
			$('#signal_scn_populate').closest('tr').show()
		}
		if(option == "vms"){
			$('#slide').closest('tr').show()
			$('#device').closest('tr').show()
			$('#message').closest('tr').show()
			$('#cycles').closest('tr').hide()
			$('#addAction').show()
			$('#addAction_tim').hide()
			$('#signal_scn_populate').closest('tr').hide()
		}
	});
});