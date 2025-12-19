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

const dataCasamento = new Date("Oct 10, 2025 17:00:00").getTime();

setInterval(function() {
    const agora = new Date().getTime();
    const distancia = dataCasamento - agora;

    const dias = Math.floor(distancia / (1000 * 60 * 60 * 24));
    const horas = Math.floor((distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((distancia % (1000 * 60)) / 1000);

    // Se ainda não chegou a data
    if (distancia > 0) {
        document.getElementById("dias").innerText = dias;
        document.getElementById("horas").innerText = horas;
        document.getElementById("minutos").innerText = minutos;
        document.getElementById("segundos").innerText = segundos;
    } 
    // Se for o dia do casamento (dentro das primeiras 24h)
    else if (distancia <= 0 && distancia > -86400000) {
        document.getElementById("status-evento").innerText = "É HOJE!!! ❤️";
        document.getElementById("timer").style.display = "none";
    }
    // Se já passou
    else {
        document.getElementById("status-evento").innerText = "Já nos casamos! 💍";
        document.getElementById("timer").style.display = "none";
    }
}, 1000);

