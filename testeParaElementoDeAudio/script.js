const playBtn = document.getElementById('playBtn');
const audio = document.getElementById('myAudio');
const box = document.getElementById('visualizer'); 

playBtn.onclick = () => {
    // 1. Inicia o contexto e fonte de áudio
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const source = audioCtx.createMediaElementSource(audio);

    // 2. Cria o Analisador
    const analyser = audioCtx.createAnalyser();
    analyser.fftSize = 256; // Define a resolução da análise
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    // 3. Conecta tudo: Fonte -> Analisador -> Saída (alto-falantes)
    source.connect(analyser);
    analyser.connect(audioCtx.destination);

    audio.play();
    animate();

    function animate() {
        requestAnimationFrame(animate); // Loop de animação
        
        // 4. Pega os dados de frequência (volume)
        analyser.getByteFrequencyData(dataArray);
        
        // Calcula a média do volume atual
        let sum = 0;
        for (let i = 0; i < bufferLength; i++) {
            sum += dataArray[i];
        }
        const average = sum / bufferLength;

        // 5. Aplica a escala ao elemento (ajuste os valores conforme necessário)
        const scale = 1 + (average / 128); // O valor médio vai de 0 a 255
        box.style.transform = `scale(${scale})`;
    }
};
