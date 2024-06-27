import { Layer } from '../types';

export const setIds = (layers: Layer[]) => {
  const layersToIdMap: Record<string, string> = {};

  layers.forEach((layer) => {
    const idName = Math.random().toString(36).slice(-6);
    (layer as any).ln = idName;
    const name = 'nm' in layer && layer.nm !== undefined ? layer.nm.trim() : '';
    layersToIdMap[name] = idName;
  });

  return layersToIdMap;
};
