
let historico = [];

let botoes = [
    "2","3","5","6","7",
    "q","w","e","r","t","y","u",
    "s","d","g","h","j",
    "z","x","c","v","b","n","m"
];

document.addEventListener('keypress', listinerParaClique);
function listinerParaClique(e) {
    let clicou = analisandoHistorico(e.key);
    if (clicou == true) {
        console.log(`Clicou perfeitamente!!!`);
    } else if (clicou == false) {
        console.log(`Lamentável...`);
    };
};

function analisandoHistorico(btn) {
    let clicou;
    let avaliandoClique = historico.some(el => el === btn);

    if (avaliandoClique) {
        clicou = true;
    } else {
        clicou = false;
    }        

    return clicou;
};

function removerDoHistorico() {
    historico.shift();     
};

function adicionarAoHistorico(duracao, btnQueDeveClicar) {
    if (botoes.some(el => el === btnQueDeveClicar)) {
        historico.push(btnQueDeveClicar);
    }

    setTimeout(() => {
        removerDoHistorico()     
    }, duracao);
};

window.addEventListener('enviandoDadosParaScriptParaUsuarios', recebendoDados);
function recebendoDados(e) {
    let dados = e.detail;
    adicionarAoHistorico(dados.duracao, dados.btnQueDeveClicar);
};
