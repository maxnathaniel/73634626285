import { useState } from 'react';
import lottie from 'lottie-web';
import RangeSlider from 'react-range-slider-input';

import { useDrawToCanvas, useSelectLayerFromPreview, useSelectLayerFromSidebar } from '../../hooks';
import { PauseIcon, PlayIcon } from '../../Icons';
import { useStore } from '../../stores/store';

import { ImageWrapper, PreviewWrapper, RangeSliderGroup } from './styles';

import './Preview.css';
import 'react-range-slider-input/dist/style.css';

const Preview = () => {
  const { animationObject, currentFrame, isPlaying, totalTime, updatePlaying } = useStore((state) => state);
  const [layerIdMapping, setLayerIdMapping] = useState<Record<string, string>>({});

  useDrawToCanvas(layerIdMapping, setLayerIdMapping);
  useSelectLayerFromPreview(layerIdMapping);
  useSelectLayerFromSidebar(layerIdMapping);

  const onClick = () => {
    if (isPlaying) {
      lottie.pause();
      updatePlaying(false);
    } else {
      lottie.play();
      updatePlaying(true);
    }
  };

  const handleDrag = (e: number[]) => {
    animationObject && animationObject.goToAndStop(e[1], true);
  };

  return (
    <PreviewWrapper id="preview-wrapper">
      <ImageWrapper id="preview" />
      <RangeSliderGroup>
        {isPlaying ? <PauseIcon onClick={onClick} /> : <PlayIcon onClick={onClick} />}
        <RangeSlider
          className="single-thumb"
          min={0}
          defaultValue={currentFrame}
          max={totalTime}
          value={[0, currentFrame]}
          thumbsDisabled={[false, false]}
          onInput={handleDrag}
        />
      </RangeSliderGroup>
      <p>
        {Math.round(currentFrame).toFixed(0)}/{totalTime}
      </p>
    </PreviewWrapper>
  );
};

export default Preview;
