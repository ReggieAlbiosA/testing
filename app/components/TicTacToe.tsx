"use client";

import React, { useState } from "react";

export default function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const calculateWinner = (squares: (string | null)[]) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const handleClick = (i: number) => {
    if (calculateWinner(board) || board[i]) {
      return;
    }
    const nextBoard = board.slice();
    nextBoard[i] = xIsNext ? "X" : "O";
    setBoard(nextBoard);
    setXIsNext(!xIsNext);
  };

  const winner = calculateWinner(board);
  const isDraw = !winner && board.every((square) => square !== null);
  
  const status = winner
    ? `Winner: ${winner}`
    : isDraw
    ? "It's a Draw!"
    : `Next player: ${xIsNext ? "X" : "O"}`;

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
  };

  return (
    <div className="bg-white p-6 rounded shadow-sm border border-gray-200 mt-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Tic Tac Toe</h2>

      <div className="mb-4 text-lg font-medium text-center text-gray-700">
        <span className={winner ? "text-green-600 font-bold" : ""}>{status}</span>
      </div>

      <div className="grid grid-cols-3 gap-2 w-full max-w-[250px] mx-auto mb-6">
        {board.map((square, i) => (
          <button
            key={i}
            className={`h-20 w-full bg-gray-50 border-2 text-3xl font-bold flex items-center justify-center rounded transition-colors
              ${square === "X" ? "text-blue-600 border-blue-200 bg-blue-50" : ""}
              ${square === "O" ? "text-red-500 border-red-200 bg-red-50" : ""}
              ${!square && !winner ? "hover:bg-gray-100 border-gray-200" : "border-gray-200"}
            `}
            onClick={() => handleClick(i)}
          >
            {square}
          </button>
        ))}
      </div>

      <div className="text-center">
        <button
          onClick={resetGame}
          className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-900 transition-colors text-sm font-medium"
        >
          Restart Game
        </button>
      </div>
    </div>
  );
}
