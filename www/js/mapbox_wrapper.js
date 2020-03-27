var mapbox;
var mapbox_marker = [];
var mapbox_bounds = [];
var mapbox_marker_track = [];
var mapbox_token;

getMapbox = function(){
	settings = AppSettings();
	return {
		mapbox_access_token: settings.mapbox_access_token ,
		mapbox_default_zoom: settings.mapbox_default_zoom ,
	};
};

centerMapbox = function(){
	mapbox.fitBounds(mapbox_bounds, {padding: [30, 30]}); 
};

mapboxCreateIcon = function(icon_url){
	icon = L.icon({
		iconUrl: icon_url
	});
	return icon;
};

mapboxInitMap = function(div, data){
	dump("==>mapboxInitMap");
	div = div.replace(".", "");
	dump(div); dump(data);
	try {
		
		lat = data.lat;
		lng = data.lng;
					
		if(empty(lat) && empty(lng)){
		   showToast( getTrans("Missing Coordinates","missing_coordinates") );	
		   return;
		}
		
		mapbox_info = getMapbox();
		mapbox_default_zoom = mapbox_info.mapbox_default_zoom;
		if(empty(mapbox_default_zoom)){
			mapbox_default_zoom=18;
		}
		mapbox_token = mapbox_info.mapbox_access_token		
		
		mapbox_bounds = [];
				
		mapbox = L.map(div,{ 
		   scrollWheelZoom:true,
		   zoomControl:false,
	    }).setView([lat,lng], 5 );
	    
	     L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token='+mapbox_token, {		    
		    maxZoom: mapbox_default_zoom,
		    id: 'mapbox.streets',		    
		}).addTo(mapbox);
		
		info_html='';
		if(data.show_info){
		   info_html = data.info_html;
		}
		
		data_marker={};		
		data_marker.draggable = data.draggable;		
		if(data.use_icon){
			data_marker.icon = mapboxCreateIcon(data.icon);
		}
		dump("data_marker=>");
		dump(data_marker);
		
		mapbox_marker[0] = L.marker([ lat , lng ], data_marker ).addTo(mapbox);  
		
		if(data.show_info){
			mapbox_marker[0].bindPopup( info_html , {autoClose:false}).openPopup();
		}
		
		if(data_marker.draggable){
		   mapbox_marker[0].on('dragend', function (e) {
		    	new_lat = mapbox_marker[0].getLatLng().lat;
		    	new_lng = mapbox_marker[0].getLatLng().lng;
		    	dump("new_lat : "+ new_lat);
	            dump("new_lng : "+ new_lng);
	            $(".selected_lat").val( new_lat );
	            $(".selected_lng").val( new_lng );
		   });
		}
		
		latlng = [lat,lng];
		mapbox_bounds.push( latlng );
		centerMapbox();
		
	} catch(err) {		
		dump(err);	    
	}  
};

mapboxLocationMap = function(div,data){
	mapboxInitMap(div,data);
};

mapboxRoute = function(){	
	navigator.geolocation.getCurrentPosition(function(position){
		
		var your_lat = position.coords.latitude;
        var your_lng = position.coords.longitude;
		
        info_html = t("You are here");
        
        data_marker={};
        mapbox_marker[1] = L.marker([ your_lat , your_lng ], data_marker ).addTo(mapbox);  
        mapbox_marker[1].bindPopup( info_html , {autoClose:false}).openPopup();
        
        var control = L.Routing.control({	
		waypoints: [
			    L.latLng(your_lat, your_lng),
			    L.latLng(lat, lng)
			],
		    router: L.Routing.mapbox(mapbox_token),
		    createMarker: function(i, wp, nWps) {					    
			    /*if(i==0){
			    	 return L.marker(wp.latLng, {icon: icon1 });
			    } else {
			    	 return L.marker(wp.latLng, {icon: icon2 });
			    }*/
			} 
	    });
	   
	    var routeBlock = control.onAdd(mapbox);    
        
        latlng = [your_lat,your_lng];
		mapbox_bounds.push( latlng );
		centerMapbox();
        
		showLoader(false);
	},
    function(error){
     	showLoader(false);
     	showToast(error.message);
    }, { enableHighAccuracy: getLocationAccuracy() ,maximumAge:Infinity, timeout:60000 });
};


mapboxTrack = function(div,data, full_data){
	mapboxInitMap(div,data);
	dump("=>full_data");
	dump(full_data);
	
	/*DROP OFF*/	
	if(!empty(full_data.dropoff_info.lat)){
		
		data_marker={};				
		data_marker.icon = mapboxCreateIcon( full_data.icons.dropoff );		
		mapbox_marker[1] = L.marker([ full_data.dropoff_info.lat , full_data.dropoff_info.lng ], data_marker ).addTo(mapbox);  
		
		mapbox_marker[1].bindPopup( t("drop off") , {autoClose:false}).openPopup();
		
		latlng = [full_data.dropoff_info.lat,full_data.dropoff_info.lng];
		mapbox_bounds.push( latlng );		
		
	}
	
	/*DRIVER*/
	if(!empty(full_data.driver_info.lat)){
		data_marker={};				
		data_marker.icon = mapboxCreateIcon( full_data.icons.driver );		
		mapbox_marker[3] = L.marker([ full_data.driver_info.lat , full_data.driver_info.lng ], data_marker ).addTo(mapbox);  
		
		latlng = [full_data.driver_info.lat,full_data.driver_info.lng];
		mapbox_bounds.push( latlng );		
	}
	
	centerMapbox();
	
};

mapboxDriverMove = function(lat , lng){
	dump(lat + "=>" + lng);
	mapbox_marker[3].setLatLng([lat, lng]).update(); 
};