//referenciar os elementos html
const form = document.getElementById("form")
const pNome = document.getElementById("pNome")
const uNome = document.getElementById("uNome")
const email = document.getElementById("email")
const endereco = document.getElementById("endereco")
const cep = document.getElementById("cep")



form.addEventListener("submit", (event) => {
    event.preventDefault()
    validarForm(pNome, uNome, email, cep)
})

function validarForm(pn, un, em, cep) {
    validarPNome(pn)
    validarUNome(un)
    validarEmail(em)
    validarCep(cep)
}

function validarPNome(pnTxt) {
    let pnomeValor = pnTxt.value
    let pNomeInvalidFeedback = document.getElementById("pNomeInvalid")

    if (pnomeValor === "" || pnomeValor == null) {
        informarCampoObrigatorio(pNomeInvalidFeedback)
    } else if (validarTexto(pnomeValor) == false) {
        informarFormatoInvalido(pNomeInvalidFeedback)
    } else {
        removerMsg(pNomeInvalidFeedback)
        pnTxt.className = "form-control is-valid"
    }
}

function validarUNome(unTxt) {
    let unomeValor = unTxt.value
    let uNomeInvalidFeedback = document.getElementById("uNomeInvalid")

    if (unomeValor === "" || unomeValor == null) {
        informarCampoObrigatorio(uNomeInvalidFeedback)
    } else if (validarTexto(unomeValor) == false) {
        informarFormatoInvalido(uNomeInvalidFeedback)
    } else {
        removerMsg(uNomeInvalidFeedback)
        unTxt.className = "form-control is-valid"
    }
}

function validarEmail(emTxt) {
    let emailValor = emTxt.value
    let emailInvalidFeedback = document.getElementById("emailInvalid")

    if (emailValor === "" || emailValor == null) {
        informarCampoObrigatorio(emailInvalidFeedback)
    } else if (validarFormatoEmail(emailValor) == false) {
        informarFormatoInvalido(emailInvalidFeedback)
    } else {
        removerMsg(emailInvalidFeedback)
        emTxt.className = "form-control is-valid"
    }
}

function validarCep(cepTxt) {
    let cepValor = cepTxt.value.replace(".", "").replace("-", "")
    let cepInvalidFeedback = document.getElementById("cepInvalid")

    if (cepValor === "" || cepValor.cValor != null) {
        informarCampoObrigatorio(cepInvalidFeedback)
    } else if (validarFormatoCep(cepValor) == false) {
        informarFormatoInvalido(cepInvalidFeedback)
    } else {
        removerMsg(cepInvalidFeedback)
        recuperarEndereco(cepValor)
        cepTxt.className = "form-control is-valid"
    }
}

function informarCampoObrigatorio(txt) {
    txt.style.display = "block"
}

function informarFormatoInvalido(txt) {
    txt.innerHTML = "Formato inválido"
    txt.style.display = "block"
}

function removerMsg(txt) {
    txt.style.display = "none"
}

function validarTexto(txt) {
    let re = /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/
    return re.test(txt)
}

function validarFormatoEmail(txt) {
    let re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gi
    return re.test(txt)
}

function validarFormatoCep(txt) {
    let re = /^[0-9]{8}$/
    return re.test(txt)
}

function recuperarEndereco(txt) {
    let url = "https://viacep.com.br/ws/" + txt + "/json/"

    fetch(url).then(res => {
        return res.json()
    }).then(saida => {
        endereco.value = saida.logradouro
    })
}