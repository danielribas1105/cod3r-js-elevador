
//cria os pavimentos do predio
function criarPavimentos() {
    const quantAndares = +($('.coluna').attr('andares'))
    for(let i = 0; i < quantAndares; i++){
        $('.coluna').append(criarAndar(quantAndares - i))
    }
    $('.coluna').append(criarTerreo(0))
}

//cria estrutura dos andares
function criarAndar(numAndar) {
    const andar = $('<div>',{ 
        class: 'andar', 
        andar: `${numAndar}`
    })
    const porta = $('<div>',{ class: 'porta' })

    return andar.append(porta)
}

//cria estrutura do andar terreo
function criarTerreo(numAndar) {
    const terreo = $('<div>',{ 
        class: 'terreo',
        andar: `${numAndar}`
    })
    const janela = $('<div>',{ class: 'janela' })
    
    return terreo.append(janela)
}

function criarElevador(numAndar) {
    const elevador = $('<div>',{ 
        class: 'elevador',
        andar: `${numAndar}`
    })
    elevador.height(obterAlturaElevador())
    return $('.poco').append(elevador)
}

function obterAlturaElevador() {
    const alturaAndar = $('.andar').outerHeight(true)
    return alturaAndar
}

function moverElevador(andar) {
    const numeroAndar = +andar
    const elevador = $('.elevador')
    
    elevador.css('bottom', obterAlturaElevador() * numeroAndar)
}

function obterPosicaoAtualElevador() {
    const elevador = $('.elevador')
    const posElevador = elevador.css('bottom').replace('px', '')
    return +posElevador
}

function aplicarControlesElevador() {
    const botoes = $('.controles').find('button')
   
    botoes.on('click', function() {
        botoes.each(function() {
            const destino = $(this).attr('destino')
            console.log(destino)
            moverElevador(destino)
        })
    })
}