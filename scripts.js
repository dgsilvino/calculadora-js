document.addEventListener("DOMContentLoaded", () => {
  // --- Seletores do DOM ---
  const display = document.querySelector(".display");
  const buttons = document.querySelectorAll(".btn");

  // --- Variável de Estado ---
  let resultadoExibido = false; // Controla se o valor no display é um resultado

  // --- Lógica de Eventos ---
  buttons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const buttonClicked = event.target;
      const action = buttonClicked.dataset.action;
      const value = buttonClicked.dataset.value;

      if (value) {
        adicionarCaracter(value);
      }

      if (action) {
        switch (action) {
          case "clear":
            limparTela();
            break;
          case "invert":
            inverterSinal();
            break;
          case "calculate":
            calcular();
            break;
        }
      }
    });
  });

  // --- Funções da Calculadora ---

  function adicionarCaracter(caracter) {
    const ehOperador = isNaN(caracter) && caracter !== ".";

    // Se um resultado estiver na tela E o próximo clique for um NÚMERO,
    // limpa o display e começa um novo cálculo.
    if (resultadoExibido && !ehOperador) {
      display.value = caracter;
      resultadoExibido = false;
      return;
    }

    // Se um resultado estiver na tela E o próximo clique for um OPERADOR,
    // permite que o cálculo continue usando o resultado.
    if (resultadoExibido && ehOperador) {
      resultadoExibido = false;
    }

    display.value += caracter;
  }

  function limparTela() {
    display.value = "";
    resultadoExibido = false; // Reseta a bandeira
  }

  function calcular() {
    if (display.value === "") return;
    try {
      const expressaoCorrigida = display.value.replace(/--/g, "+");
      display.value = eval(expressaoCorrigida);
      resultadoExibido = true; // "Levanta" a bandeira indicando que é um resultado
    } catch {
      display.value = "Erro";
      resultadoExibido = true; // Também considera "Erro" como um resultado a ser limpo
    }
  }

  function inverterSinal() {
    if (display.value) {
      display.value = parseFloat(display.value) * -1;
    }
  }
});
