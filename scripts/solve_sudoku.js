let boardGoesHere = document.getElementById('board')
let solveUserBoard = document.getElementById('solve-user-board')
let clearUserBoard = document.getElementById('clear-user-board')
let user_given_board 

const clr_usr_brd = () => {
    user_given_board = []
    for (let i = 0; i < 9; i++){
        user_given_board.push([])
        for (let j = 0; j < 9; j++)
            user_given_board[i].push(0)
    }
    display_board(    
        current_board = user_given_board, 
        isBeingSolved = false, 
        hint = [],
        solvingUserBoard = true
    )
}

clr_usr_brd()

const slv_brd = () => {
    solve_board(user_given_board)
    display_board(    
        current_board = user_given_board, 
        isBeingSolved = false, 
        hint = [],
        solvingUserBoard = true
    )
}

solveUserBoard.addEventListener('click', slv_brd)
clearUserBoard.addEventListener('click', clr_usr_brd)

const keypressedPart2 = (event, row, col, current_cell) => {
    if (
        (event.keyCode >= 97 && event.keyCode <= 105)
        ||
        (event.keyCode >= 49 && event.keyCode <= 57)
    ) {
        num = Number(event.key)

        if (!check_number_validity(user_given_board, num, row, col)){
            user_given_board[row][col] = num
            current_cell.setAttribute("style", "color: red")
        }

        else {
            user_given_board[row][col] = num
            current_cell.setAttribute("style", "color: #27ae60")
        }
    }
}