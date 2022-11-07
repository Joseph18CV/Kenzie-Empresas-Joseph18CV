import { editUser, listCompanies, listDepartments, deleteDepartment, editDepartment } from "./requests.js";
import { renderAllUsers, renderDepartments } from "../adminPage/admin.js"
import { deleteUser } from "./requests.js"
import { createDepartment, listUsersNotDepartment, hireUser, dismissUser, allUsers } from "./requests.js"

async function editUserModal (kind_of_work, professional_level, id) {

    const background = document.querySelector(".modal-wrapper")
    const divModal = document.createElement("div")
          divModal.classList.add("div-modal-edit-user")
    const modalClose = document.createElement("span")
          modalClose.innerText = "X"
          modalClose.addEventListener("click", (e) => {
            const eventClose = e.target.parentNode
                  eventClose.remove()
                  background.classList.add("d-none")
            })
    const title = document.createElement("h2")
          title.innerText = "Editar Usuário"
    const formEdit = document.createElement("form")
          formEdit.classList.add("form-edit")
    const select1 = document.createElement("select")
          select1.classList.add("select1-modal")
    const option = document.createElement("option")
          option.innerText = "Selecionar modalidade de trabalho"
    const options1u1 = document.createElement("option")
          options1u1.innerText = "home office"
    const options1u2 = document.createElement("option")
          options1u2.innerText = "presencial"
    const options1u3 = document.createElement("option")
          options1u3.innerText = "hibrido"

    const select2 = document.createElement("select")
          select2.classList.add("select1-modal")
    const option2 = document.createElement("option")
          option2.innerText = "Selecionar nível profissional"
    const options2u1 = document.createElement("option")
          options2u1.innerText = "estágio"
    const options2u2 = document.createElement("option")
          options2u2.innerText = "júnior"
    const options2u3 = document.createElement("option")
          options2u3.innerText = "pleno"
    const options2u4 = document.createElement("option")
          options2u4.innerText = "sênior"
    const buttonEdit = document.createElement("button")

    select1.addEventListener("change", (e) => {
        if(e.target.value == options1u1.innerText || e.target.value == options1u2.innerText || e.target.value == options1u3.innerText){
            e.target.value = select1.value
        }
    })
    select2.addEventListener("change", (e) => {
      if(e.target.value == options2u1.innerText || e.target.value == options2u2.innerText || e.target.value == options2u3.innerText || e.target.value == options2u4.innerText){
            e.target.value = select2.value
        }
    })
          buttonEdit.classList.add("button-edit-modal")
          buttonEdit.type = "submit"
          buttonEdit.innerText = "Editar"
          buttonEdit.addEventListener("click", async (e) => {
            e.preventDefault()

                await editUser(select1.value, select2.value, id)
                const ulList = document.querySelector(".ul-departments-2")
                      ulList.innerHTML = ""
                await renderAllUsers()
                const eventClose = e.target.parentNode
                      eventClose.remove()
                      divModal.remove()
                      background.classList.add("d-none")
          })

        select1.append(option, options1u1, options1u2, options1u3)
        select2.append(option2, options2u1, options2u2, options2u3, options2u4)
        formEdit.append(select1, select2, buttonEdit)
        divModal.append(title, formEdit, modalClose)
        background.appendChild(divModal)
}

async function deleteUserModal (id, username) {

      const background = document.querySelector(".modal-wrapper")
      const divModalDelete = document.createElement("div")
            divModalDelete.classList.add("div-modal-delete")
      const modalClose = document.createElement("span")
            modalClose.innerText = "X"
            modalClose.addEventListener("click", (e) => {
              const eventClose = e.target.parentNode
                    eventClose.remove()
                    background.classList.add("d-none")
              })
      const titleDivDelete = document.createElement("h2")
            titleDivDelete.innerText = `Realmente deseja remover o usuário ${username}?`
      const buttonDelete = document.createElement("button")
            buttonDelete.type = "submit"
            buttonDelete.innerText = "Deletar"
            buttonDelete.classList.add("button-delete")
            buttonDelete.addEventListener("click", async (e) => {
                  e.preventDefault()

                  deleteUser(id, username)
                  const ulList = document.querySelector(".ul-departments-2")
                        ulList.innerHTML = ""
                  renderAllUsers()
                  const eventClose = e.target.parentNode
                      eventClose.remove()
                      divModalDelete.remove()
                      background.classList.add("d-none")
            })

            divModalDelete.append(modalClose, titleDivDelete, buttonDelete)
            background.append(divModalDelete)
}

