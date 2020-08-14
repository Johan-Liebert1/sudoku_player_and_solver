let difficultyBtns   = document.getElementsByClassName('dbtns')
let difficulty       = 'easy'
var isBoxHighlighted = false

var virgin_board, current_board_solved, current_board_unsolved


const get_boards = (diff) => {
    let two_boards         = return_one_board(Math.floor(Math.random() * 50), diff)
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


inter = setInterval(() => {
    let cells = document.getElementsByClassName('cell')
    if (cells.length === 81){
        clearInterval(inter)
    }

}, 500);




