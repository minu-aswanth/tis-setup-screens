$(document).ready(function(){
    
    asound=document.getElementById("myAudio");
    if(asound){
       asound.loop=true;
    }
    var onctr,onstr='',temponstr='',ctr=0;  

    function getAlerts(){
        $.ajax({
            url:'../utils/nms_get_alerts.php',
            success:function(res){
                console.log(res);

                if(res[0].vms == false)
                    asound.pause();
            }
        })
    }

    function setAlerts(vms,cctv,ip,detector,met){
        $.ajax({
            url:'../utils/nms_set_alerts.php',
            method:'POST',
            data:{vms:vms,cctv:cctv,ip:ip,detector:detector,meterological:met},
            success:function(res){
                console.log(res);

            }
        })
    }


    fetch_vmsraw = function(){
               
                $('#nms_vms').empty();
                $.ajax({
                    url: '../utils/nms_vms.php',
                    success: function(result) {
                        var raw_set = jQuery.parseJSON(result);
                        var faultText = null;
                        onstr='';
                        for(i=0; i<raw_set.length;i++){
                            if(raw_set[i].online === "0"){
                                faultText = '<img src="../images/offline.png"/>';
                                onctr=0;
                            }else{
                                faultText = '<img src="../images/online.png"/>';
                                onctr=1;
                            }
                            
                            onstr = onstr + onctr + ',';

                            append = '<tr>'
                            append += '<td>'+raw_set[i].SystemCodeNumber+'</td>'
                            append += '<td on='+onctr+'>'+faultText+'</td>'
                            append += '<td>'+raw_set[i].LastStatusChange +'</td>'
                            append += '<td>'+raw_set[i].LastUpdated +'</td>'
                            append += '</tr>'
                            $('#nms_vms').append(append);
                        }
                        //console.log(onstr);
                    }
                });
        }
    fetch_vmsraw();

    // 

    setInterval(function(){
        fetch_vmsraw();
        getAlerts();
      //  console.log(onstr,temponstr);
        if(onstr !== temponstr && ctr == 0){
            temponstr=onstr;
            ctr=1;
            //console.log(temponstr,ctr);
        }
        else if(onstr !== temponstr && ctr == 1){
            temponstr=onstr;
           // console.log(temponstr+'asdasd')
            setAlerts(true,false,false,false,false);
            asound.play();
        }
    },300000);

    $(window).bind("blur focus", function(e) {
        var prevType = $(this).data("prevType");
        if (prevType != e.type) {
            switch (e.type) {
                case "blur":
                    break;
                case "focus":
                    setAlerts(false,false,false,false,false);
                    asound.pause();
                    break;
                }
            }
        $(this).data("prevType", e.type);
    })
    //var timeout = setTimeout("location.reload(true);",300000);

    

});

$(document).ready(function(){
    $.ajax({
        url: '../utils/nms_vms_devices.php',
        success: function(result) {
            if(result.length == 2){
                alert("Connection Error please try again");
            }
            else{
                var scns = JSON.parse(result);
                $("#scns").append('<option>All</option>');
                for(i=0;i<scns.length;i++){
                    $("#scns").append('<option>'+scns[i].SystemCodeNumber+'</option>');
                }
            }
        }
    });
});


