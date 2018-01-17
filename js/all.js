$(document).ready(function(){
    $.ajax({
        type: "GET",
        url: "https://data.kaohsiung.gov.tw/Opendata/DownLoad.aspx?Type=2&CaseNo1=AF&CaseNo2=1&FileType=2&Lang=C&FolderType=O",
        success: function(data) {
            let thisData =JSON.parse(data);
            let areaList =[];
            let useList = [];
            for(i=0; i<thisData.length; i++){
                areaList.push(thisData[i]["行政區"]);
                useList.push(thisData[i]["功能"]);
            }
            let area =[];
            let use =[];
            areaList.forEach(function(value) {
                if(area.indexOf(value) == -1){
                    area.push(value);
                }
            })
            useList.forEach(function(value) {
              if (use.indexOf(value) == -1) {
                use.push(value);
              }
            });
            for(let i=0; i<area.length; i++){
                $("#area").append("<option>" + area[i] + "</option>"); 
            }
            for (let i = 0; i < use.length; i++) {
              $("#work").append("<option>" + use[i] + "</option>");
            }
            //跑迴圈依序將值塞入到marker
            $("#area").change(function(e) {
                $("#work").prop("disabled", false).change(function(ind) {
                    for(i=0; i<thisData.length; i++) {
                        if(e.target.value == thisData[i]["行政區"] && ind.target.value == thisData[i]["功能"]) {
                            let str = {};
                            let place = {};
                            
                            place.lat = parseFloat(thisData[i]["緯度Lat"]);
                            place.lng = parseFloat(thisData[i]["經度Lng"]);
                            
                            str.map = map;
                            str.position = place;
                            new google.maps.Marker(str);
                        }
                    }  
                })
            });
        } 
    })
})
/*設定中心點*/
var map;
function initMap() {
    map =new google.maps.Map(document.getElementById("map"), {
        center: {lat: 22.6116836, lng: 120.2980036},
        zoom: 13
    });
}


