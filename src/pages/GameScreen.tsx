import CTABtn from "components/CTABtn";
import GridBoard from "components/GridBoard";
import { useLocation } from "react-router-dom";

/**
 * 2. 두 플레이어에 대한 정보: 무르기 횟수
 * 3. 현재 남은 시간
 * 5. 종료가 되면 게임기록
 */
const GameScreen = () => {
  const { state } = useLocation();
  const { size, player1color, player2color, user1Symbol, user2Symbol } = state;
  const boardSize = parseInt(size || "3");

  return (
    <>
      GameScreen
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

export default GameScreen;
