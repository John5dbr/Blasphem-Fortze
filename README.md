![logoDoJogo](./paginaDeJogo/Recursos/Imagens/Favicon.png)
# ~ Blasphem Fortze ~
---

### Sumário

1. [Introdução ao Projeto](#introdução-ao-projeto)
2. [Estrutura dos diretórios](#estrutura-de-diretórios)
3. [Explicação dos Scripts](#explicação-dos-scripts)
4. [Conclusão](#conclusão)
5. [Contribua com o Projeto](#contribua-com-o-projeto)

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

---

### Estrutura de diretórios

```plaintext
BlasphemForze/
|
├── CodigoCentral/ 
|   ├── Recursos/
|   ├── umOitava.js
|   ├── doisOitava.js
|   ├── transicaoEntrePaginas.js
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


---

### Explicação dos Scripts

Os scripts foram divididos conforme diferentes deveres, para facilitar organização e controle sobre os evento que ocorrem no decorrer de um jogo. Embora os scripts estejam separados e até isolados em pastas distintas ainda há dependência entre os mesmos. Os scripts de fato reutilizáveis e isolados são os presente no diretório **CodigoCentral**. Ademais, abaixo apresenta-se as funções de cada script presente no projeto:

- **umOitava.js + doisOitava.js** <br> Web Components que representam as duas oitavas do piano. Cada um gerencia os sons, os efeitos visuais das teclas e o mapeamento entre as teclas do teclado físico e as notas musicais.

- **visualDoPiano.js** <br> Web Component responsável apenas pela estrutura visual externa do piano, servindo como moldura para encaixar as oitavas via \<slot>.

- **opcaoDeMusica.js** <br> Web Component que representa cada opção de música na lista lateral. Exibe as informações da música e dispara o evento de início de jogo ao clicar no botão de play.

- **definir_ritmoParaTeclas.js** <br> É o motor visual do jogo. Carrega o arquivo JSON da música selecionada, que contém o ritmo com todas as notas e seus tempos. Para cada nota, cria um elemento visual (a "teclinha" que cai) e o anima descendo pela tela em direção ao piano.

- **definir_ritmoParaUsuario.js** <br> É o árbitro do jogo. Recebe do ritmoParaTeclas o momento exato em que uma tecla chega ao piano e adiciona aquela tecla a um "histórico de janela" — uma lista de teclas válidas para aquele instante. Quando o jogador pressiona uma tecla, o script verifica se ela está nesse histórico: acertou, ganha ponto; errou, perde ponto.

- **script.js (paginaDeJogo)** <br> Responsável por toda a interatividade da interface: carrega e exibe as músicas disponíveis, gerencia a seleção e troca de músicas, e coordena os controles de play, pause e restart, sincronizando o áudio com as animações do jogo.

- **script.js (paginaInicial)** <br> 
Realiza e gêrencia dos recursos e necessidades básicas, além de permitir interatividade básicas da página Inicial.

- **transicaoEntrePaginas.js** <br> 
Script comum usado pelas duas páginas para permitir a animação entre as duas páginas.

---

### Conclusão
O Blasphem Fortze é um projeto desenvolvido inteiramente com tecnologias nativas da web, sem depender de bibliotecas ou frameworks externos. <br> O objetivo principal sempre foi explorar na prática os recursos que o próprio JavaScript e o navegador oferecem — desde a manipulação do DOM até a comunicação entre componentes via eventos customizados. <br>
O resultado é um jogo funcional, organizado e expansível, onde cada parte do código tem um dever claro e bem delimitado. Há espaço para crescer, especialmente no repertório de músicas disponíveis, e é exatamente aí que você pode contribuir.

---

### Contribua com o Projeto
A forma mais direta de contribuir com o Blasphem Fortze é adicionando novas músicas ao repertório. Para isso, siga os passos abaixo:

1. **Crie a pasta da música:**

*Dentro do diretório Musicas/, crie uma nova pasta seguindo o padrão MusicaXXX/, onde XXX é o número sequencial da música (ex: Musica004/). Dentro dela, a estrutura deve ser:* 

```plaintext
Musica004/
├── Recursos/
│   ├── Imagens/
│   │   ├── img-music.png
│   │   ├── img-Disco.webp
│   │   └── wallpaper.jpg
│   └── Sons/
│       └── musica.mp3
└── ritmo.json
```
2. **Crie o arquivo ritmo.json:**

*O ritmo.json é o coração da música no jogo — ele define quais notas tocar, quando aparecem e por quanto tempo ficam válidas para o jogador pressionar. Cada nota é um objeto dentro de um array:*

```plaintext
[
    {
        "tecla": "001",
        "nota": "C1",
        "tempoParaAparecer": 1,
        "pressaoDeClique": 2
    }
]
```
Significado de cada campo: 

* tecla — identificador numérico da tecla (formato "001" a "024").
* nota — nome da nota musical correspondente. As notas disponíveis vão de C1 a B2, cobrindo as duas oitavas do piano.
* tempoParaAparecer — tempo em segundos a partir do início do jogo em que a nota deve aparecer na tela.
* pressaoDeClique — janela de tempo em segundos durante a qual o jogador pode pressionar a tecla e ser considerado correto.

3. **Registre a música no registrosDeMusicas.json** 

*Adicione um novo objeto ao array no arquivo Musicas/registrosDeMusicas.json:*

```plaintext
{
    "idDaMusica": 4,
    "corDoElemento": "#HEXCOR",
    "urlDaLogo": "../Musicas/Musica004/Recursos/Imagens/img-music.png",
    "nomeDaMusica": "Artista - Nome da Música",
    "urlDaMusica": "../Musicas/Musica004/ritmo.json",
    "urlDoWallpaper": "../Musicas/Musica004/Recursos/Imagens/wallpaper.jpg",
    "urlDoDisco": "../Musicas/Musica004/Recursos/Imagens/img-Disco.webp",
    "urlDaFonte": "https://link-para-a-fonte-da-musica.com",
    "urlDaMusicaTocada": "../Musicas/Musica004/Recursos/Sons/musica.mp3",
    "duracao": "MM:SS"
}
```

Significado de cada campo: 

* idDaMusica — número sequencial único da música.
* corDoElemento — cor em hexadecimal usada para personalizar o card e a barra de pontuação.
* urlDaLogo — imagem exibida no card da música na lista lateral.
* nomeDaMusica — nome exibido na interface, no formato "Artista - Nome".
* urlDaMusica — caminho para o ritmo.json da música.
* urlDoWallpaper — imagem de fundo exibida durante o jogo.
* urlDoDisco — imagem do disco giratório exibido durante o jogo.
* urlDaFonte — link para a fonte original da música (YouTube, Spotify etc.), exibido no botão de créditos.
* urlDaMusicaTocada — caminho para o arquivo de áudio .mp3.
* duracao — duração da música no formato "MM:SS", exibida na aba de status.

4. **Regras gerais** 

* Respeite os direitos autorais: utilize apenas músicas com licença livre ou que você tenha permissão para usar, e sempre preencha o campo urlDaFonte apontando para a fonte original.
* Mantenha o padrão de nomenclatura das pastas (MusicaXXX/) e dos arquivos (img-music, img-Disco, wallpaper, musica.mp3) para que o jogo os encontre corretamente.
* O idDaMusica deve ser único e sequencial — não reutilize IDs de músicas removidas.
* O campo tecla no ritmo.json deve sempre referenciar um valor entre "001" e "024", correspondente às 24 teclas disponíveis no piano.

5. **Como enviar sua contribuição**

*Após realizar todas as alterações descritas acima, basta abrir um Pull Request no repositório. Cada contribuição será analisada antes do merge, para garantir que o padrão do projeto seja mantido.*