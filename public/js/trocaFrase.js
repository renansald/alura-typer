$("#butao-frase").click(trocaFrase);
$("#butao-frase-id").click(trocaFraseEscolha);

function trocaFrase() {
  $("#spinner").fadeToggle();
  $.get("http://localhost:3000/frases", trocaAleatoriamenteFrase)
  .fail(function () {
    $("#erro").fadeToggle(2000);
    setTimeout( function () {
      $("#erro").fadeToggle(2000);
    },3000);
  })
  .always(function () {
    $("#spinner").fadeToggle();
  })
}

function trocaAleatoriamenteFrase(data) {
  reiniciaJogo();
  var aleatorio = Math.floor(Math.random() * data.length);
  var frase = $(".frase");
  frase.text(data[aleatorio].texto);
  palavrasFraseInicial();
  tempoNovo(data[aleatorio].tempo);
}

function trocaFraseEscolha() {
  reiniciaJogo();
  $("#spinner").fadeToggle();
  var fraseId = $("#frase-id").val() - 1;
  var dados = {id: fraseId};
  $.get("http://localhost:3000/frases", dados, fraseEscolhida)
  .fail(function () {
    $("#erro").fadeToggle(2000);
    setTimeout( function () {
      $("#erro").fadeToggle(2000);
    },3000);
  })
  .always(function () {
    $("#spinner").fadeToggle();
  })
}

function fraseEscolhida(date) {
  $(".frase").text(date.texto);
  palavrasFraseInicial();
  tempoNovo(date.tempo);
}
