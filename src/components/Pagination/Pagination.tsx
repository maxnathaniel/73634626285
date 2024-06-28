import { Dispatch, FC } from 'react';

import { PaginationWrapper } from './styles';

export interface Metadata {
  startCursor: string;
  endCursor: string;
  hasPrevPage: boolean;
  hasNextPage: boolean;
}

interface Props {
  data: Metadata;
  setGraphqlQuery: Dispatch<React.SetStateAction<string>>;
}

const Pagination: FC<Props> = ({ data: { startCursor, endCursor, hasNextPage, hasPrevPage }, setGraphqlQuery }) => {
  const handlePrevPageClick = () => {
    if (hasPrevPage) {
      setGraphqlQuery(
        `
        {
          featuredPublicAnimations (last: 20, before: "${startCursor}") {
            edges {
              cursor
                node {
                  gifUrl
                  lottieUrl
                  jsonUrl
                  name
                }
              }
              pageInfo {
                endCursor
                hasNextPage
                hasPreviousPage
                startCursor
              }
            } 
          }
        `
      );
    }
  };

  const handleNextPageClick = () => {
    if (hasNextPage) {
      setGraphqlQuery(
        `
        {
          featuredPublicAnimations (first: 20, after: "${endCursor}") {
            edges {
              cursor
                node {
                  gifUrl
                  lottieUrl
                  jsonUrl
                  name
                }
              }
              pageInfo {
                endCursor
                hasNextPage
                hasPreviousPage
                startCursor
              }
            } 
          }
        `
      );
    }
  };

  return (
    <PaginationWrapper>
      <button type="button" aria-label="prev" onClick={handlePrevPageClick}>
        &laquo;
      </button>
      <button type="button" arial-label="next" onClick={handleNextPageClick}>
        &raquo;
      </button>
    </PaginationWrapper>
  );
};

export default Pagination;
