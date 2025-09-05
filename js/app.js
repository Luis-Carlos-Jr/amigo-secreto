let lista = []; // Lista de participantes

// Função para adicionar um participante à lista
function adicionar(){
    // Captura o nome inserido no input
    let nome = document.getElementById('nome-amigo').value;
    // Limpa o campo de input
    document.getElementById('nome-amigo').value = '';

    // Verifica se o nome está vazio
    if (nome === '') {
        alert('Digite um nome válido!');
        document.getElementById('nome-amigo').focus(); // Mantém o foco no input
        return;
    // Verifica se o nome já está na lista
    }else if(lista.includes(nome)){
        alert('Este nome já está inserido na lista!');
        document.getElementById('nome-amigo').focus(); // Mantém o foco no input
        return;
    // Se já houver participantes, adiciona com vírgula
    }else if(lista.length >= 1){
        document.getElementById('lista-amigos').innerHTML += ', '+nome;
    // Se for o primeiro participante, adiciona sem vírgula
    }else{
        document.getElementById('lista-amigos').innerHTML += nome;
    }

    // Adiciona o nome à lista
    lista.push(nome);
    document.getElementById('nome-amigo').focus(); // Mantém o foco após adicionar
}

// Função para reiniciar a lista e limpar os campos
function reiniciar(){
    document.getElementById('lista-amigos').innerHTML = ''; // Limpa a lista de amigos
    lista = []; // Reseta a lista de participantes
    document.getElementById('lista-sorteio').innerHTML = ''; // Limpa o resultado do sorteio
    document.getElementById('nome-amigo').value = ''; // Limpa o campo de input
}

// Função para sortear os amigos secretos
function sortear(){
    // Verifica se há pelo menos 3 participantes
    if(lista.length < 3){
        alert('Deve haver ao menos 3 participantes no sorteio!');
        return;
    }
    // Cria cópias embaralhadas da lista de participantes
    let participantes = embaralhar([...lista]);
    let disponiveis = embaralhar([...lista]);
    document.getElementById('lista-sorteio').innerHTML = ''; // Limpa o campo de sorteio

    // Realiza o sorteio para cada participante
    for(let pIndex = 0; pIndex < participantes.length; pIndex++){
        let sorteio, sorteado;
        // Garante que o participante não tire ele mesmo
        do {
            sorteio = parseInt(Math.random()*disponiveis.length);
            sorteado = disponiveis[sorteio];
        } while (sorteado === participantes[pIndex]  && disponiveis.length > 1);

        // Remove o sorteado da lista de disponíveis
        disponiveis = disponiveis.filter(nome => nome !== sorteado);

        // Exibe o resultado do sorteio
        document.getElementById('lista-sorteio').innerHTML += `${participantes[pIndex]} ==> ${sorteado}<br>`;
    }
}

// Função para embaralhar uma lista (algoritmo de Fisher-Yates)
function embaralhar(lista) {
    for (let i = lista.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [lista[i], lista[j]] = [lista[j], lista[i]];
    }
    return lista;
}

