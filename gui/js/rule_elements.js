$(document).ready(function(){

var met = [
    {display: "RoadTemp", value: "RoadTemp" }, 
    {display: "VisibilityDist", value: "VisibilityDist" }, 
    //{display: "Precipitation", value: "Precipitation" },
    {display: "AirTemp", value: "AirTemp" },
    {display: "WindSpeed", value: "WindSpeed" },
    {display: "Humidity", value: "Humidity" }];
    
var atcc = [
    {display: "TotalFlow", value: "TotalFlow" }, 
    //{display: "Occupancy", value: "Occupancy" }, 
    {display: "Speed", value: "Speed" }];
    //{display: "Headway", value: "Headway" }];
    
$("#module").change(function() {
        var parent = $(this).val();
        
        switch(parent){
              case 'MET':
                list(met);
                break;
              case 'ATCC':
                list(atcc);
                break;              
            /*default: //default child option is blank
                $("#variable").html('');  
                break;*/
           }
});

function list(array_list)
{
    $("#variable").html("");
    $(array_list).each(function (i) {
        $("#variable").append("<option value=\""+array_list[i].value+"\">"+array_list[i].display+"</option>");
    });
}

});



$(document).ready(function(){

var met = [
    {display: "RoadTemp", value: "RoadTemp" }, 
    {display: "VisibilityDist", value: "VisibilityDist" }, 
    //{display: "Precipitation", value: "Precipitation" },
    {display: "AirTemp", value: "AirTemp" },
    {display: "Wind Speed", value: "WindSpeed" },
    {display: "Humidity", value: "Humidity" }];
    
var atcc = [
    {display: "TotalFlow", value: "TotalFlow" }, 
    //{display: "Occupancy", value: "Occupancy" }, 
    {display: "Speed", value: "Speed" }];
    //{display: "Headway", value: "Headway" }];
    
$("#module_modal").change(function() {
        var parent = $(this).val();
        
        switch(parent){
              case 'MET':
                list(met);
                break;
              case 'ATCC':
                list(atcc);
                break;              
            /*default: //default child option is blank
                $("#variable").html('');  
                break;*/
           }
});

function list(array_list)
{
    $("#variable_modal").html("");
    $(array_list).each(function (i) {
        $("#variable_modal").append("<option value=\""+array_list[i].value+"\">"+array_list[i].display+"</option>");
    });
}

});



