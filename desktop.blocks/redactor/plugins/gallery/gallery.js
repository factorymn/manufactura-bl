if(typeof RedactorPlugins === 'undefined') var RedactorPlugins = {};

$.Redactor.prototype.observeImages = function() {
    if (this.opts.observeImages === false) return false;

    this.$editor.find('img:not(".gallery")').each($.proxy(function(i, elem)
    {
        if (this.browser('msie')) $(elem).attr('unselectable', 'on');
        this.imageResize(elem);

    }, this));
};

RedactorPlugins.gallery = {
    init: function() {

        RedactorPlugins.gallery.windowTpl = '\
            <section>\
                <form id="galleryUploadForm" action="/uploader/gallery" method="post" enctype="multipart/form-data">\
                    <input style="margin-bottom: 20px;" type="file" name="images[]" multiple="multiple"/>\
                    <div class="progress" style="display:none;position:relative;height: 20px;margin: 5px 0 5px 0;">\
                    <span class="i-loader">\
                        <span class="i-loader__bar"></span>\
                        <span class="i-loader__text">0%</span>\
                    </span>\
                    </div>\
                    <input type="hidden" name="id" />\
                </form>\
                <ul class="photoBlock" style="list-style: none;"></ul>\
            </section>\
            <footer>\
                <button class="redactor_modal_btn redactor_btn_modal_close">Закрыть</button>\
                <button class="redactor_modal_btn redactor_btn_modal_insert">Вставить</button>\
            </footer>\
        ';

        var pb = '<img class="gallery" data-id="$1" src="/i/gallery-back.png"/>';

        var sep = '<!-- gallery.([0-9]*). -->';
        var pbRE;

        pbRE = new RegExp(sep, 'g');
        var content = this.get().replace(pbRE, pb);

        this.$editor.html(content);

        this.opts.syncBeforeCallback = function(html) {
            var pb = '<!-- gallery($1) -->';

            var sep = '<img class="gallery" data-id="([0-9]*)" src=".*">';
            var pbRE;

            pbRE = new RegExp(sep, 'g');
            html = html.replace(pbRE, pb);
            return html;
        };

        $(this.$editor).on('click', '.gallery', $.proxy(function(event){
            this.openWindow($(event.target));
        }, this));


        this.buttonAdd('gallery', 'Фотогалерея', $.proxy(function() {
            this.openWindow();
        }, this));


        $(document).on('click', '.removePhotoGalleryItem', function(){
            var $element = $(this);
            var id = $element.data('id');
            $.ajax({
                url: '/uploader/remove_gallery_item/' + id,
                success: function(){
                    $element.parent().hide('slow');
                }
            });
            return false;
        });


    },
    setGallery: function(data){
        var html =  $('.photoBlock', '#redactor_modal_inner').html();

        $.each(data.images, function(){
            html += '<li data-id="' + this.id + '" style="position: relative;display: inline-block;width: 112px;height: 112px;">' +
                    '<span class="removePhotoGalleryItem" data-id="' + this.id + '">Удалить</span><img src="' + this.url_image_s + '"/></li>';
        });
        $('.photoBlock', '#redactor_modal_inner').html(html);
    },
    openWindow: function($element) {
        var data = {};
        if(typeof $element != 'undefined') {
            data = $element.data();
        } else {
            data.id = 0;
        }

        this.modalInit('Фотогалерея', RedactorPlugins.gallery.windowTpl, 800, $.proxy(function(){

            $('.redactor_btn_modal_insert').hide();
            $('input[name="id"]','#galleryUploadForm').val(data.id);
            if(data.id > 0) {

                $.ajax({
                    url: '/uploader/load_gallery/' + data.id,
                    success: function(result){
                        RedactorPlugins.gallery.setGallery(result);
                    }
                });
            }

            $('.redactor_btn_modal_insert').click($.proxy(function(){
                var id = $('input[name="id"]','#galleryUploadForm').val();
                this.execCommand('inserthtml', '<img class="gallery" data-id="' + id + '" src="/i/gallery-back.png"/>');
                this.modalClose();
            }, this));

            $('input[type="file"]','#galleryUploadForm').change(function(){

                $('#galleryUploadForm').ajaxSubmit({
                    dataType: 'json',
                    beforeSubmit: function(){
                        $('.progress', '#galleryUploadForm').fadeIn('slow');
                    },
                    uploadProgress: function(event, position, total, percentComplete){
                        $('.i-loader__bar', '#galleryUploadForm').css({
                            width: percentComplete + '%'
                        });
                        $('.i-loader__text', '#galleryUploadForm').html(percentComplete + '%');
                    },
                    success: function(result){
                        $('.progress', '#galleryUploadForm').fadeOut('slow');
                        RedactorPlugins.gallery.setGallery(result);
                        var id = $('input[name="id"]','#galleryUploadForm').val();

                        if(id == 0) {
                            $('.redactor_btn_modal_insert').show();
                        }
                        $('input[name="id"]','#galleryUploadForm').val(result.id);

                        $('input[type="file"]','#galleryUploadForm').val('');
                    }
                });
            });

        }, this));

    }

};