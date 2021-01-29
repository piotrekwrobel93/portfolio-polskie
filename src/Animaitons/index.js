
import { $ } from '../helpers.js'


window.onbeforeunload = function () {
    window.scrollTo(0, 0);
}

gsap.registerPlugin( ScrollTrigger )



window.addEventListener("DOMContentLoaded", function() {

    let isSmallScreen = false
    if ( window.innerWidth < 769 ) {
        isSmallScreen = true
    }


    // VARIABLES

    let isClickedMenu = false

    // GET DOM NODES 

    const burgerLines = $.findAll('.burger-line')
    const burgerDiv = $.find('.navigation--burger')
    const rightMenuPanel = $.find(".right-panel")






    /** ------------------------------------------------------------------------ */

    //  Home page Scroll Trigger

    if ( !isSmallScreen ) {

        gsap.to("#home",{
            scrollTrigger: {
                trigger: "#home",
                start: "5px top",
                end: "+=5px",
                onEnter: () => {
                    gsap.to(window, {
                        scrollTo: { y: 8},
                        delay: 0,
                        duration: 0.5
                    });
                    gsap.to("#home", {
                        x:"100%",
                        ease: "power3.easeInOut",
                        duration: 0.5
                    });
                },
                onLeaveBack: () => {
                    gsap.to( window,{
                        scrollTo: {y: 0},
                        delay: 0,
                        duration: 2
                    }),
                    gsap.to("#home", {
                        x:"0%",
                        ease: "power3.easeInOut",
                        duration: 0.5
                    })
                    gsap.from("#home-hero-typo", {
                        opacity: 0,
                    })
                }
            },
        })


    }

    


    /** ------------------------------------------------------------------------ */
    
    // LOGO SPARROW SVG ANIMATION


    anime({
        targets: "#sparrow path",
        strokeDashoffset: [ anime.setDashoffset, 0],
        duration: 1500,
        easing: "easeInQuad",
    }).play()





    /** ------------------------------------------------------------------------ */

    // LOAD IN ANIMATION ON HOME PAGE 

    gsap.from('.navigation', {
        y: "-100%",
        delay: 1.7
    })
    gsap.from('#home-hero-typo h1', {
        x: 100,
        opacity: 0,
        delay: 1.8
    })
    gsap.from('#home-hero-typo p', {
        x: 100,
        opacity: 0,
        delay: 1.8
    })
    gsap.from("#home-hero > nav", {
        x: -100,
        opacity: 0,
        delay: 1.8
    })



    /** ------------------------------------------------------------------------ */

    // BURGER ICON ANIMATION ON CLICK & MENU TOGGLING

    const animateBurgerIcon = function () {

        gsap.defaults({duration: 0.3, ease: "power3.in"})
        isClickedMenu = !isClickedMenu
        // 
        isClickedMenu ? openMenu() : closeMenu()
    }


    const openMenu = function() {
        isClickedMenu = true
        gsap.to('#menu', {
            left: "100%",
            duration: 0.5,
        })
        gsap.to("#navigation--name", {
            opacity: 1,
            x: 0,
            delay: 0.2,
        })
        gsap.to("#burger-line-1", {
            x: 10,
            backgroundColor: "#111"
        })
        gsap.to("#burger-line-2", {
            x: 0,
            backgroundColor: "#111",
            width: 25
        })
        gsap.to("#burger-line-3", {
            x: -10,
            backgroundColor: "#111"
        })

    }

    const closeMenu = function() {
        isClickedMenu = false
        gsap.to('#menu', {
            left: "0%",
            duration: 0.5,
        })
        gsap.to("#navigation--name", {
            opacity: 0,
            x: -10,
            delay: 0,
        })
        gsap.to("#burger-line-1", {
            x: 0,
            backgroundColor: "#fff"
        })
        gsap.to("#burger-line-2", {
            x: 0,
            backgroundColor: "#fff",
            width: 40
        })
        gsap.to("#burger-line-3", {
            x: 0,
            backgroundColor: "#fff"
        })

    }

    const menuAnimation = function() {
        animateBurgerIcon()
    }

    /** ------------------------------------------------------------------------ */

    // EVENT LISTENERS

    burgerDiv.onclick = menuAnimation
    rightMenuPanel.onclick = closeMenu



})