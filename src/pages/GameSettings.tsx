import CTABtn from "components/CTABtn";
import { useState } from "react";
import styled from "styled-components";
import { CirclePicker } from "react-color";

/**
 * 3. 선공 설정
 */
const GameSettings = () => {
  const [boardSize, setBoardSize] = useState(3);
  const [player1color, setPlayer1color] = useState("#2196f3");
  const [player2color, setPlayer2color] = useState("#DB4455");
  console.log("boardSize", boardSize, typeof boardSize);

  return (
    <>
      GameSettings
      <Des>
        게임보드는 3x3, 4x4, 5x5 또는 그 이상의 격자 형태입니다. <br />
        원하는 사이즈를 설정해주세요
        <Info>(게임보드의 최소사이즈는 3x3입니다.)</Info>
      </Des>
      <Wrap>
        <Des>게임보드 크기:</Des>
        <Input
          type="number"
          defaultValue={boardSize}
          onChange={(e) => {
            const newValue = parseInt(e.target.value);
            if (!isNaN(newValue) && newValue > 2) {
              setBoardSize(newValue);
            }
          }}
        />
      </Wrap>
      <Des>각 플레이어의 마크를 설정해주세요</Des>
      <Wrap>
        1P: <Colortext color={player1color}>X</Colortext>
        <CirclePicker
          colors={["#2196f3", "#ffc107", "#795548"]}
          circleSpacing={16}
          color={player1color}
          onChange={(player1color) => setPlayer1color(player1color.hex)}
        ></CirclePicker>
      </Wrap>
      <Wrap>
        2P: <Colortext color={player2color}>O</Colortext>
        <CirclePicker
          colors={["#DB4455", "#9c27b0", "#009688"]}
          color={player2color}
          onChange={(player2color) => setPlayer2color(player2color.hex)}
        ></CirclePicker>
      </Wrap>
      <CTABtn
        path={"/game"}
        params={{
          size: boardSize,
          player1color: player1color,
          player2color: player2color,
        }}
      >
        시작
      </CTABtn>
    </>
  );
};

const Colortext = styled.div<{ color?: string }>`
  display: flex;
  color: ${(props) => props.color};
  margin: 0 15px;
`;
const Wrap = styled.div`
  display: flex;
`;
const Des = styled.p`
  color: black;
  font-size: 16px;
`;
const Info = styled.span`
  color: gray;
`;
const Input = styled.input`
  width: 40px;
  padding: 10px;
  margin: 6px;
  border-radius: 5px;
  border: none;
  font-size: 16px;
  outline: none;
  transition: border-color 0.3s;
  &:focus {
    border-color: #2980b9;
  }
`;

export default GameSettings;
