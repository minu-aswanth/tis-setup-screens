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


function openElementModal(){
	$("#myElementModal").modal();
}
function openEditElementModal() {
	try{
		var elementID = $("input[type='radio'][name='mds']:checked").parent().parent().children()[1].innerHTML
		var module = $("input[type='radio'][name='mds']:checked").parent().parent().children()[2].innerHTML
		var scn = $("input[type='radio'][name='mds']:checked").parent().parent().children()[3].innerHTML
		var variable = $("input[type='radio'][name='mds']:checked").parent().parent().children()[4].innerHTML
		var profileID = $("input[type='radio'][name='mds']:checked").parent().parent().children()[5].innerHTML
		var bound = $("input[type='radio'][name='mds']:checked").parent().parent().children()[6].innerHTML
		$("#editElementModal").modal();
		$(".modal-body #elementID_modal")[0].innerHTML = elementID
		$(".modal-body #module_modal").val(module)
		$(".modal-body #scn_modal").val(scn)
		$(".modal-body #variable_modal").val(variable)
		$(".modal-body #profileID_modal").val(profileID)
		$(".modal-body #bound_modal").val(bound)
	}
	catch(e){
		alert("Please select an element to edit.")
	}
}

function addElement(){
	var module=$('#module').val();
	var scn=$('#scn').val();
	var variable=$('#variable').val();
	var profileID=$('#profileID').val();
	var bound=$('#bound').val();
	var ruleID = getUrlParameter("ruleID");

	$.ajax({
		url: '../utils/add_rule_element.php',
		data :{module:module,scn:scn,variable:variable,profileID:profileID,bound:bound,ruleID:ruleID},
		type: 'POST',
		success: function(result) {
			$("#cancelElementModal").click();
			alert("New element has been added")
			fetch_rule_elements();
		}
    });
        
}

function editElementRow(){
	var elementID=$('#elementID_modal')[0].innerHTML;
	var module=$('#module_modal').val();
	var scn=$('#scn_modal').val();
	var variable=$('#variable_modal').val();
	var profileID=$('#profileID_modal').val();
	var bound=$('#bound_modal').val();

	if(bound=="Lower Bound"){
		bound="-1";
	}else if(bound=="Upper Bound"){
		bound="1";
	}else if(bound=="In Between"){
		bound="0";
	}else{
		alert("Invalid bound value. Possible options are: Lower Bound / Upper Bound / In Between");
	}
	
	$.ajax({
		url: '../utils/edit_rule_element.php',
		data :{elementID:elementID,module:module,scn:scn,variable:variable,profileID:profileID,bound:bound},
		type: 'POST',
		success: function(result) {
			$("#cancelElementModal_edit").click();
			alert("Selected element has been edited")
			fetch_rule_elements();
		}
	});
}

function deleteElementRow() {
	try{
		var elementID = $("input[type='radio'][name='mds']:checked").parent().parent().children()[1].innerHTML
		
		$.ajax({
				url: '../utils/del_rule_element.php',
				data :{elementID:elementID},
				type: 'POST',
				success: function(result) {
					if(result.length == 2){
						alert("Connection Error please try again");
					}
					else{
						alert("Deleted the Element Entry Succesfully");
						fetch_rule_elements();
					}
				}
            });
	}
	catch(e){
		alert("Please select an element to delete")
	}
}
		
$(document).ready(function(){
        fetchdata = function(){
            var module=$('#module').val();
			var scn=$('#scn').val();
			var variable=$('#variable').val();
			var profileID=$('#profileID').val();
			var bound=$('#bound').val();
			var ruleID = getUrlParameter("ruleID");

			$.ajax({
				url: '../utils/add_rule_element.php',
				data :{module:module,scn:scn,variable:variable,profileID:profileID,bound:bound,ruleID:ruleID},
				type: 'POST',
				success: function(result) {
					$("#cancelElementModal").click();
					alert("New element has been added")
					fetch_rule_elements();
				}
            });
        }
        $("#addElement").click(function() {
                fetchdata();
        });
        $("#edit").click(function() {
                fetchdata();
        });

});












function openActionModal(){
	$("#myActionModal").modal();
}
function openEditActionModal() {
	try{
		var actionID = $("input[type='radio'][name='mds']:checked").parent().parent().children()[1].innerHTML
		var message = $("input[type='radio'][name='mds']:checked").parent().parent().children()[2].innerHTML
		var action = $("input[type='radio'][name='mds']:checked").parent().parent().children()[3].innerHTML
		var device = $("input[type='radio'][name='mds']:checked").parent().parent().children()[4].innerHTML
		var slide = $("input[type='radio'][name='mds']:checked").parent().parent().children()[5].innerHTML
		$("#editActionModal").modal();
		$(".modal-body #actionID_modal")[0].innerHTML = actionID
		$(".modal-body #message_modal").val(message)
		$(".modal-body #action_modal").val(action)
		$(".modal-body #device_modal").val(device)
		$(".modal-body #slide_modal").val(slide)
	}
	catch(e){
		alert("Please select an action to edit")
	}
}

function addAction(){
	/*var message=$('#message').val();
	var action=$('#action').val();
	var device=$('#device').val();*/
	var message = document.getElementById("message").options[document.getElementById("message").selectedIndex].text;
	var action = document.getElementById("action").options[document.getElementById("action").selectedIndex].text;
	var device = document.getElementById("device").options[document.getElementById("device").selectedIndex].text;
			
	var ruleID = getUrlParameter("ruleID");

	$.ajax({
		url: '../utils/add_rule_action.php',
		data :{message:message,action:action,device:device,ruleID:ruleID},
		type: 'POST',
		success: function(result) {
			$("#cancelActionModal").click();
			alert("New action has been added")
			fetch_rule_actions();
		}
    });
        
}

