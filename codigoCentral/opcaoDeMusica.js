export class OpcaoDeMusica extends HTMLElement {
    constructor() {
        super();

        let shadowDOM = this.attachShadow({ mode: 'open' });

        let html = document.createElement('div');
        html.innerHTML = `
            <style>
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
                    margin: 0px 15px 0px 0px;
                }
            </style>

            <section class="areaDeMusicas__items">
                <div id="lista" class="areaDeMusicas__opcaoDeMusica--elementoDeEfeitoHover"></div>
                <img src="../EstruturaVisual/Recursos/imgDasMusicas/img-music001.png" alt="logoMusic" class="areaDeMusicas__opcaoDeMusica__logoMusic">
                <p class="areaDeMusicas__opcaoDeMusica__p"></p>
                <img src="../EstruturaVisual/Recursos/Icones/icone-Play.svg" alt="iconPlay" class="areaDeMusicas__opcaoDeMusica__icon">
            </section>
        `;

        shadowDOM.append(html);
    };

    static get observedAttributes() {
        return ['cor', 'url-da-logo', 'nome-da-musica'];
    };

    attributeChangedCallback(atributo, antigoAtr, novoAtr) {
        if (atributo === 'cor') {
            this.alterarCorDeElementoHover(novoAtr);
        } else if (atributo === 'url-da-logo') {
            this.alterarUrlDaLogo(novoAtr);
        } else if (atributo === 'nome-da-musica') {
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
        console.log('Entrou');
    };
};