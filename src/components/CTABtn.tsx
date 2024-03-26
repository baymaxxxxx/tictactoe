import { useNavigate } from "react-router";
import { useTimerStore } from "store";
import styled from "styled-components";

interface Params {
  size?: number;
  player1color?: string;
  player2color?: string;
  user1symbol?: string;
  user2symbol?: string;
}
interface Props {
  children: string;
  path: string;
  params?: Params;
}

const CTABtn = ({ children, path, params }: Props) => {
  const navigate = useNavigate();
  const { resetTimer } = useTimerStore();

  const goto = (path: string, params?: Params) => {
    navigate(path, params ? { state: params } : undefined);
    resetTimer();
  };
  return (
    <Button type="button" onClick={() => goto(path, params)}>
      <div className="text">{children}</div>
    </Button>
  );
};

const Button = styled.button`
  display: flex;
  padding: 10px 20px;
  margin: 10px 0;
  border: none;
  border-radius: 5px;
  background-color: #1e3465;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }

  &:focus {
    outline: none;
  }
`;

export default CTABtn;
