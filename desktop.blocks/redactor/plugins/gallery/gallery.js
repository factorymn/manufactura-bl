if (!RedactorPlugins) var RedactorPlugins = {};

RedactorPlugins.gallery = function() {
    return {
        getTemplate: function()
        {
            return String()
                + '<section>'
                + '<form id="galleryUploadForm" action="/uploader/gallery" method="post" enctype="multipart/form-data">'
                + '<input style="margin-bottom: 20px;" type="file" name="images[]" multiple="multiple" />'
                + '<div class="progress" style="display:none;position:relative;height: 20px;margin: 5px 0 5px 0;">'
                + '<span class="i-loader">'
                + '<span class="i-loader__bar"></span>'
                + '<span class="i-loader__text">0%</span>'
                + '</span>'
                + '</div>'
                + '<input type="hidden" name="id" />'
                + '</form>'
                + '<ul class="photoBlock" style="list-style: none;"></ul>'
                + '</section>';
        },
        init: function()
        {
            var pb = '<img class="gallery" data-id="$1" src="/gallery.jpg" />';
            var pbRE = new RegExp('<!-- gallery.([0-9]*). -->', 'g');
            var content = this.code.get().replace(pbRE, pb);

            this.$editor.html(content);

            $(this.$editor).on('click', '.gallery', this.gallery.show);

            var button = this.button.addAfter('image', 'gallery', 'Фотогалерея');
            this.button.addCallback(button, this.gallery.show);
        },
        show: function(element) {

            this.modal.addTemplate('gallery', this.gallery.getTemplate());
            this.modal.load('gallery', 'Фотогалерея', 1000);
            this.modal.createCancelButton();

            var button = this.modal.createActionButton(this.lang.get('insert'));
            button.on('click', this.gallery.insert);

            this.selection.save();

            var id = $(element.target).data('id');
            var _this = this;

            $('.redactor_btn_modal_insert').hide();
            $('input[name="id"]','#galleryUploadForm').val(id);

            if(id != undefined) {
                $.ajax({
                    url: '/uploader/load_gallery/' + id,
                    success: function(result){
                        _this.gallery.setGallery(result);
                    }
                });
            }

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
                        _this.gallery.setGallery(result);
                        var id = $('input[name="id"]','#galleryUploadForm').val();

                        if (id == 0) {
                            $('.redactor_btn_modal_insert').show();
                        }
                        $('input[name="id"]','#galleryUploadForm').val(result.id);
                        $('input[type="file"]','#galleryUploadForm').val('');
                    }
                });
            });

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

            this.modal.show();
        },
        insert: function()
        {
            this.modal.close();
//            this.selection.restore();

            var id = $('input[name="id"]','#galleryUploadForm').val();
            var img = $('<img src="/gallery.jpg" />').data('id', id);
            img = '<img class="gallery" data-id="' + id + '" src="/gallery.jpg" />';
            console.log(img);
            this.insert.set(img);

            this.code.sync();
        },
        setGallery: function(data) {
            var html =  $('.photoBlock', '#redactor-modal-body').html();

            $.each(data.images, function(){
                html += '<li data-id="' + this.id + '" style="position: relative;display: inline-block;width: 112px;height: 112px;">' +
                    '<span class="removePhotoGalleryItem" data-id="' + this.id + '">Удалить</span><img src="' + this.url_image_s + '"/></li>';
            });
            $('.photoBlock', '#redactor-modal-body').html(html);
        }
    };

};