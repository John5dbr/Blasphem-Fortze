// IMPORTAÇÕES:

import { visualDoPiano } from "../codigoCentral/visualDoPiano.js";
import { umaOitava } from "../codigoCentral/umaOitava.js";
import { doisOitava } from "../codigoCentral/doisOitava.js";
import { OpcaoDeMusica } from "../codigoCentral/opcaoDeMusica.js";
customElements.define('visual-piano', visualDoPiano);
customElements.define('uma-oitava', umaOitava);
customElements.define('dois-oitava', doisOitava);
customElements.define('opcao-musica', OpcaoDeMusica);

// VARIÁVEIS GLOBAIS:

let fonte;

let musicAntiga;
let musicAtual;

let opcoesDeMusicas = [];

let urlDaMusicaTocada;
let musicaTocada = new Audio();

let timeoutDaMusica = null;
let timeoutDoPlay = null;
let timeoutDoAlterarMusica = null;  

let jogoOcorrendo = false;

// FUNÇÕES AUXILIARES:

// Função para o elemento que faz o menu lateral surgir e sumir;
function fazerAbaDeMusicaAparecer(elemento) {
    if (elemento.dataset.aparecendo == "true") {
        elemento.classList.add("naoAparecendo__AbaDeMusica");
        elemento.classList.remove("aparecendo__AbaDeMusica");
        elemento.dataset.aparecendo = "false";
    } else if (elemento.dataset.aparecendo == "false") {
        elemento.classList.add("aparecendo__AbaDeMusica");
        elemento.classList.remove("naoAparecendo__AbaDeMusica");
        elemento.dataset.aparecendo = "true";
    };
};
// Função para interromper ou continuar o jogo; 
function pausarOuContinuarAnimacao(btnPausar) {
    if (btnPausar.dataset.pause == 'false') {
        let mensagem = new CustomEvent('verificandoPause', { detail: 'NaoInterromper' });
        dispatchEvent(mensagem);
    } else if (btnPausar.dataset.pause == 'true') {
        let mensagem = new CustomEvent('verificandoPause', { detail: 'Interromper' });
        dispatchEvent(mensagem);
    } 
};
// Função para alterar o icone do botão de Pause e Despause;
function alternarEntrePauseContinue(elemento) {
    let icone = elemento.querySelector('img');
    if (elemento.dataset.pause == 'false') {
        icone.src = `../paginaDeJogo/Recursos/Icones/icone-Continue.svg`;
        elemento.dataset.pause = 'true';
    } else if (elemento.dataset.pause == 'true') {
        icone.src = `../paginaDeJogo/Recursos/Icones/icone-Pause.svg`;
        elemento.dataset.pause = 'false';
    } 
};
// Função para calcular a quantidade de opções que devem aparecer no menu lateral;
function calcularQuantidadeMaximaDeOpcoes() {
    let viewportY = window.innerHeight;
    let limiteDeTamanho = viewportY - (120);

    let quantDeOpcoes = 0;

    for (let cont = 0 ; (cont <= limiteDeTamanho) ; cont += (57.5 + 10)) {
        quantDeOpcoes++;
    };

    return quantDeOpcoes - 1;
};
// Função que substitui o ponteiro para ritmo.json da música selecionada;
function alterarMusica() {
    let url = document.getElementById('script-definir_ritmoParaTeclas').dataset.urlpararitmo;
    musicAntiga = url;

    let mensagem = new CustomEvent('enviandoURL', { detail: url });
    dispatchEvent(mensagem);
};
// Função que executa a música;
function playNaMusica() {
    jogoOcorrendo = true;
    musicaTocada.pause();
    musicaTocada.currentTime = 0;
    musicaTocada.src = `${urlDaMusicaTocada}`;
    timeoutDaMusica = setTimeout(() => {
        musicaTocada.play();
    }, tempoParaMusicaComecar());
};
// Função que interrompe a música iniciada;
function interromperMusica() {
    jogoOcorrendo = false;
    musicaTocada.pause();
    musicaTocada.currentTime = 0;
    musicaTocada.load();
};
// Função que calcula o tempo para a música começar com base na altura da viewport;
function tempoParaMusicaComecar() {
    let tempoParaComecar = window.innerHeight * 7.05;
    return tempoParaComecar;
};
// Função executada quando o usuário clica play em determinada música;
window.addEventListener('play', play);
function play() {
    jogoOcorrendo = true;

    clearTimeout(timeoutDoPlay);
    clearTimeout(timeoutDoAlterarMusica);
    clearTimeout(timeoutDaMusica);

    musicaTocada.pause();
    musicaTocada.currentTime = 0;

    let btnPausar = document.getElementById("iconPauseOuContinue");
    if (btnPausar.dataset.pause == 'true') {
        alternarEntrePauseContinue(btnPausar);
        pausarOuContinuarAnimacao(btnPausar);
    };

    let mensagem = new CustomEvent('restart', {detail: 'restart'});
    dispatchEvent(mensagem);

    limparTeclas();

    timeoutDoPlay = setTimeout(() => {
        timeoutDoAlterarMusica = setTimeout(alterarMusica, 1000);
        playNaMusica();
    }, 500);
};
// Evento padrão para permitir que usuário interaja com o piano durante o jogo;
musicaTocada.addEventListener('playing', () => {
    let btnPesquisar = document.getElementById("inputPesquisar");
    btnPesquisar.blur();
    permitirInt();
})
// Evento padrão para impedir que usuário interaja com o piano quando não houver jogo; 
musicaTocada.addEventListener('ended', () => {
    impedirInt();
    jogoOcorrendo = false;
})
// Função para permitir que o usuário interajir com piano;
function permitirInt() {
    document.getElementById("script-definir_ritmoParaUsuario").dataset.valido = "false";
    let mensagem = new CustomEvent('PermitirInteração', {detail: 'PermitirInteração'});
    dispatchEvent(mensagem);
};
// Função para impede que o usuário interaja com piano;
function impedirInt() {
    document.getElementById("script-definir_ritmoParaUsuario").dataset.valido = "true";
    let mensagem = new CustomEvent('ImpedirInteração', {detail: 'ImpedirInteração'});
    dispatchEvent(mensagem);
};
// Função para limpar as teclas inicializadas e renderizadas até o momento;
function limparTeclas() {
    let tecla = [...document.getElementsByClassName("tecla")];
    tecla.forEach(el => el.remove());
};

