window.addEventListener('DOMContentLoaded', () => {
    let elementoParaTransicao = document.getElementById('elementoDeTransicao');
    elementoParaTransicao.style.height = '0%';

    try {
        let linkNaPaginaInicial = document.querySelector('.linkNaPaginaInicial');
        linkNaPaginaInicial.addEventListener('click', (e) => {
            e.preventDefault();

            let dadosSalvos = localStorage.getItem('dadosDaMusicaPadrao'); 

            if (dadosSalvos === null || dadosSalvos === '') {
                document.getElementById('mnSelecaoDeMusica').scrollIntoView();
            } else {
                let elementoParaTransicao = document.getElementById('elementoDeTransicao');
                elementoParaTransicao.style.height = '100%';

                setTimeout(() => { 
                    window.location.replace('../paginaDeJogo/index.html'); 
                }, 1500); 
            };
        }); 
    } catch(e) {
        console.error('Falha na transição - Página Inicial ~> Página Jogo - ' + e);
    };

    try {
        let linkNaPaginaJogo = document.querySelector('#iconHome');
        linkNaPaginaJogo.addEventListener('click', (e) => {
            e.preventDefault();

            let elementoParaTransicao = document.getElementById('elementoDeTransicao');
            elementoParaTransicao.style.height = '100%';

            setTimeout(() => {
                window.location.replace('../paginaInicial/index.html');
            }, 1250);
        }); 
    } catch(e) {
        console.error('Falha na transição - Página Jogo ~> Página Inicial - ' + e);
    };
});