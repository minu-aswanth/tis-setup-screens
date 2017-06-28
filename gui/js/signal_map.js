function appendModalBody(mode){
	
	if(mode == 2){
		$("#signalMode").empty();
		$("#signalMode").append('<span>Change Mode:</span> <select id="signal_mode" onchange="" style="max-width:300px;"><option value="manual" valueId="3">Manual</option><option value="automatic"  valueId="2"  selected>Automatic</option><option value="scheduled" valueId="1">Scheduled</option></select>');
		
		clearInterval(timer);
		clearModalBody();
		$("#modalBody").append('<form method="post"><a class="btn btn-default" id="change_mode" onclick="signalModeChange();changeMode()" style="margin:2px;">Change Mode</a><table id="dataTable" width="100%" border="1" align="center" class="table"><thead><tr><th bgcolor="#993232"><font color="white">Stage Order</font></th><th bgcolor="#993232"><font color="white">Time</font></th><th bgcolor="#993232"><font color="white">Vehicle Movement</font></th></tr></thead><tbody id="signal_live"></tbody></table> </form><img id="linksimage" src="" style="display:none;"><div class="" style="position:relative;margin: 0 auto;width: 125px;display:inline-block;margin-right:5%;"><canvas width="125" id="canvas" height="125" style="border:1px solid #000"></canvas><canvas width="62.5" id="canvas2" height="62.5" style="position:absolute;left:31px;top:31px;"></canvas></div><div class="" style="display:inline-block;margin-left:5%;max-width:300px"><table id="linksTable" border="1" align="center" class="table"><thead><tr><th bgcolor="#993232"><font color="white">Link Number</font></th><th bgcolor="#993232"><font color="white">Link Name</font></th></tr></thead><tbody id="link_live"></tbody></table></div>');
		
		populateLiveInfo2();
		console.log(2);
	}
	
	if(mode == 1){
		$("#signalMode").empty();
		$("#signalMode").append('<span>Change Mode:</span> <select id="signal_mode" onchange="" style="max-width:300px;"><option value="manual" valueId="3">Manual</option><option value="automatic"  valueId="2">Automatic</option><option value="scheduled" valueId="1"  selected>Scheduled</option></select>');
		
		clearModalBody();
		$("#modalBody").append('<form method="post"><a class="btn btn-default" id="change_mode" onclick="signalModeChange();changeMode()" style="margin:2px;">Change Mode</a><table id="dataTable" width="100%" border="1" align="center" class="table"><thead><tr><th bgcolor="#993232"><font color="white">Stage Order</font></th><th bgcolor="#993232"><font color="white">Time</font></th><th bgcolor="#993232"><font color="white">Vehicle Movement</font></th></tr></thead><tbody id="signal_live"></tbody></table> </form><img id="linksimage" src="" style="display:none;"><div class="" style="position:relative;margin: 0 auto;width: 125px;display:inline-block;margin-right:5%;"><canvas width="125" id="canvas" height="125" style="border:1px solid #000"></canvas><canvas width="62.5" id="canvas2" height="62.5" style="position:absolute;left:31px;top:31px;"></canvas></div><div class="" style="display:inline-block;margin-left:5%;max-width:300px"><table id="linksTable" border="1" align="center" class="table"><thead><tr><th bgcolor="#993232"><font color="white">Link Number</font></th><th bgcolor="#993232"><font color="white">Link Name</font></th></tr></thead><tbody id="link_live"></tbody></table></div>');
		
		populateLiveInfo3();
		console.log(1);
	}
	
	if(mode == 3){
		$("#signalMode").empty();
		$("#signalMode").append('<span>Change Mode:</span> <select id="signal_mode" onchange="" style="max-width:300px;"><option value="manual" valueId="3"  selected>Manual</option><option value="automatic"  valueId="2">Automatic</option><option value="scheduled" valueId="1">Scheduled</option></select>');
		
		clearModalBody();
		$("#modalBody").append('<form method="post"><div align="center"><a class="btn btn-default" id="change_mode" onclick="signalModeChange();changeMode()" style="margin:2px;">Change Mode</a><table id="dataTable" width="100%" border="1" align="center" class="table"><thead><tr><th bgcolor="#993232"><font color="white">Stage Order</font></th><th bgcolor="#993232"><font color="white">Time</font></th><th bgcolor="#993232"><font color="white">Vehicle Movement</font></th></tr></thead><tbody id="signal_live"></tbody></table> </form><img id="linksimage" src="" style="display:none;"><div class="" style="position:relative;margin: 0 auto;width: 125px;display:inline-block;margin-right:5%;"><canvas width="125" id="canvas" height="125" style="border:1px solid #000"></canvas><canvas width="62.5" id="canvas2" height="62.5" style="position:absolute;left:31px;top:31px;"></canvas></div><div class="" style="display:inline-block;margin-left:5%;max-width:300px"><table id="linksTable" border="1" align="center" class="table"><thead><tr><th bgcolor="#993232"><font color="white">Link Number</font></th><th bgcolor="#993232"><font color="white">Link Name</font></th></tr></thead><tbody id="link_live"></tbody></table></div><div align="center"><a class="btn btn-success btn-lg" onclick="next_stage()">Move to Next Stage</a></div>');
		
		populateLiveInfo3();
		console.log(3);
	}
}
function clearModalBody(){
	$("#modalBody").empty();
}

