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

let inforsDasMusicas = null;
let quantDeTeclas_Dific_MaxPont = null;

// FUNÇÔES BÁSICAS:

window.addEventListener('DOMContentLoaded', inicializarFuncoesBasicas);
async function inicializarFuncoesBasicas() { 
    let wallpapperPiano = document.getElementById('secTestePiano__wallpaper');
    wallpapperPiano.addEventListener('mousemove', efeitoParallax);
    function efeitoParallax(event) {
        let x = event.clientX - window.innerWidth / 2;
        let y = event.clientY - window.innerHeight / 2;
        wallpapperPiano.style.transform = `translate(${-x / 10}px, ${-y / 10}px) scale(110%)`
    };

    let elementoParaInformarCopia = document.getElementById('elementoParaInformarCopia');
    let aparecendoElementoParaInformar = false;
    let email_Telef = [];
    email_Telef.push(document.getElementById('email')); 
    email_Telef.push(document.getElementById('telefone')); 
    email_Telef.forEach(el => {
        el.addEventListener('click', (e) => {
            e.preventDefault();
            let url = el.dataset.url;          
            try {
                if (aparecendoElementoParaInformar) {
                    return;
                } else {
                    aparecendoElementoParaInformar = true;
                    navigator.clipboard.writeText(url);
                    elementoParaInformarCopia.classList.add('elementoParaInformarCopia-aparecendo');
                    setTimeout(() => {
                        aparecendoElementoParaInformar = false;
                        elementoParaInformarCopia.classList.remove('elementoParaInformarCopia-aparecendo');
                    }, 5000);
                };
            } catch(error) {
                console.error(`Falha na cópia do ${el} - ${error}`);
            };
        });
    });

    
    async function requisitandoMusicas() {
        let url = '../Musicas/registrosDeMusicas.json';
        try {
            let dadosDasMusicas = await fetch(url);
            if (dadosDasMusicas.ok) {
                dadosDasMusicas = await dadosDasMusicas.json();
                inforsDasMusicas = dadosDasMusicas;
                preenchendoCardsDasMusicas(inforsDasMusicas);
            } else {
                throw new TypeError();
            };
        } catch(e) {
            console.error(`Falha na requisição dos dados das músicas salvas em registroDeMusicas.json - ${e}`);
        };
    } requisitandoMusicas();
    
    async function obtendoQuantDeTec_Dific_MaxPont(url) {
        let resposta = await fetch(url);
        if (resposta.ok) {
            resposta = await resposta.json();
        };

        let quantDeTeclas = resposta.length;

        let dific = null;
        if (quantDeTeclas <= 75) {
            dific = 'Easy';
        } else if (quantDeTeclas >= 76 && quantDeTeclas <= 150) {
            dific = 'Medium';
        } else {
            dific = 'Hard';
        };

        let maxPont = quantDeTeclas * 2;
        resposta.forEach(el => { if (el.pressaoDeClique === 4) { maxPont += 2 }});

        return [quantDeTeclas, dific, maxPont];
    };

    function preenchendoCardsDasMusicas(inforsDasMusicas) {
        let cards = [...document.querySelectorAll('.mnSelecaoDeMusica__abaOpcaoDeMusicas__musica')];
        cards.forEach(async (el, ind) => {
            quantDeTeclas_Dific_MaxPont = await obtendoQuantDeTec_Dific_MaxPont(inforsDasMusicas[ind].urlDaMusica);

            let img = el.querySelector('.musica__img');
            img.style.background = `url('${inforsDasMusicas[ind].urlDoWallpaper}') no-repeat center center / cover`;

            let disco = el.querySelector('.principal__disco');
            disco.style.background = `url('${inforsDasMusicas[ind].urlDoDisco}') no-repeat center center / cover`;

            let nome = el.querySelector('.musica__txt__nomeDaMusica');
            nome.innerText = `${inforsDasMusicas[ind].nomeDaMusica}`;

            let dific = el.querySelectorAll('.musica__txt__dados')[0];
            dific.innerText = `Dificuldade: ${quantDeTeclas_Dific_MaxPont[1]}`;

            let maxPont = el.querySelectorAll('.musica__txt__dados')[1];
            maxPont.innerText = `Pontuação Máxima: ${quantDeTeclas_Dific_MaxPont[2]}`;

            let duracao = el.querySelectorAll('.musica__txt__dados')[2];
            duracao.innerText = `Duração: ${inforsDasMusicas[ind].duracao}`;

            let QuantDeTec = el.querySelectorAll('.musica__txt__dados')[3];
            QuantDeTec.innerText = `Quant. de Teclas: ${quantDeTeclas_Dific_MaxPont[0]}`;
        });
    };

    let cardsDasMusicas = [...document.querySelectorAll('.mnSelecaoDeMusica__abaOpcaoDeMusicas__musica')];
    cardsDasMusicas.forEach((el, ind) => {
        el.addEventListener('click', () => {
            let dados = {
                cor: inforsDasMusicas[ind].cor,
                urldalogo: inforsDasMusicas[ind].urlDaLogo,
                nomedamusica: inforsDasMusicas[ind].nomeDaMusica,
                urldamusica: inforsDasMusicas[ind].urlDaMusica,
                urldowallpaper: inforsDasMusicas[ind].urlDoWallpaper,
                urldodisco: inforsDasMusicas[ind].urlDoDisco,
                urldafonte: inforsDasMusicas[ind].urlDaFonte,
                urldamusicatocada: inforsDasMusicas[ind].urlDaMusicaTocada,
                duracao: inforsDasMusicas[ind].duracao,
                dific: quantDeTeclas_Dific_MaxPont[1],
                maxPont: quantDeTeclas_Dific_MaxPont[2],
                quantDeTeclas: quantDeTeclas_Dific_MaxPont[0] 
            };
            localStorage.setItem('dadosDaMusicaPadrao', JSON.stringify(dados));

            cardsDasMusicas.forEach(el => el.style.border = `none`);
            el.style.border = `2px solid green`;
        });
    });

    window.addEventListener('scroll', () => {
        let nav = document.getElementById('nav');
        if (window.scrollY >= 590) {
            nav.classList.add('nav-aparecendo');
        } else {
            nav.classList.remove('nav-aparecendo');
        }
    });
};