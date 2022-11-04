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
        window.location.replace("../register/register.html")
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
        window.location.replace("../register/register.html")
    }, 1000)
})

import { login } from "../scripts/requests.js"

const eventLogin = () => {
    const form = document.querySelector(".form")
    const elements = [...form.elements]
    
    form.addEventListener("submit", async (e) => {
        e.preventDefault()

        const body = {}

        elements.forEach((element) => {
            if(element.tagName == "INPUT" && element.value !== ""){
                body[element.id] = element.value
            }
        })

        await login(body)
    })
}
eventLogin()

const inputEmail = document.querySelector("#email")
const inputPassword = document.querySelector("#password")
const button = document.querySelector("#login")
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