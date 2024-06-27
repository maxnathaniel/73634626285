import styled from 'styled-components';

export const CollectionWrapper = styled.div`
  background-color: #f6f8f9;
  height: 100%;
  width: calc(100vw - 350px);
`;

export const FlexWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 15px;
  gap: 10px;
`;

export const GifWrapper = styled.div`
  cursor: pointer;
  width: 250px;
  height: 250px;
  border: 1px solid #d7d7d7;

  > p {
    margin: 10px 0 0 0;
    font-size: 0.675rem;
    font-style: italic;
  }

  > img {
    width: 200px;
    height: 200px;
    object-fit: cover;
  }
`;
