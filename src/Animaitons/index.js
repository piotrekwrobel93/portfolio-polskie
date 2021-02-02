import { $, openInNewTab } from '../helpers.js'
import { manageTabs } from '../helpers.js'
import { manageScrollDuringAnimation } from '../helpers.js'

window.addEventListener("DOMContentLoaded", function() {
    
    
    window.onbeforeunload = () => window.scrollTo(0, 0);
    gsap.registerPlugin( ScrollTrigger )
    
    
    // VARIABLES
    let isClickedMenu = false
    let isSmallScreen = false
    let isFirstAnimation = true
    
    // GET DOM NODES 
    
    const burgerLines = $.findAll('.burger-line')
    const burgerDiv = $.find('.navigation--burger')
    const rightMenuPanel = $.find(".right-panel")
    const buttonProject1 = $.find("#link--project1")
    const buttonProject2 = $.find("#link--project2")
    const buttonProject3 = $.find("#link--project3")
    const sectionsArray = $.findAll(".trigger")
    
    
    // Check for small screen     
    window.innerWidth < 769 && ( isSmallScreen = true )



    /** ------------------------------------------------------------------------ */

    //  Home page Scroll Trigger
    if ( !isSmallScreen ) {

        gsap.to("#home",{
            scrollTrigger: {
                trigger: "#home",
                start: "2px top",
                end: "+=5px",
                scrub: 1,
                onEnter: () => {
                    // DISABLE SCROLL
                    manageScrollDuringAnimation(500)
                    // 
                    gsap.to("#home", { x:"100%", ease: "power3.easeInOut", duration: 0.5 });
                    gsap.from(".intro--typo",{ x: "-120%", opacity: 0 })
                },
                onLeaveBack: () => {
                    //  DISABLE SCROLL
                    manageScrollDuringAnimation(500)  
                    // 
                    gsap.to("#home", { x:"0%", ease: "power3.easeInOut", duration: 0.5 })
                    gsap.from("#home-hero-typo", { opacity: 0 })
                }
            },
        })

        gsap.to( ".navigation", {
            scrollTrigger: {
                trigger: document.body,
                start: "bottom center",
                onEnter: () => alert("now")
            }
        })



    }

    


    /** ------------------------------------------------------------------------ */
    
    // SVG ANIMATION
    // SPARROW
    anime({ targets: "#sparrow path", strokeDashoffset: [ anime.setDashoffset, 0 ],duration: 1500, easing: "easeInQuad",})
        .play()


    /** ------------------------------------------------------------------------ */

    // LOAD IN ANIMATION ON HOME PAGE 
    isFirstAnimation && 
        gsap.from('.navigation', { y: "-100%", delay: 1.7 })
        gsap.from('#home-hero-typo h1', { x: 100, opacity: 0, delay: 1.8 })
        gsap.from('#home-hero-typo p', { x: 100, opacity: 0, delay: 1.8 })
        gsap.from("#home-hero > nav", { x: -100, opacity: 0, delay: 1.8 })
        gsap.from(".mouse-wrapper",{ opacity: 0, delay: 2 })


    /** ------------------------------------------------------------------------ */

    // BURGER ICON ANIMATION ON CLICK & MENU TOGGLING
    const animateBurgerIcon = () => {

        gsap.defaults({ duration: 0.3, ease: "power3.in"})
        isClickedMenu = !isClickedMenu
        // 
        isClickedMenu ? openMenu() : closeMenu()
    }


    const openMenu = () => {
        isClickedMenu = true
        gsap.to('#menu', { left: "100%", duration: 0.5, })
        gsap.to("#navigation--name", { opacity: 1, x: 0, delay: 0.2, })
        gsap.to("#burger-line-1", { x: 10, backgroundColor: "#111" })
        gsap.to("#burger-line-2", { x: 0, backgroundColor: "#111", width: 25 })
        gsap.to("#burger-line-3", { x: -10, backgroundColor: "#111" })
    }

    const closeMenu = () => {
        isClickedMenu = false
        gsap.to('#menu', { left: "0%", duration: 0.5, })
        gsap.to("#navigation--name", { opacity: 0, x: -10, delay: 0, })
        gsap.to("#burger-line-1", { x: 0, backgroundColor: "#fff" })
        gsap.to("#burger-line-2", {x: 0, backgroundColor: "#fff", width: 40 })
        gsap.to("#burger-line-3", { x: 0, backgroundColor: "#fff" })
    }

    manageTabs()


    /** ------------------------------------------------------------------------ */

    // EVENT LISTENERS

    burgerDiv.onclick = animateBurgerIcon
    rightMenuPanel.onclick = closeMenu

    buttonProject1.onclick = () => openInNewTab('https://catering-website.vercel.app')
    buttonProject2.onclick = () => openInNewTab('https://mans-hairdresser.netlify.app')
    buttonProject3.onclick = () => openInNewTab('https://google.com')

    if ( !isSmallScreen ) {

        let t1 = gsap.timeline({ duration: 0, delay: 0.5})
        let t2 = gsap.timeline({ duration: 0, delay: 0, ease: 'power2'})
    
        ScrollTrigger.create({
            trigger: sectionsArray[0],
            start: "top top",
            onEnter: self => {
                 t1.to(".burger-line", { backgroundColor: "#fff" })
            }
        })
        ScrollTrigger.create({
            trigger: sectionsArray[1],
            start: "top top",
            onEnter: self => {
                t1.to(".burger-line", { backgroundColor: "#000" })
                t2.to(".navicon", {fill: "#000" })
            },
            onLeaveBack: self => {
                t1.to(".burger-line", { backgroundColor: "#fff"})
                t2.to(".navicon", { fill: "#fff"})
            }
        })
        ScrollTrigger.create({
            trigger: sectionsArray[2],
            start: "-35px top",
            onEnter: self => t1.to(".burger-line", { backgroundColor: "#fff"}),
            onLeaveBack: self => t1.to(".burger-line", { backgroundColor: "#000"})
        })
        ScrollTrigger.create({
            trigger: '.trigger--wave',
            start: "50px top",
            onEnter: self => t2.to(".navicon", { fill: "#fff"}),
            onLeaveBack: self => t1.to(".navicon", { fill: "#000"})
        })
        ScrollTrigger.create({
            trigger: sectionsArray[3],
            start: "-30px top",
            onEnter: self => {
                t1.to(".burger-line", { backgroundColor: "#000"})
                t2.to(".navicon", { fill: "#000"})
            },
            onLeaveBack: self => {
                t1.to(".burger-line", { backgroundColor: "#fff"})
                t2.to(".navicon", { fill: "#fff"})
            }
        })
    }


})