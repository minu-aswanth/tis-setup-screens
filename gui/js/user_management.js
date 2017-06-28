function openModal(){
	$("#myModal").modal();
}
function deleteRow() {
	try{
		var id = $("input[type='radio'][name='mds']:checked").parent().parent().children()[7].innerHTML
		var username = $("input[type='radio'][name='mds']:checked").parent().parent().children()[2].innerHTML
		var email = $("input[type='radio'][name='mds']:checked").parent().parent().children()[4].innerHTML
		var role = $("input[type='radio'][name='mds']:checked").parent().parent().children()[5].innerHTML
		var module = $("input[type='radio'][name='mds']:checked").parent().parent().children()[6].innerHTML

		if(role != 'Admin'){
			role = role.concat(module);	
		}
		
		$.ajax({
				url: '../utils/del_user.php',
				data :{id:id,role:role,module:module,username:username,email:email},
				type: 'POST',
				success: function(result) {
					if(result.length == 2){
						alert("Connection Error please try again");
					}
					else{
						alert("Deleted the User Entry Succesfully");
						fetch_devices();
					}
				}
            });
	}
	catch(e){
		alert("Please select a User to delete")
	}
}
		
$(document).ready(function(){
	del_id=0;
    fetchdata = function(){
        var username=$('#username').val();
        var user=$('#user').val();
		var role=$('#role').val();
		var email=$('#email').val();
		var checkboxes = document.getElementsByName('module');
		var module = "";

		if(role == ""){
			alert("Please Enter Role");
			return;
		}
		if(username == ""){
			alert("Please Enter Login ID");
			return;
		}
		if(user == ""){
			alert("Please Enter User Name");
			return;
		}
		if(email == ""){
			alert("Please Enter Email");
			return;
		}

		for (var i=0, n=checkboxes.length;i<n;i++) {
		  if (checkboxes[i].checked) 
		  {
		  module += ","+checkboxes[i].value;
		  }
		}
		if (module) module = module.substring(1);

		if(role == "Admin"){
			module = "";
		}

		var newPassword = randomString(8, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
		var hashpassword = CryptoJS.HmacSHA256(newPassword, "ITSPE").toString();

		$.ajax({
			url: '../utils/add_user.php',
			data :{username:username,user:user,role:role,email:email,module:module,password:newPassword,hashpassword:hashpassword},
			type: 'POST',
			success: function(result) {
				$("#cancelModal").click();
				alert("New User has been added");
				$('#myModal').modal('hide');
				fetch_devices();
			}
        });
    }
    $("#addDevice").click(function() {
            fetchdata();
    });
    /*$("#edit").click(function() {
            fetchdata();
    });*/

    $('.deleteUser').click(function(){
    	//console.log($('input[type=radio][name=mds]:checked').length)

    	if($('input[type=radio][name=mds]:checked').length == 0){
    		alert('Select a User to perform operation');
    		return;
    	}
    	$('input[name=dmodule]').prop('checked',false);

    	$('#deleteModal').modal('show');
    	var ele = $($('input[type=radio][name=mds]:checked').parent()).parent();
    	$('#did_modal').html($('td:nth-child(3)',ele).html());
    	$('#dusername_modal').html($('td:nth-child(4)',ele).html());
    	$('#demail_modal').html($('td:nth-child(5)',ele).html());
    	$('#drole_modal').html($('td:nth-child(6)',ele).html());
    	var mod = $('td:nth-child(7)',ele).html();
    	mod = mod.split(",");
    	var dmodule = $('input[name=dmodule]');
    	del_id = $('td:nth-child(8)',ele).html();
    	//console.log(del_id);
    	for(var j=0;j<mod.length;j++){
    		$('input[name=dmodule]').each(function(i,obj){
    			if($(obj).val() == mod[j].trim()){
	    			$(obj).prop('checked',true);
	    			$(obj).prop('disabled',false);
	    			return false;
	    		}
	    		else if($(obj).prop('checked')!=true){
	    			$(obj).prop('disabled',true);
	    		}
    		})
    	}
    	
    })

    $('.delete').click(function(){
    	var id=del_id,
    		role=$('#drole_modal').html(),
    		email=$('#demail_modal').html(),
    		duname=$('#dusername_modal').html(),
    		modcheck=$('input[name=dmodule]:checked'),
    		mod="",
    		temprole="";

    	if(role != 'Admin'){
    		for(var i=0;i<modcheck.length;i++){
    		
		    	temprole = role.concat($(modcheck[i]).val());	
				
		    	$.ajax({
		    		url:'../utils/del_user.php',
		    		method:'POST',
		    		data:{
		    			id:id,
		    			role:temprole,
		    			email:email,
		    			module:$(modcheck[i]).val(),
		    			username:duname
		    		},
		    		success:function(res){
		    			console.log(res);
		    			alert('User Roles Deleted!');
		    				$('#deleteModal').modal('hide');
		    				fetch_devices();
		    			
		    		}
		    	})
	    	}	
    	}
    	else if(role == 'Admin'){
    		$.ajax({
		    		url:'../utils/del_user.php',
		    		method:'POST',
		    		data:{
		    			id:id,
		    			role:role,
		    			email:email,
		    			module:'',
		    			username:duname
		    		},
		    		success:function(res){
		    			console.log(res);
		    		}
		    	})
    	}	
    	

    })

});



function resetPassword() {
	try{
		var id = $("input[type='radio'][name='mds']:checked").parent().parent().children()[7].innerHTML
		var username = $("input[type='radio'][name='mds']:checked").parent().parent().children()[2].innerHTML
		var email = $("input[type='radio'][name='mds']:checked").parent().parent().children()[4].innerHTML
		
		var newPassword = randomString(8, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
		var hashpassword = CryptoJS.HmacSHA256(newPassword, "ITSPE").toString();

		$.ajax({
				url: '../utils/resetPassword.php',
				data :{id:id,username:username,email:email,password:newPassword,hashpassword:hashpassword},
				type: 'POST',
				success: function(result) {
					if(result.length == 2){
						alert("Connection Error please try again");
					}
					else{
						alert("Password updated and sent to user succesfully");
						fetch_devices();
					}
				}
            });
	}
	catch(e){
		alert("Please select a User to reset his/her password")
	}
}


function randomString(length, chars) {
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
}



function changePassword() {
	try{
		var oldPassword=$('#oldPassword').val();
		var newPassword=$('#newPassword').val();
		var newPassword2=$('#newPassword2').val();
		var username=null;

		if(newPassword !== newPassword2){
			alert("Both password didn't match");
			return;
		}

		reload_js("../js/crypto.js");

		var hashOldPassword = CryptoJS.HmacSHA256(oldPassword,"ITSPE").toString();
		var hashNewPassword = CryptoJS.HmacSHA256(newPassword,"ITSPE").toString();
		
		$.ajax({
        	url: '../utils/get_username.php',
            success: function(result) {
				username=result;
				$.ajax({
					url: '../utils/changePassword.php',
					data :{oldPassword:hashOldPassword,newPassword:hashNewPassword,username:username},
					type: 'POST',
					success: function(result) {
						//console.log(result);
						if(result.length == 2){
							alert("Connection Error please try again");
						} else if(result === "incorrectPassword"){
							alert("Incorrect Password");
							window.location = "../html/changePassword.html"
						} else {
							alert("Password updated succesfully");
							window.location = "../html/changePassword.html"
						}
					}
	            });
            
			}
        });

	}
	catch(e){
		alert("Unable to update the password."+e);
	}
}


function reload_js(src) {
    $('script[src="' + src + '"]').remove();
    $('<script>').attr('src', src).appendTo('head');
}