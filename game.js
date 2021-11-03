const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: "¿Cuál es la función del signo que resulta de la derivada parcial con respecto a x?",
        choice1: '	Indica solo el cambio de claro a oscuro',
        choice2: '	Indica solo el cambio de oscuro a claro',
        choice3: '	Indica ambos cambios',
        choice4: '	Ninguna de las anteriores ',
        answer: 3,
    },
    {
        question:
        "¿Cuál es la función del comando: “print(imagen.shape)”?",
        choice1: "Mostrar la imagen en blanco y negro",
        choice2: "Mostrar las dimensiones de la imagen",
        choice3: "Mostrar el tamaño en mb de la imagen",
        choice4: "Mostrar una grafica",
        answer: 2,
    },
    {
        question: "¿Cuál es la función del método: “plt.imread”?",
        choice1: "Permite agregar la imagen al proyecto",
        choice2: "Descarga la imagen del proyecto ",
        choice3: "Se muestra la imagen en el proyecto",
        choice4: "Cambia la imagen a blanco y negro ",
        answer: 1,
    },
    {
        question: "¿Son aplicaciones de  la detección de bordes, excepto?",
        choice1: "Encontrar obstáculos en una imagen",
        choice2: "Identificar si un producto cumple los requisitos establecidos en una línea de producción",
        choice3: "Identificar textos ",
        choice4: "Identificar si un robot permanece encendido",
        answer: 4,
    },
    {
        question: "¿Cuál de las siguientes imágenes, representa un pixel más cercano al valor 1?",
        choice1: "0.0",
        choice2: "0.2",
        choice3: "0.5",
        choice4: "0.9",
        answer: 4,
    },
]

const SCORE_POINTS = 1
const MAX_QUESTIONS = 5

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)
        const div =  document.getElementById('divi')
            div.classList.remove('container3')
            div.innerHTML=""
            document.getElementById('ending').style.display = 'flex'
        document.getElementById('finalScore').innerHTML = score +' '+ '/ 5'
    }

    questionCounter++
    progressText.innerText = `Pregunta ${questionCounter} de ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`
    
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()
const username = document.querySelector('#username')
const saveScoreBtn = document.querySelector('#saveScoreBtn')
const finalScore = document.querySelector('#finalScore')
const mostRecentScore = localStorage.getItem('mostRecentScore')

const highScores = JSON.parse(localStorage.getItem('highScores')) || []

const MAX_HIGH_SCORES = 5

finalScore.innerText = mostRecentScore

 