import { Dispatch, SetStateAction, useEffect } from 'react';

import { useStore, ymap } from '../stores/store';
import { Animation } from '../types';

export const useInitProperties = (
  frameRate: number,
  height: number,
  width: number,
  setFrameRate: Dispatch<SetStateAction<number>>,
  setHeight: Dispatch<SetStateAction<number>>,
  setWidth: Dispatch<SetStateAction<number>>
) => {
  const { activeLottie } = useStore((state) => state);

  const newJson = ymap.get(activeLottie) as Animation;

  useEffect(() => {
    if (newJson && frameRate !== newJson?.fr) {
      setFrameRate(newJson?.fr);
    }
    if (newJson && height !== newJson?.h) {
      setHeight(newJson?.h);
    }
    if (newJson && width !== newJson?.w) {
      setWidth(newJson?.w);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newJson?.fr, newJson?.h, newJson?.w]);
};
