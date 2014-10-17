modules.define('map', ['i-bem__dom', 'jquery'], function (provide, BEMDOM, $) {
provide(BEMDOM.decl(this.name, {
    onSetMod : {
        'js' : function() {
            this.loadMapsApi();
        }
    },
    /**
     * Загрузчик API.
     */
    loadMapsApi: function () {
        if (!window.ymaps) {

            var apiScript = document.createElement('script'),
                apiCallback = 'ymapsloaded';

            window[apiCallback] = $.proxy(function () {
                this.onAPILoaded();
            }, this);

            apiScript.src = [
                'http://api-maps.yandex.ru/2.1/?',
                '&lang=' + (this.params.lang || 'ru-RU'),
                '&onload=' + apiCallback
            ].join('');

            document.getElementsByTagName('head')[0].appendChild(apiScript);

        } else {
            this.onAPILoaded();
        }
    },
    /**
     * Выполнится после загрузки API.
     */
    onAPILoaded: function () {
        // Запускаем инициализацию карты.
        this.initMap();
    },
    /**
     * Инициализация карты.
     */
    initMap: function () {
        var center = this.params.center || [55.76, 37.64],
            zoom = this.params.zoom || 10;

        this._map = new ymaps.Map(this.domElem[0], {
            center: center,
            zoom: zoom,
            behaviors: ['drag', 'dblClickZoom', 'scrollZoom'],
            controls: ['zoomControl', 'fullscreenControl']
        });


        // Если есть метки, то добавляем их на карту.
        if (this.params.geoObjects && this.params.geoObjects.length > 0) {
            this.params.geoObjects.forEach(function (item) {

                var geoObject;

                item.options = item.options || {};
                geoObject = new ymaps.Placemark(item.coords, item.properties, item.options);

                this._map.geoObjects.add(geoObject);

            }, this);
        }

        // Центруем карту так что бы влазили все добавленные объекты
        if (this.params.setupBoundsByGeoObjects) {
            this._map.setBounds(this._map.geoObjects.getBounds());
        }

        // Блок поделится информацией о том, что он инициализировал карту.
        // В данных передаём ссылку на экземпляр карты.
        
        // TODO: Кажется что этот метод немного ломает IE
        this.trigger('map-inited', {
            map: this._map
        });
    },

    /**
     * @return {Map | Null} Экземпляр карты, либо null, если карта не инстанцирована.
     */
    getMap: function () {
        return this._map || null;
    }

}))
});
