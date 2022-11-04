const toastLoginSucess = () => {
    const body = document.querySelector("body")

    const container = document.createElement("div")
          container.classList.add("div-cont-sucess")
    const text = document.createElement("p")
          text.innerText = "Login feito com sucesso!"

    container.appendChild(text)
    body.appendChild(container)
}

const toastLoginFail = () => {
    const body = document.querySelector("body")

    const container = document.createElement("div")
          container.classList.add("div-cont-fail")
    const text = document.createElement("p")
          text.innerText = "Email ou senha inválidos"

    container.appendChild(text)
    body.appendChild(container)
}

const toastRegisterSucess = () => {
    const body = document.querySelector("body")

    const container = document.createElement("div")
          container.classList.add("div-cont-sucess")
    const text = document.createElement("p")
          text.innerText = "Criação do usuário bem sucedida"

    container.appendChild(text)
    body.appendChild(container)
}

const toastRegisterFail = () => {
    const body = document.querySelector("body")

    const container = document.createElement("div")
          container.classList.add("div-cont-fail")
    const text = document.createElement("p")
          text.innerText = "Falha na criação, certifique-se dos dados passados"

    container.appendChild(text)
    body.appendChild(container)
}

export {
    toastLoginSucess,
    toastLoginFail,
    toastRegisterSucess,
    toastRegisterFail
}