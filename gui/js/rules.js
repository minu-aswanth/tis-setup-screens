function openModal(){
    $("#myModal").modal();
}
function openEditModal() {
    try{
        var ruleID = $("input[type='radio'][name='mds']:checked").parent().parent().children()[4].innerHTML
        var sh_des = $("input[type='radio'][name='mds']:checked").parent().parent().children()[2].innerHTML
        var ln_des = $("input[type='radio'][name='mds']:checked").parent().parent().children()[3].innerHTML

        /*if(ruleID.substring(38,39) == ">"){
            ruleID = ruleID.substring(39)
            ruleID = ruleID.substring(0, ruleID.length - 4)
        } else if (ruleID.substring(39,40) == ">"){
            ruleID = ruleID.substring(40)
            ruleID = ruleID.substring(0, ruleID.length - 4)
        }else{
            ruleID = ruleID.substring(41)
            ruleID = ruleID.substring(0, ruleID.length - 4)
        }*/

        if(sh_des.substring(38,39) == ">"){
            sh_des = sh_des.substring(39)
            sh_des = sh_des.substring(0, sh_des.length - 4)
        } else if (sh_des.substring(39,40) == ">"){
            sh_des = sh_des.substring(40)
            sh_des = sh_des.substring(0, sh_des.length - 4)
        } else{
            sh_des = sh_des.substring(41)
            sh_des = sh_des.substring(0, sh_des.length - 4)
        }

        if(ln_des.substring(38,39) == ">"){
            ln_des = ln_des.substring(39)
            ln_des = ln_des.substring(0, ln_des.length - 4)
        } else if (ln_des.substring(39,40) == ">"){
            ln_des = ln_des.substring(40)
            ln_des = ln_des.substring(0, ln_des.length - 4)
        } else{
            ln_des = ln_des.substring(41)
            ln_des = ln_des.substring(0, ln_des.length - 4)
        }
        var sun_from="";
        var sun_to="";
        var mon_from="";
        var mon_to="";
        var tue_from="";
        var tue_to="";
        var wed_from="";
        var wed_to="";
        var thu_from="";
        var thu_to="";
        var fri_from="";
        var fri_to="";
        var sat_from="";
        var sat_to="";

        $.ajax({
            url: '../utils/rule_timings.php',
            data: {ruleID:ruleID},
            type: 'POST',
            success: function(result) {
                var devices_set = jQuery.parseJSON(result);
                for(i=devices_set.length-1; i>=0;i--){
                    sun_from=devices_set[i].FromTimeSun
                    sun_to=devices_set[i].ToTimeSun
                    mon_from=devices_set[i].FromTimeMon
                    mon_to=devices_set[i].ToTimeMon
                    tue_from=devices_set[i].FromTimeTue
                    tue_to=devices_set[i].ToTimeTue
                    wed_from=devices_set[i].FromTimeWed
                    wed_to=devices_set[i].ToTimeWed
                    thu_from=devices_set[i].FromTimeThu
                    thu_to=devices_set[i].ToTimeThu
                    fri_from=devices_set[i].FromTimeFri
                    fri_to=devices_set[i].ToTimeFri
                    sat_from=devices_set[i].FromTimeSat
                    sat_to=devices_set[i].ToTimeSat

                    $("#editModal").modal();
                    $(".modal-body #ruleID_modal")[0].innerHTML = ruleID
                    $(".modal-body #shortDescription_modal").val(sh_des)
                    $(".modal-body #longDescription_modal").val(ln_des)
                    $(".modal-body #OTsundayFrom_modal").val(sun_from)
                    $(".modal-body #OTsundayTo_modal").val(sun_to)
                    $(".modal-body #OTmondayFrom_modal").val(mon_from)
                    $(".modal-body #OTmondayTo_modal").val(mon_to)
                    $(".modal-body #OTtuesdayFrom_modal").val(tue_from)
                    $(".modal-body #OTtuesdayTo_modal").val(tue_to)
                    $(".modal-body #OTwednesdayFrom_modal").val(wed_from)
                    $(".modal-body #OTwednesdayTo_modal").val(wed_to)
                    $(".modal-body #OTthursdayFrom_modal").val(thu_from)
                    $(".modal-body #OTthursdayTo_modal").val(thu_to)
                    $(".modal-body #OTfridayFrom_modal").val(fri_from)
                    $(".modal-body #OTfridayTo_modal").val(fri_to)
                    $(".modal-body #OTsaturdayFrom_modal").val(sat_from)
                    $(".modal-body #OTsaturdayTo_modal").val(sat_to)
                }
            }
        });
    }
    catch(e){
        alert("Please select a device to edit")
    }
}

