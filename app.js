let solveBoard       = document.getElementById('solve-board')
var isBoxHighlighted = false

let two_boards             =  return_one_board(0)
var current_board_unsolved = two_boards[0]
var current_board_solved   = JSON.parse(two_boards[1])

// console.log(current_board, current_board_solved)

// document.addEventListener('keydown', (event) => console.log(`${event.key} pressed`))


const display_board = (current_board = current_board_unsolved) => {
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
            cell.setAttribute("isHighlighted", "false")
            cell.addEventListener('click', () => get_row_col(cell))
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
    keys = ['1', '2', '3', '4', '5','6','7', '8', '9']

    if (!
        ((49 <= event.keyCode && event.keyCode <= 57) 
        || 
        (97 <= event.keyCode && event.keyCode <= 105))
        ) { //|| event.keyCode === 13 || event.keyCode === 8){
        alert("Only supported keys are Numbers, Enter and Backspace")

    }

    else {
        number = event.key

        if (keys.includes(event.key)){
            event.target.value = number

            if (!check_number_validity(current_board_unsolved, Number(number), row, col))
                current_cell.setAttribute("style", "color: red")

            else
                current_cell.setAttribute("style", "color: green")

        
        }
    }

    console.log(event)
}

const solve_current_board = () => {
    console.log('sovlecurrentboard')
    
    display_board(current_board = current_board_solved)
}

solveBoard.addEventListener('click', solve_current_board)
