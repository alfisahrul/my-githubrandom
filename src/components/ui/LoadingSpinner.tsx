import { BackgroundLayer } from "../layout/Layout";
import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

interface LoadingProps {
  isLoading: boolean;
  loadingMessage: string;
}

const LoadingSpinner = ({ isLoading, loadingMessage }: LoadingProps) => {
  return (
    <>
      {isLoading && (
        <Background>
          <Loading />
          <p>{loadingMessage}</p>
        </Background>
      )}
    </>
  )
}

export default LoadingSpinner;


const spin = keyframes`
  100%
  {
    transform: rotate(360deg);
  }
`;

const Loading = styled.span`
  width: 42px;
  height: 42px;
  border: 4px solid transparent;
  border-top-color: #ffff;
  border-left-color: #ffff;
  border-radius: 50%;
  animation: ${spin} 1s ease-in-out infinite;
`;

const Background = styled(BackgroundLayer)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  > p {
    margin-top: 8px;
    font-size: 16px;
    color: #ffff;
    font-weight: bold;
  }
`;