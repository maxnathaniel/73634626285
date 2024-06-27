import styled from 'styled-components';

export enum MainAxisAlignment {
  flexStart = 'flex-start',
  flexEnd = 'flex-end',
  center = 'center',
  spaceBetween = 'space-between',
  spaceAround = 'space-around',
  spaceEvenly = 'space-evenly',
}

interface GroupRowWrapperProps {
  $isActive: boolean;
}

interface CircleProps {
  colour: string;
}

interface RowProps {
  $mainAxisAlignment?: MainAxisAlignment;
}

export const GroupRowWrapper = styled.div<GroupRowWrapperProps>`
  display: flex;
  justify-content: center;
  background: ${({ $isActive }) => ($isActive ? 'rgb(244, 246, 248)' : 'inherit')};

  > * {
    align-self: center;
  }

  > svg {
    cursor: pointer;
    min-width: 30px;
    max-width: 30px;
  }

  > span {
    min-width: 30px;
    max-width: 30px;
  }

  &:hover {
    box-shadow: inset 0 0 0 1px lightgray;
  }
`;

export const GroupRow = styled.li`
  cursor: pointer;
  padding: 5px 0;
  font-size: 0.875rem;
  color: #20272c;
  caret-color: transparent;
  width: 100%;
  min-width: 220px;
  max-width: 220px;

  > p {
    display: inline-block;
    align-self: center;
    padding: 0;
    margin: 5px 0;
  }
`;

export const SettingsRow = styled.div<RowProps>`
  display: flex;
  justify-content: ${({ $mainAxisAlignment }) => ($mainAxisAlignment ? $mainAxisAlignment : 'flex-start')};
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
  padding-left: 10px;

  > p {
    color: #20272c;
    font-size: 0.75rem;
    align-self: flex-start;
  }
`;

export const SettingsTitle = styled.p`
  font-weight: 500;
`;

export const AnimationSettingInput = styled.input`
  width: 50px;
  height: 15px;
  background-color: #f6f8f9;
  border: 0;
  font-size: 0.75rem;
  color: #20272c;
  text-align: center;
  padding: 3px;
  border-radius: 3px;

  &:focus {
    outline: 2px solid #00ddb3;
  }
`;

export const Circle = styled.p<CircleProps>`
  display: inline-block;
  position: relative;
  caret-color: transparent;
  cursor: pointer;
  height: 20px;
  width: 20px;
  border-radius: 50%;
  margin-right: 10px;
  border: 1px solid rgb(217, 224, 230);
  background-color: ${({ colour }) => `rgb(${colour})`};
`;

export const Popover = styled.div`
  position: absolute;
  z-index: 2;
  top: 30px;
  left: -150px;
`;

export const Cover = styled.div`
  position: fixed;
  top: 10px;
  right: 0px;
  bottom: 0px;
  left: 0px;
`;

export const UpdateButton = styled.button`
  cursor: pointer;
  width: 90%;
  padding: 8px 20px;
  border-radius: 8px;
  border: 1px solid #bfc8d1;
  font-weight: bold;
`;

export const LayersTitle = styled.p`
  min-width: 220px;
  max-width: 220px;
  font-weight: 700;
`;

export const DimensionsLabel = styled.span`
  font-size: 0.5rem;
`;

export const NoSelectedGroupText = styled.p`
  margin-top: 0;
`;
