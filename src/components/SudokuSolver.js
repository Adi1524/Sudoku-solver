import React, { useState } from "react";
import "./SudokuSolver.css";

const SudokuSolver = () => {
  const initialGrid = Array(9)
    .fill(0)
    .map(() => Array(9).fill(0));
  const [grid, setGrid] = useState(initialGrid);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (row, col, value) => {
    if (/^[1-9]?$/.test(value)) {
      const newGrid = grid.map((r) => [...r]);
      newGrid[row][col] = value === "" ? 0 : parseInt(value, 10);
      setGrid(newGrid);
    }
  };

  const isValid = (board, row, col, num) => {
    for (let x = 0; x < 9; x++) {
      if (
        board[row][x] === num ||
        board[x][col] === num ||
        board[3 * Math.floor(row / 3) + Math.floor(x / 3)][
          3 * Math.floor(col / 3) + (x % 3)
        ] === num
      ) {
        return false;
      }
    }
    return true;
  };

  const solveSudoku = (board) => {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (board[row][col] === 0) {
          // empty cell
          for (let num = 1; num <= 9; num++) {
            if (isValid(board, row, col, num)) {
              board[row][col] = num;
              if (solveSudoku(board)) return true;
              board[row][col] = 0;
            }
          }
          return false;
        }
      }
    }
    return true;
  };

  const handleSolve = () => {
    const newGrid = grid.map((row) => [...row]);
    if (solveSudoku(newGrid)) {
      setGrid(newGrid);
      setErrorMessage("");
    } else {
      setErrorMessage("This Sudoku puzzle is unsolvable.");
    }
  };

  // Validate current state of the board
  const handleValidate = () => {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (grid[row][col] !== 0 && !isValid(grid, row, col, grid[row][col])) {
          setErrorMessage("Invalid Sudoku entries.");
          return;
        }
      }
    }
    setErrorMessage("Valid Sudoku entries.");
  };

  return (
    <div className="sudoku-solver">
      <div className="grid">
        {grid.map((row, rowIndex) =>
          row.map((value, colIndex) => (
            <input
              key={`${rowIndex}-${colIndex}`}
              type="text"
              maxLength="1"
              value={value === 0 ? "" : value}
              onChange={(e) => handleChange(rowIndex, colIndex, e.target.value)}
            />
          ))
        )}
      </div>
      <div className="buttons">
        <button onClick={handleValidate}>Validate</button>
        <button onClick={handleSolve}>Solve</button>
      </div>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};

export default SudokuSolver;
