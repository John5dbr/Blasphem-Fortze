import { visualDoPiano001 } from "../codigoCentral/visuaisDoPiano.js";
import { umaOitava } from "../codigoCentral/umaOitava.js";
import { doisOitava } from "../codigoCentral/doisOitava.js";
import { OpcaoDeMusica } from "../codigoCentral/opcaoDeMusica.js";

customElements.define('piano-001', visualDoPiano001);
customElements.define('uma-oitava', umaOitava);
customElements.define('dois-oitava', doisOitava);
customElements.define('opcao-musica', OpcaoDeMusica);

window.addEventListener('DOMContentLoaded', inicializarFuncoesBasicas);
function inicializarFuncoesBasicas() {
    let elementoParaFazerAparecer = document.getElementById("elementoParaFazerAparecer");
    elementoParaFazerAparecer.addEventListener('mouseenter', () => {
        let abaParaMusicas = document.getElementById("abaParaMusicas");
        fazerAbaDeMusicaAparecer(abaParaMusicas); 

        btnPesquisar.blur();
    });

    let iconPesquisar = document.getElementById("iconPesquisar");
    iconPesquisar.addEventListener('click', () => {
        let txtPesquisado = btnPesquisar.value.toLowerCase();

        let musicasFiltradas = opcoesDeMusicas.filter(el => {
            let nomeMusica = el.getAttribute('nomedamusica').toLowerCase();
            return nomeMusica.includes(txtPesquisado);
        });

        gerarCustomElement(musicasFiltradas, 0, true);
    });

    let btnPesquisar = document.getElementById("inputPesquisar");
    btnPesquisar.addEventListener('focus', () => {
        document.getElementById("script-definir_ritmoParaUsuario").dataset.valido = "true";
        let mensagem = new CustomEvent('ImpedirInteração', {detail: 'ImpedirInteração'});
        dispatchEvent(mensagem);
    });
    btnPesquisar.addEventListener('blur', () => {
        let btnPausar = document.getElementById("iconPauseOuContinue");
        if (btnPausar.dataset.pause == 'true') {
            document.getElementById("script-definir_ritmoParaUsuario").dataset.valido = "true";
            let mensagem = new CustomEvent('ImpedirInteração', {detail: 'ImpedirInteração'});
            dispatchEvent(mensagem);
        } else {
            document.getElementById("script-definir_ritmoParaUsuario").dataset.valido = "false";
            let mensagem = new CustomEvent('PermitirInteração', {detail: 'PermitirInteração'});
            dispatchEvent(mensagem);
        }
    });
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

    let btnPausar = document.getElementById("iconPauseOuContinue");
    btnPausar.addEventListener('click', () => {
        if (!musicaTocada.src || musicaTocada.currentTime < 0.1) return;

        alternarEntrePauseContinue(btnPausar);
        pausarOuContinuarAnimacao(btnPausar);

        if (btnPausar.dataset.pause == 'true') {
            musicaTocada.pause();

            document.getElementById("script-definir_ritmoParaUsuario").dataset.valido = "true";
            let mensagem = new CustomEvent('ImpedirInteração', {detail: 'ImpedirInteração'});
            dispatchEvent(mensagem);
        } else {
            musicaTocada.play();
            document.getElementById("script-definir_ritmoParaUsuario").dataset.valido = "false";
            let mensagem = new CustomEvent('PermitirInteração', {detail: 'PermitirInteração'});
            dispatchEvent(mensagem);
        };
    });

    let btnRestart = document.getElementById("iconRestart");
    btnRestart.addEventListener('click', () => {
        clearTimeout(timeoutDoPlay);
        clearTimeout(timeoutDoAlterarMusica);
        clearTimeout(timeoutDaMusica);

        interromperMusica();

        let btnPausar = document.getElementById("iconPauseOuContinue");

        let mensagem = new CustomEvent('restart', {detail: 'restart'});
        dispatchEvent(mensagem);

        let tecla = [...document.getElementsByClassName("tecla")];
        tecla.forEach(el => el.remove());

        if (btnPausar.dataset.pause == 'true') {
            pausarOuContinuarAnimacao(btnPausar);
            alternarEntrePauseContinue(btnPausar);
        }

        document.getElementById("script-definir_ritmoParaUsuario").dataset.valido = "true";
        let mensagem_2 = new CustomEvent('ImpedirInteração', {detail: 'ImpedirInteração'});
        dispatchEvent(mensagem_2);

        let txtMostrarPont = document.getElementById("textPoints");
        txtMostrarPont.innerText = `0`;
        jogoOcorrendo = false;
    });

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

                let tecla = [...document.getElementsByClassName("tecla")];
                tecla.forEach(el => el.remove());
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

            document.getElementById("script-definir_ritmoParaUsuario").dataset.valido = "true";
            let mensagem_2 = new CustomEvent('ImpedirInteração', {detail: 'ImpedirInteração'});
            dispatchEvent(mensagem_2);

            let txtMostrarPont = document.getElementById("textPoints");
            txtMostrarPont.innerText = `0`;

            let visualMostrarPont = document.getElementById("visualPoints");
            visualMostrarPont.style.background = `${alvo.getAttribute('cor')}`;

            let mensagem_3 = new CustomEvent('informarMaxPont', {detail: maxPont});
            dispatchEvent(mensagem_3);

            jogoOcorrendo = false;
        };
    };

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

    let btnFonte = document.getElementById("btnFonte");
    btnFonte.addEventListener('click', () => {
        window.open(fonte, "_blank", "noopener,noreferrer");
    });

    let btnAlerta = document.getElementById("btnAlerta");
    btnAlerta.addEventListener('click', () => {
        window.location.reload();
    });

    let btnMostrarStatus = document.getElementById("btnMostrarStatus");
    btnMostrarStatus.addEventListener('click', () => {
        let abaDeStatus = document.getElementById('abaDeStatus');
        abaDeStatus.classList.toggle('principal__abaDeStatus--aparecendo');
    });
    requisitarMusicas();
};

