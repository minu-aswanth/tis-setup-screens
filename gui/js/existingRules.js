$(document).ready(function(){
	fetch_devices = function(){
				$('#existingRules').empty();
                $.ajax({
                	url: '../utils/existingRules.php',
                	success: function(result) {
						var devices_set = jQuery.parseJSON(result);
						for(i=devices_set.length-1; i>=0;i--){
							append = '<tr>'
							append += '<td><input type="radio" name="mds"></td>'
							append += '<td><a href="./rule_details.html?ruleID='+devices_set[i].RuleID+'">'+(devices_set.length - i)+'</a></td>'
							//append += '<td><a href="./rule_details.html?ruleID='+devices_set[i].RuleID+'">'+devices_set[i].RuleID+'</a></td>'
							append += '<td><a href="./rule_details.html?ruleID='+devices_set[i].RuleID+'">'+devices_set[i].ShortDesc+'</a></td>'
							append += '<td><a href="./rule_details.html?ruleID='+devices_set[i].RuleID+'">'+devices_set[i].LongDesc+'</a></td>'
							append += '<td style="display:none;">'+devices_set[i].RuleID+'</td>'
							append += '</tr>'
							$('#existingRules').append(append);
						}
                	}
                });
        }
    fetch_devices();
});