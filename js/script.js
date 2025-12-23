document.querySelectorAll(".gift-card button").forEach(button => {
  button.addEventListener("click", () => {
    alert("Em breve você poderá escolher Pix, Cartão ou Boleto 💳");
  });
});

function pagar(valor) {
  alert(
    "Valor selecionado: R$ " + valor.toFixed(2) +
    "\n\nEm breve você poderá pagar via Pix, Cartão ou Boleto 💳"
  );
}

// Função para o contador regressivo
function iniciarContador() {
    // Defina a data do evento: Ano, Mês (0-11), Dia, Hora, Minuto
    // Outubro é mês 9 no JavaScript
    const dataEvento = new Date(2025, 9, 10, 17, 0, 0).getTime();

    const atualizar = () => {
        const agora = new Date().getTime();
        const distancia = dataEvento - agora;

        // Selecionando os elementos
        const elDias = document.getElementById("dias");
        const elHoras = document.getElementById("horas");
        const elMinutos = document.getElementById("minutos");
        const elSegundos = document.getElementById("segundos");
        const elStatus = document.getElementById("status-evento");
        const elTimer = document.getElementById("timer");

        // Se os elementos não existirem na página, interrompe a função
        if (!elDias) return;

        if (distancia > 0) {
            const d = Math.floor(distancia / (1000 * 60 * 60 * 24));
            const h = Math.floor((distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const m = Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60));
            const s = Math.floor((distancia % (1000 * 60)) / 1000);

            elDias.textContent = d.toString().padStart(2, '0');
            elHoras.textContent = h.toString().padStart(2, '0');
            elMinutos.textContent = m.toString().padStart(2, '0');
            elSegundos.textContent = s.toString().padStart(2, '0');
        } else {
            if (distancia > -86400000) { 
                if (elStatus) elStatus.textContent = "É HOJE!!! ❤️";
            } else {
                if (elStatus) elStatus.textContent = "Já nos casamos! 💍";
            }
            if (elTimer) elTimer.style.display = "none";
        }
    };

    // Atualiza a cada segundo
    setInterval(atualizar, 1000);
    atualizar(); // Chama uma vez para não começar zerado
}

// Garante que o script rode após o HTML carregar
if (document.readyState === "complete" || document.readyState === "interactive") {
    iniciarContador();
} else {
    document.addEventListener("DOMContentLoaded", iniciarContador);
}

// Função dos botões de presente (Pix)
function pagar(valor) {
    alert("Valor selecionado: R$ " + valor.toFixed(2) + "\n\nEm breve você poderá pagar via Pix, Cartão ou Boleto 💳");
}