$(document).ready(function(){
    pagenation = function(page_number){
        $('#searchResult').empty();
        //$('#searchResult').append('<table border="0"><tr><td colspan="3">&nbsp;<td></tr><tr><td colspan="3">&nbsp;<td></tr><tr><td colspan="3">&nbsp;<td></tr><tr><td colspan="3">&nbsp;<td></tr><tr><td colspan="3">&nbsp;<td></tr><tr><td colspan="3">&nbsp;<td></tr></table>');
        var header = '<tr><td bgcolor="#993232"><font color="white">SCN</td><td bgcolor="#993232"><font color="white">Status</td><td bgcolor="#993232"><font color="white">Status Start Time</td><td bgcolor="#993232"><font color="white">Status End Time</td><td bgcolor="#993232"><font color="white">Total Time(minutes)</td></tr>';
        $('#searchResult').append(header);
        initial_value = Math.min(page_number*10, data_queried.length-1);
        var faultText = null;
        for(i=(page_number-1)*10; i<=initial_value;i++){
            if(data_queried[data_queried.length-i-1].online === "0"){
                faultText = '<img src="../images/offline.png"/>';
            }else{
                faultText = '<img src="../images/online.png"/>';
            }

            append = '<tr>'
            append += '<td>'+data_queried[data_queried.length-i-1].SCN+'</td>'
            append += '<td>'+faultText+'</td>'
            append += '<td>'+data_queried[data_queried.length-i-1].Last_Updated_Old+'</td>'
            append += '<td>'+data_queried[data_queried.length-i-1].Last_Updated_Last+'</td>'            
            append += '<td>'+data_queried[data_queried.length-i-1].time+'</td>'
            append += '</tr>'
            $('#searchResult').append(append);
        }
        append = '<tr>'
        append += '<td>&nbsp</td><td>&nbsp</td><td>&nbsp</td><td>&nbsp</td><td>&nbsp</td>'
        append += '</tr>'
        var max_value = Math.min(page_number+9, Math.ceil(data_queried.length/10))
        max_value = Math.min(page_number+5, max_value)
        if(page_number-4>0){
            var min_value = page_number-4;
        }else{
            var min_value = 1;
        }
        if(max_value-min_value<10){
            max_value = min_value+9;
        }
        if(max_value>Math.ceil(data_queried.length/10)){
            max_value=Math.ceil(data_queried.length/10);
            min_value = max_value-9;
            if (min_value < 1) min_value = 1;
        }
        $('#searchResult').append(append);
        var buttons_numbers = [];
        for(i=min_value;i<=max_value;i++){
            buttons_numbers.push(i);
        }
        add_buttons(buttons_numbers, page_number);
    }
    add_buttons = function(buttons_number, page_number){
        append = '<tr><td>&nbsp</td><td>'

        append += '<ul id="data_nav" class="pagination pagination-md">'
        if(page_number==1){
            append +=  '<li class="disabled"><a style="cursor: pointer" onclick=pagenation(1)>First</a></li>';
            append +=  '<li class="disabled"><a style="cursor: pointer" onclick=pagenation(1)><<</a></li>';
            append +=  '<li class="disabled"><a style="cursor: pointer" onclick=pagenation(1)><</a></li>';
        }
        else{
            append +=  '<li><a onclick=pagenation(1)>First</a></li>';
            if(page_number-10 < 1){
                append +=  '<li><a onclick=pagenation(1)><<</a></li>';
            }else{
                append +=  '<li><a style="cursor: pointer" onclick=pagenation('+(page_number-10)+')><<</a></li>';   
            }
            append +=  '<li><a style="cursor: pointer" onclick=pagenation('+(page_number-1)+')><</a></li>';
        }
        for(i=0; i<buttons_number.length;i++){
            if(buttons_number[i] == page_number){
                append +=  '<li class="active"><a onclick=pagenation('+buttons_number[i]+')>'+buttons_number[i]+'</a></li>';
            }
            else{
                append +=  '<li><a style="cursor: pointer" onclick=pagenation('+buttons_number[i]+')>'+buttons_number[i]+'</a></li>';
            }
        }
        if(page_number==Math.ceil(data_queried.length/10)){
            append +=  '<li class="disabled"><a style="cursor: pointer" onclick=pagenation('+(page_number)+')>></a></li>';
            append +=  '<li class="disabled"><a style="cursor: pointer" onclick=pagenation('+(page_number)+')>>></a></li>';
            append +=  '<li class="disabled"><a style="cursor: pointer" onclick=pagenation('+Math.ceil(data_queried.length/10)+')>Last</a></li>';
        }
        else{
            append +=  '<li><a style="cursor: pointer" onclick=pagenation('+(page_number+1)+')>></a></li>';
            if(page_number+10 > Math.ceil(data_queried.length/10)){
                append +=  '<li><a style="cursor: pointer" onclick=pagenation('+Math.ceil(data_queried.length/10)+')>>></a></li>';  
            }else{
                append +=  '<li><a style="cursor: pointer" onclick=pagenation('+(page_number+10)+')>>></a></li>';   
            }
            append +=  '<li><a style="cursor: pointer" onclick=pagenation('+Math.ceil(data_queried.length/10)+')>Last</a></li>';
        }
        append += '</ul></td></tr>'
        $('#searchResult').append(append);
        
        append = '<tr>'
        append += '<td>&nbsp</td><td>&nbsp</td><td>&nbsp</td>'
        append += '</tr>'
        $('#searchResult').append(append);
    }

    create_report = function(){
        var fromDate=$('#from').val();
        var toDate=$('#to').val();
        var fromTime=$('#fromTime').val();
        var toTime=$('#toTime').val();
        
        var device = document.getElementById("scns").options[document.getElementById("scns").selectedIndex].text;
        var status=$('#status').val();
        var radioVal=$('input[name=orderby]:checked').val();
        if(fromDate == ""){
            alert("Please Enter From Date");
            return;
        }
        if(toDate == ""){
            alert("Please Enter To Date");
            return;
        }
        if(fromTime == ""){
            fromTime = "00:00:00"
        }
        if(toTime == ""){
            toTime = "23:59:59"
        }
        formatted_fromDate = fromDate.substr(fromDate.lastIndexOf("-")+1,fromDate.length) + "-" + fromDate.substr(fromDate.indexOf("-")+1,fromDate.lastIndexOf("-")-3)+ "-" + fromDate.substr(0,fromDate.indexOf("-")) + " "+ fromTime;
        formatted_toDate = toDate.substr(toDate.lastIndexOf("-")+1,toDate.length) + "-" + toDate.substr(toDate.indexOf("-")+1,toDate.lastIndexOf("-")-3)+ "-" + toDate.substr(0,toDate.indexOf("-")) + " "+ toTime;
        if(formatted_fromDate > formatted_toDate){
            alert("From Date should be less than To Date");
            return;
        }
        else{
            $.ajax({
                url: '../utils/createreport_nms_vms.php',
                data :{fromDate:formatted_fromDate,toDate:formatted_toDate,device:device,status:status, parameter:"0",orderby:radioVal,forgraph:'0'},
                type: 'POST',
                success: function(result) {
                    if(result.length == 2){
                        alert("Connection Error please try again");
                    }
                    else{
                        // console.log(result);
                        var devices_set = jQuery.parseJSON(result);
                        var count = 0;
                        // console.log(devices_set.length)
                        if(devices_set.length > 0){
                            data_queried = jQuery.parseJSON(result);
                            pagenation(1);


                            // following code is for drawing graph.

                            var startDate = fromDate;
                            var endDate = toDate;
                            var scn = device;
                            var formatted_startDate = formatted_fromDate;
                            var formatted_endDate = formatted_toDate;
                            var deviceType = "vms";

                            var currentTime = Math.round(new Date().getTime()/1000);
                            var endDateTime = Math.round(new Date(formatted_endDate).getTime()/1000);

                            // if(currentTime < endDateTime){
                            //     var current = new Date();

                            //     var year = current.getFullYear();
                            //     var month = current.getMonth() + 1;
                            //     var date = current.getDate();
                            //     var hour = current.getHours();
                            //     var minute = current.getMinutes();
                            //     var seconds = current.getSeconds();
                                
                            //     if(month.toString().length==1) month="0"+month;
                            //     if(date.toString().length==1) date="0"+date;
                            //     if(hour.toString().length==1) hour="0"+hour;
                            //     if(minute.toString().length==1) minute="0"+minute;
                            //     if(seconds.toString().length==1) seconds="0"+seconds;

                            //     formatted_endDate = year+"-"+month+"-"+date+" "+hour+":"+minute+":"+seconds;
                            // }

                            $.ajax({
                                url: '../utils/uptimeReport.php',
                                data :{formatted_startDate:formatted_fromDate,formatted_endDate:formatted_toDate,deviceType:deviceType,scn:scn},
                                type: 'POST',
                                success: function(result) {
                                    if(result.length == 2){
                                        alert("Connection Error please try again");
                                    }
                                    else{
                                        timeArray = Array();
                                        var scn1 = "abc";
                                        var onlineKey = "abc";
                                        var offlineKey = "abc";
                                        var devices_set = jQuery.parseJSON(result);
                                        
                                            for(i=0; i<devices_set.length;i++){
                                                onlineKey = devices_set[i].SystemCodeNumber+'_1';
                                                offlineKey = devices_set[i].SystemCodeNumber+'_0';
                                                timeArray[onlineKey] = 0;
                                                timeArray[offlineKey] = 0;
                                                console.log(onlineKey,offlineKey)
                                            }
                                        
                                        
                                        $.ajax({
                                            url: '../utils/createreport_nms_vms.php',
                                            data :{fromDate:formatted_fromDate,toDate:formatted_toDate,device:device,status:'all',parameter:"1",orderby:'',forgraph:'1'},
                                            type: 'POST',
                                            success: function(result_count){
                                                if(result_count.length == 2){
                                                    alert("Connection Error please try again");
                                                } else{
                                                    var time_set = jQuery.parseJSON(result_count);
                                                    console.log(time_set)
                                                    var onlineKey = "";
                                                    var offlineKey = "";
                                                   
                                                        for(var i=time_set.length-1;i>=0;i--){
                                                        
                                                        if(i == 0){ //for getting on/off time before the first data status start time 
                                                            if(time_set[i].online=="0"){
                                                                onlineKey = time_set[i].SCN+'_1';
                                                                var time = timeArray[onlineKey];
                                                                timeArray[onlineKey]=Math.round(time) + Math.round(new Date(time_set[i].Last_Updated).getTime()/60000) - Math.round(new Date(formatted_startDate).getTime()/60000);

                                                            } else if(time_set[i].online=="1"){
                                                                offlineKey = time_set[i].SCN+'_0';
                                                                var time = timeArray[offlineKey];
                                                                timeArray[offlineKey] = Math.round(time) + Math.round(new Date(time_set[i].Last_Updated).getTime()/60000) - Math.round(new Date(formatted_startDate).getTime()/60000);
                                                            }
                                                        } else{
                                                            if(time_set[i].SCN != time_set[i-1].SCN){
                                                                if(time_set[i].online == "0"){
                                                                    onlineKey = time_set[i].SCN+'_1';
                                                                    var time = timeArray[onlineKey];
                                                                    timeArray[onlineKey]=Math.round(time) + Math.round(new Date(time_set[i].Last_Updated).getTime()/60000) - Math.round(new Date(formatted_startDate).getTime()/60000);
                                                                } else if(time_set[i].online == "1"){
                                                                    offlineKey = time_set[i].SCN+'_0';
                                                                    var time = timeArray[offlineKey];
                                                                    timeArray[offlineKey] = Math.round(time) + Math.round(new Date(time_set[i].Last_Updated).getTime()/60000) - Math.round(new Date(formatted_startDate).getTime()/60000);
                                                                }
                                                            } else {
                                                                if(time_set[i].online=="1"){
                                                                    offlineKey = time_set[i].SCN+'_0';
                                                                    var time = timeArray[offlineKey];
                                                                    timeArray[offlineKey] = Math.round(time) + Math.round(time_set[i].time);
                                                                    
                                                                } else if(time_set[i].online=="0"){
                                                                    onlineKey = time_set[i].SCN+'_1';
                                                                    var time = timeArray[onlineKey];
                                                                    timeArray[onlineKey] = Math.round(time) + Math.round(time_set[i].time);
                                                                }
                                                            }
                                                        }
                                                        
                                                        if(i == (time_set.length-1)){
                                                            if(time_set[i].online=="1"){
                                                                onlineKey = time_set[i].SCN+'_1';
                                                                var time = timeArray[onlineKey];
                                                                timeArray[onlineKey]=Math.round(time) + Math.round(new Date(formatted_endDate).getTime()/60000) - Math.round(new Date(time_set[i].Last_Updated).getTime()/60000);
                                                            } else if(time_set[i].online=="0"){
                                                                offlineKey = time_set[i].SCN+'_0';
                                                                var time = timeArray[offlineKey];
                                                                timeArray[offlineKey] = Math.round(time) + Math.round(new Date(formatted_endDate).getTime()/60000) - Math.round(new Date(time_set[i].Last_Updated).getTime()/60000);
                                                            }
                                                        } 
                                                    }
                                                }
                                                next(timeArray, formatted_startDate, formatted_endDate, scn, "onSearch");
                                            }
                                        });
                                    }
                                }
                            });

                        } else{
                            append = '<tr>'
                            append += '<td colspan="3">No Results</td></tr>'
                            $('#searchResult').append(append);
                        }
                        
                    }
                }
            });
        }
    }
        
    create_reportOnload = function(){

        var current = new Date();

        var year = current.getFullYear();
        var month = current.getMonth() + 1;
        var date = current.getDate();
        //var date1 = current.getDate()+1;
        var hour = current.getHours();
        var minute = current.getMinutes();
        var seconds = current.getSeconds();
        
        if(month.toString().length==1) month="0"+month;
        if(date.toString().length==1) date="0"+date;
        if(hour.toString().length==1) hour="0"+hour;
        if(minute.toString().length==1) minute="0"+minute;
        if(seconds.toString().length==1) seconds="0"+seconds;

        formatted_toDate = year+"-"+month+"-"+date+" "+hour+":"+minute+":"+seconds;
        formatted_fromDate = year+"-"+month+"-"+date+" "+"00:00:00";
        
        var device = "All";
        var status = "all";
        var radioVal=$('input[name=orderby]:checked').val();

        if(formatted_fromDate > formatted_toDate){
            alert("From Date should be less than To Date");
            return;
        }
        else{

            $.ajax({
                url: '../utils/createreport_nms_vms.php',
                data :{fromDate:formatted_fromDate,toDate:formatted_toDate,device:device,status:status,parameter:"0",orderby:radioVal,forgraph:'0'},
                type: 'POST',
                success: function(result) {
                    if(result.length == 2){
                        alert("Connection Error please try again");
                    }
                    else{
                        var devices_set = jQuery.parseJSON(result);
                        var count = 0;

                        if(devices_set.length > 0){
                            data_queried = jQuery.parseJSON(result);
                            pagenation(1);


                            // following code is for drawing graph.

                            var scn = device;
                            var formatted_startDate = formatted_fromDate;
                            var formatted_endDate = formatted_toDate;
                            var deviceType = "vms";

                            var currentTime = Math.round(new Date().getTime()/1000);
                            var endDateTime = Math.round(new Date(formatted_endDate).getTime()/1000);

                            if(currentTime < endDateTime){
                                var current = new Date();

                                var year = current.getFullYear();
                                var month = current.getMonth() + 1;
                                var date = current.getDate();
                                var hour = current.getHours();
                                var minute = current.getMinutes();
                                var seconds = current.getSeconds();
                                
                                if(month.toString().length==1) month="0"+month;
                                if(date.toString().length==1) date="0"+date;
                                if(hour.toString().length==1) hour="0"+hour;
                                if(minute.toString().length==1) minute="0"+minute;
                                if(seconds.toString().length==1) seconds="0"+seconds;

                                formatted_endDate = year+"-"+month+"-"+date+" "+hour+":"+minute+":"+seconds;
                            }
                            
                            $.ajax({
                                url: '../utils/uptimeReport.php',
                                data :{formatted_startDate:formatted_startDate,formatted_endDate:formatted_endDate,deviceType:deviceType,scn:scn},
                                type: 'POST',
                                success: function(result) {
                                    if(result.length == 2){
                                        alert("Connection Error please try again");
                                    }
                                    else{
                                        timeArray = Array();
                                        var scn1 = "abc";
                                        var onlineKey = "abc";
                                        var offlineKey = "abc";
                                        var devices_set = jQuery.parseJSON(result);
                                        for(i=devices_set.length-1; i>=0;i--){
                                            onlineKey = devices_set[i].SystemCodeNumber+'_1';
                                            offlineKey = devices_set[i].SystemCodeNumber+'_0';
                                            timeArray[onlineKey] = 0;
                                            timeArray[offlineKey] = 0;
                                        }
                                        $.ajax({
                                            url: '../utils/createreport_nms_vms.php',
                                            data :{fromDate:formatted_startDate,toDate:formatted_endDate,device:device,status:'all',parameter:"1",orderby:'',forgraph:'1'},
                                            type: 'POST',
                                            success: function(result_count){
                                                if(result_count.length == 2){
                                                    alert("Connection Error please try again");
                                                } else{
                                                    var time_set = jQuery.parseJSON(result_count);
                                                    var onlineKey = null;
                                                    var offlineKey = null;
                                                    for(var i=time_set.length-1;i>=0;i--){
                                                        if(i == 0){
                                                            if(time_set[i].online=="0"){
                                                                onlineKey = time_set[i].SCN+'_1';
                                                                var time = timeArray[onlineKey];
                                                                timeArray[onlineKey]=Math.round(time) + Math.round(new Date(time_set[i].Last_Updated).getTime()/60000) - Math.round(new Date(formatted_startDate).getTime()/60000);

                                                            } else if(time_set[i].online=="1"){
                                                                offlineKey = time_set[i].SCN+'_0';
                                                                var time = timeArray[offlineKey];
                                                                timeArray[offlineKey] = Math.round(time) + Math.round(new Date(time_set[i].Last_Updated).getTime()/60000) - Math.round(new Date(formatted_startDate).getTime()/60000);
                                                            }
                                                        } else{
                                                            if(time_set[i].SCN != time_set[i-1].SCN){
                                                                if(time_set[i].online == "0"){
                                                                    onlineKey = time_set[i].SCN+'_1';
                                                                    var time = timeArray[onlineKey];
                                                                    timeArray[onlineKey]=Math.round(time) + Math.round(new Date(time_set[i].Last_Updated).getTime()/60000) - Math.round(new Date(formatted_startDate).getTime()/60000);
                                                                } else if(time_set[i].online == "1"){
                                                                    offlineKey = time_set[i].SCN+'_0';
                                                                    var time = timeArray[offlineKey];
                                                                    timeArray[offlineKey] = Math.round(time) + Math.round(new Date(time_set[i].Last_Updated).getTime()/60000) - Math.round(new Date(formatted_startDate).getTime()/60000);
                                                                }
                                                            } else {
                                                                if(time_set[i].online=="1"){
                                                                    offlineKey = time_set[i].SCN+'_0';
                                                                    var time = timeArray[offlineKey];
                                                                    timeArray[offlineKey] = Math.round(time) + Math.round(time_set[i].time);
                                                                    
                                                                } else if(time_set[i].online=="0"){
                                                                    onlineKey = time_set[i].SCN+'_1';
                                                                    var time = timeArray[onlineKey];
                                                                    timeArray[onlineKey] = Math.round(time) + Math.round(time_set[i].time);
                                                                }
                                                            }
                                                        }
                                                        
                                                        if(i == (time_set.length-1)){
                                                            if(time_set[i].online=="1"){
                                                                onlineKey = time_set[i].SCN+'_1';
                                                                var time = timeArray[onlineKey];
                                                                timeArray[onlineKey]=Math.round(time) + Math.round(new Date(formatted_endDate).getTime()/60000) - Math.round(new Date(time_set[i].Last_Updated).getTime()/60000);
                                                            } else if(time_set[i].online=="0"){
                                                                offlineKey = time_set[i].SCN+'_0';
                                                                var time = timeArray[offlineKey];
                                                                timeArray[offlineKey] = Math.round(time) + Math.round(new Date(formatted_endDate).getTime()/60000) - Math.round(new Date(time_set[i].Last_Updated).getTime()/60000);
                                                            }
                                                        } else{
                                                            if(time_set[i].SCN != time_set[i+1].SCN){
                                                                if(time_set[i].online == "1"){
                                                                    onlineKey = time_set[i].SCN+'_1';
                                                                    var time = timeArray[onlineKey];
                                                                    timeArray[onlineKey]=Math.round(time) + Math.round(new Date(formatted_endDate).getTime()/60000) - Math.round(new Date(time_set[i].Last_Updated).getTime()/60000);
                                                                } else if(time_set[i].online == "0"){
                                                                    offlineKey = time_set[i].SCN+'_0';
                                                                    var time = timeArray[offlineKey];
                                                                    timeArray[offlineKey] = Math.round(time) + Math.round(new Date(formatted_endDate).getTime()/60000) - Math.round(new Date(time_set[i].Last_Updated).getTime()/60000);
                                                                }
                                                            }
                                                        } 
                                                    }
                                                }
                                                next(timeArray, formatted_startDate, formatted_endDate, scn, "onLoad");
                                            }
                                        });
                                    }
                                }
                            });

                        } else{
                            append = '<tr>'
                            append += '<td colspan="3">No Results</td></tr>'
                            $('#searchResult').append(append);
                        }
                        
                    }
                }
            });
        }
    }

    $("#createReport").click(function() {
            create_report();
    });
    create_reportOnload();
        
});





