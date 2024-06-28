import styled from 'styled-components';

export const PaginationWrapper = styled.div`
  display: inline-block;

  button {
    cursor: pointer;
    float: left;
    padding: 8px 16px;
    text-decoration: none;
    font-size: 2rem;
    color: #646b73;
    line-height: 2rem;
    border: 0;
    background-color: #f6f8f9;

    &:active {
      background-color: #4caf50;
      color: white;
    }

    &:hover:not(.active) {
      transition: 0.2s all ease-in-out;
      background-color: #f0f0f0;
    }
  }
`;
