import { ChangeEvent, MouseEvent, useEffect, useState } from 'react';
import { ChromePicker, ColorResult, RGBColor } from 'react-color';

import { useStore, ymap } from './stores/store';
import { Collection, FileDrop, Preview, Sidebar, Topbar, Res } from './components';
import { updateGroupColour, updateGroupGradColour } from './utils/initLayers';
import { useRenderColours } from './hooks';

import { Animation } from './types';
import { BinIcon } from './Icons';

import {
  AnimationSettingInput,
  Circle,
  Cover,
  DimensionsLabel,
  GroupRow,
  GroupRowWrapper,
  LayersTitle,
  MainAxisAlignment,
  NoSelectedGroupText,
  Popover,
  SettingsRow,
  SettingsTitle,
  UpdateButton,
} from './AppStyles';

import './App.css';
import { lottieFilesGraphqlEndpoint } from './config/urls';

function App() {
  const {
    activeGroup,
    dimensions,
    groups,
    fileName,
    removeLayer,
    updateActiveGroup,
    updateHeight,
    updateFrameRate,
    updateJson,
    updateWidth,
  } = useStore((state) => state);
  console.log('fileName', fileName);
  const newJson = ymap.get(fileName) as Animation;

  const [data, setData] = useState<Res | {}>({});
  const [graphqlQuery, setGraphqlQuery] = useState(`
    {
      featuredPublicAnimations (first: 20) {
        edges {
          cursor
            node {
              gifUrl
              lottieUrl
              jsonUrl
              name
            }
          }
          pageInfo {
            endCursor
            hasNextPage
            hasPreviousPage
            startCursor
          }
        } 
    }`);
  const [displayColourPicker, setDisplayColourPicker] = useState<Record<string, boolean> | null>({});
  const [frameRate, setFrameRate] = useState<number>(newJson?.fr);
  const [height, setHeight] = useState<number>(newJson?.h);
  const [width, setWidth] = useState<number>(newJson?.w);
  const [selectedColour, setSelectedColour] = useState<Record<string, RGBColor & { grpIdx?: number }[]>>({});

  const callGraphqlApi = async () => {
    const payload = {
      query: `${graphqlQuery}`,
    };
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    };
    const res = await fetch(lottieFilesGraphqlEndpoint, options);
    const {
      data: { featuredPublicAnimations },
    } = await res.json();
    setData(featuredPublicAnimations);
  };

  useEffect(() => {
    callGraphqlApi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    callGraphqlApi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [graphqlQuery]);

  useEffect(() => {
    const newJson = ymap.get(fileName) as Animation;

    ymap.observe(() => {
      if (newJson?.fr) {
        setFrameRate(newJson?.fr);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const newJson = ymap.get(fileName) as Animation;

    ymap.observe(() => {
      if (dimensions.height !== newJson?.h) {
        setHeight(newJson?.h);
      }
      if (dimensions.width !== newJson?.w) {
        setWidth(newJson?.w);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (frameRate !== newJson?.fr) {
      setFrameRate(newJson.fr);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newJson?.fr]);

  useEffect(() => {
    if (height !== newJson?.h) {
      setHeight(newJson.h);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newJson?.h]);

  useEffect(() => {
    if (width !== newJson?.w) {
      setWidth(newJson.w);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newJson?.w]);

  useRenderColours(selectedColour, setSelectedColour, groups);

  const resetState = () => {
    setSelectedColour({});
    setDisplayColourPicker({});
    setFrameRate(0);
    setHeight(0);
    setWidth(0);
  };

  const openColourPicker = (colour: string) => {
    if (displayColourPicker) {
      setDisplayColourPicker((prev) => ({
        ...prev,
        [colour]: true,
      }));
    }
  };

  const handleClose = (e: MouseEvent, key: string) => {
    e.stopPropagation();
    setDisplayColourPicker((prev) => ({
      ...prev,
      [key]: false,
    }));
  };

  const handleColourPickerChange = (newColour: ColorResult, grpIdx: number, idx: number) => {
    const { rgb } = newColour;

    const payload = {
      groups: groups[activeGroup][grpIdx].props,
      newColour: [rgb.r, rgb.g, rgb.b, rgb.a],
      gradientStartIdx: idx,
    };

    const group = structuredClone(selectedColour[activeGroup]);
    group[idx] = { r: rgb.r, g: rgb.g, b: rgb.b, a: rgb.a, grpIdx } as RGBColor & { grpIdx: number };

    setSelectedColour((prev) => ({
      ...prev,
      [activeGroup]: group,
    }));

    const shapeType = groups[activeGroup][grpIdx].props[0].type;

    if (shapeType === 'gf' || shapeType === 'gs') {
      const { updatedJson } = updateGroupGradColour(newJson, payload);
      updateJson(fileName, updatedJson);
    } else {
      const { updatedJson } = updateGroupColour(newJson, payload);
      updateJson(fileName, updatedJson);
    }
  };

  const handleDeleteLayer = (name: string) => {
    removeLayer(fileName, name);
  };

  const renderUniqueColours = (name: string) => {
    if (activeGroup === '') return <NoSelectedGroupText>Please select a group to get started.</NoSelectedGroupText>;
    if (selectedColour === undefined || Object.keys(selectedColour).length === 0) return;

    return Array.from(selectedColour[name]).map((colour, idx) => {
      let grpIdx = Number(colour['grpIdx']);

      grpIdx = grpIdx > -1 ? grpIdx : idx;

      const coercedColour = colour as RGBColor;
      const colourCopy = [coercedColour.r, coercedColour.g, coercedColour.b, coercedColour.a];
      const colourStr = colourCopy.join(',');

      return (
        <Circle
          key={`${name}-${colour}-${idx}`}
          onClick={() => openColourPicker(`${colour}-${grpIdx}-${idx}`)}
          colour={colourStr}
        >
          {displayColourPicker && displayColourPicker[`${colour}-${grpIdx}-${idx}`] && (
            <Popover>
              <Cover onClick={(e) => handleClose(e, `${colour}-${grpIdx}-${idx}`)} />
              <ChromePicker
                color={colour as RGBColor}
                onChange={(newColour) => handleColourPickerChange(newColour, grpIdx, idx)}
              />
            </Popover>
          )}
        </Circle>
      );
    });
  };

  const handleHChange = (e: ChangeEvent<HTMLInputElement>) => {
    setHeight(Number(e.target.value));
  };

  const handleWChange = (e: ChangeEvent<HTMLInputElement>) => {
    setWidth(Number(e.target.value));
  };

  const handleFrameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFrameRate(Number(e.target.value));
  };

  const onUpdateSettings = () => {
    frameRate && updateFrameRate(fileName, frameRate);
    updateHeight(fileName, height === undefined ? newJson.h : height);
    updateWidth(fileName, width === undefined ? newJson.w : width);
  };

  return (
    <div className="App">
      <Topbar resetState={resetState} />
      <div className="main-wrapper">
        {newJson && Object.keys(newJson).length > 0 ? (
          <>
            <Sidebar id="left-sidebar" width={250}>
              <LayersTitle>Layers</LayersTitle>
              <ul>
                {Object.keys(groups).map((name) => (
                  <GroupRowWrapper key={name} $isActive={Boolean(activeGroup === name)}>
                    <GroupRow onClick={() => updateActiveGroup(name)}>
                      <p key={name}>{name}</p>
                    </GroupRow>
                    {Boolean(activeGroup === name) ? <BinIcon onClick={() => handleDeleteLayer(name)} /> : <span />}
                  </GroupRowWrapper>
                ))}
              </ul>
            </Sidebar>
            <Preview />
            <Sidebar id="animation-sidebar" width={250}>
              <SettingsTitle>Animation settings</SettingsTitle>
              <SettingsRow>
                <p>Dimension</p>
                <DimensionsLabel>W</DimensionsLabel>
                <AnimationSettingInput value={width} onChange={handleWChange}></AnimationSettingInput>
                <DimensionsLabel>H</DimensionsLabel>
                <AnimationSettingInput value={height} onChange={handleHChange}></AnimationSettingInput>
              </SettingsRow>
              <SettingsRow>
                <p>Frame Rate</p>
                <AnimationSettingInput value={frameRate ?? 0} onChange={handleFrameChange}></AnimationSettingInput>
              </SettingsRow>
              <SettingsTitle>Colour Settings</SettingsTitle>
              <SettingsRow $mainAxisAlignment={MainAxisAlignment.center}>
                {renderUniqueColours(activeGroup)}
              </SettingsRow>
              <UpdateButton onClick={onUpdateSettings}>Update</UpdateButton>
            </Sidebar>
          </>
        ) : (
          <>
            <Sidebar id="file-drop-zone" width={350}>
              <FileDrop />
            </Sidebar>
            <Collection data={data} setGraphqlQuery={setGraphqlQuery} />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
