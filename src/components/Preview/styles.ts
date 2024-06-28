import styled from 'styled-components';

export const PreviewWrapper = styled.div`
  background-color: #f6f8f9;
  display: flex;
  width: 100%;
  height: calc(100vh - 60px);
  flex-direction: column;
  justify-content: center;
`;

export const ImageWrapper = styled.div`
  min-width: 500px;
  width: 60%;
  margin: -20px auto 0 auto;

  svg {
    width: 10%;
  }
`;

export const RangeSliderGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 50%;
  margin: 0 auto;
`;
