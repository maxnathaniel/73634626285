import lottie from 'lottie-web';

import { LottieEditorIcon } from '../../Icons';
import { useStore, ymap } from '../../stores/store';
import { SaveBtn, TopbarWrapper } from './styles';
import { Animation } from '../../types';
import { FC } from 'react';

interface Props {
  resetState: () => void;
}

const Topbar: FC<Props> = ({ resetState }) => {
  const { clearAll } = useStore((state) => state);

  const handeClick = () => {
    clearAll();
    resetState();
    lottie.destroy();
  };

  return (
    <TopbarWrapper>
      <LottieEditorIcon onClick={handeClick} />
    </TopbarWrapper>
  );
};

export default Topbar;
