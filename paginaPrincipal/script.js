import { visualDoPiano001 } from "../codigoCentral/visuaisDoPiano.js";
import { umaOitava } from "../codigoCentral/umaOitava.js";
import { doisOitava } from "../codigoCentral/doisOitava.js";

customElements.define('uma-oitava', umaOitava);
customElements.define('dois-oitava', doisOitava);
customElements.define('piano-001', visualDoPiano001);

let rotaParaAsNotas = document.getElementById('rotaParaAsNotas');

window.addEventListener('DOMContentLoaded', alterarMusica);
rotaParaAsNotas.addEventListener('click', alterarMusica);
function alterarMusica() {
    let url = document.getElementById('script-definir_ritmoParaTeclas').dataset.urlpararitmo;

    let mensagem = new CustomEvent('enviandoURL', {
        detail: url
    });

    dispatchEvent(mensagem);
};
