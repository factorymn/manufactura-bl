({
    block: 'page',
    title: 'index',
    head: [
        { elem: 'css', url: '_index.css', ie: false },
        { elem: 'css', url: '_index.ie.css', ie: 'IE' }
    ],
    scripts: [{ elem: 'js', url: '_index.js' }],
    content: [
       {
           block: 'content',
           content: [
               'block content'
           ]
       }
    ]
})