$(document).ready(function(){
        download_report = function(){
            var fromDate=$('#from').val();
            var toDate=$('#to').val();
            var fromTime=$('#fromTime').val();
            var toTime=$('#toTime').val();
            var device = document.getElementById("scns").options[document.getElementById("scns").selectedIndex].text;
            var status=$('#status').val();
            var radioVal=$('input[name=orderby]:checked').val();
            if(fromDate == ""){
                alert("Please Enter From Date");
                return;
            }
            if(toDate == ""){
                alert("Please Enter To Date");
                return;
            }
            if(fromTime == ""){
                fromTime = "00:00:00"
            }
            if(toTime == ""){
                toTime = "23:59:59"
            }
            //var timerange=$("#timerange :selected").val();
            formatted_fromDate = fromDate.substr(fromDate.lastIndexOf("-")+1,fromDate.length) + "-" + fromDate.substr(fromDate.indexOf("-")+1,fromDate.lastIndexOf("-")-3)+ "-" + fromDate.substr(0,fromDate.indexOf("-")) + " " + fromTime;
            formatted_toDate = toDate.substr(toDate.lastIndexOf("-")+1,toDate.length) + "-" + toDate.substr(toDate.indexOf("-")+1,toDate.lastIndexOf("-")-3)+ "-" + toDate.substr(0,toDate.indexOf("-")) + " " + toTime;
            if(formatted_fromDate > formatted_toDate){
                alert("From Date should be less than To Date");
                return;
            }
            else{
                $.ajax({
                    url: '../utils/createreport_nms_vms.php',
                    data :{fromDate:formatted_fromDate,toDate:formatted_toDate,device:device,status:status,parameter:"0",orderby:radioVal,forgraph:'0'},
                    type: 'POST',
                    success: function(result) {
                        if(result.length == 2){
                            alert("Connection Error please try again");
                        }
                        else{
                            json_to_csv(result, "Fault Report - vms", true,fromDate,toDate);
                        }
                    }
                });
            }
        }
        $("#downloadReport").click(function() {
                download_report();
        });
        
});

