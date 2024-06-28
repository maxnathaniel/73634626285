/* eslint-disable testing-library/prefer-screen-queries */
import { render } from '@testing-library/react';

import App from './App';
import * as utils from './utils/callApi';
import { lottieFilesGraphqlEndpoint } from './config/urls';

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

describe('<App />', () => {
  test('renders File drop element', async () => {
    const { findByTestId } = render(<App />);
    const filedropEl = await findByTestId('filedrop');
    expect(filedropEl).toBeInTheDocument();
  });

  test('calls API on initial load', async () => {
    const callApiSpyFn = jest.spyOn(utils, 'callApi');
    const grapqlQuery = `
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
    }`;

    const payload = {
      query: `${grapqlQuery}`,
    };
    const { findByTestId } = render(<App />);
    const filedropEl = await findByTestId('filedrop');
    expect(filedropEl).toBeInTheDocument();

    expect(callApiSpyFn).toHaveBeenCalled();
    expect(callApiSpyFn).toHaveBeenCalledWith(lottieFilesGraphqlEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  });
});
