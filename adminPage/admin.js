import { getLocalStorage, getUserLocalStorage } from "../scripts/localStorage.js";
import { deleteUserModal, editUserModal, createDepartmentModal } from "../scripts/modal.js";
import { listCompanies, allUsers, listDepartments } from "../scripts/requests.js";


const verifyPermission = () => {
    const user = getLocalStorage()
    const userLS = getUserLocalStorage()

    if(user == "" && userLS == ""){
        window.location.replace("../../home.html")
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

const renderCompanys = async () => {

    const select = document.querySelector(".select-company")
    const companys = await listCompanies()
    companys.forEach((company) => {
        const option = document.createElement("option")
              option.innerText = company.name
        select.appendChild(option)
    })  
}
renderCompanys()

const renderAllUsers = async () => {

    const ulList = document.querySelector(".ul-departments-2")
    const departments = await listDepartments()
    const users = await allUsers()
    users.forEach((user) => {
        const li = document.createElement("li")
              li.classList.add("card-users")
        const name = document.createElement("h3")
              name.innerText = user.username
        const pl = document.createElement("p")

        if(user.professional_level == null){
            pl.innerText = "Não possui experiência"
        }else{
            pl.innerText = user.professional_level
        }
        const span = document.createElement("span")

        const listDep = departments.find(department => department.uuid == user.department_uuid)
       
        if(listDep){
            span.innerText = listDep.companies.name
        }else {
            span.innerText = "Não foi contratado"
        }

        const divImg = document.createElement("div")
              divImg.classList.add("div-img")
        const imgEdit = document.createElement("img")
              imgEdit.classList.add("edit-user-modal")
              imgEdit.src = "../src/img/edit.png"
              imgEdit.addEventListener("click", () => {
                const background = document.querySelector(".modal-wrapper")
                      background.classList.remove("d-none")
                      editUserModal(user.username, user.email, user.uuid)
              })
        const imgTrash = document.createElement("img")
              imgTrash.classList.add("img-trash-modal")
              imgTrash.src = "../src/img/trash.png"
              imgTrash.addEventListener("click", () => {
                const background = document.querySelector(".modal-wrapper")
                      background.classList.remove("d-none")
                      deleteUserModal(user.uuid, user.username)
              })

        divImg.append(imgEdit, imgTrash)
        li.append(name, pl, span, divImg)
        ulList.append(li)
    })
}
renderAllUsers()

export {
    renderAllUsers,
    renderDepartments
}

const departments = await listDepartments()

const renderDepartments = async (departments) => {

    const ulList = document.querySelector(".ul-departments")
          departments.forEach((department) => {
            const li = document.createElement("li")
                  li.classList.add("card-department")
            const h3 = document.createElement("h3")
                  h3.innerText = department.name
            const p = document.createElement("p")
                  p.innerText = department.description
            const span = document.createElement("span")
                  span.innerText = department.companies.name
            const divImg = document.createElement("div")
                  divImg.classList.add("div-img")

            li.append(h3, p, span, divImg)
            ulList.append(li)
          })
}
renderDepartments(departments)

const selectOptions = async () => {

    const select = document.querySelector(".select-company")
    const ulList = document.querySelector(".ul-departments")
    const departments = await listDepartments()
    select.addEventListener("change", async (event) => {
        ulList.innerHTML = ""
        if(event.target.value == "Selecionar Empresa"){
            renderDepartments(departments)
        }
        const listFilter = departments.filter(department => department.companies.name == event.target.value)
        renderDepartments(listFilter)   
    })
}
selectOptions()

const formCreateDep = document.querySelector(".form-button-create")

const companies = await listCompanies()

      formCreateDep.addEventListener("click", () => {
        createDepartmentModal()
        companies.forEach((company) => {
            departments.forEach((department) => {
                const background = document.querySelector(".modal-wrapper")
                background.classList.remove("d-none")
                createDepartmentModal(department.name, department.description, company.uuid)
            })
        })
    })