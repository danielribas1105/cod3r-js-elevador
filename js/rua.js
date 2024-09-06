
function criarFaixas() {
    const quantFaixas = +($('.rua').attr('faixas'))
    for(let i = 0; i < quantFaixas; i++){
        $('.rua').append("<div class='faixa'></div>");
    }
}