async function createDepartmentModal (name, description, company_uuid) {      

      const companies = await listCompanies()
      const background = document.querySelector(".modal-wrapper")

      const divModalCreate = document.createElement("div")
            divModalCreate.classList.add("div-modal-create")

      const modalClose = document.createElement("span")
            modalClose.innerText = "X"
            modalClose.addEventListener("click", (e) => {
              const eventClose = e.target.parentNode
                    eventClose.remove()
                    background.classList.add("d-none")
              })
      
      const titleCreate = document.createElement("h2")
            titleCreate.innerText = "Criar departamento"

      const formEdit = document.createElement("form")
            formEdit.classList.add("form-create")
      const inputName = document.createElement("input")
            inputName.type = "text"
            inputName.placeholder = "Nome do departamento"
            inputName.autocomplete = "off"
      const inputDesc = document.createElement("input")
            inputDesc.type = "text"
            inputDesc.placeholder = "Descrição"
            inputDesc.autocomplete = "off"

      const selectCompany = document.createElement("select")
            selectCompany.classList.add("select-company-2")
            const option1 = document.createElement("option")
                  option1.innerText = "Selecionar Empresa"
            selectCompany.append(option1)

            companies.forEach((company) => {
                  const optionSelect = document.createElement("option")
                  optionSelect.innerText = company.name
                  optionSelect.value = company.name
                  selectCompany.appendChild(optionSelect)

                  selectCompany.addEventListener("change", (event) => {
                        if(event.target.value == optionSelect.value){
                              event.target.value = selectCompany.value
                        }
                  })
            })
      const buttonCreate = document.createElement("button")
            buttonCreate.innerText = "Criar departamento"
            buttonCreate.type = "submit"
            buttonCreate.classList.add("button-create-modal")
            buttonCreate.addEventListener("click", async (e) => {
                  e.preventDefault()
                        
                  companies.forEach((company) => {
                        if(company.name == selectCompany.value){
                              createDepartment(inputName.value, inputDesc.value, company.uuid)
                        }
                  })
                  const ulList = document.querySelector(".ul-departments")
                        ulList.innerHTML = ""

                  const departments = await listDepartments()
                  await renderDepartments(departments)
                  const eventClose = e.target.parentNode
                        eventClose.remove()
                        divModalCreate.remove()
                        background.classList.add("d-none")
                        location.reload()
            })

            formEdit.append(inputName, inputDesc, selectCompany, buttonCreate)
            divModalCreate.append(titleCreate, formEdit, modalClose)
            background.appendChild(divModalCreate)
}

async function deleteDepartmentModal (id, name) {

      const background = document.querySelector(".modal-wrapper")
      const divModalDelete = document.createElement("div")
            divModalDelete.classList.add("div-modal-delete")
      const modalClose = document.createElement("span")
            modalClose.innerText = "X"
            modalClose.addEventListener("click", (e) => {
              const eventClose = e.target.parentNode
                    eventClose.remove()
                    divModalDelete.remove()
                    background.classList.add("d-none")
              })
      const titleDivDelete = document.createElement("h2")
            titleDivDelete.classList.add("title-delete-dep-modal")
            titleDivDelete.innerText = `Realmente deseja deletar o Departamento ${name} e demitir seus funcionários?`
      const buttonDelete = document.createElement("button")
            buttonDelete.type = "submit"
            buttonDelete.innerText = "Confirmar"
            buttonDelete.classList.add("button-delete")
            buttonDelete.addEventListener("click", async (e) => {
                  e.preventDefault()

                  const ulList = document.querySelector(".ul-departments")
                        ulList.innerHTML = ""
                        deleteDepartment(id, name)   
                  const eventClose = e.target.parentNode
                  const departments = await listDepartments()
                  await renderDepartments(departments)
                      eventClose.remove()
                      divModalDelete.remove()
                      background.classList.add("d-none")
                      location.reload()
            })

            divModalDelete.append(modalClose, titleDivDelete, buttonDelete)
            background.append(divModalDelete)
}

