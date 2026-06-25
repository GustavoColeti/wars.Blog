// Banco de dados fictício simulando votos da comunidade global
let bancoVotos = {
    jedi: 1420,
    imperio: 985,
    mando: 2154
};

// Variável para guardar o voto do usuário atual
let votoUsuario = null;

// Exibir estatísticas iniciais ao carregar a página
function atualizarPlacarVisual() {
    document.getElementById('votos-jedi').innerText = `Votos: ${bancoVotos.jedi} pessoas`;
    document.getElementById('votos-imperio').innerText = `Votos: ${bancoVotos.imperio} pessoas`;
    document.getElementById('votos-mando').innerText = `Votos: ${bancoVotos.mando} pessoas`;
}
atualizarPlacarVisual();

// === SISTEMA DE VOTAÇÃO COERCITIVO ===
function votarFaccao(faccao) {
    const alerta = document.getElementById('alerta-voto');
    alerta.className = "alerta-sistema"; // limpa classes

    // Se já votou e está tentando clicar em outra facção diferente: TRAÍRA!
    if (votoUsuario !== null && votoUsuario !== faccao) {
        alerta.innerText = "🚨 VOCÊ É UM TRAÍRA! Mudando de lado na rebelião? O seu voto original está trancado!";
        alerta.classList.add('alerta-traira');
        alerta.style.display = 'block';
        return;
    }

    // Se clicar de novo no que já votou, apenas avisa que já foi computado
    if (votoUsuario === faccao) {
        alerta.innerText = "Sua lealdade já foi registrada nesta facção!";
        alerta.classList.add('alerta-sucesso');
        alerta.style.display = 'block';
        return;
    }

    // Primeiro voto válido
    votoUsuario = faccao;
    bancoVotos[faccao] += 1; // Soma o seu voto ao banco de dados
    atualizarPlacarVisual();

    alerta.innerText = "✓ Voto computado com sucesso! Sua facção agradece a lealdade.";
    alerta.classList.add('alerta-sucesso');
    alerta.style.display = 'block';

    // Dispara a animação clássica também
    animarFaccao(faccao);
}

