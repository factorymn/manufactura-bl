modules.define('i-bem__dom', ['jquery'], function (provide, $, DOM) {

DOM.decl('map', {
    onSetMod: {
        'js': function () {

            this.__self._maps.push(this);

            if(this.__self.apiReady) {
                this.initMap();
            } else if(!this.__self.apiLoaded) {
                 this.__self.loadMapsApi();
            }


        }
    },
    /**
     * Инициализация карты.
     */
    initMap: function () {

        var _this = this;

        var center = this.params.center || [55.76, 37.64],
            zoom = this.params.zoom || 10;

        this._map = new ymaps.Map(this.domElem[0], {
            center: center,
            zoom: zoom,
            behaviors: ['drag', 'dblClickZoom']
        });

        // Добавляем контролы на карту.
        this.hasMod('zoomControl') && this._map.controls.add('zoomControl');
        this.hasMod('typeSelector') && this._map.controls.add('typeSelector');


        // Блок поделится информацией о том, что он инициализировал карту.
        // В данных передаём ссылку на экземпляр карты.
        this.emit('init');

        // Изменения центра и масштаба
        this._map.events.add('boundschange', function(event){
            var coords = event.get('newCenter');
            var zoom = event.get('newZoom');
            _this.emit('boundschange', {
                center: coords,
                zoom: zoom
            });
        });

        // Клик по карте
        this._map.events.add('click', function (event) {
            var coords = event.get('coordPosition');
            _this.emit('click', coords);

        });

    },
    /**
    *   Создание точки
    */
    createPoint: function(coords) {
        var point = new ymaps.GeoObject({
            // Описание геометрии.
            geometry: {
                type: "Point",
                coordinates: [coords[0], coords[1]]
            },
            // Свойства.
            properties: {
                hintContent: ""
            }
        }, {
            preset: 'twirl#blueDotIcon',
            draggable: true
        });

        return point;

    },
    /**
    *   Добавление точки на карту
    */
    addPoint: function(point) {
        this._map.geoObjects.add(point);
    },
    /**
    *   Добавление событий на точку
    */
    addPointEvent: function(point, event, callback) {
        point.events.add(event, callback);
    },
    removePoint: function(point) {
        this._map.geoObjects.remove(point);
    },
    /**
     * @return {Map | Null} Экземпляр карты, либо null, если карта не инстанцирована.
     */
    getMap: function () {
        return this._map || null;
    }
}, {
    // Описываем модули, которые будем загружать.
    mapsPackages: [
        [
            'package.full'
        ]
    ],
    _maps:[],
    apiLoaded: false,
    /**
     * Выполнится после загрузки API.
     */
    onAPILoaded: function () {
        this._maps.forEach(function(item){
            item.initMap();
        });
    },
    loadMapsApi: function () {

        if (!window.ymaps) {
            var apiScript = document.createElement('script'),
            apiCallback = 'ymapsloaded';

            var _this = this;

            window[apiCallback] = function() {
                 ymaps.ready(function(){
                     _this.onAPILoaded();
                     _this.apiReady = true;
                 });
             }

            apiScript.type  = "text/javascript";
            apiScript.src = [
                'http://api-maps.yandex.ru/2.0.29/?',
                '&load=' + this.mapsPackages[0].join(','),
                '&lang=ru-RU',
                '&onload=' + apiCallback
            ].join('');


            document.getElementsByTagName('head')[0].appendChild(apiScript);

        }

        this.apiLoaded = true;
    }
});

provide(DOM);

});
