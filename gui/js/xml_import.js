$( document ).ready(function() {
	$("#fileToUpload").change(function(){

	    var formData = new FormData($("form#xml")[0]);

	    $.ajax({
	        url: '../utils/xml_validation.php',
	        type: 'POST',
	        data: formData,
	        async: false,
	        success: function (result) {
	            alert(result)
	        },
	        cache: false,
	        contentType: false,
	        processData: false
	    });

	    return false;
	});
});