// === BANCO DE DADOS DOS SEUS ARTIGOS ===
const textosArtigos = {
    djarin: {
        titulo: "Quem é o Mandaloriano? A Trajetória de Din Djarin",
        texto: "<p>O protagonista da série, conhecido popularmente como 'O Mandaloriano', chama-se Din Djarin. Ele não nasceu no planeta Mandalore; na verdade, ele foi um 'enjeitado', uma criança órfã resgatada por guerreiros mandalorianos durante as Guerras Clônicas.</p><br><p>Criado sob as rígidas traditions de uma seita conhecida como a Tribo, ele se tornou um caçador de recompensas habilidoso e solitário, operando nas bordas externas da galáxia após a queda do Império Galáctico.</p><br><p>A trajetória de Din Djarin muda drasticamente quando ele aceita uma missão misteriosa que o leva a encontrar uma criatura da mesma espécie do mestre Yoda. Em vez de entregar o alvo para receber sua recompensa, o Mandaloriano decide quebrar o código da sua guilda para proteger a criança, iniciando uma jornada de transformação que o força a questionar suas próprias crenças e a assumir o papel de pai e protetor.</p>"
    },
    grogu: {
        titulo: "O Fenômeno Grogu: De 'Baby Yoda' a Aprendiz Mandaloriano",
        texto: "<p>Batizado inicialmente pelo público como 'Baby Yoda', o personagem Grogu tornou-se um dos maiores fenômenos de cultura pop dos últimos anos. Ele pertence à mesma espécie misteriosa e rara do lendário Mestre Yoda e, apesar de sua aparência infantil e vulnerável, Grogu já viveu por mais de 50 anos e possui uma forte conexão com a Força, sendo capaz de mover objetos grandes e curar ferimentos graves.</p><br><p>Antes de encontrar Din Djarin, Grogu foi criado no Templo Jedi em Coruscant e precisou ser escondido após a Ordem 66. Ao longo de sua jornada na série, ele passa de um alvo indefeso a um aprendiz.</p><br><p>Mesmo tendo a oportunidade de treinar com Luke Skywalker para se tornar um Jedi, Grogu escolhe retornar para os braços de seu protetor, sendo oficialmente adotado por Din Djarin e iniciando seu treinamento para seguir os costumes mandalorianos.</p>"
    },
    beskar: {
        titulo: "A Armadura de Beskar: O Design Visual da Série",
        texto: "<p>Um dos elementos visuais mais marcantes e simbólicos de The Mandalorian é a armadura do protagonista, feita de Beskar. O Beskar é um metal extremamente raro e valioso, nativo do planeta Mandalore, conhecido por sua resistência lendária.</p><br><p>Ele é capaz de suportar disparos de blasters e até mesmo resistir a golpes diretos de sabres de luz, o que torna os guerreiros mandalorianos oponentes temíveis.</p><br><p>No início da série, Din Djarin veste uma armadura remendada com peças de outros metais. Conforme ele cumpre missões perigosas, ele recebe placas de Beskar puro como pagamento, que são fundidas pela Armadora para criar seu traje prateado e reluzente. Além da proteção física, a evolução da armadura funciona como um indicador visual do status e das conquistas do personagem dentro della narrativa.</p>"
    },
    aliados: {
        titulo: "Aliados e Inimigos de Peso na Galáxia",
        texto: "<p>A jornada do Mandaloriano é marcada por encontros com personagens que moldam o destino da galáxia. Entre os principais aliados está Bo-Katan Kryze, uma líder mandaloriana de linhagem real que busca unificar seu povo destruído e recuperar o trono de Mandalore. Outros aliados importantes incluem Greef Karga, o líder da guilda de caçadores de recompensa que se torna o magistrado de Nevarro, e a Armadora, que atua como a guia espiritual e técnica da seita de Din Djarin.</p><br><p>Do lado dos antagonistas, o principal perigo é representado por Moff Gideon, um ambicioso líder remanescente do Império Galáctico. Gideon lidera uma facção imperial secreta e busca capturar Grogu para realizar experimentos com seu sangue rico em 'Midi-chlorians'. Para consolidar seu poder, ele chega a empunhar o Sabre Sombrio (Darksaber), uma arma ancestral que simboliza o direito de governar o planeta Mandalore.</p>"
    }
};

// === CONTROLE DA JANELA MODAL DOS ARTIGOS ===
function abrirArtigo(idArtigo) {
    const modal = document.getElementById('modal-artigo');
    const titulo = document.getElementById('modal-titulo');
    const texto = document.getElementById('modal-texto');
    
    titulo.innerText = textosArtigos[idArtigo].titulo;
    texto.innerHTML = textosArtigos[idArtigo].texto;
    
    modal.style.display = 'flex';
}

function fecharArtigoModalDireto() {
    document.getElementById('modal-artigo').style.display = 'none';
}

