document.addEventListener("DOMContentLoaded", function() {
    // AJUSTE A DATA AQUI: (Ano, Mês-1, Dia, Hora, Minuto)
    // Exemplo: 10 de Outubro de 2026 às 17:00
    // Janeiro é 0, Outubro é 9.
    const dataEvento = new Date(2026, 9, 10, 17, 0, 0).getTime();

    function atualizarContador() {
        const agora = new Date().getTime();
        const distancia = dataEvento - agora;

        const elDias = document.getElementById("dias");
        const elHoras = document.getElementById("horas");
        const elMinutos = document.getElementById("minutos");
        const elSegundos = document.getElementById("segundos");
        const elStatus = document.getElementById("status-evento");

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
            if (elStatus) elStatus.innerText = "Já nos casamos! 💍";
            document.getElementById("timer").style.display = "none";
        }
    }

    setInterval(atualizarContador, 1000);
    atualizarContador();
});

// Função para os botões de presente
function pagar(valor) {
    alert("Valor selecionado: R$ " + valor.toFixed(2) + "\n\nEm breve você poderá pagar via Pix!");
}
