/*
Resumo dos comentários:
- O código gerencia uma lista de participantes para um sorteio de amigo secreto.
- Permite adicionar nomes, reiniciar a lista, e realizar o sorteio garantindo que ninguém tire a si mesmo.
- Utiliza o algoritmo Fisher-Yates para embaralhar a lista.
- Manipula o DOM para mostrar os participantes e o resultado do sorteio.
*/

// Array global que armazena a lista de amigos.
let lista = [];

// Adiciona um "ouvinte" para a tecla Enter no campo de nome.
document.getElementById('nome-amigo').addEventListener('keydown', function(event) {
    // Verifica se a tecla pressionada foi 'Enter'.
    if (event.key === 'Enter') {
        // Impede o comportamento padrão do formulário (recarregar a página).
        event.preventDefault();
        // Chama a função para adicionar o amigo.
        adicionar();
    }
});

// Função para adicionar um amigo.
function adicionar() {
    // Pega o elemento do campo de texto e o nome digitado.
    let nomeInput = document.getElementById('nome-amigo');
    let nome = nomeInput.value;

    // Se o nome estiver vazio, mostra um alerta e para a função.
    if (nome === '') {
        alert('Digite um nome válido!');
        nomeInput.focus(); // Devolve o foco ao campo.
        return; // Para a execução da função.
    }

    // Se o nome já existir na lista, mostra um alerta e para a função.
    if (lista.some(amigo => amigo.toLowerCase() === nome.toLowerCase())) {
        alert('Este nome já está inserido na lista!');
        nomeInput.value = ''; // Limpa o campo para nova tentativa.
        nomeInput.focus();
        return; //para a função
    }

    // Adiciona o nome ao final do array.
    lista.push(nome);

    // Pega o elemento para exibir a lista de amigos.
    const listaAmigosElement = document.getElementById('lista-amigos');
    listaAmigosElement.textContent = lista.join(', '); // .join() cuida das vírgulas automaticamente.

    // Limpa o campo de texto e devolve o foco para ele.
    nomeInput.value = '';
    nomeInput.focus();
}

// Função para reiniciar o sorteio.
function reiniciar() {
    // Esvazia o array de amigos.
    lista = [];
    // Limpa a lista de amigos na tela.
    document.getElementById('lista-amigos').innerHTML = '';
    // Limpa o resultado do sorteio na tela.
    document.getElementById('lista-sorteio').innerHTML = '';
    // Limpa o campo de texto.
    document.getElementById('nome-amigo').value = '';
}

// Função para realizar o sorteio.
function sortear() {
    // Verifica se há participantes suficientes para o sorteio.
    if (lista.length < 3) {
        alert('É necessário ter pelo menos 3 amigos para o sorteio!');
        return;
    }

    // Embaralha a lista de amigos para garantir a aleatoriedade.
    embaralhar(lista);

    // Pega o elemento onde o resultado do sorteio será exibido.
    const listaSorteioElement = document.getElementById('lista-sorteio');
    // Limpa o resultado de sorteios anteriores.
    listaSorteioElement.innerHTML = '';

    // Para cada amigo na lista, sorteia um par.
    for (let i = 0; i < lista.length; i++) {
        // O amigo sorteado é o próximo da lista.
        // Se for o último, ele sorteia o primeiro, fechando o ciclo.
        const amigoSecretoIndex = (i + 1) % lista.length;
        const amigoSecreto = lista[amigoSecretoIndex];

        // Exibe o par na tela.
        listaSorteioElement.innerHTML += `${lista[i]} ==> ${amigoSecreto}<br>`;
    }
}

// Função para embaralhar os elementos de um array (algoritmo de Fisher-Yates).
function embaralhar(array) {
    // Percorre o array de trás para frente.
    for (let i = array.length - 1; i > 0; i--) {
        // Escolhe um índice aleatório entre 0 e a posição atual.
        const j = Math.floor(Math.random() * (i + 1));
        // Troca o elemento atual com o elemento do índice aleatório.
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Função para converter todos os nomes da lista para letras minúsculas.
// OBS: Esta função não está sendo usada no código.
function listaParaLowercase() {
    lista = lista.map(nome => nome.toLowerCase());
}