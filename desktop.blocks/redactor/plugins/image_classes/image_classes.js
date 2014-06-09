if (typeof RedactorPlugins === 'undefined') var RedactorPlugins = {};

RedactorPlugins.image_classes = {
    init: function ()
    {
        var that = this;
        var dropdown = {};

        dropdown['center'] = { title: 'По центру', callback: function () { that.imageCenter(); } };
        dropdown['width'] = { title: 'На всю шируну', callback: function () { that.imageBig(); } };

        this.buttonAdd('image_classes', 'Классы изображений', false, dropdown);
    },
    imageCenter: function()
    {
        this.bufferSet();
        this.blockSetAttr('class', 'pic');
    },
    imageBig: function()
    {
        this.bufferSet();
        this.blockSetAttr('class', 'picBig');
    }
}