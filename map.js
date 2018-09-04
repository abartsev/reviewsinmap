import { name, point, message} from './index';
ymaps.ready(init);
  var myMap;

function init () {
    var objMap = {};
    myMap = new ymaps.Map("map", {
        center: [55.76, 37.64],
        zoom: 11
    });
    clusterer = new ymaps.Clusterer({
        preset: 'islands#invertedVioletClusterIcons',
        clustererDisableClickZoom: true,
        openBalloonOnClick: false
    
    }); 
    myMap.geoObjects.add(clusterer);
   
    myMap.events.add('click', function (e) {
        if (!myMap.balloon.isOpen()) {
            var coords = e.get('coords');//[coords[0].toPrecision(6),coords[1].toPrecision(6)].join(', ');
            console.log(name, point, message );
            
           

          
  
            // objMap.coords = new ymaps.Placemark(coords, {
                
            // });
            // clusterer.add(objMap.coords);
          
        //clusterer.geoObjects.add(objMap.coords);
            //buildObj(objMap);
        }
        else {
            myMap.balloon.close();
        }
    });

   
}
function buildObj(obj) {
    for (const iterator in obj) {
        myMap.geoObjects.add(iterator);
        
    }
}
