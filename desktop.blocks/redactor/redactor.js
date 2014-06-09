/*borschik:include:redactor.min.js*/;
/*borschik:include:ru.js*/;
/*borschik:include:plugins/gallery/jquery.form.min.js*/;
/*borschik:include:plugins/gallery/gallery.js*/;
/*borschik:include:plugins/image_classes/image_classes.js*/

$('.redactor').redactor({
    imageUpload: '/uploader/image',
    imageGetJson: '/uploader/images_list',
    plugins: ['gallery', 'image_classes'],
    lang: 'ru'
});
