export class visualDoPiano001 extends HTMLElement {
    constructor() {
        super();

        let shadowDOM = this.attachShadow({ mode: 'open' });

        let html = document.createElement('div');
        html.innerHTML = `
            <style>
                /* ============ Estilização Visual do Piano ============ */

                :host {
                    z-index: 1;
                }

                #piano {
                    display: inline-block;
                    padding: 100px 50px 10px 50px;

                    background: gray;
                }

                #teclas { 
                    display: flex;
                    flex-flow: row nowrap;
                }
            </style>
            
            <div id="piano">
                <div id="teclas">
                    <slot name="oitavas"><slot>
                </div>
            </div>
        `;

        shadowDOM.append(html);
    };

    connectedCallback() {
        let teclas = document.querySelector('span');
        teclas.style.display = `flex`;
    };
};