$(document).ready(function(){
    $.ajax({
        url: '../utils/get_signals.php',
        success: function(result) {
            if(result.length == 2){
                alert("Connection Error please try again");
            }
            else{
                var scns = JSON.parse(result);
                $("#scns").append('<option>All</option>');
                for(i=0;i<scns.length;i++){
                    $("#scns").append('<option value='+scns[i].SignalID+' groupid='+scns[i].GroupID+' links='+scns[i].NumLinks+'>'+scns[i].SCN+' - '+scns[i].ShortDescription+'</option>');
                }
            }
        }
    });
});

var timer;
function populateLiveInfo(){   
    var scn = $('#scns option:selected').val();
    var gid = $('#scns option:selected').attr('groupid');
    totallinks = $('#scns option:selected').attr('links');
    $('#linksimage').attr('src','../images/'+totallinks+'leg.png');
    
    clearInterval(timer);
    signalLiveCall(scn,gid,totallinks);
    
    timer = setInterval(function(){
        console.log('timer');
        signalLiveCall(scn,gid,totallinks);
    },5000)
    
}

function populateLiveInfo2(){   
    var scn = $('#scns option:selected').attr('signalID');
    var gid = $('#scns option:selected').attr('groupid');
    totallinks = $('#scns option:selected').attr('links');
    $('#linksimage').attr('src','../images/'+totallinks+'leg_small.png');
    
    clearInterval(timer);
    signalLiveCall2(scn,gid,totallinks);
    
    timer = setInterval(function(){
        console.log('timer');
        signalLiveCall2(scn,gid,totallinks);
    },5000)
    
}

function populateLiveInfo3(){   
    var scn = $('#scns option:selected').attr('signalID');
    var gid = $('#scns option:selected').attr('groupid');
    totallinks = $('#scns option:selected').attr('links');
    $('#linksimage').attr('src','../images/'+totallinks+'leg_small.png');
    
    clearInterval(timer);
    signalLiveCall2(scn,gid,totallinks);
    
    console.log('manual');
    
}