// FUNÇÕES E COMANDOS FUNDAMENTAIS:

// Executora de todas as funções base para funcionamento do sistema;
window.addEventListener('DOMContentLoaded', inicializarFuncoesBasicas);
function inicializarFuncoesBasicas() {

    // Função para o elemento que faz o menu lateral aparecer
    let elementoParaFazerAparecer = document.getElementById("elementoParaFazerAparecer");
    elementoParaFazerAparecer.addEventListener('mouseenter', () => {
        let abaParaMusicas = document.getElementById("abaParaMusicas");
        fazerAbaDeMusicaAparecer(abaParaMusicas); 
        btnPesquisar.blur();
    });

    // Função caso o usuário clique no icone de pesquisa
    let iconPesquisar = document.getElementById("iconPesquisar");
    iconPesquisar.addEventListener('click', () => {
        let txtPesquisado = btnPesquisar.value.toLowerCase();
        let musicasFiltradas = opcoesDeMusicas.filter(el => {
            let nomeMusica = el.getAttribute('nomedamusica').toLowerCase();
            return nomeMusica.includes(txtPesquisado);
        });
        gerarCustomElement(musicasFiltradas, 0, true);
    });

    // Função caso o usuário foque (acesse o input) na barra de pesquisa
    let btnPesquisar = document.getElementById("inputPesquisar");
    btnPesquisar.addEventListener('focus', () => {
        impedirInt();
    });

    // Função caso o usuário desfoque (desacesse o input) na barra de pesquisa
    btnPesquisar.addEventListener('blur', () => {
        let btnPausar = document.getElementById("iconPauseOuContinue");
        if (btnPausar.dataset.pause == 'true' || jogoOcorrendo == false) {
            impedirInt();
        } else {
            permitirInt();
        };
    });

    // Função caso o usuário realize uma pesquisa usando o Enter
    btnPesquisar.addEventListener('keydown', (event) => {
        if (event.key == 'Enter') {
            let txtPesquisado = btnPesquisar.value.toLowerCase();
            let musicasFiltradas = opcoesDeMusicas.filter(el => {
                let nomeMusica = el.getAttribute('nomedamusica').toLowerCase();
                if (nomeMusica.includes(txtPesquisado)) { return el; };
            });
            gerarCustomElement(musicasFiltradas, 0, true);
        };
    });

    // Função para funcionamento do botão de Pause e Despause
    let btnPausar = document.getElementById("iconPauseOuContinue");
    btnPausar.addEventListener('click', () => {
        if (!musicaTocada.src || musicaTocada.currentTime < 0.1) return;

        alternarEntrePauseContinue(btnPausar);
        pausarOuContinuarAnimacao(btnPausar);

        if (btnPausar.dataset.pause == 'true') {
            jogoOcorrendo = false;
            musicaTocada.pause();
            impedirInt();
        } else {
            jogoOcorrendo = true;
            musicaTocada.play();
            permitirInt();
        };
    });

    // Função para funcionamento do botão de Restarte do jogo
    let btnRestart = document.getElementById("iconRestart");
    btnRestart.addEventListener('click', () => {
        clearTimeout(timeoutDoPlay);
        clearTimeout(timeoutDoAlterarMusica);
        clearTimeout(timeoutDaMusica);

        interromperMusica();

        let btnPausar = document.getElementById("iconPauseOuContinue");

        let mensagem = new CustomEvent('restart', {detail: 'restart'});
        dispatchEvent(mensagem);

        limparTeclas();

        if (btnPausar.dataset.pause == 'true') {
            pausarOuContinuarAnimacao(btnPausar);
            alternarEntrePauseContinue(btnPausar);
        }

        impedirInt();

        let txtMostrarPont = document.getElementById("textPoints");
        txtMostrarPont.innerText = `0`;

        jogoOcorrendo = false;
    });

    // Função que requisita as músicas do arquivo ritmo.json da música selecionada 
    async function requisitarMusicas() {
        let registros = await fetch('../Musicas/registrosDeMusicas.json');
        try {
            if (registros.ok) {
                let registrosEmJson = await registros.json();
                gerarCustomElement(registrosEmJson);
            } else {
                throw new TypeError(`ERROR`);
            }
        } catch(e) {
            console.log(`Falha em requisição de registros de músicas - ${e}`)
        } finally {
            console.log(`Requisição finalizada.`)
        }
    };

    let abaParaOpcaoDeMusicas = document.getElementById("abaParaOpcaoDeMusicas");

    // Função para gerar uma lista de opções de músicas aleatoriamente ou com base na barra de pesquisa
    function gerarCustomElement(infors, quantExtra=0, pesquisado=false) {
        let quantDeOpcoes = calcularQuantidadeMaximaDeOpcoes() + quantExtra;

        let musicas = [...abaParaOpcaoDeMusicas.children];
        musicas.forEach(el => { el.remove() });

        if (pesquisado == true) {
            let englobador = document.createDocumentFragment();

            infors.forEach(el => {
                englobador.append(el);
            });

            abaParaOpcaoDeMusicas.append(englobador);
        } else if (pesquisado == false) {
            let englobador = document.createDocumentFragment();

            infors.forEach(el => {
                let elemento = document.createElement('opcao-musica');
                elemento.setAttribute('cor', el.corDoElemento);
                elemento.setAttribute('urldalogo', el.urlDaLogo);
                elemento.setAttribute('nomedamusica', el.nomeDaMusica);
                elemento.setAttribute('urldamusica', el.urlDaMusica);
                elemento.setAttribute('urldowallpaper', el.urlDoWallpaper);
                elemento.setAttribute('urldodisco', el.urlDoDisco);
                elemento.setAttribute('urldafonte', el.urlDaFonte);
                elemento.setAttribute('urldamusicatocada', el.urlDaMusicaTocada);
                elemento.setAttribute('duracao', el.duracao);
                elemento.classList.add('opcaoDeMusica__items');

                opcoesDeMusicas.push(elemento);
            });

            opcoesDeMusicas.forEach((el, ind) => {
                if (ind <= quantDeOpcoes) {
                    englobador.append(el);
                }
            });

            abaParaOpcaoDeMusicas.append(englobador);
        };
    };
 
    // Função que realiza a troca de música alterando o design da página conforme necessário
    abaParaOpcaoDeMusicas.addEventListener('click', trocarDeMusica);
    async function trocarDeMusica(e) {
        let alvo = e.target;
        if (alvo.classList.contains("opcaoDeMusica__items")) {
            clearTimeout(timeoutDoAlterarMusica);
            clearTimeout(timeoutDaMusica);
            interromperMusica();

            document.getElementById("script-definir_ritmoParaTeclas").dataset.urlpararitmo = alvo.getAttribute('urldamusica');
            
            let wallpaper = document.getElementById("wallpaper");
            wallpaper.style.background = `url(${alvo.getAttribute('urldowallpaper')}) no-repeat center center / cover`;

            let disco = document.getElementById("disco");
            disco.style.background = `url(${alvo.getAttribute('urldodisco')}) no-repeat center center / cover`; 

            musicAtual = alvo.getAttribute('urldamusica');
            urlDaMusicaTocada = alvo.getAttribute('urldamusicatocada');

            if (musicAtual != musicAntiga) {
                let btnPause = document.getElementById('iconPauseOuContinue');
                if (btnPause.dataset.pause == 'true') {
                    alternarEntrePauseContinue(btnPause);
                    pausarOuContinuarAnimacao(btnPause);
                } 

                let mensagem = new CustomEvent('restart', {detail: 'restart'});
                dispatchEvent(mensagem);

                limparTeclas();
            };

            fonte = alvo.getAttribute('urldafonte');

            let abaDeStatus = document.getElementById('abaDeStatus');

            let nomeDaMusica = alvo.getAttribute('nomedamusica');
            let abaTitulo = abaDeStatus.querySelector('#abaDeStatus__titulo');         
            if (nomeDaMusica.length <= 25) {
                abaTitulo.innerText = `${nomeDaMusica}`;
            } else if (nomeDaMusica.length >= 26) {
                abaTitulo.innerText = ``;
                for (let cont = 0; cont <= 20 ; cont++) {
                    abaTitulo.innerHTML += `${nomeDaMusica[cont]}`; 
                };
                abaTitulo.innerText += `...`;
                nomeDaMusica = abaTitulo.innerText;
            };

            let DadosSobreDificMaisQuantDeTeclasMaisMaxPont = async () => {
                let ritmo = null;
                ritmo = await fetch(`${document.getElementById("script-definir_ritmoParaTeclas").dataset.urlpararitmo}`);
                if (ritmo.ok) {
                    ritmo = await ritmo.json();
                }

                let quantDeTeclas = ritmo.length;
                let dific = null;
                if (quantDeTeclas <= 75) {
                    dific = 'Easy';
                } else if (quantDeTeclas >= 76 && quantDeTeclas <= 150) {
                    dific = 'Medium';
                } else {
                    dific = 'Hard';
                };

                let maxPont = quantDeTeclas * 2;
                ritmo.forEach(el => { if (el.pressaoDeClique === 4) { maxPont += 5 }});

                return [quantDeTeclas, dific, maxPont];
            };

            let dificMaisQuantDeTeclas = await DadosSobreDificMaisQuantDeTeclasMaisMaxPont();
        
            let quantDeTeclas = dificMaisQuantDeTeclas[0];   
            let abaQuantDeTeclas = abaDeStatus.querySelector('.infors__items-4');
            abaQuantDeTeclas.innerHTML = `Number of <br> Keys:  ${quantDeTeclas}`;

            let dificuldade = dificMaisQuantDeTeclas[1];   
            let abaDeDific = abaDeStatus.querySelector('.infors__items-1');
            abaDeDific.innerHTML = `Difficulty: <br> ${dificuldade}`;

            let duracaoDaMusica = alvo.getAttribute('duracao');   
            let duracao = abaDeStatus.querySelector('.infors__items-2');
            duracao.innerHTML = `Duration: <br> ${duracaoDaMusica}`;

            let maxPont = dificMaisQuantDeTeclas[2];   
            let abaMaxPont = abaDeStatus.querySelector('.infors__items-3');
            abaMaxPont.innerHTML = `Max Score: <br>  ${maxPont}`;

            let dados = {
                cor: alvo.getAttribute('cor'),
                urldalogo: alvo.getAttribute('urldalogo'),
                nomedamusica: nomeDaMusica,
                urldamusica: alvo.getAttribute('urldamusica'),
                urldowallpaper: alvo.getAttribute('urldowallpaper'),
                urldodisco: alvo.getAttribute('urldodisco'),
                urldafonte: alvo.getAttribute('urldafonte'),
                urldamusicatocada: alvo.getAttribute('urldamusicatocada'),
                duracao: alvo.getAttribute('duracao'),
                dific: dificuldade,
                maxPont: maxPont,
                quantDeTeclas: quantDeTeclas 
            };
            localStorage.setItem('dadosDaMusicaPadrao', JSON.stringify(dados));

            impedirInt()

            let txtMostrarPont = document.getElementById("textPoints");
            txtMostrarPont.innerText = `0`;

            let visualMostrarPont = document.getElementById("visualPoints");
            visualMostrarPont.style.background = `${alvo.getAttribute('cor')}`;

            let mensagem_3 = new CustomEvent('informarMaxPont', {detail: maxPont});
            dispatchEvent(mensagem_3);

            jogoOcorrendo = false;
        };
    };

    // Função para o botão de Mais Opções que permite aumentar a lista de opções músicas mostradas no menu lateral
    let btnMaisOpcoes = document.getElementById("btnMaisOpcoes");
    btnMaisOpcoes.addEventListener('click', () => {
        let musicas = [...abaParaOpcaoDeMusicas.children];

        if (opcoesDeMusicas.length <= musicas.length) {
            return;
        };
        
        musicas.forEach(el => {
            el.remove();
        });

        let quant = btnMaisOpcoes.dataset.quant;
        quant++
        btnMaisOpcoes.dataset.quant = quant;

        gerarCustomElement(opcoesDeMusicas, quant);

        let limiteDeOpcoes = opcoesDeMusicas.length / 2;
        for (let cont = opcoesDeMusicas.length ; cont != limiteDeOpcoes ; cont--) {
            opcoesDeMusicas.pop();
        };
    });

    // Função para o botão que expõe a fonte da música selecionada
    let btnFonte = document.getElementById("btnFonte");
    btnFonte.addEventListener('click', () => {
        window.open(fonte, "_blank", "noopener,noreferrer");
    });

    // Função para o botão que reinicia a página em caso de bug inesperado
    let btnAlerta = document.getElementById("btnAlerta");
    btnAlerta.addEventListener('click', () => {
        window.location.reload();
    });

    // Função para o botão que permite o usuário escolher se quer olhar ou não a aba de Status
    let btnMostrarStatus = document.getElementById("btnMostrarStatus");
    btnMostrarStatus.addEventListener('click', () => {
        let abaDeStatus = document.getElementById('abaDeStatus');
        abaDeStatus.classList.toggle('principal__abaDeStatus--aparecendo');
    });

    requisitarMusicas();
};
// Função para padronizar a estado inicial da página;
(async function estilizarComDadosDaMusicaPadrao() {
    let dados = JSON.parse(localStorage.getItem('dadosDaMusicaPadrao'));

    document.getElementById("script-definir_ritmoParaTeclas").dataset.urlpararitmo = dados.urldamusica;
    
    let wallpaper = document.getElementById("wallpaper");
    wallpaper.style.background = `url(${dados.urldowallpaper}) no-repeat center center / cover`;

    let disco = document.getElementById("disco");
    disco.style.background = `url(${dados.urldodisco}) no-repeat center center / cover`; 

    musicAtual = dados.urldamusica;
    urlDaMusicaTocada = dados.urldamusicatocada;

    fonte = dados.urldafonte;

    let abaDeStatus = document.getElementById('abaDeStatus');

    let abaTitulo = abaDeStatus.querySelector('#abaDeStatus__titulo');         
    abaTitulo.innerText = `${dados.nomedamusica}`;

    let abaQuantDeTeclas = abaDeStatus.querySelector('.infors__items-4');
    abaQuantDeTeclas.innerHTML = `Number of <br> Keys:  ${dados.quantDeTeclas}`;
 
    let abaDeDific = abaDeStatus.querySelector('.infors__items-1');
    abaDeDific.innerHTML = `Difficulty: <br> ${dados.dific}`;
 
    let duracao = abaDeStatus.querySelector('.infors__items-2');
    duracao.innerHTML = `Duration: <br> ${dados.duracao}`;
  
    let abaMaxPont = abaDeStatus.querySelector('.infors__items-3');
    abaMaxPont.innerHTML = `Max Score: <br>  ${dados.maxPont}`;

    let visualMostrarPont = document.getElementById("visualPoints");
    visualMostrarPont.style.background = `${dados.cor}`;
})();

// IMPEDIDNDO INTERATIIVIDADE COM PIANO POR PADRÃO;
impedirInt();