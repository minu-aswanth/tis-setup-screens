$(document).ready(function(){
        fetchdata = function(){
                var username=$('#username').val();
                var password=$('#password').val();
                        if(username.length == 0){
                                alert("Please Enter Username");
                                return;
                        }
                        if(password.length == 0){
                    alert("Please Enter Password")
                                return;
                }
                var hashpassword = CryptoJS.HmacSHA256(password, "ITSPE").toString();

                $.ajax({
                    url: '../utils/login.php',
                    data :{username:username,password:hashpassword},
                    type: 'POST',
                    success: function(result) {
                        if(result === "licenceError\n"){
                                window.location = "l"+"ice"+"nce"+"Er"+"ro"+"r.html"
                                return
                        }
                          if(result.length == 6){
                                 alert("Invalid Login Credentials")
                                 return
                          }
                         if(result[result.length-2] + result[result.length-1] == '[]'){
                                alert("Invalid Login Credentials")
                                return
                         }
                        window.location = "../html/signal_map.html"
                    }
                });
        }
        $("#login").click(function() {
                fetchdata();
        });

        document.onkeypress=function(event){
           if(event.keyCode=='13'){
                $("#login").click();
                }
        }
});