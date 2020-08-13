import time
from termcolor import colored
import random

def generate_random_board(board, difficulty='medium'):
    shown = 0

    if difficulty == 'easy': shown = 60
    elif difficulty == 'medium': shown = 45
    else: shown = 35 
    
    count = 0
    while count < shown:

        rand_row = random.randrange(9)
        rand_col = random.randrange(9)
        number = random.randrange(1, 10)

        if check_row_validity(board, number, rand_row) and \
        check_col_validity(board, number, rand_col) and \
        check_box_validity(board, number, (rand_row // 3, rand_col // 3)):
            board[rand_row][rand_col] = number
            count += 1

    return board




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
                if board[row][col] == 0:
                    string += str(board[row][col]) + ' | '
                else:
                    string += colored(str(board[row][col]), 'green') + ' | '


            else:
                if board[row][col] == 0:
                    string += str(board[row][col]) + '   '

                else:
                    string += colored(str(board[row][col]),'green') + '   '

    
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


def solve_board(board, recursion_level = 0):
    if recursion_level > 800:
        return False

    if not find_unfilled(board):
        return True

    else:
        row, col = find_unfilled(board)

    for i in range(1, 10):

        if check_row_validity(board, i, row) and \
        check_col_validity(board, i, col) and \
        check_box_validity(board, i, (row // 3, col // 3)):

            board[row][col] = i

            '''
            Call solve_board to see if there are more unfilled spaces after adding in
            the current 'i'. Then call solve_board on the new board that has the number 'i' put 
            at the position [row][col] of the board.

            If it didn't return True, it means there are still 0's in the board 
            which is only possible if the validity functions failed, i.e. the board isn't completely 
            solved. 
            '''
            if solve_board(board, recursion_level = recursion_level + 1):
                return True
            
            board[row][col] = 0

    return False


def find_unfilled(board):
    for i in range(len(board)):
        for  j in range(len(board)):
            if board[i][j] == 0:

                return i, j

    return False

def write_board_to_file(board):
    
    with open("board.js", "w") as file:
        file.write("Board = " + str(board))

def main():

    solveable_boards = []

    while True:
        board = [[0] * 9 for _ in range(9)]
        # print_board(board)
        generated_board = generate_random_board(board, 'medium')
        # print_board(generated_board)
        
        isSolved = solve_board(generated_board)

        if isSolved:
            solveable_boards.append(generated_board)
            with open('boards.txt', 'w') as file:
                    file.write(str(solveable_boards))
                    
            if len(solveable_boards) == 50:
                
                break



if __name__ == "__main__":
    start = time.time()

    main()

    print(colored('Finished in {} seconds' .format(time.time() - start), 'green'))
