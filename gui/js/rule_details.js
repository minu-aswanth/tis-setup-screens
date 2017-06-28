var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};


$(document).ready(function(){
    fetch_rule_elements = function(){
                $('#rule_elements').empty();
                var ruleID = getUrlParameter("ruleID");
                $.ajax({
                    url: '../utils/rule_elements.php',
                    data :{ruleID:ruleID},
                    type: 'POST',
                    success: function(result) {
                        var devices_set = jQuery.parseJSON(result);
                        for(i=devices_set.length-1; i>=0;i--){
                            var Threshold;
                            if(devices_set[i].Threshold=="0"){
                                Threshold = "In Between";
                            } else if(devices_set[i].Threshold=="1"){
                                Threshold = "Upper Bound";
                            }
                            else if(devices_set[i].Threshold=="-1"){
                                Threshold = "Lower Bound";
                            }

                            append = '<tr>'
                            append += '<td><input type="radio" name="mds"></td>'
                            append += '<td>'+devices_set[i].DummyId+'</td>'
                            append += '<td>'+devices_set[i].ObjectName+'</td>'
                            append += '<td>'+devices_set[i].SystemCodeNumber+'</td>'
                            append += '<td>'+devices_set[i].VariableName+'</td>'
                            append += '<td>'+devices_set[i].ProfileId+'</td>'
                            append += '<td>'+Threshold+'</td>'
                            append += '</tr>'
                            $('#rule_elements').append(append);
                        }
                    }
                });
        }
    fetch_rule_elements();
});


$(document).ready(function(){
    fetch_rule_actions = function(){
                $('#rule_actions').empty();
                var ruleID = getUrlParameter("ruleID");
                $.ajax({
                    url: '../utils/rule_actions.php',
                    data :{ruleID:ruleID},
                    type: 'POST',
                    success: function(result) {
                        var devices_set2 = jQuery.parseJSON(result);
                        for(i=devices_set2.length-1; i>=0;i--){
                            append = '<tr>'
                            append += '<td><input type="radio" name="mds"></td>'
                            append += '<td>'+devices_set2[i].DummyId+'</td>'
                            append += '<td>'+devices_set2[i].Command+'</td>'
                            append += '<td>'+devices_set2[i].Action+'</td>'
                            append += '<td>'+devices_set2[i].Device+'</td>'
                            append += '<td>'+devices_set2[i].slide+'</td>'
                            append += '</tr>'
                            $('#rule_actions').append(append);
                        }
                    }
                });
        }
    fetch_rule_actions();
});


$(document).ready(function(){
    fetch_rules = function(){
        $('#ruleDetails').empty();
        var ruleID = getUrlParameter("ruleID");
        $.ajax({
            url: '../utils/ruleDetails.php',
            data :{ruleID:ruleID},
            type: 'POST',
            success: function(result) {
                var devices_set3 = jQuery.parseJSON(result);
                for(i=devices_set3.length-1; i>=0;i--){
                    append = '<tr>'
                    append += '<td>'+devices_set3[i].RuleID+'</td>'
                    append += '<td>'+devices_set3[i].Title+'</td>'
                    append += '<td>'+devices_set3[i].LongDescription+'</td>'
                    append += '</tr>'
                    
                    $('#ruleDetails').append(append);
                }
            }
        });
    }
    fetch_rules();
});





$(document).ready(function(){
    fetch_rules = function(){
        $('#ruleTimingDetails').empty();
        var ruleID = getUrlParameter("ruleID");
        $.ajax({
            url: '../utils/ruleDetails.php',
            data :{ruleID:ruleID},
            type: 'POST',
            success: function(result) {
                var devices_set3 = jQuery.parseJSON(result);
                for(i=devices_set3.length-1; i>=0;i--){
                    append = '<tr>'
                    append += '<td bgcolor="#993232"><font color="white">Day</font></td><td bgcolor="#993232"><font color="white">From</font></td><td bgcolor="#993232"><font color="white">To</font></td></tr>'
                    append += '<tr><td bgcolor="#CC9999"><font color="black">Sunday</font></td><td>'
                    append += devices_set3[i].FromTimeSun+'</td><td>'
                    append += devices_set3[i].ToTimeSun+'</td></tr>'
                    append += '<tr><td bgcolor="#CC9999"><font color="black">Monday</font></td><td>'
                    append += devices_set3[i].FromTimeMon+'</td><td>'
                    append += devices_set3[i].ToTimeMon+'</td></tr>'
                    append += '<tr><td bgcolor="#CC9999"><font color="black">Tuesday</font></td><td>'
                    append += devices_set3[i].FromTimeTue+'</td><td>'
                    append += devices_set3[i].ToTimeTue+'</td></tr>'
                    append += '<tr><td bgcolor="#CC9999"><font color="black">Wednesday</font></td><td>'
                    append += devices_set3[i].FromTimeWed+'</td><td>'
                    append += devices_set3[i].ToTimeWed+'</td></tr>'
                    append += '<tr><td bgcolor="#CC9999"><font color="black">Thursday</font></td><td>'
                    append += devices_set3[i].FromTimeThu+'</td><td>'
                    append += devices_set3[i].ToTimeThu+'</td></tr>'
                    append += '<tr><td bgcolor="#CC9999"><font color="black">Friday</font></td><td>'
                    append += devices_set3[i].FromTimeFri+'</td><td>'
                    append += devices_set3[i].ToTimeFri+'</td></tr>'
                    append += '<tr><td bgcolor="#CC9999"><font color="black">Saturday</font></td><td>'
                    append += devices_set3[i].FromTimeSat+'</td><td>'
                    append += devices_set3[i].ToTimeSat+'</td></tr>'
                    
                    $('#ruleTimingDetails').append(append);
                }
            }
        });
    }
    fetch_rules();
});

$(document).ready(function(){
    $.ajax({
        url: '../utils/get_vms_msgs.php',
        success: function(result) {
            if(result.length == 2){
                alert("Connection Error please try again");
            }
            else{
                var scns = JSON.parse(result);
                for(i=0;i<scns.length;i++){
                    var append = '<option>'
                    append += scns[i].topLineText
                    append += ' '
                    append += scns[i].midLineText
                    append += ' '
                    append += scns[i].botLineText
                    append += '</option>'
                    $("#message").append(append);
                }
            }
        }
    });
    $.ajax({
        url: '../utils/get_vms_scns.php',
        success: function(result) {
            if(result.length == 2){
                alert("Connection Error please try again");
            }
            else{
                var scns = JSON.parse(result);
                for(i=0;i<scns.length;i++){
                    $("#device").append('<option>'+scns[i].SystemCodeNumber+'</option>');
                }
            }
        }
    });



    $.ajax({
        url: '../utils/get_vms_msgs.php',
        success: function(result) {
            if(result.length == 2){
                alert("Connection Error please try again");
            }
            else{
                var scns = JSON.parse(result);
                for(i=0;i<scns.length;i++){
                    var append = '<option>'
                    append += scns[i].topLineText
                    append += ' '
                    append += scns[i].midLineText
                    append += ' '
                    append += scns[i].botLineText
                    append += '</option>'
                    $("#message_modal").append(append);
                }
            }
        }
    });
    $.ajax({
        url: '../utils/get_vms_scns.php',
        success: function(result) {
            if(result.length == 2){
                alert("Connection Error please try again");
            }
            else{
                var scns = JSON.parse(result);
                for(i=0;i<scns.length;i++){
                    $("#device_modal").append('<option>'+scns[i].SystemCodeNumber+'</option>');
                }
            }
        }
    });
});