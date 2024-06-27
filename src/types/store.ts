import { AnimationItem } from 'lottie-web';

import { Animation } from './lottie';
import { GroupProps } from '../stores/store';

export interface ColourProps {
  colour: number[];
  keyFramed: boolean;
  layerId: string;
  layerName: string;
  loc: number[];
  name: string;
  shapeIdx: number;
  shapeName: string;
  type: string;
}

export interface GroupColours {
  colour: string;
  props: ColourProps[];
}

export interface Store {
  activeGroup: string;
  animationObject: AnimationItem | null;
  currentFrame: number;
  dimensions: Record<string, number>;
  forceRefreshJson: boolean;
  frameRate: number;
  groups: Record<string, GroupColours[]>;
  isPlaying: boolean;
  json: Animation;
  name: string;
  totalTime: number;
  clearAll: () => void;
  updateAnimationObject: (animationObject: AnimationItem) => void;
  updateCurrentFrame: (currentFrame: number) => void;
  updateTotalTime: (totalFrame: number) => void;
  updateJson: (json: Animation) => void;
  updateFrameRate: (frame: number) => void;
  updateHeight: (height: number) => void;
  updateWidth: (height: number) => void;
  updateGroups: (groups: Record<string, Record<string, GroupProps[]> | { layerName: string }>) => void;
  updateActiveGroup: (group: string) => void;
  updatePlaying: (isPlaying: boolean) => void;
  removeLayer: (name: string) => void;
}
