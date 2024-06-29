/* eslint-disable testing-library/prefer-screen-queries */
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

import Topbar from './Topbar';

jest.mock('lottie-web', () => ({
  destroy: jest.fn(),
}));

jest.mock('yjs', () => ({
  Doc: jest.fn().mockImplementation(() => {
    return { getMap: jest.fn() };
  }),
}));

jest.mock('y-webrtc', () => ({
  WebrtcProvider: jest.fn(),
}));

describe('<Topbar />', () => {
  test('Renders Topbar', async () => {
    const resetState = jest.fn();

    const { findByTestId } = render(<Topbar resetState={resetState} />);

    const homeIcon = await findByTestId('lottie-icon');
    expect(homeIcon).toBeInTheDocument();
  });

  test('ResetState to be invoked on click on Home Icon', async () => {
    const resetState = jest.fn();

    const { findByTestId } = render(<Topbar resetState={resetState} />);

    const homeIcon = await findByTestId('lottie-icon');

    await userEvent.click(homeIcon);

    expect(resetState).toBeCalled();
  });
});
