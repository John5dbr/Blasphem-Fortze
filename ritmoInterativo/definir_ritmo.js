let rotaParaAsNotas = document.getElementById("rotaParaAsNotas");

function inserindoTeclaNoDOM(tecla, nota, tempoParaAparecer, pressaoDeClique) {
    tempoParaAparecer *= 1000;
    let elemento = gerandoTecla(nota, pressaoDeClique);
    setTimeout(() => {
        rotaParaAsNotas.prepend(elemento);
    }, tempoParaAparecer)
    animacaoComRitmo(elemento, tempoParaAparecer);
};

function gerandoTecla_DefinindoCor(nota) {
    let cor = nota.length;
    if (cor === 2) {
        return 'branca';
    } else if (cor === 3) {
        return 'preta';
    };
};

function gerandoTecla(nota, pressaoDeClique) {
    let cor = gerandoTecla_DefinindoCor(nota);

    let elemento = document.createElement("div");
    elemento.style.cssText = `
        display: flex;
        justify-content: center;
        align-items: center;
        font: normal bold 1.5em arial;
        position: absolute;
        top: -174px;`;

    if (cor === 'preta') {
        elemento.style.cssText += `
            width: 30px;
            
            background: black;
            color: white;
            border: 1px solid black;
            
            z-index: 1;`;

        if (pressaoDeClique == 2) {
            elemento.style.height = `60px`;
        } else if (pressaoDeClique == 1) {
            elemento.style.height = `30px`;
        } else {
            elemento.style.height = `30px`;
        }

        if (nota === "Db1") {
            elemento.innerText = `2`;
            elemento.style.left = `85px`;
        } else if (nota === "Eb1") {
            elemento.innerText = `3`;
            elemento.style.left = `140px`;
        } else if (nota === "Gb1") {
            elemento.innerText = `5`;
            elemento.style.left = `240px`;
        } else if (nota === "Ab1") {
            elemento.innerText = `6`;
            elemento.style.left = `295px`;
        } else if (nota === "Bb1") {
            elemento.innerText = `7`;
            elemento.style.left = `345px`;
        } else if (nota === "Db2") {
            // Onde começa as notas da segunda oitava
            elemento.innerText = `S`;
            elemento.style.left = `449px`;
        } else if (nota === "Eb2") {
            elemento.innerText = `D`;
            elemento.style.left = `504px`;
        } else if (nota === "Gb2") {
            elemento.innerText = `G`;
            elemento.style.left = `604px`;
        } else if (nota === "Ab2") {
            elemento.innerText = `H`;
            elemento.style.left = `659px`;
        } else if (nota === "Bb2") {
            elemento.innerText = `J`;
            elemento.style.left = `709px`;
        }

    } else if (cor === 'branca') {
        elemento.style.cssText += `
            width: 50px;
            
            background: white;
            color: black;
            border: 2px solid black;
            
            z-index: 0;`;

        if (pressaoDeClique == 4) {
            elemento.style.height = `160px`;
        } else if (pressaoDeClique == 3) {
            elemento.style.height = `100px`;
        } else if (pressaoDeClique == 2) {
            elemento.style.height = `70px`;
        } else if (pressaoDeClique == 1) {
            elemento.style.height = `30px`;
        } else {
            elemento.style.height = `30px`;
        }

        if (nota === "C1") {
            elemento.innerText = `Q`;
            elemento.style.left = `50px`;
        } else if (nota === "D1") {
            elemento.innerText = `W`;
            elemento.style.left = `102px`;
        } else if (nota === "E1") {
            elemento.innerText = `E`;
            elemento.style.left = `154px`;
        } else if (nota === "F1") {
            elemento.innerText = `R`;
            elemento.style.left = `206px`;
        } else if (nota === "G1") {
            elemento.innerText = `T`;
            elemento.style.left = `258px`;
        } else if (nota === "A1") {
            elemento.innerText = `Y`;
            elemento.style.left = `310px`;
        } else if (nota === "B1") {
            elemento.innerText = `U`;
            elemento.style.left = `361px`;
        } else if (nota === "C2") {
            // Segunda oitava
            elemento.innerText = `Z`;
            elemento.style.left = `413px`;
        } else if (nota === "D2") {
            elemento.innerText = `X`;
            elemento.style.left = `465px`;
        } else if (nota === "E2") {
            elemento.innerText = `C`;
            elemento.style.left = `517px`;
        } else if (nota === "F2") {
            elemento.innerText = `V`;
            elemento.style.left = `569px`;
        } else if (nota === "G2") {
            elemento.innerText = `B`;
            elemento.style.left = `621px`;
        } else if (nota === "A2") {
            elemento.innerText = `N`;
            elemento.style.left = `673px`;
        } else if (nota === "B2") {
            elemento.innerText = `M`;
            elemento.style.left = `724px`;
        }
    };
    
    return elemento;
};

function animacaoComRitmo_calculosParaResponsividade() {
    let alturaDaRotaParaAsNotas = rotaParaAsNotas.getBoundingClientRect().height;

    let limiteDeMovimento = alturaDaRotaParaAsNotas - 10;
    let tempoParaApagarElemento = alturaDaRotaParaAsNotas * 10;

    return { 
        limiteDeMovimento: limiteDeMovimento, 
        tempoParaApagarElemento: tempoParaApagarElemento
    };
};

function animacaoComRitmo(elemento, tempoParaAparecer) {
    let idAnimacao = null;
    let dadosParaResponsividade = animacaoComRitmo_calculosParaResponsividade();

    setTimeout(() => {
        let duracaoDoFramePassado = 0;
        let posicaoY = 0;

        function movendoTecla(duracaoDoFrameAtual) {
            let veloc = 100;
            
            let deltaTime = (duracaoDoFrameAtual - duracaoDoFramePassado) / 1000;
            duracaoDoFramePassado = duracaoDoFrameAtual;
            
            if (deltaTime < 1 && posicaoY <= dadosParaResponsividade.limiteDeMovimento) {
                posicaoY += veloc * deltaTime;
                elemento.style.transform = `translateY(${posicaoY}px)`;
            } else {
                cancelAnimationFrame(idAnimacao);
                setTimeout(()=>{
                    elemento.remove();
                }, dadosParaResponsividade.tempoParaApagarElemento);
            };

            requestAnimationFrame(movendoTecla);
        }; requestAnimationFrame(movendoTecla);
    
    }, tempoParaAparecer)
};

let ritmoDasTeclas;
async function carregarJsonDeRitmo(url) {
    try {
        let ritmo = await fetch(`${url}`);
        if (ritmo.ok) {
            ritmo = await ritmo.json();
        } else {
            throw new TypeError(`ERROR.`);
        }
        ritmoDasTeclas = ritmo;
        executandoArquivoJsonDeRitmo();
        console.log(`Requisição feita com exito.`);
    } catch(e) {
        console.log(`Falha em requisitar JSON de ritmo - ${e}`);
    } finally {
        console.log(`Requisição encerrada.`);
    }
}

function executandoArquivoJsonDeRitmo() {
    ritmoDasTeclas.forEach((el) => {
        inserindoTeclaNoDOM(el.tecla, el.nota, el.tempoParaAparecer, el.pressaoDeClique)
    })
};

window.addEventListener('enviandoURL', informandoURL);
async function informandoURL(el) {
    let url = el.detail;
    carregarJsonDeRitmo(url);
};
