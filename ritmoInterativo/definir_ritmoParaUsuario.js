let historico = [];

let botoes = [
    "2","3","5","6","7",
    "q","w","e","r","t","y","u",
    "s","d","g","h","j",
    "z","x","c","v","b","n","m"
];

let valorDeUmCliqueParaVisualPoints = null;
let visualPoints = 0;

window.addEventListener('informarMaxPont', (e) => {
    valorDeUmCliqueParaVisualPoints = 100 / e.detail;
});
window.addEventListener('restart', () => {
    pontos = 0;
    visualPoints = 0;
    visualMostrarPont.style.width = '0%';
    historico = [];
});

let pontos = 0;
let visualMostrarPont = document.getElementById("visualPoints");
let txtMostrarPont = document.getElementById("textPoints");

document.addEventListener('keypress', listinerParaClique);
function listinerParaClique(e) {
    let scriptParaUsuario = document.getElementById("script-definir_ritmoParaUsuario").dataset.valido;

    if (scriptParaUsuario == "false") {
        let clicou = analisandoHistorico(e.key);
            if (clicou == true) {
                pontos++
                txtMostrarPont.innerText = pontos;
                visualPoints = Math.min(100, visualPoints + valorDeUmCliqueParaVisualPoints);
                visualMostrarPont.style.width = `${visualPoints}%`;
            } else if (clicou == false && pontos >= 1) {
                pontos--
                txtMostrarPont.innerText = pontos;
                visualPoints = Math.max(0, visualPoints - valorDeUmCliqueParaVisualPoints);
                visualMostrarPont.style.width = `${visualPoints}%`;
            };
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
