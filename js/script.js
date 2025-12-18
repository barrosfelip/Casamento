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
