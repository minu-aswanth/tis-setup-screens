$(document).ready(function(){
        fetchroles = function(){
                $.ajax({
		            url: '../utils/get_roles.php',
		            success: function(result) {
					var id_set = jQuery.parseJSON(result);
					//for(i=0; i<id_set.length;i++){
						add_entry(id_set[0].role)
					//}
					$("#menu_bar").append('<li role="presentation"><a href="javascript:void(0)" id="logout" onclick="logout()">Logout</a></li>');
                	}
                });
        }
	fetchroles();
	add_entry = function(role){
		if(role == "Admin" || role=="ManagerVMS" || role=="OperatorVMS"|| role=="ManagerMET" || role=="OperatorMET" || role=="ManagerATCC" || role=="OperatorATCC" || role=="ManagerCCTV" || role=="OperatorCCTV" || role=="ManagerECB" || role=="OperatorECB" || role=="ManagerNMS" || role=="OperatorNMS"){
			// $("#menu_bar").append('<li role="presentation" id="vms"><a href="vms_map.html">VMS</a></li>');
			// $("#menu_bar").append('<li role="presentation" id="met"><a href="met_map.html">MET</a></li>');
			// $("#menu_bar").append('<li role="presentation" id="atcc"><a href="atcc_map.html">ATCC</a></li>');
			// $("#menu_bar").append('<li role="presentation" id="cctv"><a href="cctv_map.html">CCTV</a></li>');
			// $("#menu_bar").append('<li role="presentation" id="ecb"><a href="ecb.html">ECB</a></li>');
			$("#menu_bar").append('<li role="presentation" id="signal_control"><a href="signal_map.html">Home</a></li>');
			$("#menu_bar").append('<li role="presentation" id="rule_engine"><a href="rule_live.html">Rule Engine</a></li>');
			$("#menu_bar").append('<li role="presentation" id="nms"><a href="nms.html">NMS / Fault Report</a></li>');
			$("#menu_bar").append('<li role="presentation" id="maintenance"><a href="createSR.html">Maintenance</a></li>');
			// $("#menu_bar").append('<li role="presentation" id="accidents"><a href="accidents.html">Situations</a></li>');
			$("#menu_bar").append('<li role="presentation" id="user_management"><a href="changePassword.html">User Management</a></li>');
			$("#menu_bar").append('<li role="presentation" id="upload_xml"><a href="upload_xml.html">Upload XML</a></li>');
					
		} /*else if(role=="ManagerVMS" || role=="OperatorVMS"){
			$("#menu_bar").append('<li role="presentation" id="vms"><a href="vms_map.html">VMS</a></li>');
			$("#menu_bar").append('<li role="presentation" id="met"><a href="met_map.html">MET</a></li>');
			$("#menu_bar").append('<li role="presentation" id="atcc"><a href="atcc_map.html">ATCC</a></li>');
			$("#menu_bar").append('<li role="presentation" id="cctv"><a href="cctv_map.html">CCTV</a></li>');
			$("#menu_bar").append('<li role="presentation" id="ecb"><a href="ecb_map.html">ECB</a></li>');
			$("#menu_bar").append('<li role="presentation" id="rule_engine"><a href="rule_live.html">Rule Engine</a></li>');
			$("#menu_bar").append('<li role="presentation" id="nms"><a href="nms.html">NMS / Fault Report</a></li>');
			$("#menu_bar").append('<li role="presentation" id="user_management"><a href="changePassword.html">User Management</a></li>');
			//$("#menu_bar").append('<li role="presentation" id="vms"><a href="vms_map.html">VMS</a></li>');
			//$("#menu_bar").append('<li role="presentation" id="rule_engine"><a href="rule_live.html">Rule Engine</a></li>');
			//$("#menu_bar").append('<li role="presentation" id="maintenance"><a href="nms_vms.html">NMS / Fault Report</a></li>');
		} else if(role=="ManagerMET" || role=="OperatorMET"){
			$("#menu_bar").append('<li role="presentation" id="vms"><a href="vms_map.html">VMS</a></li>');
			$("#menu_bar").append('<li role="presentation" id="met"><a href="met_map.html">MET</a></li>');
			$("#menu_bar").append('<li role="presentation" id="atcc"><a href="atcc_map.html">ATCC</a></li>');
			$("#menu_bar").append('<li role="presentation" id="cctv"><a href="cctv_map.html">CCTV</a></li>');
			$("#menu_bar").append('<li role="presentation" id="ecb"><a href="ecb_map.html">ECB</a></li>');
			$("#menu_bar").append('<li role="presentation" id="rule_engine"><a href="rule_live.html">Rule Engine</a></li>');
			$("#menu_bar").append('<li role="presentation" id="nms"><a href="nms.html">NMS / Fault Report</a></li>');
			$("#menu_bar").append('<li role="presentation" id="user_management"><a href="changePassword.html">User Management</a></li>');
			//$("#menu_bar").append('<li role="presentation" id="met"><a href="met_map.html">MET</a></li>');
			//$("#menu_bar").append('<li role="presentation" id="rule_engine"><a href="rule_live.html">Rule Engine</a></li>');
			//$("#menu_bar").append('<li role="presentation" id="maintenance"><a href="nms_met.html">NMS / Fault Report</a></li>');
		} else if(role=="ManagerATCC" || role=="OperatorATCC"){
			$("#menu_bar").append('<li role="presentation" id="vms"><a href="vms_map.html">VMS</a></li>');
			$("#menu_bar").append('<li role="presentation" id="met"><a href="met_map.html">MET</a></li>');
			$("#menu_bar").append('<li role="presentation" id="atcc"><a href="atcc_map.html">ATCC</a></li>');
			$("#menu_bar").append('<li role="presentation" id="cctv"><a href="cctv_map.html">CCTV</a></li>');
			$("#menu_bar").append('<li role="presentation" id="ecb"><a href="ecb_map.html">ECB</a></li>');
			$("#menu_bar").append('<li role="presentation" id="rule_engine"><a href="rule_live.html">Rule Engine</a></li>');
			$("#menu_bar").append('<li role="presentation" id="nms"><a href="nms.html">NMS / Fault Report</a></li>');
			$("#menu_bar").append('<li role="presentation" id="user_management"><a href="changePassword.html">User Management</a></li>');
			//$("#menu_bar").append('<li role="presentation" id="atcc"><a href="atcc_map.html">ATCC</a></li>');
			//$("#menu_bar").append('<li role="presentation" id="rule_engine"><a href="rule_live.html">Rule Engine</a></li>');
			//$("#menu_bar").append('<li role="presentation" id="maintenance"><a href="nms_atcc.html">NMS / Fault Report</a></li>');
		} else if(role=="ManagerCCTV" || role=="OperatorCCTV"){
			$("#menu_bar").append('<li role="presentation" id="vms"><a href="vms_map.html">VMS</a></li>');
			$("#menu_bar").append('<li role="presentation" id="met"><a href="met_map.html">MET</a></li>');
			$("#menu_bar").append('<li role="presentation" id="atcc"><a href="atcc_map.html">ATCC</a></li>');
			$("#menu_bar").append('<li role="presentation" id="cctv"><a href="cctv_map.html">CCTV</a></li>');
			$("#menu_bar").append('<li role="presentation" id="ecb"><a href="ecb_map.html">ECB</a></li>');
			$("#menu_bar").append('<li role="presentation" id="rule_engine"><a href="rule_live.html">Rule Engine</a></li>');
			$("#menu_bar").append('<li role="presentation" id="nms"><a href="nms.html">NMS / Fault Report</a></li>');
			$("#menu_bar").append('<li role="presentation" id="user_management"><a href="changePassword.html">User Management</a></li>');
			//$("#menu_bar").append('<li role="presentation" id="cctv"><a href="cctv_map.html">CCTV</a></li>');
			//$("#menu_bar").append('<li role="presentation" id="rule_engine"><a href="rule_live.html">Rule Engine</a></li>');
			//$("#menu_bar").append('<li role="presentation" id="maintenance"><a href="nms_cctv.html">NMS / Fault Report</a></li>');
		} else if(role=="ManagerECB" || role=="OperatorECB"){
			$("#menu_bar").append('<li role="presentation" id="vms"><a href="vms_map.html">VMS</a></li>');
			$("#menu_bar").append('<li role="presentation" id="met"><a href="met_map.html">MET</a></li>');
			$("#menu_bar").append('<li role="presentation" id="atcc"><a href="atcc_map.html">ATCC</a></li>');
			$("#menu_bar").append('<li role="presentation" id="cctv"><a href="cctv_map.html">CCTV</a></li>');
			$("#menu_bar").append('<li role="presentation" id="ecb"><a href="ecb_map.html">ECB</a></li>');
			$("#menu_bar").append('<li role="presentation" id="rule_engine"><a href="rule_live.html">Rule Engine</a></li>');
			$("#menu_bar").append('<li role="presentation" id="nms"><a href="nms.html">NMS / Fault Report</a></li>');
			$("#menu_bar").append('<li role="presentation" id="user_management"><a href="changePassword.html">User Management</a></li>');
			//$("#menu_bar").append('<li role="presentation" id="ecb"><a href="ecb_map.html">ECB</a></li>');
			//$("#menu_bar").append('<li role="presentation" id="rule_engine"><a href="rule_live.html">Rule Engine</a></li>');
			//$("#menu_bar").append('<li role="presentation" id="maintenance"><a href="nms_ecb.html">NMS / Fault Report</a></li>');
		} else if(role=="ManagerNMS" || role=="OperatorNMS"){
			$("#menu_bar").append('<li role="presentation" id="vms"><a href="vms_map.html">VMS</a></li>');
			$("#menu_bar").append('<li role="presentation" id="met"><a href="met_map.html">MET</a></li>');
			$("#menu_bar").append('<li role="presentation" id="atcc"><a href="atcc_map.html">ATCC</a></li>');
			$("#menu_bar").append('<li role="presentation" id="cctv"><a href="cctv_map.html">CCTV</a></li>');
			$("#menu_bar").append('<li role="presentation" id="ecb"><a href="ecb_map.html">ECB</a></li>');
			$("#menu_bar").append('<li role="presentation" id="rule_engine"><a href="rule_live.html">Rule Engine</a></li>');
			$("#menu_bar").append('<li role="presentation" id="nms"><a href="nms.html">NMS / Fault Report</a></li>');
			$("#menu_bar").append('<li role="presentation" id="user_management"><a href="changePassword.html">User Management</a></li>');
			//$("#menu_bar").append('<li role="presentation" id="maintenance"><a href="nms.html">NMS / Fault Report</a></li>');
		} */
	}
});