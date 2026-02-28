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

    let mensagem = new CustomEvent('enviandoURL', {
        detail: url
    });

    dispatchEvent(mensagem);
};
/* ======================================================================================= */

window.addEventListener('DOMContentLoaded', inicializarFuncoesBasicas);
function inicializarFuncoesBasicas(event) {
    
    /* ======================================================================================= */
    let rotaParaAsNotas = document.getElementById('rotaParaAsNotas');
    rotaParaAsNotas.addEventListener('click', alterarMusica);
    /* ======================================================================================= */

    let elementoParaFazerAparecer = document.getElementById("elementoParaFazerAparecer");
    elementoParaFazerAparecer.addEventListener('mouseenter', () => {
        let abaParaMusicas = document.getElementById("abaParaMusicas");
        fazerAbaDeMusicaAparecer(abaParaMusicas); 
    });

    async function requisitarMusicas() {
        let registros = await fetch('../codigoCentral/registrosDeMusicas.json');
        try {
            if (registros.ok) {
                let registrosEmJson = await registros.json();
                console.log(registrosEmJson)
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
    function gerarCustomElement(infors) {
        let abaParaMusicas = document.getElementById("abaParaMusicas");

        let englobador = document.createDocumentFragment();

        infors.forEach(el => {
            let elemento = document.createElement('opcao-musica');
            elemento.setAttribute('cor', el.corDoElemento);
            elemento.setAttribute('url-da-logo', el.urlDaLogo);
            elemento.setAttribute('nome-da-musica', el.nomeDaMusica);

            englobador.append(elemento);
        });
        
        abaParaMusicas.append(englobador);
    };
    requisitarMusicas();
    
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
