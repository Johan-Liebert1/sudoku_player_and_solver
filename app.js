let solveBoard       = document.getElementById('solve-board')
let hintButton       = document.getElementById('hint')
let clearButton      = document.getElementById('clear-board')
let difficultyBtns   = document.getElementsByClassName('dbtns')
let difficulty       = 'easy'
var isBoxHighlighted = false

var virgin_board, current_board_solved, current_board_unsolved


const display_board = (current_board = current_board_unsolved, isBeingSolved = false, hint = []) => {
    console.log('hint = ', hint)
    if (document.getElementById('board') !== null){
        let bd = document.getElementById('board')
        bd.parentNode.removeChild(bd)
    }
    let body = document.getElementsByTagName('body')
    let board = document.createElement('div')
    board.id = 'board'
    body[0].appendChild(board)

    for (let i = 0; i < 9; i++){
        for (let j = 0; j < 9; j++){

            // let cell = document.createElement('div')

            let cell = document.createElement('input')
            cell.className = 'cell '

            if ((i + 1) % 3 === 0 && i !== 8)
                cell.className += 'mar-btm '

            if ((j + 1) % 3 === 0 && j !== 8)
                cell.className += 'mar-right '

            else if ((i + 1) % 3 !== 0 && (j + 1) % 3 !== 0 && i !== 8 && j !== 8)
                cell.className += 'mar-all '

            // cell.innerText += `<p class="number">${current_board[i][j]}</p>`

            cell.value = current_board[i][j] === 0 ? "" : current_board[i][j]

            if (isBeingSolved){
                if (current_board_unsolved[i][j] !== current_board[i][j])
                    cell.setAttribute('style', 'color:green')
            }

            if (hint.length > 1 && hint[0] === i && hint[1] === j){
                cell.setAttribute('style', 'color:orange')
            }

            cell.addEventListener('click', () => get_row_col(cell))

            if (current_board[i][j] === 0)
                cell.addEventListener('keydown', () => keypressed(event,i,j, cell))

            board.appendChild(cell)
        }
    }
}

const get_boards = (diff) => {
    console.log('inside get boards')
    let two_boards         = return_one_board(Math.floor(Math.random() * 50), diff)
    console.log(two_boards)
    virgin_board           = JSON.stringify(two_boards[0])
    current_board_unsolved = two_boards[0]
    current_board_solved   = JSON.parse(two_boards[1])

    display_board(current_board_unsolved)
}

get_boards(difficulty)

const add_remove_fill = (id) => {
    for (let i = 0; i < 3; i++){
        if (i === id)
            difficultyBtns[i].classList += ' filled '
        else
            difficultyBtns[i].classList.remove('filled')
    }
}

for (let i = 0; i < 3; i++) {
    difficultyBtns[i].addEventListener('click', () => {
        
        if (difficultyBtns[i].innerText.toLowerCase() === 'easy'){
            difficulty = 'easy'
            add_remove_fill(i)
            get_boards(difficulty)
        }

        else if (difficultyBtns[i].innerText.toLowerCase() === 'medium'){
            difficulty = 'medium'
            add_remove_fill(i)
            get_boards(difficulty)

        }

        else if (difficultyBtns[i].innerText.toLowerCase() === 'advanced'){
            difficulty = 'advanced'
            add_remove_fill(i)
            get_boards(difficulty)

        }

    })
}

console.log(difficulty)



inter = setInterval(() => {
    console.log('inside setinterval', inter)
    let cells = document.getElementsByClassName('cell')
    if (cells.length === 81){
        clearInterval(inter)
    }

}, 500);

const get_row_col = (cell) => {
    let cells = document.getElementsByClassName('cell')

    for (cell2 of cells){
        if (cell.value !== '' && cell2.value === cell.value && !isBoxHighlighted){
            cell2.className += ' highlight '

        }
        else{
            cell2.classList.remove('highlight')
        }
    }    

    isBoxHighlighted = !isBoxHighlighted
}

function keypressed (event, row, col, current_cell) {
    event.preventDefault()
    keys = ['1', '2', '3', '4', '5','6','7', '8', '9', 'Backspace']

    if (!
        ((49 <= event.keyCode && event.keyCode <= 57) 
        || 
        (97 <= event.keyCode && event.keyCode <= 105)
        || (event.keyCode === 8)
    )) {
        alert("Only supported keys are Numbers and Backspace.                          \
        If you're seeing this even though you've pressed a number key, then you might have your numlock off")

    }

    else {
        number = event.key

        if (keys.includes(event.key)){
            if (event.keyCode !== 8){
            event.target.value = number

            if (!check_number_validity(current_board_unsolved, Number(number), row, col)){
                current_board_unsolved[row][col] = Number(number)
                current_cell.setAttribute("style", "color: red")
            }
            else{
                current_board_unsolved[row][col] = Number(number)
                current_cell.setAttribute("style", "color: green")
            }
        }

        else {
            event.target.value = ''
        }
        
        }
    }
    if (!find_unfilled(current_board_unsolved)){
        win_dialog = document.getElementById('you-win')
        win_dialog.classList.remove('gameover-dialog')

        if (!hasPlayerWon()) {
            win_dialog.innerText = "There's a mistake somewhere"
            win_dialog.setAttribute('style', 'color: red; font-size: 36px;')
        }

        else {
            win_dialog.innerText = "You Solved It"
            win_dialog.setAttribute('style', 'color: #27ae60; font-size: 36px;')
        }
    }
}

const solve_current_board = () => {
    console.log('sovlecurrentboard')
    
    display_board(current_board = current_board_solved, isBeingSolved = true)
}

solveBoard.addEventListener('click', solve_current_board)

const give_hint = () => {
    let arr = find_unfilled(current_board_unsolved)
    let row = arr[0]
    let col = arr[1]

    current_board_unsolved[row][col] = current_board_solved[row][col]

    display_board(current_board_unsolved, isBeingSolved=false, hint = arr)

}

hintButton.addEventListener('click', give_hint)


const clear_board = () => {
    for (let i = 0; i < 9; i++){
        for (let j = 0; j < 9; j++){
            current_board_unsolved[i][j] = JSON.parse(virgin_board)[i][j]

        }
    }
    display_board(JSON.parse(virgin_board))
}

clearButton.addEventListener('click', clear_board)

const hasPlayerWon = () => {
    for (let row = 0; row < 9; row++){
        for (let col = 0; col < 9; col++){
            if (current_board_unsolved[row][col] !== current_board_solved[row][col])
                return false
        }
    }
    return true
}

