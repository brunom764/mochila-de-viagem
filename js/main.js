const form = document.getElementById("novoItem") //form
const lista = document.getElementById("lista") // construir lista
const itens = JSON.parse(localStorage.getItem("itens")) || []

itens.forEach( (elemento) => {
    criaElemento(elemento)
} )

form.addEventListener("submit", (evento) => {
    evento.preventDefault()

    const nome = evento.target.elements['nome']
    const quantidade = evento.target.elements['quantidade']

    const existe = itens.find( elemento => elemento.nome === nome.value ) // ver se ele ja existe

    const itemAtual = {
        "nome": nome.value,
        "quantidade": quantidade.value
    }

    if (existe) {
        itemAtual.id = existe.id // o novo Sobreesvreve o conteudo do antigo
        
        atualizaElemento(itemAtual) // Se o nome existe, atualiza a quantidade dele

        itens[itens.findIndex(elemento => elemento.id === existe.id)] = itemAtual
    } else {                                                                   // Se nao existir,index0
        itemAtual.id = itens[itens.length -1] ? (itens[itens.length-1]).id + 1 : 0; // else,cria do zero

        criaElemento(itemAtual)

        itens.push(itemAtual)
    }

    localStorage.setItem("itens", JSON.stringify(itens)) // armazenar

    nome.value = "" // limpar form
    quantidade.value = ""
})

function criaElemento(item) {
    const novoItem = document.createElement("li")
    novoItem.classList.add("item")

    const numeroItem = document.createElement("strong")
    numeroItem.innerHTML = item.quantidade
    numeroItem.dataset.id = item.id
    novoItem.appendChild(numeroItem)
    
    novoItem.innerHTML += item.nome

    novoItem.appendChild(botaoDeleta(item.id)) // Botar o botao

    lista.appendChild(novoItem)
}

function atualizaElemento(item) { // Substitui a quantidade, sem somar
    document.querySelector("[data-id='"+item.id+"']").innerHTML = item.quantidade
}

function botaoDeleta(id) { // apagar na dom
    const elementoBotao = document.createElement("button")
    elementoBotao.innerText = "X"

    elementoBotao.addEventListener("click", function() {
        deletaElemento(this.parentNode, id)
    })

    return elementoBotao
}

function deletaElemento(tag, id) { // apagar na api
    tag.remove()

    itens.splice(itens.findIndex(elemento => elemento.id === id), 1) // Splice -> remove item de array pelo indice, procura o elemento que foi igual ao X clicado e remove

    localStorage.setItem("itens", JSON.stringify(itens)) // remover na api
}