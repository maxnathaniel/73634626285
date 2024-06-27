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

export const SaveBtn = styled.button`
  border-radius: 12px;
  cursor: pointer;
  width: 124px;
  height: 40px;
  background-color: #00c1a2;
  border: 0;
  color: #fff;
  margin-left: auto;
  margin-right: 20px;

  &:hover {
    transition: 0.2s ease-in-out;
    background-color: #019d91;
  }
`;
