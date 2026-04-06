/**
 * 🧩 Sudoku Üretici ve Çözücü Algoritması
 * Baktranking (Geri İzleme) yöntemi ile geçerli Sudoku bulmacaları üretir.
 */

export type SudokuBoard = (number | null)[][];

/**
 * Belirli bir rakamın (1-9) belirtilen hücreye yerleştirilip yerleştirilemeyeceğini kontrol eder.
 */
export function isValidMove(board: SudokuBoard, row: number, col: number, num: number): boolean {
  // Satır kontrolü
  for (let i = 0; i < 9; i++) {
    if (board[row][i] === num) return false;
  }

  // Sütun kontrolü
  for (let i = 0; i < 9; i++) {
    if (board[i][col] === num) return false;
  }

  // 3x3 kutu kontrolü
  const startRow = Math.floor(row / 3) * 3;
  const startCol = Math.floor(col / 3) * 3;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[startRow + i][startCol + j] === num) return false;
    }
  }

  return true;
}

/**
 * Sudoku tahtasını çözer (Backtracking).
 */
export function solveSudoku(board: SudokuBoard): boolean {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col] === null) {
        for (let num = 1; num <= 9; num++) {
          if (isValidMove(board, row, col, num)) {
            board[row][col] = num;
            if (solveSudoku(board)) return true;
            board[row][col] = null; // Geri izleme
          }
        }
        return false;
      }
    }
  }
  return true;
}

/**
 * Sayıları karıştırarak rastgele bir tam tahta üretir.
 */
export function generateFullBoard(): SudokuBoard {
  const board: SudokuBoard = Array(9).fill(null).map(() => Array(9).fill(null));
  
  function fillRecursive(row: number, col: number): boolean {
    if (col === 9) {
      row++;
      col = 0;
    }
    if (row === 9) return true;

    const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9].sort(() => Math.random() - 0.5);
    for (const num of nums) {
      if (isValidMove(board, row, col, num)) {
        board[row][col] = num;
        if (fillRecursive(row, col + 1)) return true;
        board[row][col] = null;
      }
    }
    return false;
  }

  fillRecursive(0, 0);
  return board;
}

/**
 * Zorluk seviyesine göre hücreleri siler.
 * Easy: 35-40 boşluk
 * Medium: 45-50 boşluk
 * Hard: 55-60 boşluk
 */
export function generatePuzzle(difficulty: "easy" | "medium" | "hard" = "medium"): { puzzle: SudokuBoard; solution: SudokuBoard } {
  const solution = generateFullBoard().map(row => [...row]);
  const puzzle = solution.map(row => [...row]);

  let attempts = difficulty === "easy" ? 35 : difficulty === "medium" ? 50 : 62;
  
  while (attempts > 0) {
    const row = Math.floor(Math.random() * 9);
    const col = Math.floor(Math.random() * 9);
    if (puzzle[row][col] !== null) {
      puzzle[row][col] = null;
      attempts--;
    }
  }

  return { puzzle, solution };
}
