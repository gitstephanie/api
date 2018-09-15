export const defaultBoard = [
	['o', 'o', 'o'],
	['o', 'o', 'o'],
	['o', 'o', 'o']
];

const colors = ['red', 'blue', 'green', 'yellow', 'magenta']

export const randomColor = () => colors[Math.floor(Math.random() * 5)]

export const moves = (board1, board2) => 
board1
  .map((row, y) => row.filter((cell, x) => board2[y][x] !== cell))
  .reduce((a, b) => a.concat(b))
  .length

