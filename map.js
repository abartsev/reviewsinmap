
ymaps.ready(init);

  var myMap;

function init () {
    var objMap = {};
    var count = 0;
    var d = new Date();
    myMap = new ymaps.Map("map", {
        center: [55.76, 37.64],
        zoom: 11
    });
    window.clusterer = new ymaps.Clusterer({
        preset: 'islands#invertedVioletClusterIcons',
        clusterDisableClickZoom: true,
        clusterBalloonContentLayout: "cluster#balloonCarousel"
    
    }); 

    myMap.geoObjects.add(clusterer);
    myMap.events.add('click', function (e) {
        if (!myMap.balloon.isOpen()) {
            var coords = e.get('coords');
            bolloonTemp(coords);
            
        }
        else {
            myMap.balloon.close();
        }
    });  
   
    clusterer.events.add('click', function (e) {
         var object = e.get('target');
         var coords = e.get('coords');
        if (object.getGeoObjects) {
            var geoObjects = object.getGeoObjects();
            setTimeout(function () {
                const balloon__content = document.querySelector('.ymaps-2-1-68-balloon__layout');
                balloon__content.classList.add('active');
                EventList();
            }, 100);
            for (var i = 0; i < geoObjects.length; i++) {
     
                var id = geoObjects[i].properties;
                

                
            }
         } else {
            // клик был по метке   
            bolloonTemp(coords, object);
     
         }

     });
function EventList() {
        const linckCoords = document.querySelector('.linckCoords');
        if (linckCoords) {
            linckCoords.addEventListener('click', function () {
                var addr = this.getAttribute('data-coords').split(',');
                let flag = 'Y';
                myMap.balloon.close();
                bolloonTemp(addr, flag);
            }); 
        }
       
     }
 function bolloonTemp(coords, object) {
     var date = [];
     if (object && object != 'Y') {
        for (let key in objMap) {
            if (objMap.hasOwnProperty(key)) {

               var eq = JSON.stringify(objMap[key].coords) == JSON.stringify(object.geometry._coordinates);
                    if (eq) {
                        date.push(objMap[key]);
                    }
            }
        }
        
     } else if(object == 'Y'){
        object = [coords[0].replace(/"/g),coords[1].replace(/"/g)];
        for (let key in objMap) {
            if (objMap.hasOwnProperty(key)) {

               var eq = JSON.stringify(objMap[key].coords) == JSON.stringify(object).replace(/"/g, '');
                    if (eq) {
                        date.push(objMap[key]);
                    }
            }
        }
     }
    
    ymaps.geocode(coords)
    .then(function (res) {
    const points = res.geoObjects.get(0).properties.get('text');
    localStorage.point = points;
    var BalloonContentLayout = ymaps.templateLayoutFactory.createClass(
        '<div class="form">' +
            '<div class="header">'+ points +'</div>' + 
                '<div class="body">' + 
                
                '</div>' +
                '<p class="title">Ваш отзыв</p>' +
            '<form>' +
                '<div><input id="name" type="text" placeholder="Ваше имя"/></div>' +
                '<div><input id="point" type="text" placeholder="Укажите место" /></div>' +
                '<div>' +
                    '<textarea id="message" placeholder="Поделись впечатлениями">' +
                    ' </textarea></div>' +
                '<div class="button">' +
                '<button id="btn">Отправить</button>' +
                '</div>' +
            '</form>' +
        '</div>', {
        build: function () {
            BalloonContentLayout.superclass.build.call(this);
            var that = this;
            if (date.length > 0) {
                for (const key in date) {
                    if (date.hasOwnProperty(key)) {
                        const body = document.querySelector('.body');
                        const div = document.createElement('div');
                        div.innerHTML = date[key].message;
                        body.appendChild(div);
                    }
                }
            }
            document.getElementById('btn').addEventListener('click', function(e){
                e.preventDefault();
                const name = document.getElementById('name').value;
                const point = document.getElementById('point').value;
                const message = document.getElementById('message').value;
                const body = document.querySelector('.body');
                const div = document.createElement('div');
                div.innerHTML = `<div id="review"><b>${name}</b> <span>${point}</span><span class="data">${d.getDate()}.${d.getMonth()}.${d.getFullYear()} ${d.getHours()}.${d.getMinutes()}</span><p>${message}</p></div>`;
                body.appendChild(div);
                that.onContent(name, point, message);
            })
        },

        clear: function () {
            // Выполняем действия в обратном порядке - сначала снимаем слушателя,
            // а потом вызываем метод clear родительского класса.
            BalloonContentLayout.superclass.clear.call(this);
        },

        onContent: function (name, point, message) {
            
            objMap[count++] = {coords:coords, name: name,date:d.toString(),message: `<div id="review"><b>${name}</b> <span>${point}</span><span class="data">${d.getDate()}.${d.getMonth()}.${d.getFullYear()} ${d.getHours()}.${d.getMinutes()}</span><p>${message}</p></div>`};

            var Placemark = new ymaps.Placemark(coords, {
                balloonContentHeader: `<b>${point}</b>`,
                balloonContentBody: `<div id="review"><a class="linckCoords" href="javascript:void(0);" data-coords="${coords}">${points}</a> <p>${message}</p></div>`,
                balloonContentFooter: `${d.getDate()}.${d.getMonth()}.${d.getFullYear()} ${d.getHours()}.${d.getMinutes()}`,
            },{
                balloonContentBodyLayout: BalloonContentLayout,
                balloonPanelMaxMapArea: 0,
                hasBalloon: false
            });
            
            window.clusterer.add(Placemark);
 
            // clusterer.geoObjects.add(objMap.coords);
            // buildObj(objMap);
        }
    });
    
    var balloon = new ymaps.Balloon(myMap, {
        contentLayout: BalloonContentLayout
    });
        balloon.options.setParent(myMap.options);
        balloon.open(coords); 
    });
 }
}
