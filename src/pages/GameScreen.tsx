import { useLocation } from "react-router-dom";
import { styled } from "styled-components";
import GridBoard from "components/GridBoard";
import CTABtn from "components/CTABtn";

const GameScreen = () => {
  const { state } = useLocation();
  const { size, player1color, player2color, user1Symbol, user2Symbol } = state;
  const boardSize = parseInt(size || "3");

  return (
    <>
      <Title>게임 화면</Title>
      <GridBoard
        size={boardSize}
        player1color={player1color}
        player2color={player2color}
        user1Symbol={user1Symbol}
        user2Symbol={user2Symbol}
      ></GridBoard>
      <CTABtn path={"/"}>홈</CTABtn>
    </>
  );
};

const Title = styled.h3`
  text-align: center;
`;

export default GameScreen;
