$(document).ready(function(){
	var map = L.map('home_map').setView([24.379311, 88.041001], 13);
    $.ajax({
    	url: '../utils/cctv_map.php',
    	success: function(result_cctv) {
    		var devices_set_cctv = jQuery.parseJSON(result_cctv);
			markers_array = []
			for(i=0; i<devices_set_cctv.length;i++){
				var fault = devices_set_cctv[i].online;
				if(fault === "1"){
					//var myIcon_cctv = L.icon({iconUrl: '../images/cctvOn.png',iconSize:[25,30],iconAnchor:[12.5,30]});
					var myIcon_cctv = L.icon({iconUrl: '../images/cctvOn.png',iconSize:[25,30],iconAnchor:[6,13]});
				} else if(fault === "Device offline"){
					//var myIcon_cctv = L.icon({iconUrl: '../images/cctvOff.png',iconSize:[25,30],iconAnchor:[12.5,30]});
					var myIcon_cctv = L.icon({iconUrl: '../images/cctvOff.png',iconSize:[25,30],iconAnchor:[6,13]});
				}
				markers_array.push(new L.marker([devices_set_cctv[i].Northing,devices_set_cctv[i].Easting]))
				marker = new L.marker([devices_set_cctv[i].Northing,devices_set_cctv[i].Easting],{icon: myIcon_cctv}).bindPopup('<a href="../html/cctv_live_public.html">'+devices_set_cctv[i].SystemCodeNumber+'</a>').addTo(map);
				//if you want you can edit the bindPopup() to show what ever data you want on popup.
			}
			var markers_group_cctv = new L.featureGroup(markers_array);
			map.fitBounds(markers_group_cctv.getBounds().pad(0.05));
		}
	});

	$.ajax({
		url: '../utils/met_map.php',
		success: function(result_met){
			var devices_set_met = jQuery.parseJSON(result_met);
			markers_array = []
			for(i=0; i<devices_set_met.length;i++){
				var fault = devices_set_met[i].online;
				if(fault === "1"){
					//var myIcon_met = L.icon({iconUrl: '../images/metOn.png',iconSize:[25,30],iconAnchor:[12.5,30]});
					var myIcon_met = L.icon({iconUrl: '../images/metOn.png',iconSize:[50,33],iconAnchor:[25,16.5]});
				} else if(fault === "0"){
					//var myIcon_met = L.icon({iconUrl: '../images/metOff.png',iconSize:[25,30],iconAnchor:[12.5,30]});
					var myIcon_met = L.icon({iconUrl: '../images/metOff.png',iconSize:[50,33],iconAnchor:[25,16.5]});
				}
				markers_array.push(new L.marker([devices_set_met[i].Northing,devices_set_met[i].Easting]))
				marker = new L.marker([devices_set_met[i].Northing,devices_set_met[i].Easting],{icon: myIcon_met}).bindPopup('<a href="../html/met_live.html">'+devices_set_met[i].SystemCodeNumber+'</a>').addTo(map);
				//if you want you can edit the bindPopup() to show what ever data you want on popup.
			}
			var markers_group_met = new L.featureGroup(markers_array);
			map.fitBounds(markers_group_met.getBounds().pad(0.05));
		}
	});


	$.ajax({
		url: '../utils/atcc_map.php',
		success: function(result_atcc){
			var devices_set_atcc = jQuery.parseJSON(result_atcc);
			markers_array = []
			for(i=0; i<devices_set_atcc.length;i++){
				var fault = devices_set_atcc[i].online;
				if(fault === "1"){
					var myIcon_atcc = L.icon({iconUrl: '../images/atccOn.png',iconSize:[50,40],iconAnchor:[12.5,30]});
				} else if(fault === "0"){
					var myIcon_atcc = L.icon({iconUrl: '../images/atccOff.png',iconSize:[50,40],iconAnchor:[12.5,30]});
				}
				markers_array.push(new L.marker([devices_set_atcc[i].Northing,devices_set_atcc[i].Easting]))
				marker = new L.marker([devices_set_atcc[i].Northing,devices_set_atcc[i].Easting],{icon: myIcon_atcc}).bindPopup('<a href="../html/atcc_live.html">'+devices_set_atcc[i].SystemCodeNumber+'</a>').addTo(map);
				//if you want you can edit the bindPopup() to show what ever data you want on popup.
			}
			var markers_group_atcc = new L.featureGroup(markers_array);
			map.fitBounds(markers_group_atcc.getBounds().pad(0.05));
		}
	});

							
	$.ajax({
		url: '../utils/vms_map.php',
		success: function(result_vms){
			var devices_set_vms = jQuery.parseJSON(result_vms);
			markers_array = []
			for(i=0; i<devices_set_vms.length;i++){
				var fault = devices_set_vms[i].online;
				if(fault === "1"){
					//var myIcon_vms = L.icon({iconUrl: '../images/vmsOn.png',iconSize:[25,30],iconAnchor:[12.5,30]});
					var myIcon_vms = L.icon({iconUrl: '../images/vmsOn.png',iconSize:[37,11],iconAnchor:[18,5]});
				} else if(fault === "0"){
					//var myIcon_vms = L.icon({iconUrl: '../images/vmsOff.png',iconSize:[25,30],iconAnchor:[12.5,30]});
					var myIcon_vms = L.icon({iconUrl: '../images/vmsOff.png',iconSize:[37,11],iconAnchor:[18,5]});
				}
				markers_array.push(new L.marker([devices_set_vms[i].Northing,devices_set_vms[i].Easting]))
				marker = new L.marker([devices_set_vms[i].Northing,devices_set_vms[i].Easting],{icon:myIcon_vms}).bindPopup('<a href="../html/vms_live.html">'+devices_set_vms[i].SystemCodeNumber+'</a>').addTo(map);
				//if you want you can edit the bindPopup() to show what ever data you want on popup.
			}
			var markers_group_vms = new L.featureGroup(markers_array);
			map.fitBounds(markers_group_vms.getBounds().pad(0.05));

		}
	});

	/*$.ajax({
		url: '../utils/ecb_map.php',
		success: function(result_ecb){
			var devices_set_ecb = jQuery.parseJSON(result_ecb);
			markers_array = []
			for(i=0; i<devices_set_ecb.length;i++){
				var fault = devices_set_ecb[i].online;
				if(fault === "Device online"){
					//var myIcon_ecb = L.icon({iconUrl: '../images/ecbOn.png',iconSize:[25,30],iconAnchor:[12.5,30]});
					var myIcon_ecb = L.icon({iconUrl: '../images/ecbOn - Copy.png',iconSize:[25,30],iconAnchor:[12.5,30]});
				} else if(fault === "Device offline"){
					//var myIcon_ecb = L.icon({iconUrl: '../images/ecbOff.png',iconSize:[25,30],iconAnchor:[12.5,30]});
					var myIcon_ecb = L.icon({iconUrl: '../images/ecbOff - Copy.png',iconSize:[25,30],iconAnchor:[12.5,30]});
				}
				markers_array.push(new L.marker([devices_set_ecb[i].Northing,devices_set_ecb[i].Easting]))
				marker = new L.marker([devices_set_ecb[i].Northing,devices_set_ecb[i].Easting],{icon: myIcon_ecb}).bindPopup(devices_set_ecb[i].SystemCodeNumber).addTo(map);
				//if you want you can edit the bindPopup() to show what ever data you want on popup.
			}
			var markers_group_ecb = new L.featureGroup(markers_array);
			map.fitBounds(markers_group_ecb.getBounds().pad(0.05));
		}
	});*/
							

		
	mapLink = 
    '<a href="http://openstreetmap.org">OpenStreetMap</a>';
    L.tileLayer(
            'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; ' + mapLink + ' Contributors',
            maxZoom: 18,
    }).addTo(map);


    var routingControl = L.Routing.control({
	  waypoints: [
	    L.latLng(24.117355, 88.29131),
	    L.latLng(24.663991, 87.940233)
	  ],
	  	routeWhileDragging: false,
	    autoRoute:true,
	    useZoomParameter:false,
	    draggableWaypoints:false,
	    show:false,
	    addWaypoints:false
	}).addTo(map);

	routingControl.hide();

});
