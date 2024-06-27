import { useEffect } from 'react';

import { useStore } from '../stores/store';
import { handleClick } from './utils/common';

export const useSelectLayerFromSidebar = (layerIdMapping: Record<string, string>) => {
  const { activeGroup, updateActiveGroup } = useStore((state) => state);

  useEffect(() => {
    if (Object.keys(layerIdMapping)) {
      const el = document.getElementById(layerIdMapping[activeGroup]);
      if (el) {
        handleClick(el, activeGroup, layerIdMapping, updateActiveGroup);
      }
    }
  }, [activeGroup, layerIdMapping, updateActiveGroup]);
};