function editRow(){
    var ruleID=$('#ruleID_modal')[0].innerHTML;
    var shortDescription=$('#shortDescription_modal').val();
    var longDescription=$('#longDescription_modal').val();
    var sun_from=$('#OTsundayFrom_modal').val();
    var sun_to=$('#OTsundayTo_modal').val();
    var mon_from=$('#OTmondayFrom_modal').val();
    var mon_to=$('#OTmondayTo_modal').val();
    var tue_from=$('#OTtuesdayFrom_modal').val();
    var tue_to=$('#OTtuesdayTo_modal').val();
    var wed_from=$('#OTwednesdayFrom_modal').val();
    var wed_to=$('#OTwednesdayTo_modal').val();
    var thu_from=$('#OTthursdayFrom_modal').val();
    var thu_to=$('#OTthursdayTo_modal').val();
    var fri_from=$('#OTfridayFrom_modal').val();
    var fri_to=$('#OTfridayTo_modal').val();
    var sat_from=$('#OTsaturdayFrom_modal').val();
    var sat_to=$('#OTsaturdayTo_modal').val();


    $.ajax({
        url: '../utils/edit_rule.php',
        data :{ruleID:ruleID,shortDescription:shortDescription,longDescription:longDescription,sun_from:sun_from,sun_to:sun_to,mon_from:mon_from,mon_to:mon_to,tue_from:tue_from,tue_to:tue_to,wed_from:wed_from,wed_to:wed_to,thu_from:thu_from,thu_to:thu_to,fri_from:fri_from,fri_to:fri_to,sat_from:sat_from,sat_to:sat_to},
        type: 'POST',
        success: function(result) {
            $("#cancelModal_edit").click();
            alert("Selected Device has been edited")
            fetch_devices();
        }
    });
}

function deleteRow() {
    try{
        var ruleID = $("input[type='radio'][name='mds']:checked").parent().parent().children()[4].innerHTML

        /*if(ruleID.substring(38,39) == ">"){
            ruleID = ruleID.substring(39)
            ruleID = ruleID.substring(0, ruleID.length - 4)
        } else if (ruleID.substring(39,40) == ">"){
            ruleID = ruleID.substring(40)
            ruleID = ruleID.substring(0, ruleID.length - 4)
        }else{
            ruleID = ruleID.substring(41)
            ruleID = ruleID.substring(0, ruleID.length - 4)
        }*/

        $.ajax({
                url: '../utils/del_rule.php',
                data :{ruleID:ruleID},
                type: 'POST',
                success: function(result) {
                    if(result.length == 2){
                        alert("Connection Error please try again");
                    }
                    else{
                        alert("Deleted the Device Entry Succesfully");
                        fetch_devices();
                    }
                }
            });
    }
    catch(e){
        alert("Please select a device to delete")
    }
}
        
$(document).ready(function(){
        fetchdata = function(){
            var shortDescription=$('#shortDescription').val();
            var longDescription=$('#longDescription').val();
            var sun_from=$('#OTsundayFrom').val();
            var sun_to=$('#OTsundayTo').val();
            var mon_from=$('#OTmondayFrom').val();
            var mon_to=$('#OTmondayTo').val();
            var tue_from=$('#OTtuesdayFrom').val();
            var tue_to=$('#OTtuesdayTo').val();
            var wed_from=$('#OTwednesdayFrom').val();
            var wed_to=$('#OTwednesdayTo').val();
            var thu_from=$('#OTthursdayFrom').val();
            var thu_to=$('#OTthursdayTo').val();
            var fri_from=$('#OTfridayFrom').val();
            var fri_to=$('#OTfridayTo').val();
            var sat_from=$('#OTsaturdayFrom').val();
            var sat_to=$('#OTsaturdayTo').val();

            if (sun_from == ""){
                sun_from = "00:00";
            }
            if (sun_to == ""){
                sun_to = "23:59";
            }
            if (mon_from == ""){
                mon_from = "00:00";
            }
            if (mon_to == ""){
                mon_to = "23:59";
            }
            if (tue_from == ""){
                tue_from = "00:00";
            }
            if (tue_to == ""){
                tue_to = "23:59";
            }
            if (wed_from == ""){
                wed_from = "00:00";
            }
            if (wed_to == ""){
                wed_to = "23:59";
            }
            if (thu_from == ""){
                thu_from = "00:00";
            }
            if (thu_to == ""){
                thu_to = "23:59";
            }
            if (fri_from == ""){
                fri_from = "00:00";
            }
            if (fri_to == ""){
                fri_to = "23:59";
            }
            if (sat_from == ""){
                sat_from = "00:00";
            }
            if (sat_to == ""){
                sat_to = "23:59";
            }
            
            $.ajax({
                url: '../utils/add_rule.php',
                data :{shortDescription:shortDescription,longDescription:longDescription,sun_from:sun_from,sun_to:sun_to,mon_from:mon_from,mon_to:mon_to,
                    tue_from:tue_from,tue_to:tue_to,wed_from:wed_from,wed_to:wed_to,thu_from:thu_from,thu_to:thu_to,fri_from:fri_from,fri_to:fri_to,sat_from:sat_from,sat_to:sat_to},
                type: 'POST',
                success: function(result) {
                    $("#cancelModal").click();
                    alert("New Device has been added")
                    fetch_devices();
                }
            });
        }
        $("#addDevice").click(function() {
                fetchdata();
        });
        $("#edit").click(function() {
                fetchdata();
        });

});