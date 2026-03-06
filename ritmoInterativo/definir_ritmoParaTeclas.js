let interromperAnimacao = 'NaoInterromper';
window.addEventListener('verificandoPause', verificandoPause);
function verificandoPause(e) {
    interromperAnimacao = e.detail;

    if (interromperAnimacao == 'Interromper') {
        historicoDeTimeouts.forEach(el => {
            clearTimeout(el.id);
            el.tempoRestante = el.tempoRestante - (Date.now() - el.criadoEm);
        }); 
    } else if (interromperAnimacao == 'NaoInterromper') {
        historicoDeTimeouts.forEach(el => {
            el.id = setTimeout(el.fn, el.tempoRestante);
        });
    };
};

window.addEventListener('restart', limparSetTimeOuts);  
function limparSetTimeOuts() {
    historicoDeTimeouts.forEach(el => {
       clearTimeout(el.id);
    }); 
};

let rotaParaAsNotas = document.getElementById("rotaParaAsNotas");

function inserindoTeclaNoDOM(tecla, nota, tempoParaAparecer, pressaoDeClique) { 
    tempoParaAparecer *= 1000;
    let elemento = gerandoTecla(nota, pressaoDeClique); 

    function inserirElemento() {
        rotaParaAsNotas.prepend(elemento[0]);
    };

    let idInserir = setTimeout(inserirElemento, tempoParaAparecer);

    historicoDeTimeouts.push({id: idInserir, tempoRestante: tempoParaAparecer, criadoEm: Date.now(), fn: inserirElemento});

    animacaoComRitmo(elemento[0], tempoParaAparecer, elemento[1], elemento[2], elemento[3]);
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
    let btn;
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
            width: 32px;
            
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
            btn = `2`
            elemento.style.left = `85px`;
        } else if (nota === "Eb1") {
            elemento.innerText = `3`;
            btn = `3`
            elemento.style.left = `140px`;
        } else if (nota === "Gb1") {
            elemento.innerText = `5`;
            btn = `5`
            elemento.style.left = `240px`;
        } else if (nota === "Ab1") {
            elemento.innerText = `6`;
            btn = `6`
            elemento.style.left = `295px`;
        } else if (nota === "Bb1") {
            elemento.innerText = `7`;
            btn = `7`
            elemento.style.left = `345px`;
        } else if (nota === "Db2") {
            // Onde começa as notas da segunda oitava
            elemento.innerText = `s`;
            btn = `s`
            elemento.style.left = `449px`;
        } else if (nota === "Eb2") {
            elemento.innerText = `d`;
            btn = `d`
            elemento.style.left = `504px`;
        } else if (nota === "Gb2") {
            elemento.innerText = `g`;
            btn = `g`
            elemento.style.left = `604px`;
        } else if (nota === "Ab2") {
            elemento.innerText = `h`;
            btn = `h`
            elemento.style.left = `659px`;
        } else if (nota === "Bb2") {
            elemento.innerText = `j`;
            btn = `j`
            elemento.style.left = `709px`;
        }

    } else if (cor === 'branca') {
        elemento.style.cssText += `
            width: 53px;
            
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
            elemento.style.height = `40px`;
        }

        if (nota === "C1") {
            elemento.innerText = `q`;
            btn = `q`
            elemento.style.left = `50px`;
        } else if (nota === "D1") {
            elemento.innerText = `w`;
            btn = `w`
            elemento.style.left = `102px`;
        } else if (nota === "E1") {
            elemento.innerText = `e`;
            btn = `e`
            elemento.style.left = `154px`;
        } else if (nota === "F1") {
            elemento.innerText = `r`;
            btn = `r`
            elemento.style.left = `206px`;
        } else if (nota === "G1") {
            elemento.innerText = `t`;
            btn = `t`
            elemento.style.left = `258px`;
        } else if (nota === "A1") {
            elemento.innerText = `y`;
            btn = `y`
            elemento.style.left = `310px`;
        } else if (nota === "B1") {
            elemento.innerText = `u`;
            btn = `u`
            elemento.style.left = `361px`;
        } else if (nota === "C2") {
            // Segunda oitava
            elemento.innerText = `z`;
            btn = `z`
            elemento.style.left = `413px`;
        } else if (nota === "D2") {
            elemento.innerText = `x`;
            btn = `x`
            elemento.style.left = `465px`;
        } else if (nota === "E2") {
            elemento.innerText = `c`;
            btn = `c`
            elemento.style.left = `517px`;
        } else if (nota === "F2") {
            elemento.innerText = `v`;
            btn = `v`
            elemento.style.left = `569px`;
        } else if (nota === "G2") {
            elemento.innerText = `b`;
            btn = `b`
            elemento.style.left = `621px`;
        } else if (nota === "A2") {
            elemento.innerText = `n`;
            btn = `n`
            elemento.style.left = `673px`;
        } else if (nota === "B2") {
            elemento.innerText = `m`;
            btn = `m`
            elemento.style.left = `724px`;
        }
    };
    
    elemento.classList.add("tecla");

    return [elemento, btn, cor, pressaoDeClique];
};

function animacaoComRitmo_definirMomentoMaisDuracaoParaClique(cor, pressaoDeClique) {
    let alturaDaRotaParaAsNotas = rotaParaAsNotas.getBoundingClientRect().height;
    let momento;
    let duracao;
    
    if (cor == 'preta') { 
        if (pressaoDeClique == 2) {
            momento = alturaDaRotaParaAsNotas - 175;
            duracao = 500;
        } else if (pressaoDeClique == 1) {       
            momento = alturaDaRotaParaAsNotas - 150;
            duracao = 400;
        }
        
    } else if (cor == 'branca') {
        if (pressaoDeClique == 4) {
            momento = alturaDaRotaParaAsNotas - 278;
            duracao = 1500;
        } else if (pressaoDeClique == 3) {       
            momento = alturaDaRotaParaAsNotas - 218;
            duracao = 1000;
        } if (pressaoDeClique == 2) {
            momento = alturaDaRotaParaAsNotas - 188;
            duracao = 500;
        } else if (pressaoDeClique == 1) {       
            momento = alturaDaRotaParaAsNotas - 150;
            duracao = 400;
        }
    };
    
    return [momento, duracao];
};

function animacaoComRitmo_enviandoDadosParaScriptParaUsuarios(duracao, btn) {
    let mensagem = new CustomEvent('enviandoDadosParaScriptParaUsuarios', {
        detail: {
            duracao: duracao,
            btnQueDeveClicar: btn
        }
    });

    dispatchEvent(mensagem);
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

let historicoDeTimeouts = [];
function animacaoComRitmo(elemento, tempoParaAparecer, btn, cor, pressaoDeClique) {
    let idAnimacao = null;
    let dadosParaResponsividade = animacaoComRitmo_calculosParaResponsividade();

    let enviouDados = false;

    let duracaoDoFramePassado = 0;
    let posicaoY = 0;
    
    let momentoMaisDuracao = animacaoComRitmo_definirMomentoMaisDuracaoParaClique(cor, pressaoDeClique);

    let veloc = 100; 

    function movendoTecla(duracaoDoFrameAtual) {
        idAnimacao = requestAnimationFrame(movendoTecla);

        if (interromperAnimacao == 'Interromper') {
            duracaoDoFramePassado = 0;
            return;
        } else if (interromperAnimacao == 'NaoInterromper') {
            if (duracaoDoFramePassado === 0) {
                duracaoDoFramePassado = duracaoDoFrameAtual;
            };

            let deltaTime = (duracaoDoFrameAtual - duracaoDoFramePassado) / 1000;
            duracaoDoFramePassado = duracaoDoFrameAtual;

            if (posicaoY >= momentoMaisDuracao[0] && enviouDados == false) {
                animacaoComRitmo_enviandoDadosParaScriptParaUsuarios(momentoMaisDuracao[1], btn);
                enviouDados = true;
            };

            if (deltaTime < 1 && posicaoY <= dadosParaResponsividade.limiteDeMovimento) {
                posicaoY += veloc * deltaTime;
                elemento.style.transform = `translateY(${posicaoY}px)`;
            } else { 
                cancelAnimationFrame(idAnimacao);
                setTimeout(()=>{
                    elemento.remove();
                }, dadosParaResponsividade.tempoParaApagarElemento);
            };
        };
    };

    function iniciarAnimacao() {
        requestAnimationFrame(movendoTecla);
    };

    let animacao = setTimeout(iniciarAnimacao, tempoParaAparecer);
    
    historicoDeTimeouts.push({id: animacao, tempoRestante: tempoParaAparecer, criadoEm: Date.now(), fn: iniciarAnimacao});

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
    };
};

function executandoArquivoJsonDeRitmo() {
    ritmoDasTeclas.forEach((el) => {
        inserindoTeclaNoDOM(el.tecla, el.nota, el.tempoParaAparecer, el.pressaoDeClique);
    });
};

window.addEventListener('enviandoURL', informandoURL);
async function informandoURL(el) {
    let url = el.detail;
    carregarJsonDeRitmo(url);
};