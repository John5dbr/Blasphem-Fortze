export class umaOitava extends HTMLElement {
    constructor() {
        super();

        let shadowDOM = this.attachShadow({ mode: 'open' });

        let html = document.createElement('span');
        html.innerHTML = `
            <style>
                /* ============ Estilização Das Teclas ============ */

                #PrimeiraOitava {
                    display: flex;
                    flex-flow: row nowrap;

                    position: relative;
                }

                .teclaPreta {
                    position: absolute;
                    z-index: 1  ;

                    height: 80px;
                    width: 30px;

                    transition: all 0.1s linear 0s;
                    background: black;  

                    border: 1px solid black;
                }
                #doSust {
                    left: 35px;
                }
                #reSust {
                    left: 90px;
                }
                #faSust {
                    left: 190px;
                }
                #solSust {
                    left: 245px;
                }
                #laSust {
                    left: 295px;
                }

                .teclaBranca {
                    height: 175px;
                    width: 50px;

                    transition: all 0.1s linear 0s;
                    background: white;

                    border: 1px solid black;
                }

                .teclaPressionada {   
                    transform: perspective(600px) rotateX(-10deg);
                }
            </style>

            <span id="PrimeiraOitava">
                <span class="tecla teclaBranca" id="do"></span>
                <span class="tecla teclaPreta" id="doSust"></span>
                <span class="tecla teclaBranca" id="re"></span>
                <span class="tecla teclaPreta" id="reSust"></span>
                <span class="tecla teclaBranca" id="mi"></span>
                <span class="tecla teclaBranca" id="fa"></span>
                <span class="tecla teclaPreta" id="faSust"></span>
                <span class="tecla teclaBranca" id="sol"></span>
                <span class="tecla teclaPreta" id="solSust"></span>
                <span class="tecla teclaBranca" id="la"></span>
                <span class="tecla teclaPreta" id="laSust"></span>
                <span class="tecla teclaBranca" id="si"></span>
            </span>
        `;

        shadowDOM.append(html);
    };



    connectedCallback() {
        let notas = {
            do: new Audio('../codigoCentral/Recursos/Audio/UmOitava/do.mp3'),
            doSust: new Audio('../codigoCentral/Recursos/Audio/UmOitava/doSust.mp3'),
            re: new Audio('../codigoCentral/Recursos/Audio/UmOitava/re.mp3'),
            reSust: new Audio('../codigoCentral/Recursos/Audio/UmOitava/reSust.mp3'),
            mi: new Audio('../codigoCentral/Recursos/Audio/UmOitava/mi.mp3'),
            fa: new Audio('../codigoCentral/Recursos/Audio/UmOitava/fa.mp3'),
            faSust: new Audio('../codigoCentral/Recursos/Audio/UmOitava/faSust.mp3'),
            sol: new Audio('../codigoCentral/Recursos/Audio/UmOitava/sol.mp3'),
            solSust: new Audio('../codigoCentral/Recursos/Audio/UmOitava/solSust.mp3'),
            la: new Audio('../codigoCentral/Recursos/Audio/UmOitava/la.mp3'),
            laSust: new Audio('../codigoCentral/Recursos/Audio/UmOitava/laSust.mp3'),
            si: new Audio('../codigoCentral/Recursos/Audio/UmOitava/si.mp3')
        };

        // Seleção das teclas presente nesssa oitava.
        let teclas = this.shadowRoot.querySelector('#PrimeiraOitava');
        teclas.addEventListener('mousedown', pressionarTecla);

        // Expressar som após uma tecla ser pressionada.
        function expressarSom(teclaPressionada) {
            teclaPressionada.currentTime = 0;
            teclaPressionada.play();
        };

        // Interronper som após uma tecla não ser mais pressionada.
        function interronterSom(teclaPressionada) {
            teclaPressionada.pause();
        };

        // O deve ocorrer caso haja clique em alguma dessas teclas da oitava.
        function pressionarTecla(event) {
            let elementoClicado = event.target;
            
            if (elementoClicado.classList.contains('tecla')) {
                elementoClicado.classList.add('teclaPressionada');
            };

            if (elementoClicado.getAttribute('id') === 'do') {
                expressarSom(notas.do);
            } else if (elementoClicado.getAttribute('id') === 'doSust') {
                expressarSom(notas.doSust);
            } else if (elementoClicado.getAttribute('id') === 're') {
                expressarSom(notas.re);
            } else if (elementoClicado.getAttribute('id') === 'reSust') {
                expressarSom(notas.reSust);
            } else if (elementoClicado.getAttribute('id') === 'mi') {
                expressarSom(notas.mi);
            } else if (elementoClicado.getAttribute('id') === 'fa') {
                expressarSom(notas.fa);
            } else if (elementoClicado.getAttribute('id') === 'faSust') {
                expressarSom(notas.faSust);
            } else if (elementoClicado.getAttribute('id') === 'sol') {
                expressarSom(notas.sol);
            } else if (elementoClicado.getAttribute('id') === 'solSust') {
                expressarSom(notas.solSust);
            } else if (elementoClicado.getAttribute('id') === 'la') {
                expressarSom(notas.la);
            } else if (elementoClicado.getAttribute('id') === 'laSust') {
                expressarSom(notas.laSust);
            } else if (elementoClicado.getAttribute('id') === 'si') {
                expressarSom(notas.si);
            } 
        };

        // O deve ocorrer caso a tecla dessa oitava seja soltada.
        teclas.addEventListener('mouseup', soltarTecla);
        function soltarTecla(event) {
            let elementoClicado = event.target;
            
            if (elementoClicado.classList.contains('tecla')) {
                elementoClicado.classList.remove('teclaPressionada');
            };

            if (elementoClicado.getAttribute('id') === 'do') {
                interronterSom(notas.do);
            } else if (elementoClicado.getAttribute('id') === 'doSust') {
                interronterSom(notas.doSust);
            } else if (elementoClicado.getAttribute('id') === 're') {
                interronterSom(notas.re);
            } else if (elementoClicado.getAttribute('id') === 'reSust') {
                interronterSom(notas.reSust);
            } else if (elementoClicado.getAttribute('id') === 'mi') {
                interronterSom(notas.mi);
            } else if (elementoClicado.getAttribute('id') === 'fa') {
                interronterSom(notas.fa);
            } else if (elementoClicado.getAttribute('id') === 'faSust') {
                interronterSom(notas.faSust);
            } else if (elementoClicado.getAttribute('id') === 'sol') {
                interronterSom(notas.sol);
            } else if (elementoClicado.getAttribute('id') === 'solSust') {
                interronterSom(notas.solSust);
            } else if (elementoClicado.getAttribute('id') === 'la') {
                interronterSom(notas.la);
            } else if (elementoClicado.getAttribute('id') === 'laSust') {
                interronterSom(notas.laSust);
            } else if (elementoClicado.getAttribute('id') === 'si') {
                interronterSom(notas.si);
            } 
        };

        // O deve ocorrer caso o mouse saia de alguma das teclas dessa oitava.
        teclas.addEventListener('mouseout', saiuDaTecla);
        function saiuDaTecla(event) {
            let elementoClicado = event.target;

            elementoClicado.classList.remove('teclaPressionada');
        };
    };
};