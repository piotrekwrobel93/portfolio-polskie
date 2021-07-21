import { $, disableScroll, enableScroll, openInNewTab, _scrollTo, setActiveMenuItem, checkIfHomeSection, scrollFromHomePage, scrollToSection,
    toggleOverflowDuringAnimation } from './helpers.js'
import { manageTabs } from './helpers.js'

window.onunload = () => window.scrollTo(0,0)
window.onload = () => {

    // DISABLE SCROLL AT FIRST TO AVOID SCROLL THROUGH ANIMATIONS
    disableScroll()
    
    gsap.registerPlugin( ScrollTrigger, scrollTo )


    // LOADER ANIMATION
    let textWrapper = $.find('.ml12');
    textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
    let loaderDiv = $.find('#loader')
    anime.timeline({loop: false})
      .add({
        targets: '.ml12 .letter',
        translateX: [40,0],
        translateZ: 0,
        opacity: [0,1],
        visibility: "visible",
        easing: "easeOutExpo",
        duration: 1000,
        delay: (el, i) => 500 + 30 * i
      }).add({
        targets: ".ml12",
        opacity: 1,
        duration: 0
      }).add({
        targets: '.ml12 .letter',
        translateX: [0,-30],
        opacity: [1,0],
        easing: "easeInExpo",
        duration: 1000,
        delay: (el, i) => 100 + 30 * i
      }).add({
          targets: loaderDiv,
          scale: 0,
          opacity: 0,
          ease: "easeInExpo",
          duration: 500,
          complete: () => {
            // LOAD IN ANIMATION ON HOME PAGE 
            // isFirstAnimation && 
            gsap.to('.navigation', { top: "0%", delay: 2 })
            gsap.fromTo('#home-hero-typo h1', {  x: 100 , opacity: 0 }, { opacity: 1, x: 0, delay: 2})
            gsap.fromTo('#home-hero-typo p', { x: 100, opacity: 0 }, { opacity: 1, x: 0, delay: 2})
            gsap.fromTo("#home-hero > nav", { x: -100, opacity: 0 }, { opacity: 1, x: 0, delay: 2})
            gsap.fromTo(".mouse-wrapper",{ opacity: 0 }, { opacity: 1, delay: 2, onComplete: () => enableScroll() })
            gsap.fromTo("#sparrow", { opacity: 0},{opacity: 1})
            // SVG ANIMATION
            // SPARROW
            anime({ targets: "#sparrow path", strokeDashoffset: [ anime.setDashoffset, 0 ],duration: 2000, easing: "easeInQuad", opacity: 1})
            .play()
          }
      })

    
    // GET DOM NODES 
    const burgerDiv = $.find('.navigation--burger')
    const rightMenuPanel = $.find(".right-panel")
    const buttonProject1 = $.find("#link--project1")
    const buttonProject2 = $.find("#link--project2")
    const buttonProject3 = $.find("#link--project3")
    const buttonProject4 = $.find("#link--project4")
    const mobileButtonProject1 = $.find('#link--project1-m')
    const mobileButtonProject2 = $.find('#link--project2-m')
    const mobileButtonProject3 = $.find('#link--project3-m')
    const mobileButtonProject4 = $.find('#link--project4-m')
    const sectionsArray = $.findAll(".trigger")
    const trigerAboutSection = $.find("#scroll-to--about")
    const triggerProjectsSection = $.find("#scroll-to--projects")
    const triggerContactSection = $.find("#scroll-to--contact")
    const menuLink_home = $.find("#home-link")
    const menuLink_projects = $.find("#projects-link")
    const menuLink_about = $.find("#about-link")
    const menuLink_contact = $.find("#contact-link")
    const homeSection = $.find("#home")
    const aboutSection = $.find("#about")
    const projectSection = $.find("#projects")
    const contactSection = $.find("#contact")
    const scrollTopButton = $.find("#scrollTop")
    
    // VARIABLES
    let isClickedMenu = false
    let isSmallScreen = false
    let activeMenuColor = "#fff"
    // 
    const sections = [ homeSection, projectSection, aboutSection, contactSection ]
    const sections_triggers = [ menuLink_home, menuLink_projects, menuLink_about, menuLink_contact ]
    


    // Check for small screen     
    window.innerWidth < 769 && ( isSmallScreen = true )

    /** ------------------------------------------------------------------------ */

    // ANIMATING SECTIONS ON SCROLL

    const sectionsToFadeIn = ['.project-m','.tabs', '.about--top', '.about--bottom', 'form']

    sectionsToFadeIn.forEach( section => {
        $.find(section).style.opacity = 0
        ScrollTrigger.create({
            trigger: section,
            start: "top center",
            onEnter: () => gsap.to(section, {opacity: 1}),
        })
    })
  


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
        disableScroll()
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
        gsap.to("#burger-line-1", { x: 0, backgroundColor: activeMenuColor })
        gsap.to("#burger-line-2", {x: 0, backgroundColor: activeMenuColor, width: 40 })
        gsap.to("#burger-line-3", { x: 0, backgroundColor: activeMenuColor })
        enableScroll()
    }

    manageTabs()


    /** ------------------------------------------------------------------------ */
    // EVENT LISTENERS

    burgerDiv.onclick = animateBurgerIcon
    rightMenuPanel.onclick = closeMenu

    buttonProject1.onclick = () => openInNewTab('https://catering-website.vercel.app')
    buttonProject2.onclick = () => openInNewTab('https://mens-haircut.netlify.app/')
    buttonProject3.onclick = () => openInNewTab('https://stickerit.co')
    buttonProject4.onclick = () => openInNewTab('https://eco-appi.netlify.app/')
    mobileButtonProject1.onclick = () => openInNewTab('https://catering-website.vercel.app')
    mobileButtonProject2.onclick = () => openInNewTab('https://mens-haircut.netlify.app')
    mobileButtonProject3.onclick = () => openInNewTab('https://stickerit.co')
    mobileButtonProject4.onclick = () => openInNewTab('https://eco-appi.netlify.app/')
    

    // ON SUMBIT FORM SEND INFO TO SERVER AND FETCH RESPONSE 
   
