import { GroupProps } from '../stores/store';
import { Animation, ColourProps } from '../types';
import { toRGBA, toRGBAGradient } from './common';

interface Loc {
  type: string;
  name: string;
  loc: number[];
  colour: any;
  keyFramed: boolean;
}

interface Colour {
  time: string;
  start: number[];
  end: number[];
  index: number;
}

interface Payload {
  groups: ColourProps[];
  newColour: (number | undefined)[];
  gradientStartIdx: number;
}

export const initLayers = (json: Animation) => {
  let layers: any = {};

  if (json.layers && json.assets) {
    extractGroups(json.layers, 'main', null).forEach((group: any) => {
      const colour = group.keyFramed
        ? group.color[group.colour.length - 1].start.join() + group.colour[group.colour.length - 1].end.join()
        : group.colour.join();
      const name = group.name.split('-')[0];
      const key = `${name}:${colour}`;
      const layerId = group.layerId;

      if (layers.hasOwnProperty(layerId)) {
        if (key in layers[layerId]) {
          layers[layerId][key].push(group);
        } else {
          layers[layerId][key] = [group];
        }
      } else {
        layers[layerId] = { [key]: [group], layerName: group.layerName };
      }
    });

    if (json.assets.length > 0) {
      json.assets.forEach((asset, i) => {
        if ('layers' in asset) {
          extractGroups(asset.layers, 'assets', i).forEach((group: any) => {
            const colour = group.keyFramed
              ? group.color[group.colour.length - 1].start.join() + group.colour[group.colour.length - 1].end.join()
              : group.colour.join();
            const name = group.name.split('-')[0];
            const key = `${name}:${colour}`;
            const layerId = group.layerId;

            if (layers.hasOwnProperty(layerId)) {
              if (key in layers[layerId]) {
                layers[layerId][key].push(group);
              } else {
                layers[layerId][key] = [group];
              }
            } else {
              layers[layerId] = { [key]: [group], layerName: group.layerName };
            }
          });
        }
      });
    }
  }

  return layers;
};

const extractGroups = (layers: any[], mainType: string, assetIdx: number | null) => {
  let groups: GroupProps[] = [];

  layers.forEach((layer, i) => {
    // NOTE: No contents, only used for parenting
    // https://lottiefiles.github.io/lottie-docs/layers/
    if (layer.ty === 3) return;

    // NOTE: Renders a Precomposition
    // https://lottiefiles.github.io/lottie-docs/layers/
    if (layer.ty === 0) {
      const assets = extractGroups(layer.layers, 'assets', null).map((colour) => {
        const temp = JSON.parse(JSON.stringify(colour));

        temp.layerId = `asset-${i}-${assetIdx}`;
        temp.layerName = layer.nm;
        return temp;
      });

      groups = [...groups, ...assets];
    }

    if (layer.ty === 2) {
      // TODO: this requires alot more work
      const asset = layer;
      asset.layerId = `asset-${i}-${assetIdx}`;
      asset.layerName = layer.nm;
      asset.colour = ['0', '0', '0'];
      asset.loc = [];
      asset.loc.push(i);
      asset.name = 'nm' in layer ? `${layer.nm} - ${layer.name}` : `Item ${i} - ${layer.name}`;

      groups = [...groups, asset];
    }

    if ('shapes' in layer) {
      const grps = extractGroups(layer.shapes, 'main', null).map((colour) => {
        const temp = JSON.parse(JSON.stringify(colour));

        temp.layerId = `${mainType}-${i}-${assetIdx}`;
        temp.layerName = layer.nm;

        return temp;
      });

      groups = [...groups, ...grps];
    }

    if ('it' in layer) {
      const group = getLoc(layer.it).map((val) => {
        const temp: any = val;

        temp.shapeIdx = i;
        temp.shapeName = layer.nm;

        return temp;
      });

      groups = [...groups, ...group];
    }
  });

  return groups;
};

