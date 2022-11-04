const divButtons = document.querySelector(".div-buttons")
const buttonLogin = document.querySelector(".login")
const buttonRegister = document.querySelector(".register")

buttonRegister.addEventListener("click", () => {
    setTimeout(() => {
        window.location.replace("../home.html")
    }, 1000)
})

buttonLogin.addEventListener("click", () => {
    setTimeout(() => {
        window.location.replace("../login/login.html")
    }, 1000)
})

const imgDropdown = document.querySelector(".button-dropdown")

imgDropdown.addEventListener("click", () => {   
    divButtons.classList.toggle("margin-top-normal")
    buttonLogin.classList.toggle("margin-top-normal")
    buttonRegister.classList.toggle("margin-top-normal")
    if(divButtons.classList.contains("margin-top-normal")){
        setTimeout(() => {
            imgDropdown.src = "../src/img/close.png"
            imgDropdown.style.width = "31px"
            imgDropdown.style.height = "31px"
            buttonLogin.style.display = "block"
            buttonRegister.style.display = "block"
        }, 100)
    }else{
        setTimeout(() => {
            imgDropdown.src = "../src/img/button-dropdown.png" 
            imgDropdown.style.width = "23.25px"
            imgDropdown.style.height = "15.5px"
            buttonLogin.style.display = "none"
            buttonRegister.style.display = "none"
        }, 500)
    }

})

const buttonLogin2 = document.querySelector(".login2")
const buttonRegister2 = document.querySelector(".register2")

buttonRegister2.addEventListener("click", () => {
    setTimeout(() => {
        window.location.replace("../home.html")
    }, 1000)
})

buttonLogin2.addEventListener("click", () => {
    setTimeout(() => {
        window.location.replace("../login/login.html")
    }, 1000)
})

import { register } from "../scripts/requests.js"

const eventRegister = () => {

    const select = document.querySelector("#professional_level")
    const inputUsername = document.querySelector("#username")
    const inputEmail= document.querySelector("#email")
    const inputPassword= document.querySelector("#password")
    const buttonSubmit = document.querySelector("#button-register")

    buttonSubmit.addEventListener("click", async (e) => {

        e.preventDefault()
        
        const body = {
            username: inputUsername.value,
            email: inputEmail.value,
            password: inputPassword.value,
            professional_level: select.value
        }

        await register(body)
    })
}
eventRegister()

const inputEmail = document.querySelector("#email")
const inputPassword = document.querySelector("#password")
const inputUsername = document.querySelector("#username")
const selectPF = document.querySelector("#professional_level")
const button = document.querySelector("#button-register")
button.setAttribute("disabled", "disabled")

inputEmail.addEventListener("keyup", (event) => {
    if(event.target.value.length > 0){
        inputEmail.style.color = "var(--color-black)"
        button.removeAttribute("disabled")
    }else{
        inputEmail.style.color = ""
        button.setAttribute("disabled", "disabled")
    }
})

inputPassword.addEventListener("keyup", (event) => {
    if(event.target.value.length > 0){
        inputPassword.style.color = "var(--color-black)"
        button.removeAttribute("disabled")
    }else{
        inputPassword.style.color = ""
        button.setAttribute("disabled", "disabled")
    }
})

inputUsername.addEventListener("keyup", (event) => {
    if(event.target.value.length > 0){
        inputUsername.style.color = "var(--color-black)"
        button.removeAttribute("disabled")
    }else{
        inputUsername.style.color = ""
        button.setAttribute("disabled", "disabled")
    }
})


selectPF.addEventListener("change", (event) => {
    if(event.target.value.length > 0){
        selectPF.style.color = "var(--color-black)"
        button.removeAttribute("disabled")
    }else{
        selectPF.style.color = ""
        button.setAttribute("disabled", "disabled")
    }
})


