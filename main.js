const area_principalEl = document.querySelector('[data-js="jogo-area"]')
const butao_iniciarEl = document.querySelector('[data-js="butao-iniciar"]')
const pontuacaoEl = document.querySelector('[data-js="score"]')
const botaoAumentarSpeedEl = document.querySelector('[data-btn-speed="aumentar"]')
const botaoDiminuirSpeedEl = document.querySelector('[data-btn-speed="diminuir"]')
const velocidadeEl = document.querySelector('[data-speed="velocidade"]')
const botaoAumentarTimerEl = document.querySelector('[data-btn-timer="aumentar"]')
const botaoDiminuirTimerEl = document.querySelector('[data-btn-timer="diminuir"]')
const timerEl = document.querySelector('[data-timer="timer"]')
const contagemEl = document.querySelector('[data-contagem="contagem"]')
const listaTituloEl =document.querySelector('[data-lista="title"]')
const butaoHistoricoEl = document.querySelector('[data-js="butao-historico"]')
const modalScreen = document.querySelector('[data-js="modal"]')
const butaoComoJogar = document.querySelector('[data-js="butao-ajuda"]')
const modalAjuda = document.querySelector('[data-js="como-jogar"]')

const coresBolinhas = ['white', 'red', 'pink', 'green', 'yellow', 'black', 'gray','purple','orange', 'Teal']

// objeto pra controle geral
const jogoControleTotal = (()=>{
  let jogoObjeto ={
    start : 'sim',
    iniciouContagem : 'sim',
    idIntervalJogo :0,
    idContagemRegresiva: 0,
    pontos: 0
  }
  return {
    pontos: jogoObjeto.pontos ,
    checarInicioGame: () =>jogoObjeto.start,

    ativarInicioGame:() => {
      jogoObjeto.start = 'sim'
    },
    desativarInicioGame: () => {
      jogoObjeto.start = 'nao'
    },
    setarIdClearInterval : (id)=> {
      jogoObjeto.idIntervalJogo = id
      console.log('id' + jogoObjeto.idIntervalJogo)
    },

    setarIdContagem : (id) => {
      jogoObjeto.idContagemRegresiva = id
    },

    paraJogoZerarTudo : () =>{
      clearInterval(jogoObjeto.idIntervalJogo)
      clearInterval(jogoObjeto.idContagemRegresiva)
    },
    checarInicioContagem : () => jogoObjeto.iniciouContagem,

    ativiarIniciouContagem: () => {
      jogoObjeto.iniciouContagem = 'sim'

    },
    desativarInicioContagem: ()=> {
      jogoObjeto.iniciouContagem = 'nao'
    }
  }
})()

// controlar velocidade das bolhas
function controlarVelocidade (){
  botaoAumentarSpeedEl.addEventListener('click', e =>{
    const velocAtual = Number(velocidadeEl.textContent)
    const teste = velocAtual + 0.2
    velocidadeEl.textContent = teste.toFixed(1)
  })

  botaoDiminuirSpeedEl.addEventListener('click', e =>{
    const velocAtual = Number(velocidadeEl.textContent)
    let teste = (velocAtual - 0.2).toFixed(1)
    if(teste == 0.2 || teste == 0){
      teste = 0.2
      console.log('testando') 
    }
    velocidadeEl.textContent = teste
  })
}
// controlar timer menu
function controlarTimer (){
  botaoAumentarTimerEl.addEventListener('click', e =>{
    let velocAtual = Number(timerEl.textContent)
    console.log(velocAtual)
    if (velocAtual == 60){
      velocAtual = 50
      console.log('oi')
    }
    timerEl.textContent = velocAtual + 10
  })

  botaoDiminuirTimerEl.addEventListener('click', e =>{
    let velocAtual = Number(timerEl.textContent)
    console.log(velocAtual)
    if (velocAtual == 10) {
      velocAtual = 20
    }
    timerEl.textContent = velocAtual - 10
  })
}
const pegarDiaHoraHoje = () =>{
  const timeStamp  = new Date()
  const horas = timeStamp.getHours()
  const minutos = timeStamp.getMinutes()
  const segundos = timeStamp.getSeconds()
  const dia = timeStamp.getDay()
  const mes = (timeStamp.getMonth()) + 1
  const ano = timeStamp.getFullYear() 

  return [horas, minutos, segundos,dia, mes, ano]

}
const adicionarItemAoHistorico = (segundosTimer) =>{
  const [horas, minutos, segundos,dia, mes, ano] = pegarDiaHoraHoje()

  const li = document.createElement('li')
  li.innerHTML = `<p>Partida jogada em: ${dia}/${mes}/${ano} as ${horas}:${minutos}:${segundos} </p>
  <span>Speed: ${velocidadeEl.textContent} </span>
  <span>| Timer: ${segundosTimer} segundos</span>
  <span>| ${pontuacaoEl.textContent}.</span>
  `
  listaTituloEl.insertAdjacentElement('afterend', li)
}