async function editDepartmentModal (id, description) {

      const background = document.querySelector(".modal-wrapper")
      const divModalEdit = document.createElement("div")
            divModalEdit.classList.add("div-modal-edit")
      const titleEditModal = document.createElement("h2")
            titleEditModal.innerText = "Editar Departamento"
      const modalClose = document.createElement("span")
            modalClose.innerText = "X"
            modalClose.addEventListener("click", (e) => {
              const eventClose = e.target.parentNode
                    eventClose.remove()
                    divModalEdit.remove()
                    background.classList.add("d-none")
              })
      const textarea = document.createElement("textarea") 
            textarea.innerText = description

      const buttonEditDep = document.createElement("button")
            buttonEditDep.type = "submit"
            buttonEditDep.innerText = "Editar Departamento"
            buttonEditDep.classList.add("button-edit-dep-modal")
            buttonEditDep.addEventListener("click", async (e) => {
                  e.preventDefault()

                  editDepartment(textarea.value, id)
                  const ulList = document.querySelector(".ul-departments")
                        ulList.innerHTML = ""
                        const departments = await listDepartments()
                        await renderDepartments(departments)
                  const eventClose = e.target.parentNode
                        eventClose.remove()
                        divModalEdit.remove()
                        background.classList.add("d-none")
                        location.reload()  
            })
      
            divModalEdit.append(modalClose, titleEditModal, textarea, buttonEditDep)
            background.append(divModalEdit)
}

async function modalEyeDepartment (name, description, company, departmentUuid) {

      const usersND = await listUsersNotDepartment()

      const background = document.querySelector(".modal-wrapper")

      const divModalEye = document.createElement("div")
            divModalEye.classList.add("div-modal-eye")

      const divDescAndSelect = document.createElement("div")
            divDescAndSelect.classList.add("div-desc-and-select")

      const divCompanyAndHire = document.createElement("div")
            divCompanyAndHire.classList.add("div-company-and-hire")

      const modalClose = document.createElement("span")
            modalClose.innerText = "X"
            modalClose.addEventListener("click", (e) => {
              const eventClose = e.target.parentNode
                    eventClose.remove()
                    divModalEye.remove()
                    background.classList.add("d-none")
              })
      
            const nameDep = document.createElement("h2")
                  nameDep.innerText = name
            const descDep = document.createElement("p")
                  descDep.innerText = description
            const companyDep = document.createElement("span")
                  companyDep.innerText = company
            const selectUserNotDep = document.createElement("select")
            const option1 = document.createElement("option")
                  option1.innerText = "Selecionar usuário"
                  selectUserNotDep.appendChild(option1)
            usersND.forEach((userND) => {
                  const optionUserND = document.createElement("option")
                        optionUserND.value = userND.uuid
                        optionUserND.innerText = userND.username
                  selectUserNotDep.append(optionUserND)
                  selectUserNotDep.addEventListener("change", (e) => {
                        if(e.target.value == optionUserND.innerText){
                              optionUserND.value = selectUserNotDep.value
                        }
                  })
            })
            const buttonHire = document.createElement("button")
                  buttonHire.type = "button"
                  buttonHire.innerText = "Contratar"
                  buttonHire.addEventListener("click", async (e) => {
                        await hireUser(selectUserNotDep.value, departmentUuid)
                        location.reload()
                  })
      
      const ulUsersDep = document.createElement("ul")
            ulUsersDep.classList.add("ul-users-dep")
      const allUsersDep = await allUsers()
            allUsersDep.forEach((userDep) => {
                  if(userDep.department_uuid == departmentUuid){
                        const liCard = document.createElement("li")
                              liCard.classList.add("cardLiDep")
                        const name = document.createElement("h3")
                              name.innerText = userDep.username
                        const nivel = document.createElement("p")
                              nivel.innerText = userDep.professional_level
                        const nameCompany = document.createElement("span")
                              nameCompany.innerText = company
                        const buttonDismiss = document.createElement("button")   
                              buttonDismiss.type = "submit"
                              buttonDismiss.innerText = "Desligar"
                              buttonDismiss.addEventListener("click", async (e) => {
                                    await dismissUser(userDep.uuid)
                                    location.reload()
                              })
                        liCard.append(name, nivel, nameCompany, buttonDismiss)
                        ulUsersDep.appendChild(liCard )
                  }
            })

      divDescAndSelect.append(descDep, selectUserNotDep)
      divCompanyAndHire.append(companyDep, buttonHire)
      divModalEye.append(modalClose, nameDep, divDescAndSelect, divCompanyAndHire, ulUsersDep)
      background.appendChild(divModalEye)
}

export {
    editUserModal,
    deleteUserModal,
    createDepartmentModal,
    deleteDepartmentModal,
    editDepartmentModal,
    modalEyeDepartment
}