// Fecha clicando fora
window.addEventListener('click', function(event) {
    const modal = document.getElementById('modal-artigo');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

// === ANIMACAO HOLOGRAMA ===
function animarFaccao(faccao) {
    const overlay = document.getElementById('tela-animacao');
    const icone = document.getElementById('icone-animacao');
    const texto = document.getElementById('texto-animacao');

    icone.className = "";

    if (faccao === 'jedi') {
        icone.classList.add('yoda-avatar');
        texto.innerText = "Yoda diz: 'Fazer ou não fazer. Tentativa não há!'";
    } else if (faccao === 'imperio') {
        icone.classList.add('reverencia-icone');
        texto.innerText = "*Sua lealdade ao Imperador foi registrada com reverência.*";
    } else if (faccao === 'mando') {
        icone.classList.add('capacete-mando');
        texto.innerText = "Mandaloriano diz: 'This is the Way. (Este é o Caminho)'";
    }

    overlay.style.display = 'flex';
}

function fecharAnimacao() {
    document.getElementById('tela-animacao').style.display = 'none';
}

// === SISTEMA DO DESAFIO (SALA SECRETA) ===
function verificarDesafio() {
    const resposta = document.getElementById('resposta-input').value.trim().toLowerCase();
    const erroElemento = document.getElementById('mensagem-erro');
    const salaSecreta = document.getElementById('sala-secreta');

    if (resposta === "vermelho" || resposta === "esquadrao vermelho" || resposta === "red" || resposta === "red squadron") {
        erroElemento.style.color = "#00ff00";
        erroElemento.innerText = "Acesso Concedido! O Holocron foi aberto.";
        salaSecreta.classList.remove('no-display');
        
        setTimeout(() => {
            salaSecreta.scrollIntoView({ behavior: 'smooth' });
            inicializarMotorJogo();
        }, 800);
    } else {
        erroElemento.style.color = "#ff3333";
        erroElemento.innerText = "Código incorreto! Sinta o conhecimento da Força e tente novamente.";
    }
}

// === ENGINE DO JOGO FLAPPY SHIP ===
let canvas, ctx;
let nave, obstaculos, frame, score, gameLoopId, jogoRodando = false;

function inicializarMotorJogo() {
    canvas = document.getElementById('canvasJogo');
    ctx = canvas.getContext('2d');
    
    window.addEventListener('keydown', function(e) {
        if (e.code === 'Space' && jogoRodando) {
            nave.velocidade = -6;
            e.preventDefault();
        }
    });
    
    reiniciarJogo();
}

function reiniciarJogo() {
    document.getElementById('tela-gameover').classList.add('no-display');
    nave = { x: 100, y: 180, largura: 34, altura: 24, gravidade: 0.35, velocidade: 0 };
    obstaculos = [];
    frame = 0;
    score = 0;
    document.getElementById('score').innerText = score;
    jogoRodando = true;

    if (gameLoopId) cancelAnimationFrame(gameLoopId);
    loop();
}

function loop() {
    if (!jogoRodando) return;
    atualizarEntidades();
    renderizarCena();
    frame++;
    gameLoopId = requestAnimationFrame(loop);
}

function atualizarEntidades() {
    nave.velocidade += nave.gravidade;
    nave.y += nave.velocidade;

    if (nave.y + nave.altura > canvas.height || nave.y < 0) finalizarJogo();

    if (frame % 90 === 0) {
        let espaco = 120;
        let alturaMinima = 40;
        let alturaMaxima = canvas.height - espaco - alturaMinima;
        let alturaTop = Math.floor(Math.random() * (alturaMaxima - alturaMinima + 1)) + alturaMinima;
        let tipoObstaculo = Math.random() > 0.5 ? 'laser' : 'meteoro';

        obstaculos.push({ x: canvas.width, top: alturaTop, bottom: canvas.height - (alturaTop + espaco), largura: 30, tipo: tipoObstaculo, passou: false });
    }

    for (let i = obstaculos.length - 1; i >= 0; i--) {
        let obs = obstaculos[i];
        obs.x -= 3.5;

        if (nave.x < obs.x + obs.largura && nave.x + nave.largura > obs.x && (nave.y < obs.top || nave.y + nave.altura > canvas.height - obs.bottom)) {
            finalizarJogo();
        }

        if (!obs.passou && obs.x + obs.largura < nave.x) {
            obs.passou = true;
            score++;
            document.getElementById('score').innerText = score;
        }

        if (obs.x + obs.largura < 0) obstaculos.splice(i, 1);
    }
}

function renderizarCena() {
    ctx.fillStyle = '#030308';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#fff';
    for (let i = 0; i < 20; i++) {
        ctx.fillRect((i * 77) % canvas.width, (i * 43) % canvas.height, 2, 2);
    }

    ctx.fillStyle = '#bbb';
    ctx.beginPath();
    ctx.moveTo(nave.x + nave.largura, nave.y + nave.altura / 2);
    ctx.lineTo(nave.x, nave.y);
    ctx.lineTo(nave.x + 8, nave.y + nave.altura / 2);
    ctx.lineTo(nave.x, nave.y + nave.altura);
    ctx.closePath();
    ctx.fill();

    obstaculos.forEach(obs => {
        ctx.fillStyle = obs.tipo === 'laser' ? '#ff1133' : '#55555d';
        ctx.fillRect(obs.x, 0, obs.largura, obs.top);
        ctx.fillRect(obs.x, canvas.height - obs.bottom, obs.largura, obs.bottom);
    });
}

function finalizarJogo() {
    jogoRodando = false;
    document.getElementById('pontos-finais').innerText = score;
    document.getElementById('tela-gameover').classList.remove('no-display');
}