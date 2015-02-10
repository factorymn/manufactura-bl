//TODO: Плагины пока подключаются на уровне проекта

/* global modules:false */

modules.define('redactor', ['i-bem__dom', 'jquery'], function(provide, BEMDOM, $) {

    provide(BEMDOM.decl(this.name, {
        onSetMod : {
            'js' : {
                'inited' : function() {
                    this.init();
                    window.RedactorPlugins.advanced = {
                        init : function()
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
                imageUpload : '/uploader/image',
                imageGetJson : '/uploader/images_list',
                fileUpload : '/uploader/file',
                fileUploadCallback : function(link, json)
                {
                    var type = json.filelink.split('.').slice(-1)[0];
                    $(link).attr('title', type);
                    $(link).addClass('file_upload');
                    if($(link).html() === 'undefined') {
                        $(link).html('File');
                    }
                    this.sync();
                },
                plugins : [], // есть плагины ['gallery', 'image_classes', 'table', 'video']
                buttons : [
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
                formatting : ['p', 'blockquote', 'pre', 'h1', 'h2', 'h3', 'h4'],
                lang : 'ru',
                buttonSource : true
            };

            for(var prop in params) {
                if(prop !== 'uniqId') {
                    defaultParams[prop] = params[prop];
                }
            }
            this.domElem.redactor(defaultParams);
        }
    }));

});
