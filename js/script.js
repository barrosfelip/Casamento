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
    // Ajuste a data do seu evento aqui
    // Formato: Ano, Mês (0-11), Dia, Hora, Minuto
    const dataEvento = new Date(2025, 9, 10, 17, 0, 0).getTime();

    function atualizarContador() {
        const agora = new Date().getTime();
        const distancia = dataEvento - agora;

        const elDias = document.getElementById("dias");
        const elHoras = document.getElementById("horas");
        const elMinutos = document.getElementById("minutos");
        const elSegundos = document.getElementById("segundos");
        const elStatus = document.getElementById("status-evento");
        const elTimer = document.getElementById("timer");

        // Se o elemento não existir na página, para a execução para não dar erro
        if (!elDias) return;

        if (distancia > 0) {
            const d = Math.floor(distancia / (1000 * 60 * 60 * 24));
            const h = Math.floor((distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const m = Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60));
            const s = Math.floor((distancia % (1000 * 60)) / 1000);

            elDias.innerText = d.toString().padStart(2, '0');
            elHoras.innerText = h.toString().padStart(2, '0');
            elMinutos.innerText = m.toString().padStart(2, '0');
            elSegundos.innerText = s.toString().padStart(2, '0');
        } else {
            // Lógica para quando o tempo acabar
            if (distancia > -86400000) { 
                elStatus.innerText = "É HOJE!!! ❤️";
            } else {
                elStatus.innerText = "Já nos casamos! 💍";
            }
            if (elTimer) elTimer.style.display = "none";
            clearInterval(intervalo); // Para o contador
        }
    }

    // Inicia o intervalo e guarda a referência para poder pará-lo depois
    const intervalo = setInterval(atualizarContador, 1000);
    atualizarContador(); // Chama uma vez imediato para não exibir 00 ao carregar
});
