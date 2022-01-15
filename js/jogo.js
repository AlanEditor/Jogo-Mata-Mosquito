//Variaveis Globais
var altura = 0
var largura = 0
var posicaoX = 0
var posicaoY = 0
var classe = 0
var lado = 0
var srcImagemVazio = '/imagens/coracao_vazio.png'
var vida = 1
var tempo = 7

var criaMosquitoTempo = 1500

var nivel = window.location.search
nivel = nivel.replace('?','')


if(nivel === 'Normal')
{
    criaMosquitoTempo = 1500
} 
else if(nivel === 'Dificil')
{
    criaMosquitoTempo = 1000
}
else if(nivel === 'Lendario')
{
    criaMosquitoTempo = 750
}

//Função que ajusta retorna o valor do eixo X e Y
function ajustaTamanhoPalcoJogo()
{
     altura = window.innerHeight
     largura = window.innerWidth

     //console.log(altura, largura)
}

ajustaTamanhoPalcoJogo()



function posicaoRandomica()
{
    //Remover o mosquito anterior caso exista
    if(document.getElementById('mosquito')) //retorna true
    {

        //checagem de vida e decremento da mesma
        while(document.getElementById('mosquito'))
        {
            document.getElementById('mosquito').remove()
            document.getElementById('vida'+vida).src = srcImagemVazio
            vida++      
            console.log('vida: ' + vida)               
        }

        if(vida === 4)
        {
            perdeu()
        }
   
    }


    //Posições arredondadas
    posicaoX = Math.floor(Math.random() * largura) - 90
    posicaoY = Math.floor(Math.random() * altura) - 90

    //Operador ternário
    posicaoX = posicaoX < 0 ? 0 : posicaoX
    posicaoY = posicaoY < 0 ? 0 : posicaoY

    console.log(posicaoX, posicaoY)

    //Criar o elemento html
    var mosquito = document.createElement('img')

    mosquito.src = 'imagens/mosquito.png' //caminho da imagem
    mosquito.className = tamanhoAleatorio() + ladoAleatorio() //classe
    mosquito.style.left = posicaoX + 'px' //posição esquerda
    mosquito.style.top = posicaoY + 'px' //posição top
    mosquito.style.position = 'absolute' //posição absoluta do mosquito
    mosquito.id = 'mosquito' //atribuindo id ao elemento

    mosquito.onclick = function() //função de remoção do mosquito no evento 'on click()'
    {
        this.remove()
    }

    document.body.appendChild(mosquito)
    console.log(ladoAleatorio())

}

//tamanho randomico do mosquito
function tamanhoAleatorio()
{
    classe = Math.floor(Math.random()*3)
    console.log(classe)

    switch(classe)
    {
        case 0:
            return 'mosquito1'
        case 1:
            return 'mosquito2'
        case 2:
            return 'mosquito3'
    }

}

//lado Aleatório
function ladoAleatorio()
{
    lado = Math.floor(Math.random()*2)

   switch(lado)
   {
       case 0:
           return ''
       case 1:
           return ' ladoInverso'
   }
}

//Game Start
function iniciarJogo()
{   
    var nivel = document.getElementById('nivel').value

    if(nivel === '')
    {
        alert('Escolha um nível')
        return false //função para neste local
    }

    window.location.href = 'app.html?'+nivel

}

//GameOver
function perdeu()
{
   window.location.href='fim-de-jogo.html'
    //window.location.reload()
}

//Restart
function reiniciar()
{
    window.location.href ='index.html'
}

//Win
function vitoria()
{
    window.location.href ='vitoria.html'
}

//Cronometro
var cronometro = setInterval(function()
{
    tempo--
    
    if(tempo < 0)
    {
        clearInterval(cronometro)
        clearInterval(criaMosquito)
        vitoria()
    }
    else
    {
        document.getElementById('cronometro').innerHTML = tempo
    }

},1000)

