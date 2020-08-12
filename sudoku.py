board = [
    [0, 8, 5, 0, 0, 0, 2, 1, 0],
    [0, 9, 4, 0, 1, 2, 0, 0, 3],
    [0, 0, 0, 3, 0, 0, 7, 0, 4],
    [5, 0, 3, 4, 0, 9, 0, 0, 0],
    [0, 4, 0, 2, 0, 6, 0, 3, 0],
    [0, 0, 0, 1, 0, 3, 9, 0, 7],
    [6, 0, 8, 0, 0, 5, 0, 0, 0],
    [1, 0, 0, 8, 4, 0, 3, 6, 0],
    [0, 2, 7, 0, 0, 0, 8, 9, 0],
]

def print_board(board):
    string = ''
    for row in range(len(board)):
        if (row) % 3 == 0 and row != 0:
            string += '\n-----------------------------------\n'
        else:
            string += "\n\n"

        for col in range(len(board)):
            # 3 spaces between characters
            if (col + 1) % 3 == 0:
                string += str(board[row][col]) + ' | '

            else:
                string += str(board[row][col]) + '   '
    
    print(string)

def solve_board(board):
    pass





print_board(board)