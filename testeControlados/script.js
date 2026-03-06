/* ======================================================================================= */
import { visualDoPiano001 } from "../codigoCentral/visuaisDoPiano.js";
import { umaOitava } from "../codigoCentral/umaOitava.js";
import { doisOitava } from "../codigoCentral/doisOitava.js";
/* ======================================================================================= */
import { OpcaoDeMusica } from "../codigoCentral/opcaoDeMusica.js";

customElements.define('piano-001', visualDoPiano001);
customElements.define('uma-oitava', umaOitava);
customElements.define('dois-oitava', doisOitava);
customElements.define('opcao-musica', OpcaoDeMusica);

/* ======================================================================================= */
function alterarMusica() {
    let url = document.getElementById('script-definir_ritmoParaTeclas').dataset.urlpararitmo;
    musicAntiga = url;

    let mensagem = new CustomEvent('enviandoURL', {
        detail: url
    });

    dispatchEvent(mensagem);
};
/* ======================================================================================= */

let fonte;

let musicAntiga;
let musicAtual;

let opcoesDeMusicas = [];

window.addEventListener('DOMContentLoaded', inicializarFuncoesBasicas);
function inicializarFuncoesBasicas() {
    
    /* ======================================================================================= */
    let rotaParaAsNotas = document.getElementById('rotaParaAsNotas');
    rotaParaAsNotas.addEventListener('click', alterarMusica);
    /* ======================================================================================= */

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

        let mensagem = new CustomEvent('entrouParaPesquisar', {detail: 'entrouParaPesquisar'});
        dispatchEvent(mensagem);
    });
    btnPesquisar.addEventListener('blur', () => {
        document.getElementById("script-definir_ritmoParaUsuario").dataset.valido = "false";

        let mensagem = new CustomEvent('saiuDaPesquisa', {detail: 'saiuDaPesquisa'});
        dispatchEvent(mensagem);
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
        alternarEntrePauseContinue(btnPausar);
        pausarOuContinuarAnimacao(btnPausar);
    });

    let btnRestart = document.getElementById("iconRestart");
    btnRestart.addEventListener('click', () => {
        let btnPausar = document.getElementById("iconPauseOuContinue");
        if (btnPausar.dataset.pause == 'true') {
            alternarEntrePauseContinue(btnPausar);
            pausarOuContinuarAnimacao(btnPausar);

            let mensagem = new CustomEvent('restart', {detail: 'restart'}); 
            dispatchEvent(mensagem);

            let tecla = [...document.getElementsByClassName("tecla")];
            tecla.forEach(el => el.remove());

            setTimeout(alterarMusica, 1000);
        } else {
            let mensagem = new CustomEvent('restart', {detail: 'restart'});
            dispatchEvent(mensagem);

            let tecla = [...document.getElementsByClassName("tecla")];
            tecla.forEach(el => el.remove());

            alterarMusica();
        };
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
    function trocarDeMusica(e) {
        let alvo = e.target;
        if (alvo.classList.contains("opcaoDeMusica__items")) {

            document.getElementById("script-definir_ritmoParaTeclas").dataset.urlpararitmo = alvo.getAttribute('urldamusica');
            
            let wallpaper = document.getElementById("wallpaper");
            wallpaper.style.background = `url(${alvo.getAttribute('urldowallpaper')}) no-repeat center center / cover`;

            let disco = document.getElementById("disco");
            disco.style.background = `url(${alvo.getAttribute('urldodisco')}) no-repeat center center / cover`; 

            musicAtual = alvo.getAttribute('urldamusica');

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

    requisitarMusicas();
};

window.addEventListener('play', play)
function play() {
    setTimeout(() => {
        let btnPausar = document.getElementById("iconPauseOuContinue");
        if (btnPausar.dataset.pause == 'true') {
            alternarEntrePauseContinue(btnPausar);
            pausarOuContinuarAnimacao(btnPausar);

            let mensagem = new CustomEvent('restart', {detail: 'restart'}); 
            dispatchEvent(mensagem);

            let tecla = [...document.getElementsByClassName("tecla")];
            tecla.forEach(el => el.remove());

            setTimeout(alterarMusica, 1000);
        } else {
            let mensagem = new CustomEvent('restart', {detail: 'restart'});
            dispatchEvent(mensagem);

            let tecla = [...document.getElementsByClassName("tecla")];
            tecla.forEach(el => el.remove());

            setTimeout(alterarMusica, 1000);
        };
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
