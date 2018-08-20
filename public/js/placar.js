$("#butao-placar").click(mostraPlacar);
$("#sync").click(addPlacarServer);

function addPlacar() {
  var tbody = $(".placar").find("tbody");
  var pontos = $("#conta-palavras").text();
  var nome = $("#usuarios").val();
  var linha = adicionaLinha(nome, pontos);
  tbody.append(linha);
  linha.find(".botao-remover").click(removeLinha);
  $(".placar").slideDown(500);
  scrollPlacar();

}

function scrollPlacar() {
  var placar = $(".placar").offset().top;
  $("body").animate(
    {
    scrollTop: placar+"px"
  },1000);
}

function adicionaLinha(nome, pontos) {
  var linha = $("<tr>");
  var jogador = $("<td>").text(nome);
  var placar = $("<td>").text(pontos);
  var deleta = $("<td>");
  var botao = $("<a>").addClass("botao-remover").attr("href", "#");
  var icon = $("<i>").addClass("small").addClass("material-icons").text("delete");
  botao.append(icon);
  deleta.append(botao);
  linha.append(jogador);
  linha.append(placar);
  linha.append(deleta);
  return linha;
}

function removeLinha(){
  event.preventDefault();
  $(this).parent().parent().fadeOut(1000);
  setTimeout(function () {
    $(this).parent().parent().remove();
  }, 1000);
  }

function mostraPlacar() {
  $(".placar").stop().slideToggle(600);

}

function addPlacarServer() {
  $("#spinner").fadeToggle();
  var objeto = [];
  var linhas = $("tbody>tr");
  linhas.each(function () {
    var usuario = $(this).find("td:nth-child(1)").text();
    var palavras = $(this).find("td:nth-child(2)").text();
    var date ={
      usuario: usuario,
      pontos: palavras
    }
    objeto.push(date);
    });
    var dados = {
      placar: objeto
    }
    $.post("http://localhost:3000/placar", dados, function () {
        $("#salvo-placar").fadeToggle();
        setTimeout(function () {
          $("#salvo-placar").fadeToggle();
        },2000);
    })
    .fail(function () {
      $("#erro").fadeToggle();
      setTimeout(function () {
        $("#erro").fadeToggle();
      },2000);
    })
    .always(function () {
      $("#spinner").fadeToggle();
    });
}

function atualizaPlacar() {
  $.get("http://localhost:3000/placar", function (data) {
    $(data).each(function () {
      var linha = adicionaLinha(this.usuario, this.pontos);
      linha.find(".botao-remover").click(removeLinha);
      $("tbody").prepend(linha);
    });
  });
}
