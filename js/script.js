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

const countdown = setInterval(function() {
    const agora = new Date().getTime();
    const distancia = dataCasamento - agora;

    const dias = Math.floor(distancia / (1000 * 60 * 60 * 24));
    const horas = Math.floor((distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((distancia % (1000 * 60)) / 1000);

    document.getElementById("dias").innerText = dias < 10 ? "0"+dias : dias;
    document.getElementById("horas").innerText = horas < 10 ? "0"+horas : horas;
    document.getElementById("minutos").innerText = minutos < 10 ? "0"+minutos : minutos;
    document.getElementById("segundos").innerText = segundos < 10 ? "0"+segundos : segundos;

    if (distancia < 0) {
        // Se a data for exatamente hoje (dentro das 24h do dia)
        if (distancia > -86400000) { 
            document.getElementById("status-evento").innerText = "É HOJE!!!";
            document.getElementById("timer").style.display = "none";
        } else {
            document.getElementById("status-evento").innerText = "Já nos casamos! ❤️";
            document.getElementById("timer").style.display = "none";
        }
        clearInterval(countdown);
    }
}, 1000);