$(document).ready(function(){
	var map = L.map('signal_map').setView([24.379311, 88.041001], 13);
    $.ajax({
		url: '../utils/signal_map.php',
		success: function(result_signal){
			devices_set_signal = jQuery.parseJSON(result_signal);
			markers_array = [];
			$("#scns").append('<option>All</option>');
			console.log(devices_set_signal);
			for(i=0; i<devices_set_signal.length;i++){
				var fault = devices_set_signal[i].online;
				if(fault === "1"){
					var myIcon_signal = L.icon({iconUrl: '../images/signalOn.png',iconSize:[25,30],iconAnchor:[12.5,30]});
				} else if(fault === "0"){
					var myIcon_signal = L.icon({iconUrl: '../images/signalOff.png',iconSize:[25,30],iconAnchor:[12.5,30]});
				}
				markers_array.push(new L.marker([devices_set_signal[i].Latitude,devices_set_signal[i].Longitude]))
				//marker = new L.marker([devices_set_signal[i].Latitude,devices_set_signal[i].Longitude],{icon:myIcon_signal}).bindPopup('<a href="../html/signal_live.html">'+devices_set_signal[i].SystemCodeNumber+'</a>').addTo(map);
				marker = new L.marker([devices_set_signal[i].Latitude,devices_set_signal[i].Longitude],{icon:myIcon_signal}).addTo(map);
				$("#scns").append('<option value='+marker._leaflet_id+' signalID='+devices_set_signal[i].SignalID+' groupid='+devices_set_signal[i].GroupID+' links='+devices_set_signal[i].NumLinks+'>'+marker._leaflet_id+'</option>');
				marker.on('click', function onClick(device){
					$("#scns").val(device.target._leaflet_id);
					var scn = $('#scns option:selected').attr('signalID');
					
					$.ajax({
						url: '../utils/get_signal_mode.php',
						data:{signalId:scn},
						type:'POST',
						success: function(result) {
							if(result!="F"){
								
								appendModalBody(result);
							}
						}  
					})
					
					
					//clearModalBody();
					$("#myModal").modal("show");
				});
			}
			var markers_group_signal = new L.featureGroup(markers_array);
			map.fitBounds(markers_group_signal.getBounds().pad(0.05));

		}
	});
		
	mapLink = 
    '<a href="http://openstreetmap.org">OpenStreetMap</a>';
    L.tileLayer(
            'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; ' + mapLink + ' Contributors',
            maxZoom: 18,
    }).addTo(map);

    // var routingControl = L.Routing.control({
	  // waypoints: [
	    // L.latLng(24.117355, 88.29131),
	    // L.latLng(24.663991, 87.940233)
	  // ],
	  	// routeWhileDragging: false,
	    // autoRoute:true,
	    // useZoomParameter:false,
	    // draggableWaypoints:false,
	    // show:false,
	    // addWaypoints:false
	// }).addTo(map);

	// routingControl.hide();
	
	var shpfile = new L.Shapefile('../libraries/leaflet.shapefile-gh-pages/noida_shapefile/noida', {
			onEachFeature: function(feature, layer) {
				if (feature.properties) {
					layer.bindPopup(Object.keys(feature.properties).map(function(k) {
						return k + ": " + feature.properties[k];
					}).join("<br />"), {
						maxHeight: 200
					});
				}
			},color: "#000000"
		});
	shpfile.addTo(map);
	shpfile.once("data:loaded", function() {
		console.log("finished loaded shapefile");
	});
	

});

function signalModeChange(){
	var signalMode = $('#signal_mode option:selected').val();
	var scn = $('#scns option:selected').attr('signalID');
	var modeId = $('#signal_mode option:selected').attr('valueId')
	$.ajax({
	    url: '../utils/signal_mode_change_log.php',
	    data:{mode:signalMode,signalId:scn},
	    type:'POST',
	    success: function(result) {
	    	if(result!="F"){
				appendModalBody(modeId);
			}
	    }  
	})
}

function changeMode(){
	var signalMode = $('#signal_mode option:selected').val();
	var scn = $('#scns option:selected').attr('signalID');
	var modeId = $('#signal_mode option:selected').attr('valueId');
	$('#change_mode').prop('disabled', true);
	$.ajax({
	    url: '../utils/mode_change.php',
	    data:{mode:signalMode,signalId:scn},
	    type:'POST',
	    success: function(result) {
	    	console.log(signalMode);
	    	console.log(scn);
	    	console.log(result);
	    	$('#change_mode').prop('disabled', false);
	    }  
	})
}

function next_stage(){
	var signalMode = $('#signal_mode option:selected').val();
	var scn = $('#scns option:selected').attr('signalID');
	$.ajax({
	    url: '../utils/next_stage.php',
	    data:{signalId:scn},
	    type:'POST',
	    success: function(result) {
	    	console.log(signalMode);
	    	console.log(scn);
	    	console.log(result);
	    }  
	})
}