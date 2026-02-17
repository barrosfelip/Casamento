// Data do casamento: 07/11/2026
// (Formato ISO: ano-mês-dia)
const dataCasamento = new Date("2026-11-07T18:00:00"); 
// Se quiser meia-noite: "2026-11-07T00:00:00"

function atualizarContador() {
  const agora = new Date();
  const diff = dataCasamento - agora;

  const status = document.getElementById("status-evento");

  // Se já passou
  if (diff <= 0) {
    document.getElementById("dias").textContent = "00";
    document.getElementById("horas").textContent = "00";
    document.getElementById("minutos").textContent = "00";
    document.getElementById("segundos").textContent = "00";

    status.textContent = "Chegou o grande dia! 💍✨";
    return;
  }

  const dias = Math.floor(diff / (1000 * 60 * 60 * 24));
  const horas = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutos = Math.floor((diff / (1000 * 60)) % 60);
  const segundos = Math.floor((diff / 1000) % 60);

  document.getElementById("dias").textContent = String(dias).padStart(2, "0");
  document.getElementById("horas").textContent = String(horas).padStart(2, "0");
  document.getElementById("minutos").textContent = String(minutos).padStart(2, "0");
  document.getElementById("segundos").textContent = String(segundos).padStart(2, "0");
}

// Atualiza a cada 1 segundo
setInterval(atualizarContador, 1000);

// Atualiza imediatamente ao carregar
atualizarContador();


const musica = document.getElementById("musica");
const btnMusica = document.getElementById("btnMusica");

let tocando = false;

btnMusica.addEventListener("click", () => {
  if (!tocando) {
    musica.play();
    tocando = true;
    btnMusica.textContent = "🔇 Pausar música";
  } else {
    musica.pause();
    tocando = false;
    btnMusica.textContent = "🔊 Ativar música";
  }
});


if (musica) {
  musica.volume = 0.25;

  document.addEventListener("click", () => {
    musica.muted = false;
    musica.play();
  }, { once: true });
}

const entrada = document.getElementById("entrada");
const btnEntrar = document.getElementById("btnEntrar");
const btnSemMusica = document.getElementById("btnSemMusica");

function liberarSite() {
  entrada.classList.add("entrada--hidden");
}

if (btnEntrar && musica) {
  musica.volume = 0.25;

  btnEntrar.addEventListener("click", async () => {
    try {
      await musica.play();
    } catch (e) {
      // Se der bloqueio (raro nesse caso), ignora
      console.log("Autoplay bloqueado:", e);
    }
    liberarSite();
  });
}

if (btnSemMusica) {
  btnSemMusica.addEventListener("click", () => {
    liberarSite();
  });
}

// Função para os botões de presente
/*function pagar(valor) {
    alert("Valor selecionado: R$ " + valor.toFixed(2) + "\n\nEm breve você poderá pagar via Pix!");
}*/
