import { useEffect } from 'react';

export const useUpdateData = (callGraphqlApi: () => void, graphqlQuery: string) => {
  useEffect(() => {
    callGraphqlApi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [graphqlQuery]);
};