$(document).ready(function(){
        download_pdf = function(){
            var fromDate=$('#from').val();
            var toDate=$('#to').val();
            var device = document.getElementById("scns").options[document.getElementById("scns").selectedIndex].text;
            var fromTime=$('#fromTime').val();
            var toTime=$('#toTime').val();
            var status=$('#status').val();
            var radioVal=$('input[name=orderby]:checked').val();
            if(fromDate == ""){
                alert("Please Enter From Date");
                return;
            }
            if(toDate == ""){
                alert("Please Enter To Date");
                return;
            }
            if(fromTime == ""){
                fromTime = "00:00:00"
            }
            if(toTime == ""){
                toTime = "23:59:59"
            }
            formatted_fromDate = fromDate.substr(fromDate.lastIndexOf("-")+1,fromDate.length) + "-" + fromDate.substr(fromDate.indexOf("-")+1,fromDate.lastIndexOf("-")-3)+ "-" + fromDate.substr(0,fromDate.indexOf("-")) + " " + fromTime;
            formatted_toDate = toDate.substr(toDate.lastIndexOf("-")+1,toDate.length) + "-" + toDate.substr(toDate.indexOf("-")+1,toDate.lastIndexOf("-")-3)+ "-" + toDate.substr(0,toDate.indexOf("-")) + " " + toTime;
            if(formatted_fromDate > formatted_toDate){
                alert("From Date should be less than To Date");
                return;
            }
            else{
                $.ajax({
                  url: '../utils/get_username.php',
                    success: function(result_username) {
                        var username = result_username;
                        window.open("../utils/createreport_nms_vms_pdf.php?fromDate=" + formatted_fromDate +"&toDate=" + formatted_toDate +"&username="+username+"&status="+status+"&device="+device+'&orderby='+radioVal,'_blank');    
                    }
                });
            }
        }
        $("#downloadPDF").click(function() {
                download_pdf();
        });
        
});

