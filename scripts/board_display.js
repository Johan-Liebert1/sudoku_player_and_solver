const display_board = (
    current_board = current_board_unsolved, 
    isBeingSolved = false, 
    hint = [],
    solvingUserBoard = false
    ) => {
   
    if (!solvingUserBoard) {
        console.log('inside display board')

        ptag = document.getElementById('you-win')

        ptag.classList.add('gameover-dialog')
    }

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

            if (!solvingUserBoard){
                cell.addEventListener('click', () => get_row_col(cell))

                if (current_board[i][j] === 0)
                    cell.addEventListener('keydown', () => keypressed(event,i,j, cell))
            }

            else {
                cell.addEventListener('keydown', () => keypressedPart2(event,i,j, cell))
            }

            board.appendChild(cell)
        }
    }
}