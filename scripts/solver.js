const check_row_validity = (board, number, row) => {

    for (let i = 0; i < board.length; i++){
        if (board[row][i] === number)
            return false
    }
    return true
}

const check_col_validity = (board, number, col) => {

    for (let i = 0; i < board.length; i++){
        if (board[i][col] === number)
            return false
    }
    return true
}

const check_box_validity = (board, number, box_number) => {
    // box number is a list. Boxes go from 00, 01, 02, 10, 11, 12 ....
    min_row = 3 * box_number[0]
    min_col = 3 * box_number[1]
    max_row = 3 * box_number[0] + 2
    max_col = 3 * box_number[1] + 2

    for (let row = min_row; row <= max_row; row++){
        for (let col = min_col; col <= max_col; col++){
            if (board[row][col] === number)
                return false
        }
    }
    
    return true
}

const check_number_validity = (board, number, row, col) => {
    return check_row_validity(board, number, row) && check_col_validity(board, number, col) && 
    check_box_validity(board, number, [Math.floor(row / 3), Math.floor(col / 3)])

}

const solve_board = (board, showSteps = false) => {
    if  (!find_unfilled(board))
        return true

    else
        lst = find_unfilled(board)

    let row = lst[0]
    let col = lst[1]

    for (let i = 1; i < 10; i++) {

        if (check_row_validity(board, i, row) && check_col_validity(board, i, col) && 
        check_box_validity(board, i, [Math.floor(row / 3), Math.floor(col / 3)])){

            board[row][col] = i

            if (solve_board(board, showSteps))
                return true
            
            board[row][col] = 0
        }
    }
    return false
}

const find_unfilled = (board) => {
    for (let i = 0; i < board.length; i++){
        for (let j = 0; j < board.length; j++){

            if (board[i][j] === 0)
                return [i, j]
        }
    }
    return false
}


const print_board = (board) => {
    for (let i = 0 ; i < 9; i++){
        console.log(board[i], '\n')
    }
}


