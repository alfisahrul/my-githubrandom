import styled from '@emotion/styled';


export const ColButtonWrap = styled.div`
  > button + button {
    margin-top: 16px;
  }
`;
export const ButtonWrap = styled(ColButtonWrap)`
  width: 100%;
  padding: 16px 20px 36px 20px;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #ffff 9.13%);
  position: absolute;
  bottom: 0;
  z-index: var(--bottom-bar-z-index);
`;