function linksmanage(currentLink,totalLinks){
    var can2 = document.getElementById('canvas2');
    var ctx2 = can2.getContext('2d');
    
    ctx2.clearRect(0, 0, can2.width, can2.height);

    function drawArrowhead(locx, locy, angle, sizex, sizey) {
        var hx = sizex / 2;
        var hy = sizey / 2;
        ctx2.save();   
        ctx2.translate((locx), (locy));
        ctx2.rotate(angle);
        ctx2.translate(-hx,-hy);

        ctx2.beginPath();
        ctx2.moveTo(0,0);
        ctx2.lineTo(0,1*sizey);    
        ctx2.lineTo(1*sizex,1*hy);
        ctx2.closePath();
        ctx2.fill();
        ctx2.restore();
    }
        

    function findAngle(sx, sy, ex, ey) {
        angle=Math.atan((ey - sy) / (ex - sx));
        return (angle > 0 ? angle : angle + 3.14159);
    }

    spx=117.5;
    spy=62.5;
    var nsx=0,nsy=0;
    deg=new Array();
    pointarr=new Array();

    interval=360/totalLinks;

    for(var i=0;i<totalLinks;i++)
    {
      deg[i]=interval*i;
    }

    for(var i=0,j=totalLinks-1;i<totalLinks;i++,j--)
    {
      nsx=62.5 + 55*((Math.cos(deg[i]*(Math.PI/180)))) ;
      nsy=62.5 - 55*((Math.sin(deg[i]*(Math.PI/180))));
      pointarr[j]=nsx+","+nsy;
    }

    currentLink = currentLink.split(";")
    for(var i=0;i<currentLink.length-1;i++){
        link = currentLink[i].split(" to ");

        from = parseInt(link[0].split("-")[1]) - 1;
        to = parseInt(link[1].split("-")[1]) - 1;

        ctx2.beginPath();
        ctx2.fillStyle = "rgba(1,125,45,1)";
        ctx2.strokeStyle = "rgba(1,125,45,1)";
        ctx2.lineWidth = 3;
        ctx2.moveTo(pointarr[from].split(',')[0],pointarr[from].split(',')[1]);
        ctx2.quadraticCurveTo(62.5, 62.5, pointarr[to].split(',')[0],pointarr[to].split(',')[1]);
        ctx2.stroke();


        ang = findAngle(55, 55, pointarr[to].split(',')[0],pointarr[to].split(',')[1]);
        ctx2.fillRect(pointarr[to].split(',')[0],pointarr[to].split(',')[1], 2, 2);
        drawArrowhead(pointarr[to].split(',')[0],pointarr[to].split(',')[1],ang, 8, 8);
    }


    //ctx.arc(125,125,62.5,0,2*Math.PI);
    //ctx.stroke();
}
function signalLiveCall(scn,gid,totallinks){
        var canv=document.getElementById('canvas');
        var canvcon=canv.getContext('2d');
        canvcon.clearRect(0, 0, canv.width, canv.height);

        var can = document.getElementById('canvas');
        var ctx = can.getContext('2d');
        var img=document.getElementById("linksimage");
        ctx.drawImage(img,0,0);

        var d = new Date();
        var currtime = d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
        var timearray = new Array(),linkarray=new Array();
        cyclelength=0;
        $('#signal_live').empty();
        $('#link_live').empty();

        $.ajax({
        url: '../utils/signal_live.php',
        data :{signal_id:scn,current_time:currtime,groupid:gid},
        type: 'POST',
        success: function(result) {
            
            var raw_set = $.parseJSON(result);
            
            for(i=0; i<Object.keys(raw_set).length;i++){
                append = '<tr>'
                append += '<td>'
                append += raw_set[i].StageOrder
                append += '</td><td>'
                append += raw_set[i].Time
                append += '</td><td>'
                append += raw_set[i].VehicleMovements
                append += '</td>'
                append += '</tr>'
                
                $('#signal_live').append(append);
				
                timearray[i] = parseInt(raw_set[i].Time);
                linkarray[i] = raw_set[i].VehicleMovements;
                cyclelength = cyclelength + parseInt(raw_set[i].Time);
                
            }
           linknames = raw_set[0].LinkNames.split(';');
           
           for(var i=0;i<linknames.length;i++){
               var ele = '';
               ele = '<tr><td>Link-'+(i+1)+'</td><td>'+linknames[i]+'</td></tr>';
               $('#link_live').append(ele); 
           }

            $("#dataTable").attr('starttime',raw_set[0].StartTime);
                
            currtime = currtime.split(":");
            currsec = parseInt(currtime[0])*60*60 + parseInt(currtime[1])*60 + parseInt(currtime[2]);
            starttime = raw_set[0].StartTime.split(":");
            
            startsec = parseInt(starttime[0])*60*60 + parseInt(starttime[1])*60 + parseInt(starttime[2]);

            timediff = currsec - startsec;
            timediff = timediff % cyclelength;
            totaltime = 0;

            for(var i=0;i<timearray.length;i++){
                totaltime = totaltime + timearray[i];
                if(totaltime > timediff){
                    currlink = linkarray[i];
                    $('#signal_live tr').css('background-color','#fff')
                    $($('#signal_live tr')[i]).css('background-color','#e0d9d9');
                    linksmanage(currlink,totallinks);
                    break;
                }
            }  

        }
        });
    }
	
	
