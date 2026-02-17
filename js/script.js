console.log("script carregou!");

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM pronto!");

  // =========================================================
  // 1) CONTADOR REGRESSIVO
  // =========================================================
  const dataCasamento = new Date("2026-11-07T18:00:00");

  function atualizarContador() {
    const agora = new Date();
    const diff = dataCasamento - agora;

    const status = document.getElementById("status-evento");
    const diasEl = document.getElementById("dias");
    const horasEl = document.getElementById("horas");
    const minutosEl = document.getElementById("minutos");
    const segundosEl = document.getElementById("segundos");

    if (!status || !diasEl || !horasEl || !minutosEl || !segundosEl) return;

    if (diff <= 0) {
      diasEl.textContent = "00";
      horasEl.textContent = "00";
      minutosEl.textContent = "00";
      segundosEl.textContent = "00";
      status.textContent = "Chegou o grande dia! 💍✨";
      return;
    }

    const dias = Math.floor(diff / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutos = Math.floor((diff / (1000 * 60)) % 60);
    const segundos = Math.floor((diff / 1000) % 60);

    diasEl.textContent = String(dias).padStart(2, "0");
    horasEl.textContent = String(horas).padStart(2, "0");
    minutosEl.textContent = String(minutos).padStart(2, "0");
    segundosEl.textContent = String(segundos).padStart(2, "0");
  }

  setInterval(atualizarContador, 1000);
  atualizarContador();

  // =========================================================
  // 2) MÚSICA (corrigido: sem bug de 2 cliques)
  // =========================================================
  const musica = document.getElementById("musica");
  const btnMusica = document.getElementById("btnMusica");

  function atualizarBotaoMusica() {
    if (!musica || !btnMusica) return;

    if (musica.paused) {
      btnMusica.textContent = "🔊 Música";
    } else {
      btnMusica.textContent = "🔇 Pausar";
    }
  }

  if (musica && btnMusica) {
    musica.volume = 0.25;

    btnMusica.addEventListener("click", async () => {
      if (musica.paused) {
        try {
          await musica.play();
        } catch (e) {
          console.log("Erro ao tocar música:", e);
        }
      } else {
        musica.pause();
      }

      atualizarBotaoMusica();
    });

    atualizarBotaoMusica();
  }

  // =========================================================
  // 3) ENTRADA (se existir no HTML)
  // =========================================================
  const entrada = document.getElementById("entrada");
  const btnEntrar = document.getElementById("btnEntrar");
  const btnSemMusica = document.getElementById("btnSemMusica");

  function liberarSite() {
    if (entrada) entrada.classList.add("entrada--hidden");
  }

  if (btnEntrar && musica) {
    btnEntrar.addEventListener("click", async () => {
      try {
        await musica.play();
      } catch (e) {
        console.log("Autoplay bloqueado:", e);
      }
      atualizarBotaoMusica();
      liberarSite();
    });
  }

  if (btnSemMusica) {
    btnSemMusica.addEventListener("click", () => {
      liberarSite();
    });
  }

  // ⚠️ REMOVIDO:
  // document.addEventListener("click", () => musica.play(), { once: true });
  // Isso atrapalha o PIX e toca música em qualquer clique.

  // =========================================================
  // 4) PIX (NUBANK)
  // =========================================================
  const PIX_CHAVE = "07988779443";
  const PIX_NOME = "FELIPE LYRA BARROS";
  const PIX_CIDADE = "CAMPINA GRANDE";

  // ----- CRC16 -----
  function crc16(payload) {
    let crc = 0xffff;

    for (let i = 0; i < payload.length; i++) {
      crc ^= payload.charCodeAt(i) << 8;

      for (let j = 0; j < 8; j++) {
        if ((crc & 0x8000) !== 0) crc = (crc << 1) ^ 0x1021;
        else crc <<= 1;

        crc &= 0xffff;
      }
    }

    return crc.toString(16).toUpperCase().padStart(4, "0");
  }

  function formatField(id, value) {
    const size = String(value.length).padStart(2, "0");
    return `${id}${size}${value}`;
  }

  function gerarPixCopiaCola({ chave, nome, cidade, valor, txid }) {
    nome = nome.substring(0, 25);
    cidade = cidade.substring(0, 15);

    const merchantAccountInfo =
      formatField("00", "BR.GOV.BCB.PIX") +
      formatField("01", chave);

    const payloadSemCRC =
      formatField("00", "01") +
      formatField("01", "12") +
      formatField("26", merchantAccountInfo) +
      formatField("52", "0000") +
      formatField("53", "986") +
      formatField("54", valor.toFixed(2)) +
      formatField("58", "BR") +
      formatField("59", nome) +
      formatField("60", cidade) +
      formatField("62", formatField("05", txid)) +
      "6304";

    const crc = crc16(payloadSemCRC);
    return payloadSemCRC + crc;
  }

  // =========================================================
  // 5) MODAL PIX (agora com TODOS os elementos declarados)
  // =========================================================
  const pixModal = document.getElementById("pixModal");
  const pixTitulo = document.getElementById("pixTitulo");
  const pixValor = document.getElementById("pixValor");
  const pixCanvas = document.getElementById("pixCanvas");
  const pixCopiaCola = document.getElementById("pixCopiaCola");

  const pixGerado = document.getElementById("pixGerado");
  const nomeDoador = document.getElementById("nomeDoador");
  const btnGerarPix = document.getElementById("btnGerarPix");

  const btnCopiarPix = document.getElementById("btnCopiarPix");
  const btnFecharPix = document.getElementById("btnFecharPix");

  let presenteAtual = { titulo: "", valor: 0 };

  function abrirModalPix(titulo, valor) {
    if (!pixModal || !pixTitulo || !pixValor || !pixGerado) return;

    const valorNumero = Number(valor);

    presenteAtual = { titulo, valor: valorNumero };

    pixTitulo.textContent = titulo;
    pixValor.textContent = `R$ ${valorNumero.toFixed(2).replace(".", ",")}`;

    if (nomeDoador) nomeDoador.value = "";
    if (pixCopiaCola) pixCopiaCola.value = "";

    pixGerado.style.display = "none";
    pixModal.classList.remove("pix-modal--hidden");
  }

  function fecharModalPix() {
    if (!pixModal) return;
    pixModal.classList.add("pix-modal--hidden");
  }

  // Botões "Presentear"
  document.querySelectorAll(".btn-presentear").forEach((btn) => {
    btn.addEventListener("click", () => {
      const titulo = btn.dataset.titulo || "Presente";
      const valor = btn.dataset.valor || "0";
      abrirModalPix(titulo, valor);
    });
  });

  // Gerar PIX
  if (btnGerarPix) {
    btnGerarPix.addEventListener("click", () => {
      const nome = (nomeDoador?.value || "").trim();

     /* if (nome.length < 2) {
        alert("Digite seu nome para gerar o PIX 😊");
        return;
      }*/

      // Nome limpo para TXID
      const nomeLimpo = nome
        .toUpperCase()
        .replace(/[^A-Z0-9]/g, "")
        .substring(0, 10);

      const txid = "CASAMENTO";
      const pix = gerarPixCopiaCola({
        chave: PIX_CHAVE,
        nome: PIX_NOME,
        cidade: PIX_CIDADE,
        valor: presenteAtual.valor,
        txid: txid
      });

      if (pixCopiaCola) pixCopiaCola.value = pix;

      // QR Code
      if (pixCanvas && window.QRCode) {
        const ctx = pixCanvas.getContext("2d");
        ctx.clearRect(0, 0, pixCanvas.width, pixCanvas.height);

        QRCode.toCanvas(pixCanvas, pix, { width: 220 }, (error) => {
          if (error) console.error(error);
        });
      }

      if (pixGerado) pixGerado.style.display = "block";
    });
  }

  // Copiar
  if (btnCopiarPix) {
    btnCopiarPix.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(pixCopiaCola.value);
        btnCopiarPix.textContent = "✅ Copiado!";
        setTimeout(() => (btnCopiarPix.textContent = "Copiar PIX"), 1500);
      } catch (e) {
        alert("Não foi possível copiar automaticamente. Copie manualmente.");
      }
    });
  }

  // Fechar
  if (btnFecharPix) {
    btnFecharPix.addEventListener("click", fecharModalPix);
  }

  // Fechar clicando fora
  if (pixModal) {
    pixModal.addEventListener("click", (e) => {
      if (e.target === pixModal) fecharModalPix();
    });
  }
});
