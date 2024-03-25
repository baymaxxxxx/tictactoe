import { useState } from "react";
import styled from "styled-components";
import CTABtn from "components/CTABtn";
import SymbolColorSetting from "components/SymbolColorSetting";

/**
 * 3. 선공 설정
 */

const GameSettings = () => {
  const [boardSize, setBoardSize] = useState(3);
  const [player1color, setPlayer1color] = useState("#2196f3");
  const [player2color, setPlayer2color] = useState("#DB4455");
  const [user1Symbol, setUser1Symbol] = useState<string | undefined>("X");
  const [user2Symbol, setUser2Symbol] = useState<string | undefined>("O");

  const handleBoardSize = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value);
    if (!isNaN(newValue) && newValue > 2) {
      setBoardSize(newValue);
    }
  };

  const handleSymbolChange = (user: number, symbol: string) => {
    if (user === 1) {
      setUser1Symbol(symbol);
    } else if (user === 2) {
      setUser2Symbol(symbol);
    }
  };

  const symbols = ["X", "O", "▵", "☐"];

  return (
    <Container>
      <Des>게임보드 크기</Des>
      <SettingWrap>
        <Input
          type="number"
          defaultValue={boardSize}
          onChange={handleBoardSize}
        />
      </SettingWrap>
      <Des>각 플레이어 설정</Des>

      <PlayerWrap>
        <ColorText color={player1color}>1P: {user1Symbol}</ColorText>
        <SymbolColorSetting
          symbols={symbols}
          selectedSymbol={user1Symbol}
          disableSymbol={user2Symbol}
          onSymbolChange={(symbol) => handleSymbolChange(1, symbol)}
          colors={["#2196f3", "#ffc107", "#795548"]}
          selectedColor={player1color}
          onColorChange={setPlayer1color}
        />
      </PlayerWrap>

      <PlayerWrap>
        <ColorText color={player2color}>2P: {user2Symbol}</ColorText>
        <SymbolColorSetting
          symbols={symbols}
          selectedSymbol={user2Symbol}
          disableSymbol={user1Symbol}
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
          user1Symbol: user1Symbol,
          user2Symbol: user2Symbol,
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

const SettingWrap = styled.div`
  display: flex;
  padding-left: 5px;
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

const Des = styled.p`
  padding-right: 15px;
  color: black;
  font-size: 17px;
  text-align: left;
`;

const Input = styled.input`
  width: 40px;
  padding: 10px;
  margin: 6px;
  border-radius: 5px;
  font-size: 16px;
`;

export default GameSettings;