// iniciar o game / botao
butao_iniciarEl.addEventListener('click', (e)=>{
  const velocidadeMilisegundos = (Number(velocidadeEl.textContent)) * 1000
  const segundosContagem = Number(timerEl.textContent)
  // console.log(window.screen.width)
  console.log(area_principalEl.scrollWidth)
  pontuacaoEl.textContent = `SCORE: 0 pontos`

  teste(velocidadeMilisegundos)
  contagemRegressiva(segundosContagem)
})

const limparBolhas = () =>{
  const bolhasCriadasEl = document.querySelectorAll('[data-js="bolha"]')
  bolhasCriadasEl.forEach(item => item.remove())
}
function mostrarHistorico (){
butaoHistoricoEl.addEventListener('click', e => {
  modalScreen.classList.remove('hidden')
})
}
const esconderHistorico = () =>{
  modalScreen.addEventListener('click', e =>{
    modalScreen.classList.add('hidden')
  })
}
const mostrarModalComoJogar = () =>{
  butaoComoJogar.addEventListener('click', e =>{
    modalAjuda.classList.remove('hidden')
  })
}
const esconderAjudaComoJogar = () =>{
  modalAjuda.addEventListener('click', e =>{
    modalAjuda.classList.add('hidden')
  })
}
// função para o cronometro / cont. regressiva
function contagemRegressiva (segundos) {
  if(typeof segundos !== 'number'){
    console.log(typeof segundos + 'oi')
    console.log('segundos passado por argumento não é um numero')
    segundos = 30
  }
  let menuJogo = jogoControleTotal
  let counter = segundos
  let checarStartTrue = menuJogo.checarInicioContagem()

  if(checarStartTrue === 'sim'){
    menuJogo.desativarInicioContagem()

    const idContagem = setInterval(()=>{
    menuJogo.setarIdContagem(idContagem)

    contagemEl.textContent = counter < 10
    ?`${counter--} segundos`
    : `${counter--} segundos` 

    if(counter === -1){
      adicionarItemAoHistorico(segundos)
      limparBolhas()
      menuJogo.pontos = 0
      menuJogo.paraJogoZerarTudo()
      menuJogo.ativarInicioGame()
      menuJogo.ativiarIniciouContagem()
      contagemEl.textContent = ''
    }
  }, 1000)
  }
}

// função que controla as bolhas
function teste (velocidade) {
  if(typeof velocidade !== 'number'){
    console.log('Velocidade passada não é um numero')
    velocidade = 1000
  }
  let menuJogo = jogoControleTotal
  let checarStartTrue = menuJogo.checarInicioGame()
  const larguraDaTela = window.screen.width
  if(checarStartTrue === 'sim'){
    menuJogo.desativarInicioGame()
    console.log('começou')

    const idd = setInterval(()=>{

      menuJogo.setarIdClearInterval(idd)
      const corEscolhida = coresBolinhas[Math.round(Math.random(0) * (coresBolinhas.length -1))]

      let bolhaEl = document.createElement('span')
      bolhaEl.dataset.js = 'bolha'
      bolhaEl.style.background = corEscolhida

      if(larguraDaTela > 600){
      const top = Math.round(Math.random((0)) * (340))
      const left = Math.round(Math.random((0)) * (460))
      bolhaEl.style.top = `${top}px`
      bolhaEl.style.left = `${left}px`
      } else {
        const top = Math.round(Math.random((0)) * (170))
        const left = Math.round(Math.random((0)) * (280))
        bolhaEl.style.top = `${top}px`
        bolhaEl.style.left = `${left}px`
      }
      area_principalEl.appendChild(bolhaEl)
      bolhaEl.classList.add('bolhinha')
  },velocidade)
}
}

// função pra deletar as bolhas
function explodirBolha (){
  const menuJogo = jogoControleTotal
  area_principalEl.addEventListener('click',e =>{
  
    if(e.target.classList.contains('bolhinha')){
      e.target.remove()
      pontuacaoEl.textContent = `SCORE: ${menuJogo.pontos += 1} pontos`
      console.log('oi')
    }
  })
}
mostrarModalComoJogar()
esconderAjudaComoJogar()
mostrarHistorico()
esconderHistorico()
controlarTimer()
controlarVelocidade()
explodirBolha()