// 지도를 생성합니다.
var alerted = false;
var map = map_initialize();
var startup = true;
var currentLocation;
geoLocation();

// 마커를 생성합니다.
var prevType;
var type = 'skate';
var skateMarkers = [];
var basketMarkers = [];
var areaMarkers = [];
var areas = [];
var skateAreas = [];
var basketAreas = [];
var myMarker = null;
var interval;

//var typeList = ['skate', 'basket']; //마커 종류 추가시 배열에도 추가해주세요.
//var typeSet = ['skate': skateMarkers,'bastet': basketMarkers];

//loadMarkers('skate', skateMarkers);
//loadMarkers('basket', basketMarkers);

//setSkateMarkers(map);
//setBasketMarkers(map);

document.getElementById("setMarker").addEventListener("click", function() {
	iwContent = '<div style="padding:5px;">This is me!</div>'; // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
	addMarker(map.getCenter(), iwContent, 'me');
	saveMarker(map.getCenter(), iwContent, type);
	interval = setInterval(function() {
			geoLocation();
			if(currentLocation!=null) {
				myMarker.setPosition(currentLocation);
				myMarker.setMap(map);
			}
			}, 3000)
	
});

document.getElementById("setGeolocation").addEventListener("click", function() {
	geoLocation();
	map.panTo(currentLocation);
});
document.getElementById("setArea").addEventListener("click", function() {
	//changeMarker("area");
	prevType = type;
	type = 'area';
	document.getElementById("setArea").style.display = 'none';
	document.getElementById("createPolyline").style.display = 'inline';
});
document.getElementById("createPolyline").addEventListener("click", function() {
	addPolygon([], prevType);
	type = prevType;
});

// 지도에 클릭 이벤트를 등록합니다
daum.maps.event.addListener(map, 'click', function(mouseEvent) {
	// 클릭한 위도, 경도 정보를 가져옵니다
	var latlng = mouseEvent.latLng;
	// 마커 위치를 클릭한 위치로 옮깁니다
	iwContent = '<div style="padding:5px;">Hello World!</div>'; // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
	addMarker(latlng, iwContent, type);
	saveMarker(latlng, iwContent, type);
});
