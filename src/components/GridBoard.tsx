import { useEffect, useState } from "react";
import styled from "styled-components";
import { useCellsStore, useFirstTurn, useTimerStore } from "store";
interface Props {
  size: number;
  player1color: string;
  player2color: string;
  user1symbol: string;
  user2symbol: string;
}

const GridBoard = ({
  size,
  player1color,
  player2color,
  user1symbol,
  user2symbol,
}: Props) => {
  const [cells, setCells] = useState(Array(size * size).fill(""));
  const [p1moveHistory, setP1moveHistory] = useState<number[]>([]);
  const [p2moveHistory, setP2moveHistory] = useState<number[]>([]);
  const [currentPlayer, setCurrentPlayer] = useState(user1symbol);
  const [isClickPending, setIsClickPending] = useState(true);
  const [isClickRandom, setIsClickRandom] = useState(true);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [tie, setTie] = useState<boolean>(false);

  const [undoCounts, setUndoCounts] = useState<{ [player: string]: number }>({
    [user1symbol]: 3,
    [user2symbol]: 3,
  });

  const [intervalId, setIntervalId] = useState<NodeJS.Timer | undefined>(
    undefined
  );
  const { setRecordCells, setRecordSize, set1S, setP1C, setP2C } =
    useCellsStore();
  const { timer, startTimer, resetTimer } = useTimerStore();
  const { firstTurn } = useFirstTurn();

  useEffect(() => {
    setRecordSize(size);
    set1S(user1symbol);
    setP1C(player1color);
    setP2C(player2color);
    initFirstTurn();
  }, [size]);

  useEffect(() => {
    const id = setInterval(() => {
      startTimer();
    }, 1000);
    setIntervalId(id);
    return () => clearInterval(id);
  }, [startTimer]);

  useEffect(() => {
    if (timer === 15) {
      resetTimer();
      handleTimerExpired();
      setIsClickRandom(true);
      setIsClickPending(true);
    }
  }, [timer]);

  const initFirstTurn = () => {
    if (firstTurn === "2P") {
      setCurrentPlayer(user2symbol);
    }
  };

  const stopTimer = () => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(undefined);
    }
  };

  const handleTimerExpired = () => {
    if (!gameOver && isClickRandom) {
      handleRandomCell();
    }

    if (!gameOver) {
      setCurrentPlayer(
        currentPlayer === user1symbol ? user2symbol : user1symbol
      );
    }

    if (gameOver || tie) {
      stopTimer();
    }
  };

  const handleRandomCell = () => {
    if (!isClickPending || gameOver) return;

    const emptyCells = cells.reduce((acc, cell, index) => {
      if (cell === "") acc.push(index);
      return acc;
    }, [] as number[]);

    if (emptyCells.length === 0) return;

    const randomIndex =
      emptyCells[Math.floor(Math.random() * emptyCells.length)];
    const newCells = [...cells];
    newCells[randomIndex] = currentPlayer;
    setCells(newCells);
    setIsClickPending(false);

    if (currentPlayer === user1symbol) {
      setP1moveHistory([...p1moveHistory, randomIndex]);
    } else {
      setP2moveHistory([...p2moveHistory, randomIndex]);
    }

    const winner = checkGameOver(newCells, currentPlayer, size);
    const tieGame = checkTie(newCells, size);

    if (winner || tieGame) {
      setGameOver(winner);
      setTie(tieGame);
      setIsClickPending(false);
      return;
    }

    setIsClickPending(true);
  };

  const checkTie = (cells: string[], size: number) => {
    setRecordCells(cells);
    return cells.every((value) => value !== "") ? true : false;
  };

  const checkGameOver = (
    cells: string[],
    currentPlayer: string,
    size: number
  ) => {
    // 이어지는 줄을 확인하는 함수
    setRecordCells(cells);

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
    if (!isClickPending || gameOver || cells[index] !== "") return;
    setIsClickPending(false);
    const newCells = [...cells];
    newCells[index] = currentPlayer;
    setCells(newCells);

    if (currentPlayer === user1symbol) {
      const newMoveHistory = [...p1moveHistory];
      newMoveHistory.push(index);
      setP1moveHistory(newMoveHistory);
    } else {
      const newMoveHistory = [...p2moveHistory];
      newMoveHistory.push(index);
      setP2moveHistory(newMoveHistory);
    }

    const winner = checkGameOver(newCells, currentPlayer, size);
    const tieGame = checkTie(newCells, size);

    if (winner || tieGame) {
      setGameOver(winner);
      setTie(tieGame);
      setIsClickPending(false);
      return;
    }
    setIsClickPending(false);
    setIsClickRandom(false);
  };

  const handleUndo = () => {
    if (undoCounts[currentPlayer] <= 0 || gameOver) return;
    if (!isClickPending) {
      setIsClickPending(true);
      setIsClickRandom(true);

      const lastMoveIndex =
        currentPlayer === user1symbol
          ? p1moveHistory.pop()
          : p2moveHistory.pop();

      if (lastMoveIndex !== undefined) {
        const newCells = [...cells];
        newCells[lastMoveIndex] = "";
        setCells(newCells);

        const newUndoCounts = { ...undoCounts };
        newUndoCounts[currentPlayer] -= 1;
        setUndoCounts(newUndoCounts);
      }
    }
  };

  return (
    <>
      <BoardContainer size={size}>
        {cells.map((value, index) => (
          <Cell
            key={index}
            onClick={() => handleCellClick(index)}
            value={value}
            user1symbol={user1symbol}
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
        <PlayerColor player1color={player1color}>{user1symbol}</PlayerColor>
        (남은 무르기 횟수: {undoCounts[user1symbol]})
        {firstTurn === "1P" && <>선공</>}
      </Des>
      <Des>
        2P:
        <PlayerColor player2color={player2color}>{user2symbol}</PlayerColor>
        (남은 무르기 횟수: {undoCounts[user2symbol]})
        {firstTurn === "2P" && <>선공</>}
      </Des>
      <Des>현재 마크를 놓을 플레이어:{currentPlayer}</Des>
      {gameOver && (
        <Wrap>
          <div>{currentPlayer} Win!</div>
        </Wrap>
      )}
      {tie && (
        <Wrap>
          <div>무승부</div>
        </Wrap>
      )}
      {!gameOver && !tie && (
        <Wrap>
          <UndoButton
            onClick={handleUndo}
            disabled={undoCounts[currentPlayer] <= 0}
          >
            Undo
          </UndoButton>
        </Wrap>
      )}
      <TimerText>남은 시간: {15 - timer}</TimerText>
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
  user1symbol?: string;
}>`
  display: flex;
  border-radius: 5px;
  background-color: #334e7e;
  font-size: 24px;
  color: ${(props) =>
    props.value === props.user1symbol
      ? props.player1color
      : props.player2color};
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const Des = styled.div`
  display: flex;
  font-size: 18px;
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

const Wrap = styled.div`
  display: flex;
  height: 50px;
  align-items: center;
`;

const UndoButton = styled.button`
  padding: 8px 16px;
  margin-top: 10px;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
`;

const TimerText = styled.p`
  text-align: center;
`;

export default GridBoard;
