import CTABtn from "components/CTABtn";
import { useCellsStore } from "store";
import { styled } from "styled-components";

const ViewRecordedGames = () => {
  const { recordCells, size, user1symbol, player1color, player2color } =
    useCellsStore();
  return (
    <>
      <Title>기록된 게임 보기</Title>
      <BoardContainer size={size}>
        {recordCells.map((value, index) => (
          <Cell
            key={index}
            value={value}
            user1symbol={user1symbol}
            player1color={player1color}
            player2color={player2color}
          >
            {value}
          </Cell>
        ))}
      </BoardContainer>
      <CTABtn path={"/"}>홈</CTABtn>
    </>
  );
};

const Title = styled.h3`
  text-align: center;
`;

const BoardContainer = styled.div<{ size: number }>`
  display: grid;
  grid-template-columns: repeat(${(props) => props.size}, 64px);
  grid-template-rows: repeat(${(props) => props.size}, 64px);
  gap: 3px;
`;

const Cell = styled.div<{
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
      : props?.player2color};
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

export default ViewRecordedGames;
