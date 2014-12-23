({
    block : 'page',
    title : 'button',
    head : [
        { elem : 'css', url : '_button.css' },
    ],
    scripts : [{ elem : 'js', url : '_button.js' }],
    content : [
       {
           block : 'button',
           mods : { theme : 'islands', size : 's', type : 'put' },
           text : 'text'
       }
    ]
})
