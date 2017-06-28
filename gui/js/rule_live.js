$(document).ready(function(){
	fetch_ruleraw = function(){
				$('#rule_raw').empty();
                $.ajax({
                	url: '../utils/rule_raw.php',
                	success: function(result) {
						var raw_set = jQuery.parseJSON(result);
						for(i=raw_set.length-1; i>=0;i--){
							append = '<tr>'
							append += '<td>'+raw_set[i].SystemCodeNumber+'</td>'
							append += '<td>'+raw_set[i].ActionStatus+'</td>'
							append += '<td>'+raw_set[i].Device+'</td>'
							append += '<td>'+raw_set[i].Description+'</td>'
							append += '<td>'+raw_set[i].LastUpdated +'</td>'
							append += '</tr>'
							$('#rule_raw').append(append);
						}
                	}
                });
        }
    fetch_ruleraw();
    var timeout = setTimeout("location.reload(true);",300000);
});
