import { useEffect, useRef } from 'react';

export const useUpdateData = (callGraphqlApi: () => void, graphqlQuery: string) => {
  const urlRef = useRef(graphqlQuery);

  useEffect(() => {
    if (urlRef.current !== graphqlQuery) {
      callGraphqlApi();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [graphqlQuery]);
};
