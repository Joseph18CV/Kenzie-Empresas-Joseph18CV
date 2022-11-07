import { infoUser } from "../userPage/user.js"
import { editPost } from "./requests.js"

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

export {
    editPostModal
}