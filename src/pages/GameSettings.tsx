import { useState } from "react";
import styled from "styled-components";
import CTABtn from "components/CTABtn";
import SymbolColorSetting from "components/SymbolColorSetting";
import { useFirstTurn } from "store";

const GameSettings = () => {
  const [boardSize, setBoardSize] = useState(3);
  const [player1color, setPlayer1color] = useState("#2196f3");
  const [player2color, setPlayer2color] = useState("#DB4455");
  const [user1symbol, setUser1symbol] = useState<string | undefined>("X");
  const [user2symbol, setUser2symbol] = useState<string | undefined>("O");
  const { firstTurn, setFirstTurn } = useFirstTurn();
  const handleBoardSize = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value);
    if (!isNaN(newValue) && newValue > 2) {
      setBoardSize(newValue);
    }
  };

  const handleSymbolChange = (user: number, symbol: string) => {
    if (user === 1) {
      setUser1symbol(symbol);
    } else if (user === 2) {
      setUser2symbol(symbol);
    }
  };

  const handleTurnChange = (turn: "1P" | "2P") => {
    setFirstTurn(turn);
  };

  const symbols = ["X", "O", "▵", "☐"];

  return (
    <Container>
      <Title>게임 설정</Title>
      <Des>게임보드 크기</Des>
      <SettingWrap>
        <Input
          type="number"
          defaultValue={boardSize}
          onChange={handleBoardSize}
        />
      </SettingWrap>
      <Des>선공 선택</Des>
      <PlayerWrap>
        <input
          type="radio"
          id="1P"
          name="firstTurn"
          value="1P"
          checked={firstTurn === "1P"}
          onChange={() => handleTurnChange("1P")}
        />
        <label htmlFor="1P">1P</label>
        <input
          type="radio"
          id="2P"
          name="firstTurn"
          value="2P"
          checked={firstTurn === "2P"}
          onChange={() => handleTurnChange("2P")}
        />
        <label htmlFor="2P">2P</label>
      </PlayerWrap>
      <Des>각 플레이어 설정</Des>

      <PlayerWrap>
        <ColorText color={player1color}>1P: {user1symbol}</ColorText>
        <SymbolColorSetting
          symbols={symbols}
          selectedSymbol={user1symbol}
          disableSymbol={user2symbol}
          onSymbolChange={(symbol) => handleSymbolChange(1, symbol)}
          colors={["#2196f3", "#ffc107", "#795548"]}
          selectedColor={player1color}
          onColorChange={setPlayer1color}
        />
      </PlayerWrap>

      <PlayerWrap>
        <ColorText color={player2color}>2P: {user2symbol}</ColorText>
        <SymbolColorSetting
          symbols={symbols}
          selectedSymbol={user2symbol}
          disableSymbol={user1symbol}
          onSymbolChange={(symbol) => handleSymbolChange(2, symbol)}
          colors={["#DB4455", "#9c27b0", "#009688"]}
          selectedColor={player2color}
          onColorChange={setPlayer2color}
        />
      </PlayerWrap>

      <CTABtn
        path={"/game"}
        params={{
          size: boardSize,
          player1color: player1color,
          player2color: player2color,
          user1symbol: user1symbol,
          user2symbol: user2symbol,
        }}
      >
        시작
      </CTABtn>
    </Container>
  );
};

const Container = styled.div`
  width: 375px;
`;

const Title = styled.h3`
  text-align: center;
`;

const Des = styled.p`
  padding-right: 15px;
  color: black;
  font-size: 17px;
  text-align: left;
`;

const SettingWrap = styled.div`
  display: flex;
  padding-left: 5px;
`;

const Input = styled.input`
  width: 40px;
  padding: 10px;
  margin: 6px;
  border-radius: 5px;
  font-size: 16px;
`;

const PlayerWrap = styled.div`
  display: flex;
  border: solid 1px black;
`;

const ColorText = styled.div<{ color?: string }>`
  width: 65px;
  border-right: solid 1px black;
  margin: 0 15px 0 0;
  color: ${(props) => props.color};
`;

export default GameSettings;