function editActionRow(){
	var actionID=$('#actionID_modal')[0].innerHTML;
	var message = document.getElementById("message_modal").options[document.getElementById("message_modal").selectedIndex].text;
	var action = document.getElementById("action_modal").options[document.getElementById("action_modal").selectedIndex].text;
	var device = document.getElementById("device_modal").options[document.getElementById("device_modal").selectedIndex].text;
	var slide = document.getElementById("slide_modal").options[document.getElementById("slide_modal").selectedIndex].text;

	$.ajax({
		url: '../utils/edit_rule_action.php',
		data :{message:message,action:action,device:device,actionID:actionID,slide:slide},
		type: 'POST',
		success: function(result) {
			$("#cancelActionModal_edit").click();
			alert("Selected action has been edited")
			fetch_rule_actions();
		}
	});
}
function deleteActionRow() {
	try{
		var actionID = $("input[type='radio'][name='mds']:checked").parent().parent().children()[1].innerHTML

		$.ajax({
				url: '../utils/del_rule_action.php',
				data :{actionID:actionID},
				type: 'POST',
				success: function(result) {
					if(result.length == 2){
						alert("Connection error. Please try again");
					}
					else{
						alert("Deleted the action entry succesfully");
						fetch_rule_actions();
					}
				}
            });
	}
	catch(e){
		alert("Please select an action to delete")
	}
}
		
$(document).ready(function(){
        fetchdata = function(){
            var message=$('#message').val();
			var action=$('#action').val();
			var device=$('#device').val();
			var slide=$('#slide').val();
			var ruleID=getUrlParameter("ruleID");

			$.ajax({
				url: '../utils/add_rule_action.php',
				data :{message:message,action:action,device:device,slide:slide,ruleID:ruleID},
				type: 'POST',
				success: function(result) {
					$("#cancelActionModal").click();
					alert("New Action has been added")
					fetch_rule_actions();
				}
            });
        }
        $("#addAction").click(function() {
                fetchdata();
        });
        $("#edit").click(function() {
                fetchdata();
        });

});



function populateSCN(){
	var module = document.getElementById("module").options[document.getElementById("module").selectedIndex].text;
	$('#scn').empty();
	$('#profileID').empty();

	if(module == "MET"){
		
		$.ajax({
			url: '../utils/met_devices.php',
			success: function(result) {
				var devices_set = jQuery.parseJSON(result);
				for(i=devices_set.length-1; i>=0;i--){
					append = '<option value="'
					append += devices_set[i].SystemCodeNumber
					append += '">'
					append += devices_set[i].SystemCodeNumber
					append += '</option>'
					$('#scn').append(append);
				}				
			}
	    });

	    $.ajax({
			url: '../utils/profile_met.php',
			success: function(result) {
				var devices_set = jQuery.parseJSON(result);
				for(i=devices_set.length-1; i>=0;i--){
					append = '<option value="'
					append += devices_set[i].ProfileId
					append += '">'
					append += devices_set[i].ProfileId
					append += " - "
					append += devices_set[i].ShortDescription
					append += '</option>'
					$('#profileID').append(append);
				}				
			}
	    });

	} else if(module == "ATCC"){
		
		$.ajax({
			url: '../utils/atcc_devices.php',
			success: function(result) {
				var devices_set = jQuery.parseJSON(result);
				for(i=devices_set.length-1; i>=0;i--){
					append = '<option value="'
					append += devices_set[i].SystemCodeNumber
					append += '">'
					append += devices_set[i].SystemCodeNumber
					append += '</option>'
					$('#scn').append(append);
				}				
			}
	    });

		$.ajax({
			url: '../utils/profile_atcc.php',
			success: function(result) {
				var devices_set = jQuery.parseJSON(result);
				for(i=devices_set.length-1; i>=0;i--){
					append = '<option value="'
					append += devices_set[i].ProfileId
					append += '">'
					append += devices_set[i].ProfileId
					append += " - "
					append += devices_set[i].ShortDescription
					append += '</option>'
					$('#profileID').append(append);
				}				
			}
	    });
		
	}

	
        
}

function populateSCNModal(){
	var module = document.getElementById("module_modal").options[document.getElementById("module_modal").selectedIndex].text;
	$('#scn_modal').empty();

	if(module == "MET"){
		
		$.ajax({
			url: '../utils/met_devices.php',
			success: function(result) {
				var devices_set = jQuery.parseJSON(result);
				for(i=devices_set.length-1; i>=0;i--){
					append = '<option value="'
					append += devices_set[i].SystemCodeNumber
					append += '">'
					append += devices_set[i].SystemCodeNumber
					append += '</option>'
					$('#scn_modal').append(append);
				}				
			}
	    });

	} else if(module == "ATCC"){
		
		$.ajax({
			url: '../utils/atcc_devices.php',
			success: function(result) {
				var devices_set = jQuery.parseJSON(result);
				for(i=devices_set.length-1; i>=0;i--){
					append = '<option value="'
					append += devices_set[i].SystemCodeNumber
					append += '">'
					append += devices_set[i].SystemCodeNumber
					append += '</option>'
					$('#scn_modal').append(append);
				}				
			}
	    });
		
	}
        
}