function json_to_csv(json_data, title, label, fromDate, toDate) {
    //Json  Parser
    var arr_data = JSON.parse(json_data);
    var csv = '';    
    
    //Title of the csv file, utilize it if needed 
    //csv += title + '\r\n\n';
    
    // column labels extraction
    if (label) {
        var row = "";
        for (var index in arr_data[0]) {
            row += index + ',';
        }
        row = row.slice(0, -1);
        //new line
        csv += row + '\r\n';
    }

    //Traffic data extraction
    for (var i = arr_data.length-1; i >= 0 ; i--) {
        var row = "";        
        for (var index in arr_data[i]) {
            row += '"' + arr_data[i][index] + '",';
        }
        row.slice(0, row.length - 1);
        //add a line break after each row
        csv += row + '\r\n';
    }

    if (csv == '') {        
        alert("No data found");
        return;
    }   
    
    // file name declaration change accordingly
    var file_name = "fault_report_vms_"+fromDate+"_"+toDate;  
    var uri = 'data:text/csv;charset=utf-8,' + escape(csv);    
    var link = document.createElement("a");    
    link.href = uri;
    link.style = "visibility:hidden";
    link.download = file_name + ".csv";    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}


function keyValue(key, value){
    this.Key = key;
    this.Value = value;
};