const getLoc = (items: any[]) => {
  let loc: Loc[] = [];

  items.forEach((item, i) => {
    if ('it' in item) {
      let items = getLoc(item.it);

      if (items.length > 0) {
        items = items.map((item: any) => {
          const temp = JSON.parse(JSON.stringify(item));
          temp.loc.push(i);
          temp.name = 'nm' in item ? `${item.nm} - ${item.name}` : `Item ${i} - ${item.name}`;

          return temp;
        });
      }

      loc = [...loc, ...items];
    }

    if (item.ty === 'fl' || item.ty === 'st') {
      const name = item.nm;

      // NOTE: no animation
      if (item.c.a === 0) {
        const colour = toRGBA(item.c.k);
        loc.push({ type: item.ty, name, loc: [i], colour, keyFramed: false });
      }

      // NOTE: animation
      if (item.c.a === 1) {
        const colours: Colour[] = [];

        item.c.k.forEach((v: any, i: number) => {
          if ('s' in v) {
            const startColor = toRGBA(v.s);
            const endColor = 'e' in v ? toRGBA(v.e) : [255, 255, 255, 0];

            colours.push({ time: v.t, start: startColor, end: endColor, index: i });
          }
        });

        loc.push({ type: item.ty, name, loc: [i], colour: colours, keyFramed: true });
      }
    }

    if (item.ty === 'gf' || item.ty === 'gs') {
      const name = item.nm;

      // NOTE: no animation
      if (item.g.k.a === 0) {
        const colour = toRGBAGradient(item.g.k.k);
        loc.push({ type: item.ty, name, loc: [i], colour, keyFramed: false });
      }

      // NOTE: animation
      if (item.g.k.a === 1) {
        const colours: Colour[] = [];
        item.g.k.k.forEach((v: any, i: number) => {
          if ('s' in v && 'e' in v) {
            const start = toRGBAGradient(v.s);
            const end = toRGBAGradient(v.e);
            colours.push({ time: v.t, start, end, index: i });
          }
        });
        loc.push({ type: item.ty, name, loc: [i], keyFramed: true, colour: colours });
      }
    }
  });

  return loc;
};

const updateGradientKValue = (k: any, newColour: (number | undefined)[], start: number) => {
  let i = 1;

  if (start === 1) {
    i = 5;
  }
  if (start === 2) {
    i = 9;
  }

  let j = 0;
  let count = 3;

  while (count > 0) {
    k[i] = newColour[j];
    i++;
    j++;
    count--;
  }
};

const updateColour = (json: any, group: Payload, locLen: number) => {
  let i = (group as any).colourPath[locLen - 1];

  if (locLen > 0) {
    updateColour(json.it[i], group, locLen - 1);
  } else {
    json.c.k = group.newColour;
  }
};

const updateGradColour = (json: any, group: Payload, locLen: number) => {
  let i = (group as any).colourPath[locLen - 1];
  if (locLen > 0) {
    updateGradColour(json.it[i], group, locLen - 1);
  } else {
    updateGradientKValue(json.g.k.k, group.newColour, group.gradientStartIdx);
  }
};

export const updateGroupColour = (json: any, payload: Payload) => {
  payload.newColour = payload.newColour.map((v: any, i: number) => (i !== 3 ? (parseInt(v) * 1.0) / 255 : v));

  payload.groups.forEach((v) => {
    const { loc, layerId, shapeIdx } = v;
    const [type, layerIdx, asssetIdx] = layerId.split('-');

    (payload as any).colourPath = loc;

    const targetItem =
      type === 'main'
        ? json.layers[layerIdx].shapes[shapeIdx]
        : json.assets[asssetIdx].layers[layerIdx].shapes[shapeIdx];

    updateColour(targetItem, payload, loc.length);
  });

  return { updatedJson: json, colors: '', key: '' };
};

export const updateGroupGradColour = (json: Animation, payload: Payload & { colourPath?: number[] }) => {
  payload.newColour = payload.newColour.map((v: any, i: number) => (i !== 3 ? (parseInt(v) * 1.0) / 255 : v));

  payload.groups.forEach((v) => {
    const { loc, layerId, shapeIdx } = v;
    const [type, layerIdx, assetIdx] = layerId.split('-');

    payload.colourPath = loc;

    const targetItem =
      type === 'main'
        ? json.layers && (json.layers[Number(layerIdx)] as any).shapes[shapeIdx]
        : json.assets && (json.assets[Number(assetIdx)] as any).layers[layerIdx].shapes[shapeIdx];

    updateGradColour(targetItem, payload, loc.length);
  });

  return { updatedJson: json, colors: '', key: '' };
};
