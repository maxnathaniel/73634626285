import { Dispatch, FC, useEffect, useState } from 'react';

import { useStore } from '../../stores/store';

import { CollectionWrapper, FlexWrapper, GifWrapper } from './styles';
import { Pagination } from '../Pagination';

interface Node {
  gifUrl: string;
  jsonUrl: string;
  lottieUrl: string;
  name: string;
}

interface Item {
  cursor: string;
  node: Node;
}

interface PageInfo {
  endCursor: string;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor: string;
}

export interface Res {
  edges: Item[];
  pageInfo: PageInfo;
}

interface Props {
  data: Res | {};
  setGraphqlQuery: Dispatch<React.SetStateAction<string>>;
}

const Collection: FC<Props> = ({ data, setGraphqlQuery }) => {
  const { updateJson } = useStore((state) => state);

  const [startCursor, setStartCursor] = useState('');
  const [endCursor, setEndCursor] = useState('');
  const [hasPrevPage, setHasPrevPage] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(false);

  useEffect(() => {
    if (data && 'pageInfo' in data) {
      setStartCursor(data.pageInfo.startCursor);
      setEndCursor(data.pageInfo.endCursor);
      setHasPrevPage(data.pageInfo.hasPreviousPage);
      setHasNextPage(data.pageInfo.hasNextPage);
    }
  }, [data]);

  const handleClick = async (jsonUrl: string) => {
    const res = await fetch(jsonUrl);
    const data = await res.json();
    updateJson(data.nm, data);
  };

  return (
    <CollectionWrapper>
      <FlexWrapper>
        {data &&
          'edges' in data &&
          data.edges.map(({ node: { gifUrl, jsonUrl, name } }) => {
            return (
              <GifWrapper key={gifUrl} onClick={() => handleClick(jsonUrl)}>
                <img alt={name} src={gifUrl} />
                <p>{name}</p>
              </GifWrapper>
            );
          })}
      </FlexWrapper>
      <Pagination data={{ startCursor, endCursor, hasPrevPage, hasNextPage }} setGraphqlQuery={setGraphqlQuery} />
    </CollectionWrapper>
  );
};

export default Collection;
