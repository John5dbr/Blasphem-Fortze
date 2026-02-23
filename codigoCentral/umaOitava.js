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

                    background: black;

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
                #reB {
                    left: 35px;
                }
                #miB {
                    left: 90px;
                }
                #solB {
                    left: 190px;
                }
                #laB {
                    left: 245px;
                }
                #siB {
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
                <span class="tecla teclaPreta" id="reB"></span>
                <span class="tecla teclaBranca" id="re"></span>
                <span class="tecla teclaPreta" id="miB"></span>
                <span class="tecla teclaBranca" id="mi"></span>
                <span class="tecla teclaBranca" id="fa"></span>
                <span class="tecla teclaPreta" id="solB"></span>
                <span class="tecla teclaBranca" id="sol"></span>
                <span class="tecla teclaPreta" id="laB"></span>
                <span class="tecla teclaBranca" id="la"></span>
                <span class="tecla teclaPreta" id="siB"></span>
                <span class="tecla teclaBranca" id="si"></span>
            </span>
        `;

        shadowDOM.append(html);
    };

    connectedCallback() {
        let notas = {
            do: new Audio('../codigoCentral/Recursos/Audio/UmOitava/C1.mp3'),
            reB: new Audio('../codigoCentral/Recursos/Audio/UmOitava/Db1.mp3'),
            re: new Audio('../codigoCentral/Recursos/Audio/UmOitava/D1.mp3'),
            miB: new Audio('../codigoCentral/Recursos/Audio/UmOitava/Eb1.mp3'),
            mi: new Audio('../codigoCentral/Recursos/Audio/UmOitava/E1.mp3'),
            fa: new Audio('../codigoCentral/Recursos/Audio/UmOitava/F1.mp3'),
            solB: new Audio('../codigoCentral/Recursos/Audio/UmOitava/Gb1.mp3'),
            sol: new Audio('../codigoCentral/Recursos/Audio/UmOitava/G1.mp3'),
            laB: new Audio('../codigoCentral/Recursos/Audio/UmOitava/Ab1.mp3'),
            la: new Audio('../codigoCentral/Recursos/Audio/UmOitava/A1.mp3'),
            siB: new Audio('../codigoCentral/Recursos/Audio/UmOitava/Bb1.mp3'),
            si: new Audio('../codigoCentral/Recursos/Audio/UmOitava/B1.mp3')
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
 
        // Aplica estilização quando a tecla é pressionada.
        function aplicarEfeitoVisualDeTeclaPrecionada(tecla) {
            if (tecla.classList.contains('tecla')) {
                tecla.classList.add('teclaPressionada');
            };
        };

        // Retira estilização quando a tecla deixa de ser pressionada.
        function retirarAplicaçãoDeEfeitoVisualDeTeclaPrecionada(tecla) {
            if (tecla.classList.contains('tecla')) {
                tecla.classList.remove('teclaPressionada');
            };
        };

        // O deve ocorrer caso haja clique em alguma dessas teclas da oitava.
        function pressionarTecla(event) {
            let elementoClicado = event.target;
            
            aplicarEfeitoVisualDeTeclaPrecionada(elementoClicado);

            if (elementoClicado.getAttribute('id') === 'do') {
                expressarSom(notas.do);
            } else if (elementoClicado.getAttribute('id') === 'reB') {
                expressarSom(notas.reB);
            } else if (elementoClicado.getAttribute('id') === 're') {
                expressarSom(notas.re);
            } else if (elementoClicado.getAttribute('id') === 'miB') {
                expressarSom(notas.miB);
            } else if (elementoClicado.getAttribute('id') === 'mi') {
                expressarSom(notas.mi);
            } else if (elementoClicado.getAttribute('id') === 'fa') {
                expressarSom(notas.fa);
            } else if (elementoClicado.getAttribute('id') === 'solB') {
                expressarSom(notas.solB);
            } else if (elementoClicado.getAttribute('id') === 'sol') {
                expressarSom(notas.sol);
            } else if (elementoClicado.getAttribute('id') === 'laB') {
                expressarSom(notas.laB);
            } else if (elementoClicado.getAttribute('id') === 'la') {
                expressarSom(notas.la);
            } else if (elementoClicado.getAttribute('id') === 'siB') {
                expressarSom(notas.siB);
            } else if (elementoClicado.getAttribute('id') === 'si') {
                expressarSom(notas.si);
            } 
        };

        // O deve ocorrer caso a tecla dessa oitava seja soltada.
        teclas.addEventListener('mouseup', soltarTecla);
        function soltarTecla(event) {
            let elementoClicado = event.target;    
            retirarAplicaçãoDeEfeitoVisualDeTeclaPrecionada(elementoClicado);

            if (elementoClicado.getAttribute('id') === 'do') {
                interronterSom(notas.do);
            } else if (elementoClicado.getAttribute('id') === 'reB') {
                interronterSom(notas.reB);
            } else if (elementoClicado.getAttribute('id') === 're') {
                interronterSom(notas.re);
            } else if (elementoClicado.getAttribute('id') === 'miB') {
                interronterSom(notas.miB);
            } else if (elementoClicado.getAttribute('id') === 'mi') {
                interronterSom(notas.mi);
            } else if (elementoClicado.getAttribute('id') === 'fa') {
                interronterSom(notas.fa);
            } else if (elementoClicado.getAttribute('id') === 'solB') {
                interronterSom(notas.solB);
            } else if (elementoClicado.getAttribute('id') === 'sol') {
                interronterSom(notas.sol);
            } else if (elementoClicado.getAttribute('id') === 'laB') {
                interronterSom(notas.laB);
            } else if (elementoClicado.getAttribute('id') === 'la') {
                interronterSom(notas.la);
            } else if (elementoClicado.getAttribute('id') === 'siB') {
                interronterSom(notas.siB);
            } else if (elementoClicado.getAttribute('id') === 'si') {
                interronterSom(notas.si);
            } 
        };

        // O deve ocorrer caso o mouse saia de alguma das teclas dessa oitava.
        teclas.addEventListener('mouseout', saiuDaTecla);
        function saiuDaTecla(event) {
            let tecla = event.target;
            retirarAplicaçãoDeEfeitoVisualDeTeclaPrecionada(tecla);

            if (tecla.getAttribute('id') === 'do') {
                interronterSom(notas.do);
            } else if (tecla.getAttribute('id') === 'reB') {
                interronterSom(notas.reB);
            } else if (tecla.getAttribute('id') === 're') {
                interronterSom(notas.re);
            } else if (tecla.getAttribute('id') === 'miB') {
                interronterSom(notas.miB);
            } else if (tecla.getAttribute('id') === 'mi') {
                interronterSom(notas.mi);
            } else if (tecla.getAttribute('id') === 'fa') {
                interronterSom(notas.fa);
            } else if (tecla.getAttribute('id') === 'solB') {
                interronterSom(notas.solB);
            } else if (tecla.getAttribute('id') === 'sol') {
                interronterSom(notas.sol);
            } else if (tecla.getAttribute('id') === 'laB') {
                interronterSom(notas.laB);
            } else if (tecla.getAttribute('id') === 'la') {
                interronterSom(notas.la);
            } else if (tecla.getAttribute('id') === 'siB') {
                interronterSom(notas.siB);
            } else if (tecla.getAttribute('id') === 'si') {
                interronterSom(notas.si);
            } 
        };

        // Lista que botões do teclado aceitos para a teclas do piano.
        let botoes = [
            'q',
            '2',
            'w',
            '3',
            'e',
            'r',
            '5',
            't',
            '6',
            'y',
            '7',
            'u'
        ];

        // Função responsável por identificar qual tecla foi clicada bom base no botão do teclado.
        function identificarNotaPeloBotao(botaoClicado) {
            let notaMusical = Object.entries(notas);
            let notaIdentificada = notaMusical.find((el, ind) => {return botoes[ind] === botaoClicado});
            return notaIdentificada;
        };

        // O que deve ocorrer quando um botao válido for clicado.
        window.addEventListener('keydown', (event) => {
            let teclaMuitoPressionada = event.repeat;

            if (!teclaMuitoPressionada) {
                let botaoClicado = event.key;

                let botaoValido = botoes.some(el => el === botaoClicado);

                if (botaoValido) {
                    let tecla = identificarNotaPeloBotao(botaoClicado);
                    let elementoDaTecla = this.shadowRoot.querySelector(`#${tecla[0]}`);
                    aplicarEfeitoVisualDeTeclaPrecionada(elementoDaTecla);
                    expressarSom(tecla[1]);
                };
            };

        });
        
        // O que deve ocorrer quando um botao válido não for mais clicado.
        window.addEventListener('keyup', (event) => {
            let botaoClicado = event.key;

            let botaoValido = botoes.some(el => el === botaoClicado);

            if (botaoValido) {
                let tecla = identificarNotaPeloBotao(botaoClicado);
                let elementoDaTecla = this.shadowRoot.querySelector(`#${tecla[0]}`);
                retirarAplicaçãoDeEfeitoVisualDeTeclaPrecionada(elementoDaTecla);
                interronterSom(tecla[1]);
            };
        });

    };
};

