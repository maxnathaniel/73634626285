import { useEffect } from 'react';
import lottie, { BMEnterFrameEvent } from 'lottie-web';

import { useStore, ymap } from '../stores/store';
import { initLayers } from '../utils/initLayers';
import { setIds } from '../utils/setIds';
import { Animation, Layer } from '../types';

export const useDrawToCanvas = (
  layerIdMapping: Record<string, string>,
  setLayerIdMapping: React.Dispatch<React.SetStateAction<Record<string, string>>>
) => {
  const {
    animationObject,
    activeGroup,
    currentFrame,
    totalTime,
    forceRefreshJson,
    isPlaying,
    updateAnimationObject,
    updateCurrentFrame,
    updateTotalTime,
    updateGroups,
  } = useStore((state) => state);

  const newJson = ymap.get('json') as Animation;

  useEffect(() => {
    ymap.observe(() => {
      const newJson = ymap.get('json') as Animation;

      if (newJson && Object.keys(newJson).length > 0) {
        setLayerIdMapping(setIds(newJson.layers as Layer[]));

        lottie.destroy();

        const animation = lottie.loadAnimation({
          container: document.getElementById('preview') as Element,
          renderer: 'svg',
          loop: true,
          autoplay: isPlaying,
          animationData: newJson,
        });

        updateAnimationObject(animation);

        if (currentFrame > 0) {
          animation.goToAndStop(currentFrame, true);
        }

        const updateFrame = (e: BMEnterFrameEvent) => {
          updateCurrentFrame(e.currentTime);
          if (totalTime == 0) {
            updateTotalTime(e.totalTime);
          }
        };

        updateGroups(initLayers(newJson));

        if (activeGroup) {
          document.getElementById(layerIdMapping[activeGroup])?.classList.add('active-grp');
        }

        animation.addEventListener('enterFrame', updateFrame);

        return () => {
          animationObject && animationObject.removeEventListener('enterFrame', updateFrame);
        };
      }
    });
  }, [newJson]);

  useEffect(() => {
    if (newJson && Object.keys(newJson).length > 0 && newJson.layers) {
      setLayerIdMapping(setIds(newJson.layers));
      lottie.destroy();

      const animation = lottie.loadAnimation({
        container: document.getElementById('preview') as Element,
        renderer: 'svg',
        loop: true,
        autoplay: isPlaying,
        animationData: newJson,
      });

      updateAnimationObject(animation);

      if (currentFrame > 0) {
        animation.goToAndStop(currentFrame, true);
      }

      const updateFrame = (e: BMEnterFrameEvent) => {
        updateCurrentFrame(e.currentTime);
        if (totalTime == 0) {
          updateTotalTime(e.totalTime);
        }
      };
      updateGroups(initLayers(newJson));

      animation.addEventListener('enterFrame', updateFrame);
    }
  }, [forceRefreshJson, newJson?.fr, newJson?.layers, newJson?.w, newJson?.h]);
};
