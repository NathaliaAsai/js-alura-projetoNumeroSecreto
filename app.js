//let titulo = document.querySelector('h1'); //manipula o texto com a tag h1
//titulo.innerHTML = 'Jogo do número secreto';

//let paragrafo = document.querySelector('p');
//paragrafo.innerHTML = 'Escolha um número entre 1 e 10';

let listaDeNumerosSorteados = [];
let numeroMaximo = parseInt(prompt('Insira um número máximo'))
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate: 1.2});
} //texto responsivo

function exibirMensagemInicial() {
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    exibirTextoNaTela('p', `Escolha um número entre 01 e ${numeroMaximo}.`);
}

exibirMensagemInicial();

function verificarChute() { //função que vai verificar o chute
    let chute = parseInt(document.querySelector('input').value);

  //isNaN (not a number) - verifica se o valor inserido é um número
  // || é o operador lógico OR, retorna true se qlqr uma das condições ao seu redor for TRUE  
    if (isNaN(chute) || chute <1 || chute >numeroMaximo) { 
        exibirTextoNaTela('p', `Por favor, insira um número válido entre 1 e ${numeroMaximo}.`);
        limparCampo();
        return;
    }
   
    //O operador === é o operador de igualdade estrita, que verifica tanto o valor quanto o tipo dos operandos. 
    //Já o operador == é o operador de igualdade frouxa, que faz a conversão de tipo antes de comparar. 
    //Usar === é uma prática recomendada porque evita comportamentos inesperados causados por conversões automáticas de tipo.
   if(chute === numeroSecreto) {
        exibirTextoNaTela('h1', 'Acertou!');
        let palavraTentativa = tentativas > 1? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
        exibirTextoNaTela('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
   } else {
        if (chute > numeroSecreto) {
            exibirTextoNaTela ('p','O número secreto é menor');
        } else {
            exibirTextoNaTela ('p', 'O número secreto é maior');
        }
        tentativas++;
        limparCampo();
   }
}

//no exercício, alura usa parseInt e não Math.floor.
//Math.floor arredonda o numero para baixo até o inteiro mais próximo no código
//parseInt converte a string para um numero inteiro.
//parseInt: numeroMax + 1 para tornar o numero maior que 0 e para ficar entre o numero maximo
function gerarNumeroAleatorio(){
    let numeroEscolhido =  Math.floor(Math.random() * numeroMaximo + 1); 
    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio(); //tomar cuidado com recursão
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        console.log(listaDeNumerosSorteados);
        return numeroEscolhido;
    }
}

function limparCampo() {
    let chute = document.querySelector ('input');
    chute.value = '';
}

function reiniciarJogo () {
    numeroSecreto = gerarNumeroAleatorio(); 
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}