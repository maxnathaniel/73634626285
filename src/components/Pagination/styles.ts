import styled from 'styled-components';

export const PaginationWrapper = styled.div`
  display: inline-block;

  a {
    cursor: pointer;
    float: left;
    padding: 8px 16px;
    text-decoration: none;
    font-size: 2rem;
    color: #646b73;
    line-height: 2rem;

    &:active {
      background-color: #4caf50;
      color: white;
    }

    &:hover:not(.active) {
      background-color: #ddd;
    }
  }
`;
