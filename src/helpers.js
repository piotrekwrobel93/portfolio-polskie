export const $  = {
    find: function( element ) {
        const node = document.querySelector( element )
        if ( node ) {
            return node
        }
    },
    findAll: function( element ) {
        const htmlCollection = document.querySelectorAll( element )
        if ( htmlCollection && htmlCollection.length > 0 ) {
            return Array.from( htmlCollection )
        }
    },
    css: function ( element , styles ) {
        if( element && styles  ) {
            Object.assign(element.style, styles)
        }
        if( !element ) return console.log(`couldnt find element  ${element}`)
    },
    log: function ( message ) {
        console.log( message )
    }
}