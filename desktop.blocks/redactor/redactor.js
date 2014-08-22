//TODO: Завернуть плагины в модульную систему.

/*borschik:include:redactor.min.js*/;
/*borschik:include:ru.js*/;
/*borschik:include:plugins/gallery/jquery.form.min.js*/;
/*borschik:include:plugins/gallery/gallery.js*/;
/*borschik:include:plugins/image_classes/image_classes.js*/

/* global modules:false */

modules.define('redactor', ['i-bem__dom', 'jquery'], function(provide, BEMDOM, $) {

provide(BEMDOM.decl(this.name, {
    onSetMod : {
        'js' : {
            'inited' : function() {
                this.init();
                window.RedactorPlugins.advanced = {
                    init: function ()
                    {
                        // this.buttonRemove('gallery');
                    }
                };
            }
        }
    },
    init : function() {
        var params = this.params;
        this.domElem.redactor({
            imageUpload: params.imageUpload || '/uploader/image',
            imageGetJson: params.imageGetJson || '/uploader/images_list',
            plugins: params.plugins || [], // есть плагины ['gallery', 'image_classes']
            buttons : params.buttons || false,
            lang: params.lang || 'ru'
        });
    }
}));

});

