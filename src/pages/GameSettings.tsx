import CTABtn from "components/CTABtn";
import { useState } from "react";
import styled from "styled-components";

/**
 * 2. 플레이어 마크 선택
 * 3. 선공 설정
 */
const GameSettings = () => {
  const [boardSize, setBoardSize] = useState(3);
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
      <CTABtn path={"/game"} params={{ size: boardSize }}>
        시작
      </CTABtn>
    </>
  );
};

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
