let solveBoard       = document.getElementById('solve-board')
let hintButton       = document.getElementById('hint')
let clearButton      = document.getElementById('clear-board')

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


const solve_current_board = () => {    
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