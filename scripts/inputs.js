function keypressed(event, row, col, current_cell) {
    event.preventDefault();
    keys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "Backspace"];

    number = event.key;

    if (keys.includes(event.key)) {
        if (event.keyCode !== 8) {
            event.target.value = number;

            if (
                !check_number_validity(
                    current_board_unsolved,
                    Number(number),
                    row,
                    col
                )
            ) {
                current_board_unsolved[row][col] = Number(number);
                current_cell.setAttribute("style", "color: red");
            } else {
                current_board_unsolved[row][col] = Number(number);
                current_cell.setAttribute("style", "color: green");
            }
        } else {
            event.target.value = "";
        }
    }

    if (!find_unfilled(current_board_unsolved)) {
        win_dialog = document.getElementById("you-win");
        win_dialog.classList.remove("gameover-dialog");

        if (!hasPlayerWon()) {
            win_dialog.innerText = "There's a mistake somewhere";
            win_dialog.setAttribute("style", "color: red; font-size: 36px;");
        } else {
            win_dialog.innerText = "You Solved It";
            win_dialog.setAttribute(
                "style",
                "color: #27ae60; font-size: 36px;"
            );
        }
    }
}

const hasPlayerWon = () => {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (
                current_board_unsolved[row][col] !==
                current_board_solved[row][col]
            )
                return false;
        }
    }
    return true;
};
