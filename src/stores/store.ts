import { create } from 'zustand';
import * as Y from 'yjs';
import { WebrtcProvider } from 'y-webrtc';
import { AnimationItem } from 'lottie-web';

import { Animation, Layer, ShapeElement, Store } from '../types';

export interface GroupProps {
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

export const ydoc = new Y.Doc();
new WebrtcProvider(`lottie-store`, ydoc);
export const ymap = ydoc.getMap();

export const useStore = create<Store>((set) => ({
  animationObject: null,
  activeGroup: '',
  activeLottie: '',
  currentFrame: 0,
  dimensions: { height: 0, width: 0 },
  forceRefreshJson: false,
  frameRate: 0,
  groups: {},
  json: {
    v: '',
    fr: 0,
    ip: 0,
    op: 0,
    w: 0,
    h: 0,
  },
  isPlaying: true,
  name: '',
  totalTime: 0,
  clearAll: () => {
    set(() => ({
      animationObject: null,
      activeGroup: '',
      activeLottie: '',
      currentFrame: 0,
      dimensions: { height: 0, width: 0 },
      forceRefreshJson: false,
      frameRate: 0,
      groups: {},
      json: {
        v: '',
        fr: 0,
        ip: 0,
        op: 0,
        w: 0,
        h: 0,
      },
      isPlaying: true,
      name: '',
      totalTime: 0,
    }));
  },
  setActiveLottie: (activeLottie: string) => {
    set(() => ({ activeLottie }));
  },
  initializeJson: (name: string, json: Animation) => {
    const j = ymap.get(name);

    if (Object.keys(j as any).length === 0) {
      ymap.set(name, json);

      set((state) => ({
        json,
        forceRefreshJson: !state.forceRefreshJson,
        frameRate: json.fr,
        name,
        dimensions: { height: json.h, width: json.w },
      }));
    } else {
      set(() => ({
        name,
      }));
    }
  },
  updateAnimationObject: (animationObject: AnimationItem) => {
    set(() => ({ animationObject }));
  },
  updateCurrentFrame: (currentFrame: number) => {
    set(() => ({ currentFrame }));
  },
  updateFileName: (fileName: string) => {
    set(() => ({ name: fileName }));
  },
  updateTotalTime: (totalTime: number) => {
    set(() => ({ totalTime }));
  },
  updatePlaying: (isPlaying: boolean) => {
    set(() => ({
      isPlaying,
    }));
  },
  updateJson: (name: string, json: Animation) => {
    ymap.set(name, json);

    set((state) => ({
      json,
      forceRefreshJson: !state.forceRefreshJson,
      frameRate: json.fr,
      name,
      dimensions: { height: json.h, width: json.w },
    }));
  },
  updateActiveGroup: (group: string) => {
    set(() => ({ activeGroup: group.trim() }));
  },
  updateFrameRate: (name: string, frame: number) => {
    const json = ymap.get(name) as Animation;

    json.fr = frame;

    ymap.set(name, json);

    set((state) => ({
      json: {
        ...state.json,
        fr: frame,
      },
      frame,
    }));
  },
  updateHeight: (name: string, height: number) => {
    const json = ymap.get(name) as Animation;
    json.h = height;

    ymap.set(name, json);

    set((state) => ({
      json: {
        ...state.json,
        h: height,
      },
      dimensions: {
        ...state.dimensions,
        height,
      },
    }));
  },
  updateWidth: (name: string, width: number) => {
    const json = ymap.get(name) as Animation;
    json.w = width;

    ymap.set(name, json);

    set((state) => ({
      json: {
        ...state.json,
        w: width,
      },
      dimensions: {
        ...state.dimensions,
        width,
      },
    }));
  },
  updateName: (name: string) => {
    set(() => ({ name }));
  },
  updateGroups: (groups: Record<string, Record<string, GroupProps[]> | { layerName: string }>) => {
    const grps: Record<string, any> = {};

    Object.keys(groups).forEach((k) => {
      const layerName = (groups[k].layerName as string).trim();

      grps[layerName] = [];

      Object.keys(groups[k]).forEach((itemKey) => {
        if (itemKey !== 'layerName') {
          grps[layerName].push({
            colour: itemKey.split(':')[1],
            props: (groups[k] as Record<string, GroupProps[]>)[itemKey],
          });
        }
      });
    });

    set(() => ({ groups: grps, layers: groups }));
  },
  removeLayer: (name: string, layerName: string) => {
    const json = ymap.get(name) as Animation;

    const layersCopy = json.layers;
    if (layersCopy) {
      const layerIdx = layersCopy.findIndex((layer: Layer) => (layer as any).nm.trim() === layerName);
      layersCopy[layerIdx].ty = 3;
    }

    ymap.set(name, json);

    set((state) => {
      const layersCopy = JSON.parse(JSON.stringify(state.json.layers));

      const layerIdx = layersCopy.findIndex((layer: ShapeElement) => layer.nm.trim() === layerName);
      layersCopy[layerIdx].ty = 3;

      return {
        ...state,
        activeGroup: '',
        json: {
          ...state.json,
          layers: layersCopy,
        },
      };
    });
  },
}));
