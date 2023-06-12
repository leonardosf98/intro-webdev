window.onload = () => {
  //Lista de inputs para manipulação
  const inputCvv = document.getElementById("cvv");
  const inputNumero = document.getElementById("numero");
  const inputNome = document.getElementById("nome");
  const botao = document.querySelector(".confirmar__pedido");
  const paragrafoConsumidor = document.querySelector(".paragrafo__consumidor");

  //variável nome
  let consumidor;

  //Lista de eventos
  inputCvv.addEventListener("input", limitaCaracteres);
  inputCvv.addEventListener("keypress", somenteNumeros);
  inputNumero.addEventListener("keypress", somenteNumeros);
  inputNumero.addEventListener("input", adicionaEspacos);
  inputNumero.addEventListener("input", limitaNumeroCartao);
  inputNome.addEventListener("keypress", somenteLetras);
  botao.addEventListener("click", verificaDados);

  escrever();

  //Função para limitar caractéres do CVV
  function limitaCaracteres() {
    const maxLength = 3;
    const inputValue = this.value;

    if (inputValue.length > maxLength) {
      this.value = inputValue.slice(0, maxLength);
    }
  }

  //Função para limitar caractéres do número do cartão
  function limitaNumeroCartao() {
    const maxLength = 19;
    const inputValue = this.value;

    if (inputValue.length > maxLength) {
      this.value = inputValue.slice(0, maxLength);
    }
  }

  //Função para restringir uso de caractéres não numéricos
  function somenteNumeros(e) {
    if (isNaN(parseInt(e.key))) {
      e.preventDefault();
    }
  }
  //Função para restringir uso de caractéres numéricos
  function somenteLetras(e) {
    if (!isNaN(parseInt(e.key))) {
      e.preventDefault();
    }
  }

  //Função para separar os campos do número do cartão
  function adicionaEspacos(event) {
    let value = inputNumero.value;

    inputNumero.value = value
      .replace(/(\d{4})(\d)/, "$1 $2")
      .replace(/(\d{4})(\d)/, "$1 $2")
      .replace(/(\d{4})(\d)/, "$1 $2")
      .replace(/(-\d{4})\d+?$/, "$1");
  }

  function verificaDados() {
    console.log(inputNome.value, inputCvv.length, inputNumero);
    if (
      inputNome.value != " " &&
      inputCvv.value.length === 3 &&
      inputNumero.value.length === 19
    ) {
      let consumidor = inputNome.value;
      window.location.href = `./confirmado.html?nome=${consumidor}`;
    }
  }
};

function escrever() {
  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });
  let value = params.consumidor;
  if (paragrafoConsumidor) {
    paragrafoConsumidor.innerHTML = `Seu pedido está confirmado ${value}`;
  }
}
