import styled from "@emotion/styled";

const RefreshButton = styled.button`
  background-color: #000;
  color: #fff;
  border: none;
  border-radius: 16px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  margin: 20px auto 0;
  width: 90%;
  max-width: 300px;

  &:hover {
    background-color: #333;
  }
`;

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: () => void;
  text: string;
}

const ButtonStyled = ({
  onClick,
  text
}: ButtonProps) => {

  return (
    <>
      <RefreshButton
        onClick={onClick}
      >
        {text}
      </RefreshButton>
    </>
  )
}

export default ButtonStyled;