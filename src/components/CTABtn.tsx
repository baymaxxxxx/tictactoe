import { useNavigate } from "react-router";
import styled from "styled-components";

interface Props {
  children: string;
  path: string;
  params?: { size?: number; player1color?: string; player2color?: string };
}
const CTABtn = ({ children, path, params }: Props) => {
  const navigate = useNavigate();

  const goto = (
    path: string,
    params?: { size?: number; player1color?: string; player2color?: string }
  ) => {
    params ? navigate(path, { state: params }) : navigate(path);
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
