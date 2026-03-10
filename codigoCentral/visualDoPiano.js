export class visualDoPiano extends HTMLElement {
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
                    padding: 98px 48px 8px 48px;
                    border: 2px solid black;

                    background: rgb(85, 85, 85, 0.0);
                    box-shadow: 0px 0px 25px rgb(0, 0, 0, 0.25);
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