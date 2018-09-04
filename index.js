
document.body.addEventListener('click', function(e){
    const form = document.querySelector('.form');
    form.style.display = 'inline-block';
    form.style.top = e.pageY + 'px';
    form.style.left = e.pageX + 'px';

    
})
const btn = document.getElementById('btn');
if (btn) {
    btn.addEventListener('click', function(e){
        e.preventDefault();
        const name = document.getElementById('name').value;
        const point = document.getElementById('point').value;
        const message = document.getElementById('message').value;
        console.log(e);
    })
}
    export { name, point,  message};
function eventsMap () {
    
//     ymaps.geocode(coords)
//     .then(
//        function (res) {
//        const points = res.geoObjects.get(0).properties.get('text');
//        localStorage.point = points;
//        var BalloonContentLayout = ymaps.templateLayoutFactory.createClass(
//            '<div class="form">' +
//                '<div class="header">'+ points +'</div>' + 
//                    '<div class="body">' + 
                   
//                    '</div>' +
//                    '<p class="title">Ваш отзыв</p>' +
//                '<form>' +
//                    '<div><input id="name" type="text" placeholder="Ваше имя"/></div>' +
//                    '<div><input id="point" type="text" placeholder="Укажите место" /></div>' +
//                    '<div>' +
//                        '<textarea id="message" placeholder="Поделись впечатлениями">' +
//                        ' </textarea></div>' +
//                    '<div class="button">' +
//                    '<button id="btn">Отправить</button>' +
//                    '</div>' +
//                '</form>' +
//          '</div>', {

//            // Переопределяем функцию build, чтобы при создании макета начинать
//            // слушать событие click на кнопке-счетчике.
//            build: function () {
//                // Сначала вызываем метод build родительского класса.
//                BalloonContentLayout.superclass.build.call(this);
//                document.getElementById('btn').addEventListener('click', function(e){
//                    e.preventDefault();
//                   const name = document.getElementById('name');
//                   const point = document.getElementById('point');
//                   const message = document.getElementById('message');
//                    console.log(e);
//                })
//                // А затем выполняем дополнительные действия.
//            },

//            // Аналогично переопределяем функцию clear, чтобы снять
//            // прослушивание клика при удалении макета с карты.
//            clear: function () {
//                // Выполняем действия в обратном порядке - сначала снимаем слушателя,
//                // а потом вызываем метод clear родительского класса.
//                BalloonContentLayout.superclass.clear.call(this);
//            },

//            onContent: function () {

//            }
//        });
//        var balloon = new ymaps.Balloon(myMap, {
//            contentLayout: BalloonContentLayout
//      });
//      balloon.options.setParent(myMap.options);
//      balloon.open(coords);
   
       
// }
// );

}