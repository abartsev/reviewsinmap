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

            ymaps.geocode(coords)
                     .then(
                        function (res) {
                        const points = res.geoObjects.get(0).properties.get('text');
                        localStorage.point = points;
                        var html  = '<div class="popup">';
                        html +=     '<div class="header">' + points + '</div>';
                        html +=     '<div class="popup-text">';
                        html +=         '<p>The Victoria Tower Gardens</p>';
                        html +=         '<p>Millbank</p>';
                        html +=         '<p>City of London </p>';
                        html +=         '<p>SW1P 3SF</p>';
                        html +=         '<p>United Kingdom</p>';
                        html +=         '<p>020 7641 5264</p>';
                        html +=     '</div>';
                        html += '</div>';
                        myMap.balloon.open(coords, {
                            contentBody: html
                        });
                }
            );
            

          
  
            objMap.coords = new ymaps.Placemark(coords, {
                
            });
            clusterer.add(objMap.coords);
          
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
