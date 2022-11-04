import { editPost, editUser, listCompanies } from "./requests.js";
import { infoUser } from "../userPage/user.js"
import { renderAllUsers, renderDepartments } from "../adminPage/admin.js"
import { deleteUser } from "./requests.js"
import { createDepartment } from "./requests.js"

function editPostModal () {
    const background = document.querySelector(".modal-wrapper")
    const divModal = document.createElement("div")
          divModal.classList.add("div-modal")
    const modalClose = document.createElement("span")
          modalClose.innerText = "X"
          modalClose.addEventListener("click", (e) => {
            const eventClose = e.target.parentNode
                  eventClose.remove()
                  background.classList.add("d-none")
          })
    const title = document.createElement("h2")
          title.innerText = "Editar Perfil"
    const formEdit = document.createElement("form")
          formEdit.classList.add("form-edit")
    const inputName = document.createElement("input")
          inputName.type = "text"
          inputName.placeholder = "Seu nome"
          inputName.autocomplete = "off"
    const inputEmail = document.createElement("input")
          inputEmail.type = "email"
          inputEmail.placeholder = "Seu e-mail"
          inputEmail.autocomplete = "off"
    const inputPassword = document.createElement("input")
          inputPassword.type = "password"
          inputPassword.placeholder = "Sua senha"
          inputPassword.autocomplete = "off"
    const buttonEdit = document.createElement("button")
          buttonEdit.classList.add("button-edit-modal")
          buttonEdit.type = "submit"
          buttonEdit.innerText = "Editar Perfil"
          buttonEdit.addEventListener("click", async (e) => {
            e.preventDefault()
                await editPost(inputName.value, inputPassword.value, inputEmail.value)
                const divTitle = document.querySelector(".div-title")
                      divTitle.innerHTML = ""
                await infoUser()
                const eventClose = e.target.parentNode
                      eventClose.remove()
                      background.classList.add("d-none")
          })

    formEdit.append(inputName, inputEmail, inputPassword, buttonEdit)
    divModal.append(title, formEdit, modalClose)
    background.appendChild(divModal)
}
 
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
                      background.classList.add("d-none")
            })

            divModalDelete.append(modalClose, titleDivDelete, buttonDelete)
            background.append(divModalDelete)
}

async function createDepartmentModal (name, description, company_uuid) {

      const companies = await listCompanies()
      const background = document.querySelector(".modal-wrapper")
      companies.forEach((company) => {
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
            selectCompany.classList.add("select-company")
      const optionSelect = document.createElement("option")
            optionSelect.innerText = company.name
            optionSelect.value = company.name
      selectCompany.addEventListener("change", (e) => {
            if(e.target.value == optionSelect.value){
                  e.target.value = selectCompany.value
            }
      const buttonCreate = document.createElement("button")
            buttonCreate.type = "submit"
            buttonCreate.classList.add("button-create-dep")
            buttonCreate.addEventListener("click", async (e) => {
                  e.preventDefault()

                  createDepartment(inputName.value, inputDesc.value, selectCompany.value)
                  const ulList = document.querySelector(".ul-departments")
                        ulList.innerHTML = ""
                  await renderDepartments()
                  const eventClose = e.target.parentNode
                        eventClose.remove()
                        background.classList.add("d-none")
            })
            selectCompany.appendChild(optionSelect)
            formEdit.append(inputName, inputDesc, selectCompany, buttonCreate)
            divModalCreate.append(titleCreate, formEdit, modalClose)
            background.appendChild(divModalCreate)
      })
   })
}

export {
    editPostModal,
    editUserModal,
    deleteUserModal,
    createDepartmentModal
}