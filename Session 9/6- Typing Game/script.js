const word = document.getElementById('word')
const text = document.getElementById('text')
const scoreEl = document.getElementById('score')
const timeEl = document.getElementById('time')
const endgameEl = document.getElementById('end-game-container')
const settingsBtn = document.getElementById('settings-btn')
const settings = document.getElementById('settings')
const settingsForm = document.getElementById('settings-form')
const difficultySelect = document.getElementById('difficulty')

// List of words for game
const words = [
    'sigh',
    'tense',
    'airplane',
    'car',
    'love',
    'good',
    'travel',
    'food',
    'life',
    'time',
    'hello',
    'dictionary'
]

// init word
let randomWord

// init score
let score = 0
 
/// init time
let time = 10

// set difficulty to value in ls or medium
let difficulty = localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'medium'

// Set difficulty select value
difficultySelect.value = localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'medium'

// Focus on text on start
text.focus()

// start counting down
const timeInterval = setInterval(updateTime, 1000)

// generate random word from array
function getRandomWord(){
    return words[Math.floor(Math.random()* words.length)]
}

// add word to dom
function addWordToDom(){
    randomWord = getRandomWord()
    word.innerHTML = randomWord
}

function updateScore(){
    score++
    scoreEl.innerHTML = score
}

function updateTime(){
    time--
    timeEl.innerHTML= time + 's'
    if(time === 0 ){
        clearInterval(timeInterval)
        // end game
        gameOver()
    }
}

function gameOver(){
    endgameEl.innerHTML = `
        <h1>Time ran out</h1>
        <p>Your final score is ${score}</p>
        <button onclick="location.reload()">Reload</button>
    `

    endgameEl.style.display = 'flex'
}

addWordToDom()

text.addEventListener('input', e=>{
    const insertedText = e.target.value

    if(insertedText === randomWord){
        addWordToDom()
        updateScore()
        e.target.value = ''
        if(difficulty === 'hard'){
            time += 2
        } else if(difficulty === 'medium'){
            time += 3
        } else{
            time += 5
        }

        updateTime()
    }
})

// Settings btn click
settingsBtn.addEventListener('click', () =>
settings.classList.toggle('hide'))

// Setting select
settingsForm.addEventListener('change', e =>{
    difficulty = e.target.value
    localStorage.setItem('difficulty', difficulty)
})