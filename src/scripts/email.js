import { $ } from './helpers.js'


_submit.onclick =  async event =>  {

    // PREVENT PAGE REFRESH
    event.preventDefault()

    // FIND NEEDED FORM DOM-NODES
    const _name = $.find("#_name").value
    const _email = $.find("#_email").value
    const _message = $.find("#_message").value
    const _error = $.find("#_error")
    
    // VALIDATE THE FORM INPUTS
    if ( _name.length < 3 ) {
        _error.innerText = "Name must be at least 3 characters long"
        return
    }
    if ( _email.length < 5 || _email.includes("@") === false  || _email.includes(".") === false ) {
        _error.innerText = "Not valid email adress"
        return
    }
    // CLEAR ERROR OUTPUT
    _error.innerText = ""
    
    // DATA TO BE SEND TO SERVER
    const data = { 
        name: _name,
        email: _email,
        message: _message
    }
    
    
    // RESET ON SUBMIT
    $.find("form").reset()
    
    // SENDING REQUEST TO SERVER TO HANDLE SENDMAIL FUNCTION  
    
    let response = await fetch('https://my-email-serverr.herokuapp.com/sendMail', {
        // SET-UP REQUEST
        method : "POST",
        headers:  {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify( data )
    })

    // GET RESPONSE FROM SERVER
    const res_data  = await response.json()
    // IN CASE OF SERVER NOT RESPONDING WITH STATUS 200 DISPLAY MESSAGE
    if (res_data.status === 'error') {
        alert("there was error sending your email. Try again later")
    }
    console.log(res_data)
    // DISPLAY CONFIRMATIONW MESSAGE
    gsap.to("#form--alert", { visibility: "visible", top: 0})
    setTimeout( () => {
        gsap.to("#form--alert",{ top: "-400px"})
    },4000)
    

}
