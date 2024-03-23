import React, { useState } from "react";
import styled from "styled-components";

/** TODO:
 * 게임이 끝나면 종료표시
 */

interface Props {
  size: number;
  player1color: string;
  player2color: string;
}
type CellValue = "X" | "O" | "";
type Player = "X" | "O";

const GridBoard = ({ size, player1color, player2color }: Props) => {
  const [cells, setCells] = useState(Array(size * size).fill(""));
  const [currentPlayer, setCurrentPlayer] = useState<Player>("X");
  const [gameOver, setGameOver] = useState(false);

  console.log("player1color", player1color, player2color);
  const checkGameOver = (
    cells: CellValue[],
    currentPlayer: Player,
    size: number
  ) => {
    // 이어지는 줄을 확인하는 함수
    const checkLine = (start: number, step: number) => {
      for (let i = start, count = 0; count < size; i += step, count++) {
        if (cells[i] !== currentPlayer) {
          return false;
        }
      }
      return true;
    };

    // 게임판의 모든 셀을 확인하여 이기는 조건을 판단
    for (let i = 0; i < size; i++) {
      // 가로세로줄 확인
      if (checkLine(i * size, 1) || checkLine(i, size)) {
        return true;
      }
    }
    // 대각선 확인 (왼쪽, 오른쪽)
    if (checkLine(0, size + 1) || checkLine(size - 1, size - 1)) {
      return true;
    }
    // 어느 조건도 만족하지 않으면 false 반환
    return false;
  };

  const handleCellClick = (index: number) => {
    if (gameOver || cells[index] !== "") return;

    const newCells = [...cells];
    newCells[index] = currentPlayer;
    // newCells[index] = "X";
    setCells(newCells);

    const winner = checkGameOver(newCells, currentPlayer, size);
    if (winner) {
      console.log(`${winner}, ${currentPlayer} wins!`);
      setGameOver(true);
      return;
    }
    setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
  };
  console.log(`currentPlayer: ${currentPlayer}`);

  return (
    <BoardContainer size={size}>
      {cells.map((value, index) => (
        <Cell
          key={index}
          onClick={() => handleCellClick(index)}
          value={value}
          player1color={player1color}
          player2color={player2color}
        >
          {value}
        </Cell>
      ))}
    </BoardContainer>
  );
};

const BoardContainer = styled.div<{ size: number }>`
  display: grid;
  grid-template-columns: repeat(${(props) => props.size}, 64px);
  grid-template-rows: repeat(${(props) => props.size}, 64px);
  gap: 3px;
`;

const Cell = styled.button<{
  player1color?: string;
  player2color?: string;
  value?: string;
}>`
  display: flex;
  border-radius: 5px;
  background-color: #334e7e;
  font-size: 24px;
  color: ${(props) =>
    props.value === "X" ? props.player1color : props.player2color};
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

export default GridBoard;
