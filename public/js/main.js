var campo = $(".campo-digitacao");
var tempoInicial = $("#time").text();
$("#butao-reinicia").click(reiniciaJogo);

$(function () {
  palavrasFraseInicial();
  preencheResultado();
  cronometroJogo();
  adicionaBorda();
  atualizaPlacar();
  $("#usuarios").selectize({
    create: true,
    sortField: 'text'
});
});

function tempoNovo(tempo){
  $("#time").text(tempo);
  tempoInicial = tempo;
}

function palavrasFraseInicial() {
  var frase = $(".frase").text();
  var tamanhoFrase = frase.split(" ").length;
  var numeroPalavras = $("#numero-palavras");
  numeroPalavras.text(tamanhoFrase);
}

function preencheResultado() {
  campo.on("input", function(){
  var quantidadePalavrasDigitadas = campo.val().split(/\s+/).length;
  var numeroPalavrasDigitadas = $("#conta-palavras");
  numeroPalavrasDigitadas.text(quantidadePalavrasDigitadas);
  var numeroCaracter = campo.val().length;
  $("#conta-caracter").text(numeroCaracter);
  });
}

function cronometroJogo() {
  campo.one("focus", function(){
    var tempoRestante = $("#time").text();
    $("#butao-reinicia").attr("disabled", true);
    var cronometro = setInterval(function(){
      tempoRestante = tempoRestante - 1;
      $("#time").text(tempoRestante);
      if(tempoRestante <= 0){
        clearInterval(cronometro);
        tempoOut();
      }
    },1000);

  });
}

function tempoOut() {
  campo.addClass("campo-desativado");
  $("#butao-reinicia").attr("disabled", false);
  campo.attr("disabled", true);
  //$(".jogador").fadeIn();
  //$("#butao-add").one("click", function () {
  addPlacar();
  //});
}

function adicionaBorda() {
  campo.on("input", function () {
    var digitado = campo.val();
    var comparavel = $(".frase").text().substr(0, digitado.length);
    if(digitado == comparavel){
      campo.addClass("borda-verde");
      campo.removeClass("borda-vermelha");
    } else{
      campo.addClass("borda-vermelha");
      campo.removeClass("borda-verde");
    }
  });
  /*if($(".frase").text().startsWith(digitado)){
  campo.addClass("borda-verde");
  campo.removeClass("borda-vermelha");
} else{
  campo.addClass("borda-vermelha");
  campo.removeClass("borda-verde");
}
});*/
}

function reiniciaJogo() {
    //$(".jogador").fadeOut();
    //$("#gamer").val("");
    $("#time").text(tempoInicial);
    campo.attr("disabled", false);
    campo.val("");
    $("#conta-palavras").text("0");
    $("#conta-caracter").text("0");
    cronometroJogo();
    campo.removeClass("campo-desativado");
    campo.removeClass("borda-verde");
    campo.removeClass("borda-vermelha");
}
