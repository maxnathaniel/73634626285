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
  activeLottie: string;
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
  initializeJson: (name: string, json: Animation) => void;
  setActiveLottie: (activeLottie: string) => void;
  updateAnimationObject: (animationObject: AnimationItem) => void;
  updateActiveGroup: (group: string) => void;
  updateCurrentFrame: (currentFrame: number) => void;
  updateFileName: (fileName: string) => void;
  updateFrameRate: (name: string, frame: number) => void;
  updateGroups: (groups: Record<string, Record<string, GroupProps[]> | { layerName: string }>) => void;
  updateHeight: (name: string, height: number) => void;
  updateJson: (name: string, json: Animation) => void;
  removeLayer: (name: string, layerName: string) => void;
  updatePlaying: (isPlaying: boolean) => void;
  updateTotalTime: (totalFrame: number) => void;
  updateWidth: (name: string, height: number) => void;
}