function Update(keyValue, newKey, newValue)
  {
    keyValue.Key = newKey;
    keyValue.Value = newValue; 
  }
  


  next = function(timeArray_next, formatted_startDate, formatted_endDate, scn, chartLable){
    compare = 1

    for(var key in timeArray_next) {
        var value = timeArray_next[key];
        if(value == '0'){
            compare = compare+1
        }
    }
    count = 1
    for (var k in timeArray_next){ 
        if (timeArray_next.hasOwnProperty(k)) {
            if(timeArray_next[k]=="0"){
                var deviceSCN = k.substr(0,k.length-2);
                $.ajax({
                    url: '../utils/nms_LastStatus.php',
                    data :{module:"vms",device:deviceSCN,startDate:formatted_startDate},
                    type: 'POST',
                    success: function(result_lastStatus){
                        count = count+1
                        if(result_lastStatus.length == 2){
                            alert("Connection Error please try again");
                        } else{
                            var lastStatus = jQuery.parseJSON(result_lastStatus);
                            for(i=lastStatus.length-1; i>=0;i--){
                                if(lastStatus[i].online == "1"){
                                    onlineKey = lastStatus[i].SystemCodeNumber+'_1';
                                    timeArray_next[onlineKey]=Math.round(new Date(formatted_endDate).getTime()/60000) - Math.round(new Date(formatted_startDate).getTime()/60000);
                                } else if(lastStatus[i].online == "0"){
                                    offlineKey = lastStatus[i].SystemCodeNumber+'_0';
                                    timeArray_next[offlineKey]=Math.round(new Date(formatted_endDate).getTime()/60000) - Math.round(new Date(formatted_startDate).getTime()/60000);
                                }
                            }
                        }

                    }
                });
                sleep(50);
                
            }

        }

    }



    var online = [];
    var offline = [];
    var devices = [];

    var totalOnline=0;
    var totalOffline=0;
    
    $.ajax({
        url: '../utils/nms_vms_devices.php',
        type: 'POST',
        success: function(result_devices){
            var raw_set = jQuery.parseJSON(result_devices);
            for(var i=raw_set.length-1;i>=0;i--){

                if(timeArray_next[raw_set[i].SystemCodeNumber+"_0"] == 0 && timeArray_next[raw_set[i].SystemCodeNumber+"_1"] == 0){
                    offlinePercent = 0;
                    onlinePercent = 0;
                } else {
                    offlinePercent = ((timeArray_next[raw_set[i].SystemCodeNumber+"_0"])*100)/(timeArray_next[raw_set[i].SystemCodeNumber+"_0"] + timeArray_next[raw_set[i].SystemCodeNumber+"_1"]);
                
                    onlinePercent = ((timeArray_next[raw_set[i].SystemCodeNumber+"_1"])*100)/(timeArray_next[raw_set[i].SystemCodeNumber+"_0"] + timeArray_next[raw_set[i].SystemCodeNumber+"_1"]);
                }

                
                offlinePercent = +offlinePercent.toFixed(2);
                onlinePercent = +onlinePercent.toFixed(2);

                offline.push(offlinePercent);
                online.push(onlinePercent);
                devices.push(raw_set[i].SystemCodeNumber);

                totalOnline = totalOnline + timeArray_next[raw_set[i].SystemCodeNumber+"_1"];
                totalOffline = totalOffline + timeArray_next[raw_set[i].SystemCodeNumber+"_0"];

            }

            if(scn == 'All'){

                $('#myDivTable').show();
                $('#myDiv').show();

                var overallTotal = totalOffline+totalOnline;

                totalOnlineP = totalOnline*100/overallTotal;
                totalOfflineP = totalOffline*100/overallTotal;

                totalOnlineP = +totalOnlineP.toFixed(2);
                totalOfflineP = +totalOfflineP.toFixed(2);

                online.push(totalOnlineP);
                offline.push(totalOfflineP);
                devices.push("All Devices");
            } else{
                $('#myDivTable').hide();
                $('#myDiv').hide();
            }


            var onlineGraph = {
                x: online,
                y: devices,
                name: 'Online',
                orientation:'h',
                marker:{
                    color:'#25ED0B',
                    width: 0.25
                },
                type:'bar'
            };

            var offlineGraph = {
                x: offline,
                y: devices,
                name: 'Offline',
                orientation:'h',
                type:'bar',
                marker:{
                    color:'#7E2217',
                    width: 0.25
                }
            };

            var data = [onlineGraph,offlineGraph];

            if(chartLable == "onLoad"){
                var layout = {
                    title: "Today's Uptime Chart",
                    barmode: 'stack'
                };  
            } else {
                var layout = {
                    title: 'Uptime Chart',
                    barmode: 'stack'
                };    
            }
            

            Plotly.newPlot('myDiv', data, layout);
            //$('#myDiv').show();

            var end = (new Date(formatted_endDate)).getTime() / 1000;
            var start = (new Date(formatted_startDate)).getTime() / 1000;
            var factor = ((end-start+1)/6000);

            $('#myDivTable').empty();
            append = '<table id="dataTable" width="100%" border="1" align="center" class="table"><br><br><br><br><br><tr><td bgcolor="#993232" rowspan="2" style="vertical-align:middle"><font color="white">Device</td><td bgcolor="#993232" colspan="2"><font color="white">Online Time</td><td bgcolor="#993232" colspan="2"><font color="white">Offline Time</td></tr><tr><td bgcolor="#993232"><font color="white">Time (min)</td><td bgcolor="#993232"><font color="white">%</td><td bgcolor="#993232"><font color="white">Time (min)</td><td bgcolor="#993232"><font color="white">%</td></tr>';
            var onlineSum = 0;
            var offlineSum = 0;
            var onlineP = 0;
            var offlineP = 0;
            for (var i=devices.length-1;i>=0;i--){
                if(devices[i] !='All Devices'){
                    //console.log(online[i]);
                    //console.log(offline[i]);
                    var on = online[i]*factor;
                    on = +on.toFixed(0);
                    onlineSum = onlineSum + on;
                    var off = offline[i]*factor;
                    off = +off.toFixed(0);
                    offlineSum = offlineSum + off;
                    append += '<tr><td>'+devices[i]+'</td><td>'+on+'</td><td>'+online[i]+'</td><td>'+off+'</td><td>'+offline[i]+'</td></tr>'    
                } else{
                    onlineP=online[i];
                    offlineP=offline[i];
                }
                
            }

            if(scn === "All"){
                append += '<tr bgcolor="#cc9999"><td>All Devices</td><td>'+onlineSum+'</td><td>'+onlineP+'</td><td>'+offlineSum+'</td><td>'+offlineP+'</td></tr>';  
            }
            append += '</table><br><br><br><br><br>';
            
            $('#myDivTable').append(append);
            //$('#myDivTable').show();

        }
    });
}

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}