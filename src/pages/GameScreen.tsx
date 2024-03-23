import CTABtn from "components/CTABtn";
import GridBoard from "components/GridBoard";
import { useLocation } from "react-router-dom";

/**
 * 2. 두 플레이어에 대한 정보: 마크, 무르기 횟수
 * 3. 현재 남은 시간
 * 4. 현재 플레이어
 * 5. 종료가 되면 게임기록
 */
const GameScreen = () => {
  const location = useLocation();
  console.log("location", location.state);
  const boardSize = location.state.size;
  const player1color = location.state.player1color;
  const player2color = location.state.player2color;
  const size = parseInt(boardSize || "3");
  return (
    <>
      GameScreen
      <GridBoard
        size={size}
        player1color={player1color}
        player2color={player2color}
      ></GridBoard>
      <CTABtn path={"/"}>홈</CTABtn>
    </>
  );
};

export default GameScreen;
