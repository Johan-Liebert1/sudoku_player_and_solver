import time
from termcolor import colored

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
    
    print(string + "\n\n")

def check_row_validity(board, number, row):

    for i in range(len(board)):
        if board[row][i] == number:
            return False
    
    return True

def check_col_validity(board, number, col):

    for i in range(len(board)):
        if board[i][col] == number:
            return False

    return True

def check_box_validity(board, number, box_number):
    # box number is a tuple. Boxes go from 00, 01, 02, 10, 11, 12 ....
    min_row = 3 * box_number[0]
    min_col = 3 * box_number[1]
    max_row = 3 * box_number[0] + 2
    max_col = 3 * box_number[1] + 2

    for row in range(min_row, max_row + 1):
        for col in range(min_col, max_col + 1):
            if board[row][col] == number:
                return False

    return True


def solve_board(board):
    if not find_unfilled(board):
        return True

    else:
        row, col = find_unfilled(board)

    for i in range(1, 10):

        if check_row_validity(board, i, row) and \
        check_col_validity(board, i, col) and \
        check_box_validity(board, i, (row // 3, col // 3)):

            board[row][col] = i

            if solve_board(board):
                return True
            
            board[row][col] = 0

    return False


def find_unfilled(board):
    for i in range(len(board)):
        for  j in range(len(board)):
            if board[i][j] == 0:

                return i, j

    return False

start = time.time()

solve_board(board)
print_board(board)

print(colored('Finished in {} seconds' .format(time.time() - start), 'green'))
