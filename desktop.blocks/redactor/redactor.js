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
            var defaultParams = {
                imageUpload: '/uploader/image',
                imageGetJson: '/uploader/images_list',
                fileUpload: '/uploader/file',
                fileUploadCallback: function(link, json)
                {
                    $(link).addClass('file_upload');
                    this.sync();
                },
                plugins: ['table'], // есть плагины ['gallery', 'image_classes']
                buttons: [
                    'formatting',
                    'bold',
                    'italic',
                    'deleted',
                    'unorderedlist',
                    'orderedlist',
                    'outdent',
                    'indent',
                    'image',
                    'video',
                    'file',
                    'link',
                    'alignment',
                    'horizontalrule'
                ],
                formattingTags: ['p', 'blockquote', 'pre', 'h1', 'h2', 'h3', 'h4'],
                lang: 'ru',
                buttonSource: true
            };

            for (var prop in params) {
                if (prop != 'uniqId') {
                    defaultParams[prop] = params[prop];
                }
            }
            this.domElem.redactor(defaultParams);
        }
    }));

});