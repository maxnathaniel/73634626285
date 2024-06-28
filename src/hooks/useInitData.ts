import { Dispatch, SetStateAction, useEffect } from 'react';

import { useStore, ymap } from '../stores/store';
import { Animation } from '../types';

export const useInitData = (
  callGraphqlApi: () => void,
  setFrameRate: Dispatch<SetStateAction<number>>,
  setHeight: Dispatch<SetStateAction<number>>,
  setWidth: Dispatch<SetStateAction<number>>
) => {
  const { activeLottie, dimensions } = useStore((state) => state);

  const newJson = ymap.get(activeLottie) as Animation;

  useEffect(() => {
    callGraphqlApi();

    ymap.observe(() => {
      if (newJson?.fr) {
        setFrameRate(newJson?.fr);
      }
      if (dimensions.height !== newJson?.h) {
        setHeight(newJson?.h);
      }
      if (dimensions.width !== newJson?.w) {
        setWidth(newJson?.w);
      }
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
