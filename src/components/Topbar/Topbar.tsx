import { FC } from 'react';
import lottie from 'lottie-web';

import { LottieEditorIcon } from '../../Icons';
import { useStore } from '../../stores/store';
import { TopbarWrapper } from './styles';

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
