
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
    // const btn = document.getElementById('btn');
    //         if (btn) {
    //             btn.addEventListener('click', function(e){
    //                 e.preventDefault();
    //                 const name = document.getElementById('name').value;
    //                 const point = document.getElementById('point').value;
    //                 const message = document.getElementById('message').value;
    //                 console.log(e);
    //                 console.log(name, point, message );
    //             })
    //         }
    myMap.events.add('click', function (e) {
        if (!myMap.balloon.isOpen()) {
            var coords = e.get('coords');//[coords[0].toPrecision(6),coords[1].toPrecision(6)].join(', ');
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
                    document.getElementById('btn').addEventListener('click', function(e){
                        e.preventDefault();
                        const name = document.getElementById('name').value;
                        const point = document.getElementById('point').value;
                        const message = document.getElementById('message').value;
                        const body = document.querySelector('.body');
                        const div = document.createElement('div');
                        div.innerHTML = `<b>${name}</b> <span>${point}</span><br/><p>${message}</p>`;
                        body.appendChild(div);
                        console.log(that);
                        
                        that.onContent(name, point, message);
                    })
                },

                clear: function () {
                    // Выполняем действия в обратном порядке - сначала снимаем слушателя,
                    // а потом вызываем метод clear родительского класса.
                    BalloonContentLayout.superclass.clear.call(this);
                },

                onContent: function (name, point, message) {
                    objMap.coords = new ymaps.Placemark(coords, {
                        balloonContent: `<b>${name}</b> <span>${point}</span><br/><p>${message}</p>`
                    });
                    clusterer.add(objMap.coords);
          
                    clusterer.geoObjects.add(objMap.coords);
                    buildObj(objMap);
                }
            });
            var balloon = new ymaps.Balloon(myMap, {
                contentLayout: BalloonContentLayout
            });
            balloon.options.setParent(myMap.options);
            balloon.open(coords);
        
            
        }
        );
            
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
