$(document).ready(function(){

    fetchroles = function(){

            var path = window.location.pathname;
                    var page = path.split("/").pop();

        $.ajax({
                url: '../utils/authenticate.php',
                data :{page:page},
                            type: 'POST',
                success: function(result) {

                    if(result.trim() === "li"+"cenc"+"eEr"+"ror"){
                        window.location = "l"+"ice"+"nce"+"Er"+"ro"+"r.html"
                        return;
                    }

                    if(result.trim() === "loginRequired"){
                        window.location = "../html/index.html"
                        return;   
                    }

                    var devices_set = jQuery.parseJSON(result);
                    var pageLoad = false;

                    for(i=0; i<devices_set.length;i++){
                            if(devices_set[i].PAGE == "TRUE"){
                                    pageLoad = true;
                            }
                    }

                    if(!pageLoad){
                            alert("Please contact administrator for the access to the page");
                    window.history.back();
                    }
                }
        });
    }
    fetchroles();
});