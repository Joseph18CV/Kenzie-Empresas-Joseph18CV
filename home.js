import { listCompanies, listSectorCompanies, listSectors } from "./scripts/requests.js"

const divButtons = document.querySelector(".div-buttons")
const buttonLogin = document.querySelector(".login")
const buttonRegister = document.querySelector(".register")

const imgDropdown = document.querySelector(".button-dropdown")

imgDropdown.addEventListener("click", () => {   
    divButtons.classList.toggle("margin-top-normal")
    buttonLogin.classList.toggle("margin-top-normal")
    buttonRegister.classList.toggle("margin-top-normal")
    if(divButtons.classList.contains("margin-top-normal")){
        setTimeout(() => {
            imgDropdown.src = "./src/img/close.png"
            imgDropdown.style.width = "31px"
            imgDropdown.style.height = "31px"
            buttonLogin.style.display = "block"
            buttonRegister.style.display = "block"
        }, 100)
    }else{
        setTimeout(() => {
            imgDropdown.src = "./src/img/button-dropdown.png" 
            imgDropdown.style.width = "23.25px"
            imgDropdown.style.height = "15.5px"
            buttonLogin.style.display = "none"
            buttonRegister.style.display = "none"
        }, 400)
    }

})

const ulList = document.querySelector(".listCompanies")

const renderCompanies = async () => {

    const companies = await listCompanies()

    ulList.innerHTML = ""
    companies.forEach((element) => { 
        const li = document.createElement("li")
              li.classList.add("card")
        const name = document.createElement("h2")
              name.innerText = element.name
        const span = document.createElement("span")
              span.innerText = element.opening_hours
        const p = document.createElement("p")
              p.innerText = element.sectors.description

            li.append(name, span, p)
            ulList.appendChild(li)
    })
}
renderCompanies()

const renderSectorCompanies = async (sector) => {

    const sectorCompanies = await listSectorCompanies(sector)

    ulList.innerHTML = ""
    sectorCompanies.forEach((element) => {
         
        if(sectorCompanies == element.sectors.description){
        const li = document.createElement("li")
              li.classList.add("card")
        const name = document.createElement("h2")
              name.innerText = element.name
        const span = document.createElement("span")
              span.innerText = element.opening_hours
        const p = document.createElement("p")
              p.innerText = element.sectors.description

            li.append(name, span, p)
            ulList.appendChild(li)
        }else{
            const li = document.createElement("li")
              li.classList.add("card")
            const name = document.createElement("h2")
              name.innerText = element.name
            const span = document.createElement("span")
              span.innerText = element.opening_hours
            const p = document.createElement("p")
              p.innerText = element.sectors.description

            li.append(name, span, p)
            ulList.appendChild(li)
        }
    })
}

const renderOptions = async () => {
    
    const select = document.querySelector(".select-home")
    const sectors = await listSectors()
    sectors.forEach((sector) => {
        const option = document.createElement("option")
              option.innerText = sector.description
              option.innerText = sector.description
        select.appendChild(option)
    })
}
renderOptions()

const selectOptions = async () => {

    const select = document.querySelector(".select-home")

    const companies = await listCompanies()
    companies.forEach((element) => {
        select.addEventListener("change", (event) => {
            ulList.innerHTML = ""
            if(event.target.value == "Selecionar Setor"){
                ulList.innerHTML = ""
                renderCompanies()
            }
            if(event.target.value == element.sectors.description){
                ulList.innerHTML = ""
                renderSectorCompanies(element.sectors.description)
            }
        })
    })
}
selectOptions()

buttonRegister.addEventListener("click", () => {
    setTimeout(() => {
        window.location.replace("../../register/register.html")
    }, 1000)
})

buttonLogin.addEventListener("click", () => {
    setTimeout(() => {
        window.location.replace("../../login/login.html")
    }, 1000)
})

const buttonLogin2 = document.querySelector(".login2")
const buttonRegister2 = document.querySelector(".register2")

buttonRegister2.addEventListener("click", () => {
    setTimeout(() => {
        window.location.replace("../../register/register.html")
    }, 1000)
})

buttonLogin2.addEventListener("click", () => {
    setTimeout(() => {
        window.location.replace("../../login/login.html")
    }, 1000)
})
