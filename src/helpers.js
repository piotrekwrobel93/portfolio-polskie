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



export function manageTabs() {
    let tabs = document.querySelector(".tabs");
    let tabHeader = tabs.querySelector(".tab-header");
    let tabBody = tabs.querySelector(".tab-body");
    let tabIndicator = tabs.querySelector(".tab-indicator");
    let tabHeaderNodes = tabs.querySelectorAll(".tab-header > div");
    let tabBodyNodes = tabs.querySelectorAll(".tab-body > div");

    for (let i = 0; i < tabHeaderNodes.length; i++) {

        tabHeaderNodes[i].addEventListener("click",function(){

            tabHeader.querySelector(".active").classList.remove("active");
            tabHeaderNodes[i].classList.add("active");
            tabBody.querySelector(".active").classList.remove("active");
            tabBodyNodes[i].classList.add("active");
            tabIndicator.style.left = `calc(25% * ${i})`;
            
    });
    }
} 