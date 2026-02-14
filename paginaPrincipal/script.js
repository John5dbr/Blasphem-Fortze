import { visualDoPiano001 } from "../codigoCentral/visuaisDoPiano.js";
import { umaOitava } from "../codigoCentral/umaOitava.js";
import { doisOitava } from "../codigoCentral/doisOitava.js";

customElements.define('uma-oitava', umaOitava);
customElements.define('dois-oitava', doisOitava);
customElements.define('piano-001', visualDoPiano001);

/*
let teclas = document.getElementById('teclas');
teclas.addEventListener('mousedown', pressionarTecla);
function pressionarTecla(event) {
    let elementoClicado = event.target;
    
    if (elementoClicado.classList.contains('tecla')) {
        elementoClicado.classList.toggle('teclaPressionada');
    };
};
teclas.addEventListener('mouseup', soltarTecla);
function soltarTecla(event) {
    let elementoClicado = event.target;
    
    if (elementoClicado.classList.contains('tecla')) {
        elementoClicado.classList.toggle('teclaPressionada');
    };
};
teclas.addEventListener('mouseout', saiuDaTecla);
function saiuDaTecla(event) {
    let elementoClicado = event.target;

    elementoClicado.classList.remove('teclaPressionada');
};
*/