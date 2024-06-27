export const unselectPreviousGroups = (layerIdMapping: Record<string, string>) => {
  Object.entries(layerIdMapping).forEach(([k, v]) => {
    const group = document.getElementById(v);
    group?.classList.remove('active-grp');
  });
};

export const updateOpacity = (activeGroup: string, layerIdMapping: Record<string, string>) => {
  Object.entries(layerIdMapping).forEach(([k, v]) => {
    const group = document.getElementById(v);

    if (k !== activeGroup) {
      group?.classList.add('inactive-grp');
    } else {
      group?.classList.remove('inactive-grp');
    }
  });
};

export const handleClick = (
  el: HTMLElement,
  k: string,
  layerIdMapping: Record<string, string>,
  updateActiveGroup: (k: string) => void
) => {
  unselectPreviousGroups(layerIdMapping);
  updateActiveGroup(k);
  updateOpacity(k, layerIdMapping);

  el.classList.add('active-grp');
  updateActiveGroup(k);
};
