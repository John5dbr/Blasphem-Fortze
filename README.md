![logoDoJogo](./testeControlados/Recursos/Imagens/logoParaMarkdown.png)
# ~ Blasphem Fortze ~
---

### Sumário

1. [Introdução ao Projeto](#introdução-ao-projeto)
2. [Estrutura dos diretórios](#estrutura-de-diretórios)
3. [Explicação dos Scripts](#explicação-dos-scripts)
<!-- 4. [Conclusão]() -->

<br>

---

### Introdução ao Projeto

O Blasphem Fortze é um projeto pessoal, desenvolvido por Pedro de Souza Santos. O projeto foi construído inteiramente com *HTML, CSS e JavaScript puro*, sem frameworks com foco em colocar em prática a manipulação do DOM (document object model). <br>
<br> 
A arquitetura é baseada em Web Components, o que deixa cada parte do piano (as oitavas, os cards de música e a estrutura visual) isolada e reutilizável. O áudio das notas é gerenciado pela Web Audio API, garantindo que cada tecla pressionada toque o som correspondente com precisão. <br>
<br>
Toda a lógica do jogo, desde a seleção de músicas até o sistema de pontuação em tempo real, é coordenada por scripts que se comunicam via eventos customizados, mantendo o código organizado e desacoplado.
Trata-se de um jogo simples de piano interativo e reativo para as possíveis ações de qualquer usuário.
Conta com duas páginas:

- A *página inicial* apresenta informações e instruções de como usar o jogo. 
- A *página de Jogo* apresenta de fato e interface para jogar o jogo.

<br>

---

### Estrutura de diretórios

```plaintext
BlasphemForze/
|
├── CodigoCentral/ 
|   ├── Recursos/
|   ├── umOitava.js
|   ├── doisOitava.js
|   ├── opcaoDeMusica.js
|   └── visualDoPiano.js
|
├── Musicas/
|   ├── musica001/
|   |   ├── Recursos/
|   |   └── ritmo.json
|   ├── musica002/
|   ├── musica003/
|   ├── musica.../
|   └── registrosDeMusicas.json
|
├── ritmoInterativo/
|   ├── definir_ritmoParaTeclas.js
|   └── definir_ritmoParaUsuario.js
|
├── paginaInicial/
|   ├── Recursos/
|   ├── index.html
|   ├── script.js
|   └── style.css
|
├── paginaDeJogo/
|   ├── Recursos/
|   ├── index.html
|   ├── script.js
|   └── style.css
|
└── README.md
```

<br>

---

### Explicação dos Scripts

Os scripts foram divididos conforme diferentes deveres, para facilitar organização e controle sobre os evento que ocorrem no decorrer de um jogo. Embora os scripts estejam separados e até isolados em pastas distintas ainda há dependência entre os mesmos. Os scripts de fato reutilizáveis e isolados são os presente no diretório **CodigoCentral**. Ademais, abaixo apresenta-se as funções de cada script presente no projeto:

- **umOitava.js + doisOitava.js** <br> Web Components que representam as duas oitavas do piano. Cada um gerencia os sons, os efeitos visuais das teclas e o mapeamento entre as teclas do teclado físico e as notas musicais.

- **visualDoPiano.js** <br> Web Component responsável apenas pela estrutura visual externa do piano, servindo como moldura para encaixar as oitavas via \<slot>.

- **opcaoDeMusica.js** <br> Web Component que representa cada opção de música na lista lateral. Exibe as informações da música e dispara o evento de início de jogo ao clicar no botão de play.

- **definir_ritmoParaTeclas.js** <br> É o motor visual do jogo. Carrega o arquivo JSON da música selecionada, que contém o ritmo com todas as notas e seus tempos. Para cada nota, cria um elemento visual (a "teclinha" que cai) e o anima descendo pela tela em direção ao piano.

- **definir_ritmoParaUsuario.js** <br> É o árbitro do jogo. Recebe do ritmoParaTeclas o momento exato em que uma tecla chega ao piano e adiciona aquela tecla a um "histórico de janela" — uma lista de teclas válidas para aquele instante. Quando o jogador pressiona uma tecla, o script verifica se ela está nesse histórico: acertou, ganha ponto; errou, perde ponto.

- **script.js (paginaDeJogo)** <br> Responsável por toda a interatividade da interface: carrega e exibe as músicas disponíveis, gerencia a seleção e troca de músicas, e coordena os controles de play, pause e restart, sincronizando o áudio com as animações do jogo.

<!-- - **script.js (paginaInicial)** <br> 
... -->

<br>

---

<!-- ### Conclusão -->
