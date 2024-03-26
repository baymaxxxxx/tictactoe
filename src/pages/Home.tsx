import CTABtn from "components/CTABtn";
import { styled } from "styled-components";

const Home = () => {
  return (
    <>
      <Title>홈</Title>
      <CTABtn path={"/setting"}>게임 시작</CTABtn>
      <CTABtn path={"/record"}>기록된 게임보기</CTABtn>
    </>
  );
};

const Title = styled.h3`
  text-align: center;
`;
export default Home;
