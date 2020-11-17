class Cliente {
    constructor(){
        this.clientes = localStorage.getItem('tbClientes') == null
        ? []
        : JSON.parse(localStorage.getItem('tbClientes'))
    }
    salva(cliente){
        if(document.getElementById('codigo').getAttribute('disabled') == 'disabled'){
            this.apaga(cliente.codigo)
        }
        this.clientes.push(cliente) // PUSH = adiciona o novo registro no final do array
        localStorage.setItem('tbClientes', JSON.stringify(this.clientes))
        alert('Cliente salvo com sucesso!')
    }
    apaga(codigo){
        let index = this.clientes.findIndex(cliente => cliente.codigo == codigo)
        // lo Parâmetro é o índice do array e o 2° é o nr de itens envolvidos
        this.clientes.splice(index, 1)
        localStorage.setItem('tbClientes', JSON.stringify(this.clientes))
        cliente.atualiza()
    }
    edita(cliente){
        document.getElementById('codigo').value = cliente.codigo
        document.getElementById('codigo').setAttribute('disabled','disabled')
        document.getElementById('nome').value = cliente.nome
        document.getElementById('cep').value = cliente.cep
        document.getElementById('endereco').value = cliente.endereco
        document.getElementById('bairro').value = cliente.bairro
        document.getElementById('cidade').value = cliente.cidade
        document.getElementById('observacoes').value = cliente.observacoes
    }
    lista(){
        const listagem = this.clientes.map((cliente) => (
            `<tr> 
                <td>${cliente.codigo}</td>
                <td>${cliente.nome}</td>
                <td>${cliente.cep}</td>
                <td>${cliente.endereco}</td>
                <td>${cliente.bairro}</td>
                <td>${cliente.cidade}</td>
                <td>${cliente.observacoes}</td>
                <td>
                <button id='apagar' onClick='cliente.apaga(${cliente.codigo})'>🗑️ Apagar</button>
                <button id='editar' onClick='cliente.edita(${JSON.stringify(cliente)})'>📝 Editar</button>
                </td>
            </tr>
            `
        )).join("") //resolve vírgulas ou traços aleatórios na tela, devido ao .MAP

        //montar uma table em tempo de execução
        return (`<table border='1' class='paleBlueRows'>
        <caption>Relação dos Clientes</caption>
        <thead>
            <th>Código</th>
            <th>Nome</th>
            <th>Endereço</th>
            <th>CEP</th>
            <th>Bairro</th>
            <th>Cidade</th>
            <th>Observações</th>
            <th>Opções</th>
        </thead>
        <tbody>${listagem}</tbody>
        </table>
        `)
    }
    atualiza(){ //volta a procurar a listagem permitindo usar o código da listagem pra atualizar
        document.getElementById('listagem').innerHTML = cliente.lista()
    }
}
//Instanciado um novo objeto
const cliente = new Cliente()

//Tratando - Botão Salvar
document.getElementById('salvar').onclick = function(){
    const registro = {
        codigo: document.getElementById('codigo').value,
        nome: document.getElementById('nome').value,
        cep: document.getElementById('cep').value,
        endereco: document.getElementById('endereco').value,
        bairro: document.getElementById('bairro').value,
        cidade: document.getElementById('cidade').value,
        observacoes: document.getElementById('observacoes').value
    }
    if(registro.codigo == ''){
        alert('O Código do cliente é obrigatório!')
        return false;
    }
    if(registro.nome == ''){
        alert('O nome do cliente é obrigatório!')
        return false;
    }
    if(registro.endereco == '' || registro.cep == '' || registro.cidade == '' || registro.bairro == ''){
        alert('Os dados de endereco, cep, cidade e bairro são obrigatórios!')
        return false;
    }
    cliente.salva(registro)
}

//Tratando - Listagem
window.onload = function() {
    cliente.atualiza()
}