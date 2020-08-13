getBoardButton = document.getElementById('get-board')
let board          = document.getElementById('board')
var isBoxHighlighted = false
current_board = return_one_board(0)

const display_board = () => {
    for (let i = 0; i < 9; i++){
        for (let j = 0; j < 9; j++){
            let cell = document.createElement('div')
            cell.className = 'cell '

            if ((i + 1) % 3 === 0 && i !== 8)
                cell.className += 'mar-btm '

            if ((j + 1) % 3 === 0 && j !== 8)
                cell.className += 'mar-right '

            else if ((i + 1) % 3 !== 0 && (j + 1) % 3 !== 0 && i !== 8 && j !== 8)
                cell.className += 'mar-all '

            cell.innerHTML += `<p class="number">${current_board[i][j]}</p>`
            cell.addEventListener('click', () => get_row_col(cell, i, j))
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

const get_row_col = (cell, row, col) => {
    if (!isBoxHighlighted)
        cell.className += ' highlight '
    else
        cell.classList.remove('highlight')

    isBoxHighlighted = !isBoxHighlighted
}
