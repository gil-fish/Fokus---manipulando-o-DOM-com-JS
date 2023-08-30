const html = document.querySelector('html');
const focoBt = document.querySelector('.app__card-button--foco');
const curtoBt = document.querySelector('.app__card-button--curto');
const longoBt = document.querySelector('.app__card-button--longo');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const botoes = document.querySelectorAll('.app__card-button');
const startPauseBt = document.querySelector('#start-pause');
const musicaFocoInput = document.querySelector('#alternar-musica');
const iniciarOuPausarBt = document.querySelector('#start-pause span');
const iniciarOuPausarBtIcone = document.querySelector(".app__card-primary-butto-icon")
const tempoNaTela = document.querySelector('#timer')

const musica = new Audio('sons/luna-rise-part-one.mp3');
const somPlay = new Audio('sons/play.wav');
const somPause = new Audio('sons/pause.mp3');
const somTempoFinalizado = new Audio('sons/beep.mp3');

let tempoDecorridoEmSegundos = 1500; //variável para o temporizador em let pois será alterado dinamicamente.
let intervaloId = null;

musica.loop = true;

musicaFocoInput.addEventListener('change', () => {
    if (musica.paused) {
        musica.play()
    } else {
        musica.pause()
    }
});

focoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 1500;
    alterarContexto('foco');
    focoBt.classList.add('active');
});

curtoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 300;
    alterarContexto('descanso-curto');
    curtoBt.classList.add('active');
});

longoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 900;
    alterarContexto('descanso-longo');
    longoBt.classList.add('active');
});
//ativar o evento click, adicionando a classe active nos botões através do classList
//remover a classe active com classList usando a const botoes e forEach com parâmetro contexto na function.

//função para agrupar e refatorar o código de mudança de cores de fundo e imagens
function alterarContexto(contexto) {
    mostrarTempo(); //ativar a função e mostrar o contador de tempo na página.
    botoes.forEach(function(contexto) {
        contexto.classList.remove('active');
    });
    html.setAttribute('data-contexto', contexto);
    banner.setAttribute('src', `/imagens/${contexto}.png`);
    switch (contexto) {
        case "foco":
            titulo.innerHTML = `Otimize sua produtividade,<br>
        <strong class="app__title-strong">mergulhe no que importa.</strong>`
            break;
        case "descanso-curto":
            titulo.innerHTML = `Que tal dar uma respirada? <strong class="app__title-strong">Faça uma pausa curta!</strong>
            `
            break;
        case "descanso-longo":
            titulo.innerHTML = `Hora de voltar à superfície. <strong class="app__title-strong">Faça uma pausa longa.</strong>
            `
        default:
            break;
    };
};

//alteração dos textos: switch/case/break dentro da function alterarContexto
//default/break: é ativado caso não encontre nenhum dos case.

//arrow function referente ao temporizador
const contagemRegressiva = () => {
    if (tempoDecorridoEmSegundos <= 0) {
        somTempoFinalizado.play(); //chama a const somTempoFinalizado
        alert('Tempo finalizado!');
        zerar();
        return;
    };
    tempoDecorridoEmSegundos -= 1;
    mostrarTempo();

};

startPauseBt.addEventListener('click', iniciarOuPausar); //deve ser chamada após escrita, não pode estar no topo.

function iniciarOuPausar() {
    if (intervaloId) {
        somPause.play(); //chama a const somPause
        zerar();
        return;
    }
    somPlay.play(); //chama a const somPlay
    intervaloId = setInterval(contagemRegressiva, 1000);
    iniciarOuPausarBt.textContent = "Pausar";
    iniciarOuPausarBtIcone.setAttribute('src', `/imagens/pause.png`) //icone de pausa
};

function zerar() {
    clearInterval(intervaloId);
    iniciarOuPausarBt.textContent = "Começar";
    iniciarOuPausarBtIcone.setAttribute('src', `/imagens/play_arrow.png`) //icone de play
    intervaloId = null;
};

//function para o contador de tempo em contagem regressiva
function mostrarTempo() {
    const tempo = new Date(tempoDecorridoEmSegundos * 1000);
    const tempoFormatado = tempo.toLocaleTimeString('pt-Br', { minute: '2-digit', second: '2-digit' });
    tempoNaTela.innerHTML = `${tempoFormatado}`;
}

mostrarTempo();

//O método textContent é ideal apenas para a inserção de textos. Para inserir tags do HTML junto com textos, com toda uma estrutura HTML, o ideal é utilizar o innerHTML

//Alternando elementos no botão de forma dinâmica”

/* Crie uma variável para pegar a tag HTML onde o ícone de play está inserido.
Crie uma variável para pegar a tag span onde a palavra “Começar” está inserida.
Utilize o método textContent para alternar a palavra "começar" e "pausar" no botão do temporizador.
Utilize o método setAttribute para alternar o caminho do ícone de play e pause no botão do temporizador. */

//Formatando temporizador na tela

/* Crie uma variável para pegar a tag div onde o tempo deverá ser exibido, utilize o id timer.
Crie uma função para mostrar o tempo do temporizador na tela.
Formate o tempo para cada contexto de temporizador do projeto Fokus, utilizando uma instância do objeto Date */