function linksmanage2(currentLink,totalLinks){
    var can2 = document.getElementById('canvas2');
    var ctx2 = can2.getContext('2d');
    
    ctx2.clearRect(0, 0, can2.width, can2.height);

    function drawArrowhead(locx, locy, angle, sizex, sizey) {
        var hx = sizex / 2;
        var hy = sizey / 2;
        ctx2.save();   
        ctx2.translate((locx), (locy));
        ctx2.rotate(angle);
        ctx2.translate(-hx,-hy);

        ctx2.beginPath();
        ctx2.moveTo(0,0);
        ctx2.lineTo(0,1*sizey);    
        ctx2.lineTo(1*sizex,1*hy);
        ctx2.closePath();
        ctx2.fill();
        ctx2.restore();
    }
        

    function findAngle(sx, sy, ex, ey) {
        angle=Math.atan((ey - sy) / (ex - sx));
        return (angle > 0 ? angle : angle + 3.14159);
    }

    spx=58.75;
    spy=31.5;
    var nsx=0,nsy=0;
    deg=new Array();
    pointarr=new Array();

    interval=360/totalLinks;

    for(var i=0;i<totalLinks;i++)
    {
      deg[i]=interval*i;
    }

    for(var i=0,j=totalLinks-1;i<totalLinks;i++,j--)
    {
      nsx=31.5 + 27.5*((Math.cos(deg[i]*(Math.PI/180)))) ;
      nsy=31.5 - 27.5*((Math.sin(deg[i]*(Math.PI/180))));
      pointarr[j]=nsx+","+nsy;
    }

    currentLink = currentLink.split(";")
    for(var i=0;i<currentLink.length-1;i++){
        link = currentLink[i].split(" to ");

        from = parseInt(link[0].split("-")[1]) - 1;
        to = parseInt(link[1].split("-")[1]) - 1;

        ctx2.beginPath();
        ctx2.fillStyle = "rgba(1,125,45,1)";
        ctx2.strokeStyle = "rgba(1,125,45,1)";
        ctx2.lineWidth = 3;
        ctx2.moveTo(pointarr[from].split(',')[0],pointarr[from].split(',')[1]);
        ctx2.quadraticCurveTo(31.5, 31.5, pointarr[to].split(',')[0],pointarr[to].split(',')[1]);
        ctx2.stroke();


        ang = findAngle(27.5, 27.5, pointarr[to].split(',')[0],pointarr[to].split(',')[1]);
        ctx2.fillRect(pointarr[to].split(',')[0],pointarr[to].split(',')[1], 2, 2);
        drawArrowhead(pointarr[to].split(',')[0],pointarr[to].split(',')[1],ang, 8, 8);
    }


    //ctx.arc(125,125,62.5,0,2*Math.PI);
    //ctx.stroke();
}
function signalLiveCall2(scn,gid,totallinks){
        var canv=document.getElementById('canvas');
        var canvcon=canv.getContext('2d');
        canvcon.clearRect(0, 0, canv.width, canv.height);

        var can = document.getElementById('canvas');
        var ctx = can.getContext('2d');
        var img=document.getElementById("linksimage");
        ctx.drawImage(img,0,0);

        var d = new Date();
        var currtime = d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
        var timearray = new Array(),linkarray=new Array();
        cyclelength=0;
        $('#signal_live').empty();
        $('#link_live').empty();

        $.ajax({
        url: '../utils/signal_live.php',
        data :{signal_id:scn,current_time:currtime,groupid:gid},
        type: 'POST',
        success: function(result) {
            
            var raw_set = $.parseJSON(result);
            
            for(i=0; i<Object.keys(raw_set).length;i++){
                append = '<tr>'
                append += '<td>'
                append += raw_set[i].StageOrder
                append += '</td><td>'
                append += raw_set[i].Time
                append += '</td><td>'
                append += raw_set[i].VehicleMovements
                append += '</td>'
                append += '</tr>'
                
                $('#signal_live').append(append);
				
                timearray[i] = parseInt(raw_set[i].Time);
                linkarray[i] = raw_set[i].VehicleMovements;
                cyclelength = cyclelength + parseInt(raw_set[i].Time);
                
            }
           linknames = raw_set[0].LinkNames.split(';');
           
           for(var i=0;i<linknames.length;i++){
               var ele = '';
               ele = '<tr><td>Link-'+(i+1)+'</td><td>'+linknames[i]+'</td></tr>';
               $('#link_live').append(ele); 
           }

            $("#dataTable").attr('starttime',raw_set[0].StartTime);
                
            currtime = currtime.split(":");
            currsec = parseInt(currtime[0])*60*60 + parseInt(currtime[1])*60 + parseInt(currtime[2]);
            starttime = raw_set[0].StartTime.split(":");
            
            startsec = parseInt(starttime[0])*60*60 + parseInt(starttime[1])*60 + parseInt(starttime[2]);

            timediff = currsec - startsec;
            timediff = timediff % cyclelength;
            totaltime = 0;

            for(var i=0;i<timearray.length;i++){
                totaltime = totaltime + timearray[i];
                if(totaltime > timediff){
                    currlink = linkarray[i];
                    $('#signal_live tr').css('background-color','#fff')
                    $($('#signal_live tr')[i]).css('background-color','#e0d9d9');
                    linksmanage2(currlink,totallinks);
                    break;
                }
            }  

        }
        });
    }