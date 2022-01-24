const X_CLASS='x'
const CIRCLE_CLASS='circle'
const WINNING_COMBINATIONS=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]
const cellElelments = document.querySelectorAll('[data-cell]')
const board = document.getElementById('board')
const winningMessageElement = document.getElementById('winningMessage')
const restartButton=document.getElementById('restartButton')
const winningMessageTextElement=document.querySelector('[data-winning-message-text]')
let circleTurn

startGame()

restartButton.addEventListener('click',startGame)

function startGame() {
    circleTurn=false
    cellElelments.forEach(cell=>{
        cell.classList.remove(X_CLASS)
        cell.classList.remove(CIRCLE_CLASS)
        cell.removeEventListener('click',handleClick)
        cell.addEventListener('click',handleClick,{once: true})
    })
    setboardHoverClass()
    winningMessageElement.classList.remove('show')
}

function handleClick(e){
    // console.log('clicked')
    const cell =e.target
    const currentClass=circleTurn ? CIRCLE_CLASS:X_CLASS
    placeMark(cell,currentClass)//placeMark
    if(checkWin(currentClass)){              //check for win
    // console.log('winner')
    endGame(false)
    }
    else if (isDraw()) {
        endGame(true)
    }
    else{
        swapTurns()//switch Turns
        setboardHoverClass()
    }
    //check for draw
    // console.log('clicked')

}

function endGame(draw) {
    if(draw){
        winningMessageTextElement.innerText='Draw!'
    }
    else{
        winningMessageTextElement.innerText=`${circleTurn ? "O's" :
        "X's"}Wins!`
    }
    winningMessageElement.classList.add('show')
}

function isDraw() {
    return [...cellElelments].every(cell=>{
        return cell.classList.contains(X_CLASS) ||
        cell.classList.contains(CIRCLE_CLASS)
    })
}

function placeMark(cell,currrntClass){
    cell.classList.add(currrntClass)
}

function swapTurns(){
    circleTurn=!circleTurn
}

function setboardHoverClass(){
    board.classList.remove(X_CLASS)
    board.classList.remove(CIRCLE_CLASS)
    if(circleTurn){
        board.classList.add(CIRCLE_CLASS)
    }
    else{
        board.classList.add(X_CLASS)
    }
}

function checkWin(currrntClass) {
    return WINNING_COMBINATIONS.some(combination =>{
        return combination.every(index =>{
            return cellElelments[index].classList.contains(currrntClass)
        })
    })
}