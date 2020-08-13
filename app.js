let solveBoard       = document.getElementById('solve-board')
let hintButton       = document.getElementById('hint')
let clearButton      = document.getElementById('clear-board')
var isBoxHighlighted = false

let two_boards             =  return_one_board(0)
var virgin_board           = JSON.stringify(two_boards[0])
var current_board_unsolved = two_boards[0]
var current_board_solved   = JSON.parse(two_boards[1])

// 1. When solved, untouched pieces will be green
// 2. Hinted will be Orange
// 3. when a number is selected, outline the whole column and row

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

display_board()

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

            if (!check_number_validity(current_board_unsolved, Number(number), row, col))
                current_cell.setAttribute("style", "color: red")

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

    console.log(event)
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