/* ----------------------------------------------------------------------------- */
// SCROLL TO SECTION ON MENU ITEM CLICK 
// FOR BIGGER SCREEN DEVICES

    sections_triggers.forEach( (section, index ) => {
        // ADD EVENT ON CLICK
        section.onclick = event => {
                event.preventDefault()
                closeMenu()
                scrollToSection( sections[index])
            }
        })
// SCROLL TO SECTION ON MENU ITEMS CLICK 
// FOR SMALLER SCREENS

/* ----------------------------------------------------------------------------- */
// HOMEPAGE MINI-MENU ITEMS
// SCROLL TO SECTION ON CLICK 
// TRIGGERS ONCLICK EVENT
// FOR BIGGER SCREEN DEVICES

    if (!isSmallScreen) {
        trigerAboutSection.onclick = event => {
            event.preventDefault()
            _scrollTo( aboutSection )
            setTimeout( () => {
                scrollToSection( aboutSection )
            }, 900)
        } 

        triggerProjectsSection.onclick = event => {
            event.preventDefault()
            _scrollTo( projectSection )
            let timeout = setTimeout( () => {
                scrollToSection( projectSection )
            }, 900)
        }
        triggerContactSection.onclick = event => {
            event.preventDefault()
            _scrollTo( contactSection )
            setTimeout( () => {
                scrollToSection( contactSection )
            }, 900)
        }
    }

/* ----------------------------------------------------------------------------- */
// 
// 
// FOR SMALLER SCREEN DEVICES


    if ( isSmallScreen ) {
        trigerAboutSection.onclick = event => {
            event.preventDefault()
            gsap.to( window, { duration: 1, scrollTo: aboutSection})
        }
        triggerProjectsSection.onclick = event => {
            event.preventDefault()
            gsap.to( window, { duration: 0.5, scrollTo: projectSection})
        }
        triggerContactSection.onclick = event => {
            event.preventDefault()
            gsap.to( window, { duration: 1.2, scrollTo: contactSection})
        }

    }