let fonte;

let musicAntiga;
let musicAtual;

let opcoesDeMusicas = [];

let urlDaMusicaTocada;
let musicaTocada = new Audio();

function alterarMusica() {
    let url = document.getElementById('script-definir_ritmoParaTeclas').dataset.urlpararitmo;
    musicAntiga = url;

    let mensagem = new CustomEvent('enviandoURL', { detail: url });
    dispatchEvent(mensagem);
};

function playNaMusica() {
    musicaTocada.pause();
    musicaTocada.currentTime = 0;
    musicaTocada.src = `${urlDaMusicaTocada}`;
    timeoutDaMusica = setTimeout(() => {
        musicaTocada.play();
    }, tempoParaMusicaComecar());
};
function interromperMusica() {
    musicaTocada.pause();
    musicaTocada.currentTime = 0;
    musicaTocada.load();
};
function tempoParaMusicaComecar() {
    let tempoParaComecar = window.innerHeight * 7.05;
    return tempoParaComecar;
};

let jogoOcorrendo = false;
musicaTocada.addEventListener('playing', () => {
    let btnPesquisar = document.getElementById("inputPesquisar");
    btnPesquisar.blur();

    document.getElementById("script-definir_ritmoParaUsuario").dataset.valido = "false";
    let mensagem = new CustomEvent('PermitirInteração', {detail: 'PermitirInteração'});
    dispatchEvent(mensagem);
})
musicaTocada.addEventListener('ended', () => {
    document.getElementById("script-definir_ritmoParaUsuario").dataset.valido = "true";
    let mensagem = new CustomEvent('ImpedirInteração', {detail: 'ImpedirInteração'});
    dispatchEvent(mensagem);
    jogoOcorrendo = false;
})

let timeoutDaMusica = null;
let timeoutDoPlay = null;
let timeoutDoAlterarMusica = null;  
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

    let tecla = [...document.getElementsByClassName("tecla")];
    tecla.forEach(el => el.remove());

    timeoutDoPlay = setTimeout(() => {
        timeoutDoAlterarMusica = setTimeout(alterarMusica, 1000);
        playNaMusica();
    }, 500);
};

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

function pausarOuContinuarAnimacao(btnPausar) {
    if (btnPausar.dataset.pause == 'false') {
        let mensagem = new CustomEvent('verificandoPause', { detail: 'NaoInterromper' });
        dispatchEvent(mensagem);
    } else if (btnPausar.dataset.pause == 'true') {
        let mensagem = new CustomEvent('verificandoPause', { detail: 'Interromper' });
        dispatchEvent(mensagem);
    } 
};

function alternarEntrePauseContinue(elemento) {
    let icone = elemento.querySelector('img');
    if (elemento.dataset.pause == 'false') {
        icone.src = `../EstruturaVisual/Recursos/Icones/icone-Continue.svg`;
        elemento.dataset.pause = 'true';
    } else if (elemento.dataset.pause == 'true') {
        icone.src = `../EstruturaVisual/Recursos/Icones/icone-Pause.svg`;
        elemento.dataset.pause = 'false';
    } 
};

function calcularQuantidadeMaximaDeOpcoes() {
    let viewportY = window.innerHeight;
    let limiteDeTamanho = viewportY - (120);

    let quantDeOpcoes = 0;

    for (let cont = 0 ; (cont <= limiteDeTamanho) ; cont += (57.5 + 10)) {
        quantDeOpcoes++;
    };

    return quantDeOpcoes - 1;
};

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

document.getElementById("script-definir_ritmoParaUsuario").dataset.valido = "true";
let mensagem = new CustomEvent('ImpedirInteração', {detail: 'ImpedirInteração'});
dispatchEvent(mensagem);