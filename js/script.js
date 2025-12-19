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

document.addEventListener("DOMContentLoaded", function() {
    // Defina a data aqui (Ano, Mês - 1, Dia, Hora, Minuto)
    // Nota: Janeiro é 0, Outubro é 9.
    const dataEvento = new Date(2025, 9, 10, 17, 0, 0).getTime();

    function atualizarContador() {
        const agora = new Date().getTime();
        const distancia = dataEvento - agora;

        // IDs dos elementos
        const elDias = document.getElementById("dias");
        const elHoras = document.getElementById("horas");
        const elMinutos = document.getElementById("minutos");
        const elSegundos = document.getElementById("segundos");
        const elStatus = document.getElementById("status-evento");
        const elTimer = document.getElementById("timer");

        // Verifica se os elementos existem na página antes de tentar escrever neles
        if (!elDias) return;

        if (distancia > 0) {
            const d = Math.floor(distancia / (1000 * 60 * 60 * 24));
            const h = Math.floor((distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const m = Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60));
            const s = Math.floor((distancia % (1000 * 60)) / 1000);

            elDias.innerText = d < 10 ? "0" + d : d;
            elHoras.innerText = h < 10 ? "0" + h : h;
            elMinutos.innerText = m < 10 ? "0" + m : m;
            elSegundos.innerText = s < 10 ? "0" + s : s;
        } else {
            // Lógica para quando chegar o dia
            if (distancia > -86400000) { // Nas primeiras 24 horas
                elStatus.innerText = "É HOJE!!! ❤️";
            } else {
                elStatus.innerText = "Já nos casamos! 💍";
            }
            if (elTimer) elTimer.style.display = "none";
        }
    }

    // Executa imediatamente e depois a cada 1 segundo
    atualizarContador();
    setInterval(atualizarContador, 1000);
});