/* ----------------------------------------------------------------------------- */
// INTRO SECTION ANIMATION

ScrollTrigger.create({
    trigger: '.intro--typo',
    start: "top center",
    onEnter: () => gsap.to('.intro--typo', {
        opacity: 1,
    })
})



/* ----------------------------------------------------------------------------- */
// SCROLL TO TOP  BUTTON ADD EVENT LISTENER

    scrollTopButton.onclick = event => {
        event.preventDefault()
        scrollToSection(0)
    }



/* ----------------------------------------------------------------------------- */
// ANIMATING NAVIGATION BURGER & ICONS ON SCROLL
// FOR BIGGER DEVICES


    // NAVICONS -- SOCIAL ICONS -- REDIRECT ON CLICK

    $.findAll('.navicon')[0].onclick = event => {
        event.preventDefault()
        openInNewTab("https://github.com/piotrekwrobel93")
    }
    $.findAll('.navicon')[1].onclick = event => {
        event.preventDefault()
        openInNewTab("https://gitlab.com/piotrekwrobel93")
    }
    $.findAll('.navicon')[2].onclick = event => {
        event.preventDefault()
        openInNewTab("https://linkedin.com/in/peter-sparrow")
    }

    if ( !isSmallScreen ) {

        let t1 = gsap.timeline({ duration: 0, delay: 0})
        let t2 = gsap.timeline({ duration: 0, delay: 0, ease: 'power2'})
    
        ScrollTrigger.create({
            trigger: sectionsArray[0],
            start: "top top",
            onEnter: self => {
                 t1.to(".burger-line", { backgroundColor: "#fff" })
                 activeMenuColor = "#fff"
            },
            onEnterBack: () =>  t1.to(".burger-line", { backgroundColor: "#fff"})
        })
        ScrollTrigger.create({
            trigger: sectionsArray[1],
            start: "-20px top",
            end: "+=10px",
            onEnter: self => {
                t1.to(".burger-line", { backgroundColor: "#000" })
                t2.to(".navicon", {fill: "#000" })
                activeMenuColor = "#000"
                setActiveMenuItem("projects")
            },
            onEnterBack: self => {
                t1.to(".burger-line", { backgroundColor: "#fff"})
                t2.to(".navicon", { fill: "#fff"})
                activeMenuColor = "#fff"
                setActiveMenuItem('home')
            }
        })
        ScrollTrigger.create({
            trigger: sectionsArray[2],
            start: "-35px top",
            end: "+=10px",
            onEnter: self =>  { 
                t1.to(".burger-line", { backgroundColor: "#fff"})
                t2.to(".navicon", {fill: "#fff" })
                activeMenuColor = "#fff"
                setActiveMenuItem('about')
            },
            onEnterBack: self => { 
                t1.to(".burger-line", { backgroundColor: "#000"})
                t2.to(".navicon", {fill: "#000" })
             }
        })
        ScrollTrigger.create({
            trigger: '.trigger--wave',
            start: "50px top",
            end: "+=10px",
            onEnter: self => t2.to(".navicon", { fill: "#fff"}),
            onEnterBack: self => t1.to(".navicon", { fill: "#000"})
        })
        ScrollTrigger.create({
            trigger: sectionsArray[3],
            start: "-30px top",
            end: "+=10px",
            onEnter: self => {
                t1.to(".burger-line", { backgroundColor: "#000"})
                t2.to(".navicon", { fill: "#000"})
                activeMenuColor = "#000"
                setActiveMenuItem('contact')
            },
            onLeaveBack: self => {
                t1.to(".burger-line", { backgroundColor: "#fff"})
                t2.to(".navicon", { fill: "#fff"})
                activeMenuColor = "#fff"
                setActiveMenuItem('about')
            }
        })
    }


    if ( isSmallScreen ) {
        ScrollTrigger.create({
            trigger: sectionsArray[3],
            start: "-30px top",
            onEnter: () => {
                scrollTopButton.style.visibility = "visible"                
            },
            onLeaveBack: () => [
                scrollTopButton.style.visibility = "hidden"
            ]
        })
    }

    
}


