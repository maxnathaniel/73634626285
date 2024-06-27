import { useEffect } from 'react';

import { useStore } from '../stores/store';
import { handleClick } from './utils/common';

export const useSelectLayerFromPreview = (layerIdMapping: Record<string, string>) => {
  const { activeGroup, updateActiveGroup } = useStore((state) => state);

  useEffect(() => {
    const unselectAllGroups = (e: MouseEvent) => {
      const activeId = layerIdMapping[activeGroup];
      const group = document.getElementById(activeId);

      if (e.target) {
        group?.classList.remove('active-grp');
      }
    };

    const removeOpacityProperties = () => {
      Object.values(layerIdMapping).forEach((v) => {
        const group = document.getElementById(v);

        group?.classList.remove('inactive-grp');
      });
    };

    Object.entries(layerIdMapping).forEach(([k, v]) => {
      const group = document.getElementById(v);
      group?.addEventListener('click', () => handleClick(group, k, layerIdMapping, updateActiveGroup));
    });

    document
      .getElementById('preview-wrapper')
      ?.addEventListener('click', (e: MouseEvent) => unselectAllGroups(e), true);
    document.getElementById('preview-wrapper')?.addEventListener('click', removeOpacityProperties, true);

    return () => {
      Object.entries(layerIdMapping).forEach(([k, v]) => {
        const group = document.getElementById(v);
        group?.removeEventListener('click', () => handleClick(group, k, layerIdMapping, updateActiveGroup));
      });

      document.getElementById('preview-wrapper')?.removeEventListener('click', (e) => unselectAllGroups(e), true);
      document.getElementById('preview-wrapper')?.removeEventListener('click', removeOpacityProperties, true);
    };
  }, [activeGroup, layerIdMapping]);
};
