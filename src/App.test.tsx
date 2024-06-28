/* eslint-disable testing-library/prefer-screen-queries */
import { render } from '@testing-library/react';
import App from './App';

jest.mock('lottie-web', () => ({
  destroy: jest.fn(),
}));

jest.mock('yjs', () => ({
  Doc: jest.fn().mockImplementation(() => {
    return {
      getMap: () => ({ get: jest.fn(), observe: jest.fn() }),
    };
  }),
}));

jest.mock('y-webrtc', () => ({
  WebrtcProvider: jest.fn(),
}));

test('renders File drop element', async () => {
  const { findByTestId } = render(<App />);
  const filedropEl = await findByTestId('filedrop');
  expect(filedropEl).toBeInTheDocument();
});
