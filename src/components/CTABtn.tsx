import { useNavigate } from "react-router";
import styled from "styled-components";

interface Props {
  children: string;
  path: string;
}

const CTABtn = ({ children, path }: Props) => {
  const navigate = useNavigate();

  const goto = (path: string) => {
    navigate(path);
  };

  return (
    <Button type="button" onClick={() => goto(path)}>
      <div className="text">{children}</div>
    </Button>
  );
};

const Button = styled.button`
  display: flex;
  padding: 10px 20px;
  margin: 10px 0;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  background-color: #1e3465;
  color: #fff;
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
