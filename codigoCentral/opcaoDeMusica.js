export class OpcaoDeMusica extends HTMLElement {
    constructor() {
        super();

        let shadowDOM = this.attachShadow({ mode: 'open' });

        let html = document.createElement('div');
        html.innerHTML = `
            <style>
                :host {
                    z-index: -1;
                }

                .areaDeMusicas__items {
                    display: flex;
                    flex-flow: row nowrap;
                    justify-content: space-between;
                    align-items: center;
                    gap: 10px;

                    position: relative;
                    padding: 0px 0px 0px 5px;
                    margin: 0px 0px 0px 10px;

                    transition: all 0.3s ease-in 0s;
                    overflow: hidden;
                    border-radius: 10px;

                    width: 335px;
                }
                .areaDeMusicas__items:hover {
                    background: #56565673 ;
                }
                .areaDeMusicas__items:hover > .areaDeMusicas__opcaoDeMusica--elementoDeEfeitoHover {
                    left: 0px;
                }
                .areaDeMusicas__opcaoDeMusica--elementoDeEfeitoHover {
                    width: 5px;
                    height: 100%;

                    position: absolute;
                    left: -10px;

                    transition: all 0.3s ease-in 0s;
                }

                .areaDeMusicas__opcaoDeMusica__logoMusic {
                    width: 65px;
                    height: 40px;
                }
                .areaDeMusicas__opcaoDeMusica__p {
                    width: 80%;

                    color: rgba(255, 255, 255, 0.75);
                    font: normal normal 0.9em 'Montserrat';
                }
                .areaDeMusicas__opcaoDeMusica__icon {
                    width: 8%;
                    padding: 7px;
                    margin: 0px 15px 0px 0px;
                    transition: all 0.3s ease-in 0s;
                    border-radius: 100px;
                }
                .areaDeMusicas__opcaoDeMusica__icon:hover {
                    background: #56565673; 
                }   
            </style>

            <section class="areaDeMusicas__items">
                <div id="lista" class="areaDeMusicas__opcaoDeMusica--elementoDeEfeitoHover"></div>
                <img src="" alt="logoMusic" class="areaDeMusicas__opcaoDeMusica__logoMusic">
                <p class="areaDeMusicas__opcaoDeMusica__p"></p>
                <img id="iconPlay" src="../codigoCentral/Recursos/Icones/icone-Play.svg" alt="iconPlay" class="areaDeMusicas__opcaoDeMusica__icon">
            </section>
        `;

        shadowDOM.append(html);
    };

    static get observedAttributes() {
        return ['cor', 'urldalogo', 'nomedamusica'];
    };

    attributeChangedCallback(atributo, antigoAtr, novoAtr) {
        if (atributo === 'cor') {
            this.alterarCorDeElementoHover(novoAtr);
        } else if (atributo === 'urldalogo') {
            this.alterarUrlDaLogo(novoAtr);
        } else if (atributo === 'nomedamusica') {
            this.alterarTituloDaMusica(novoAtr);
        };
    };  

    alterarCorDeElementoHover(cor) {
        let elemento = this.shadowRoot.querySelector(".areaDeMusicas__opcaoDeMusica--elementoDeEfeitoHover");
        elemento.style.background = `${cor}`;
    }
    alterarUrlDaLogo(url) {
        let logo = this.shadowRoot.querySelector(".areaDeMusicas__opcaoDeMusica__logoMusic");
        logo.setAttribute('src', `${url}`);
    }
    alterarTituloDaMusica(nome) {
        let titulo = this.shadowRoot.querySelector(".areaDeMusicas__opcaoDeMusica__p");
        
        if (nome.length <= 25) {
            titulo.innerText = `${nome}`;
        } else if (nome.length >= 26) {
            for (let cont = 0; cont <= 20 ; cont++) {
                titulo.innerHTML += `${nome[cont]}`; 
            };
            titulo.innerText += `...`;
        };
    }

    connectedCallback() {
        let iconPlay = this.shadowRoot.querySelector('#iconPlay');
        iconPlay.addEventListener('click', iniciarJogo);
        function iniciarJogo(e) {
            let alvo = e.target;

            document.getElementById("script-definir_ritmoParaTeclas").dataset.urlpararitmo = alvo.getAttribute('urldamusica');

            let wallpaper = document.getElementById("wallpaper");
            wallpaper.style.background = `url(${alvo.getAttribute('urldowallpaper')}) no-repeat center center / cover`;

            let disco = document.getElementById("disco");
            disco.style.background = `url(${alvo.getAttribute('urldodisco')}) no-repeat center center / cover`;

            let mensagem = new CustomEvent('play', {
                detail: 'play',
                composed: true,
                bubbles: false 
            });

            dispatchEvent(mensagem);
        };
    };
};