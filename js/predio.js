
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

//cria estrutura do elevador
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

    if(emMovimentacao()) return

    iniciarMovimentacao()

    const numeroAndar = +andar
    const elevador = $('.elevador')
    const posicaoInicial = obterPosicaoAtualElevador()
    const posicaoFinal = obterAlturaElevador() * numeroAndar
    const direcaoElevador = posicaoFinal > posicaoInicial
    
    atualizarMostrador(direcaoElevador ? 'Subindo' : 'Descendo')

    let temporizador = setInterval(() => {
        const novaPosicao = obterPosicaoAtualElevador() + (direcaoElevador ? 5 : -5)
        const terminouMovimento = direcaoElevador ? novaPosicao >= posicaoFinal : novaPosicao <= posicaoFinal 
        
        elevador.css('bottom', novaPosicao)

        if(terminouMovimento) {
            clearInterval(temporizador)
            atualizarMostrador(andar)
            pararMovimentacao()
        }
    }, 30)


}

function obterPosicaoAtualElevador() {
    const elevador = $('.elevador')
    const posElevador = elevador.css('bottom').replace('px', '')
    return +posElevador
}

function aplicarControlesElevador() {
    const botoes = $('.controles').find('button')
   
    botoes.on('click', function() {
        const destino = $(this).attr('destino')
        moverElevador(destino)
    })
}

function atualizarMostrador(texto) {
    let novoTexto = texto
    if(novoTexto !== 'Subindo' && novoTexto !== 'Descendo') {
        novoTexto = texto === '0' ? 'Térreo' : texto + 'º'
    } 
    $('.mostrador').text(novoTexto)
}

function iniciarMovimentacao() {
    const elevador = $('.elevador')
    elevador.attr('moving', true)
}

function pararMovimentacao() {
    const elevador = $('.elevador')
    elevador.removeAttr('moving');
}

function emMovimentacao() {
    const moving = $('.elevador').attr('moving')
    return moving
}