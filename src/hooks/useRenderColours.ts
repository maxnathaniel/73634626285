import { useEffect } from 'react';
import { RGBColor } from 'react-color';

import { GroupColours } from '../types';

export const useRenderColours = (
  selectedColour: Record<string, RGBColor & { grpIdx?: number }[]>,
  setSelectedColour: React.Dispatch<Record<string, RGBColor & { grpIdx?: number }[]>>,
  groups: Record<string, GroupColours[]>
) => {
  useEffect(() => {
    const colours: Record<string, Set<string>> = {};

    if (Object.keys(selectedColour).length === 0 && Object.keys(groups).length > 0) {
      Object.keys(groups).forEach((k) => {
        groups[k].forEach((item, idx) => {
          const shapeType = item.props[0].type;

          if (!(k in colours)) {
            colours[k] = new Set();
          }

          if (shapeType === 'gf' || shapeType === 'gs') {
            const gradColours = item.colour.split(',');

            colours[k].add(`${gradColours[1]},${gradColours[2]},${gradColours[3]},1,${idx},1`);
            colours[k].add(`${gradColours[5]},${gradColours[6]},${gradColours[7]},1,${idx},2`);
            colours[k].add(`${gradColours[9]},${gradColours[10]},${gradColours[11]},1,${idx},3`);
          } else {
            colours[k].add(`${item.colour},${idx}`);
          }
        });
      });

      const rgba: Record<string, RGBColor & { grpIdx?: number }[]> = {};

      Object.keys(colours).forEach((k) => {
        rgba[k] = [] as unknown as RGBColor & { grpIdx: number }[];

        colours[k].forEach((colour) => {
          const [r, g, b, a, grpIdx] = colour.split(',');
          const dict: RGBColor & { grpIdx?: number } = {
            r: Number(r),
            g: Number(g),
            b: Number(b),
            a: Number(a),
            grpIdx: grpIdx ? Number(grpIdx) : -1,
          };

          rgba[k].push(dict);
        });
      });

      setSelectedColour(rgba);
    }
  }, [groups, selectedColour]);
};
