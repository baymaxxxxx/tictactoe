import { useState } from "react";
import styled from "styled-components";
interface Props {
  size: number;
  player1color: string;
  player2color: string;
  user1Symbol: string;
  user2Symbol: string;
}

const GridBoard = ({
  size,
  player1color,
  player2color,
  user1Symbol,
  user2Symbol,
}: Props) => {
  const [cells, setCells] = useState(Array(size * size).fill(""));
  const [currentPlayer, setCurrentPlayer] = useState(user1Symbol);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [tie, setTie] = useState<boolean>(false);

  const checkTie = (cells: string[], size: number) => {
    return cells.every((value) => value !== "") ? true : false;
  };

  const checkGameOver = (
    cells: string[],
    currentPlayer: string,
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
    setCells(newCells);

    const winner = checkGameOver(newCells, currentPlayer, size);
    const tieGame = checkTie(newCells, size);

    if (winner || tieGame) {
      setGameOver(winner);
      setTie(tieGame);
      return;
    }
    setCurrentPlayer(currentPlayer === user1Symbol ? user2Symbol : user1Symbol);
  };

  return (
    <>
      <BoardContainer size={size}>
        {cells.map((value, index) => (
          <Cell
            key={index}
            onClick={() => handleCellClick(index)}
            value={value}
            user1Symbol={user1Symbol}
            player1color={player1color}
            player2color={player2color}
          >
            {value}
            {}
          </Cell>
        ))}
      </BoardContainer>
      <Des>
        1P:
        <PlayerColor player1color={player1color}>{user1Symbol}</PlayerColor>
      </Des>
      <Des>
        2P:
        <PlayerColor player2color={player2color}>{user2Symbol}</PlayerColor>
      </Des>
      <Des>현재 마크를 놓을 플레이어:{currentPlayer}</Des>
      {gameOver && <p>{currentPlayer} Win!</p>}
      {tie && <p>무승부</p>}
    </>
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
  user1Symbol?: string;
}>`
  display: flex;
  border-radius: 5px;
  background-color: #334e7e;
  font-size: 24px;
  color: ${(props) =>
    props.value === props.user1Symbol
      ? props.player1color
      : props.player2color};
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const Des = styled.div`
  display: flex;
  font-size: 24px;
`;

const PlayerColor = styled.div<{
  player1color?: string;
  player2color?: string;
}>`
  display: flex;
  color: ${(props) =>
    (props.player1color && props.player1color) ||
    (props.player2color && props.player2color)};
`;

export default GridBoard;
