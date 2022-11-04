import { getLocalStorage, getUserLocalStorage } from "../scripts/localStorage.js";
import { getUser, listDepartmentCompanyUser, listUsersDepartment } from "../scripts/requests.js";
import { editPostModal } from "../scripts/modal.js";

const verifyPermission = () => {
    const user = getLocalStorage()
    const userLS = getUserLocalStorage()

    if(user == "" && userLS == ""){
        window.location.replace("../login/login.html")
    }
}
verifyPermission()

const buttonLogOut = document.querySelector(".logOut")

buttonLogOut.addEventListener("click", () => {
    localStorage.removeItem("user")
    localStorage.removeItem("userInfo")
    setTimeout(function(){
        window.location.replace("../../home.html")
    }, 500)
})  

const infoUser = async () => {

    const localStorage = getUserLocalStorage()
    const user = await getUser()
   
    const divTitle = document.querySelector(".div-title")
    const div = document.createElement("div")
          div.classList.add("title")
    const div2 = document.createElement("div")
          div2.classList.add("title2")
    const h2 = document.createElement("h2")
          h2.innerText = user.username
    const p = document.createElement("p")
          p.innerText = user.email
    const pl = document.createElement("p")
    if(localStorage.professional_level == null){
        pl.innerText = "Não possui experiência"
    }else{
        pl.innerText = localStorage.professional_level
    }
    const kOfW = document.createElement("p")
    if(localStorage.kind_of_work == null){
        kOfW.innerText = "Não possui trabalho"
    }else{
        kOfW.innerText = localStorage.kind_of_work
    }
    const img = document.createElement("img")
          img.src = "../src/img/edit.png"
          img.addEventListener("click", () => {
            const background = document.querySelector(".modal-wrapper")
                  background.classList.remove("d-none")
                  editPostModal(user.username, user.email)
          })

    div2.append(h2, p)
    div.append(div2, pl, kOfW)
    divTitle.append(div, img)
}
infoUser()

const CompanyAndDepartmentName = async () => {

    const listCandDUser = await listDepartmentCompanyUser()
    const user = await getUser()

    const divCaD = document.querySelector(".company-and-department-title")
    const companyName = document.createElement("p")
          companyName.innerText = listCandDUser.name
    const spanSep = document.createElement("span")
          spanSep.classList.add("span-sep")
          spanSep.innerText = "-"
    const departmentName = document.createElement("p")
    listCandDUser.departments.forEach((department) => {
        if(department.uuid == user.department_uuid){
            departmentName.innerText = department.name
        }
    })
    divCaD.append(companyName, spanSep, departmentName)
}

const usersCompany = async () => {

    const usersDepartment = await listUsersDepartment()
    const ulListUsers = document.querySelector(".list-users")
    usersDepartment.forEach((user) => {
        user.users.forEach((element) => {
            const liUsers = document.createElement("li")
                  liUsers.classList.add("card")
            const name = document.createElement("p")
            const level = document.createElement("span")
            name.innerText = element.username
            if(element.professional_level == null){
                level.innerText = "Não possui experiência"
            }else{
                level.innerText = element.professional_level 
            }
            liUsers.append(name, level)
            ulListUsers.appendChild(liUsers)
        })
    })
}

const hired = async () => {

    const ulList = document.querySelector(".list-users")
    const divCaD = document.querySelector(".company-and-department-title")
    const main = document.querySelector(".container")
    const localStorage = getUserLocalStorage()
    const divContainer = document.createElement("div")
          divContainer.classList.add("div-container")
    const text = document.createElement("p")
          text.innerText = "Você ainda não foi contratado"
    divContainer.appendChild(text)
    if(localStorage.department_uuid == null){
        ulList.style.display = "none"
        divCaD.style.display = "none"
        main.appendChild(divContainer)
    }else{
        await CompanyAndDepartmentName()
        await usersCompany()
    }
}
hired()

export {
    infoUser
}