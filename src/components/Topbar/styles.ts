import styled from 'styled-components';

export const TopbarWrapper = styled.div`
  height: 60px;
  width: 100%;
  display: flex;
  border-bottom: 1px solid #f3f6f8;
  align-items: center;
  justify-content: flex-start;

  > svg {
    flex: 9;
    max-width: 200px;
  }
`;
