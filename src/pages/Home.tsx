import CTABtn from "components/CTABtn";

const Home = () => {
  return (
    <>
      <CTABtn path={"/setting"}>게임 시작</CTABtn>
      <CTABtn path={"/record"}>기록된 게임보기</CTABtn>
    </>
  );
};

export default Home;
