/* eslint-disable testing-library/prefer-screen-queries */
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

import * as utils from '../../utils/callApi';
import Collection from './Collection';

jest.mock('lottie-web', () => ({
  destroy: jest.fn(),
}));

jest.mock('yjs', () => ({
  Doc: jest.fn().mockImplementation(() => {
    return {
      getMap: () => ({ get: jest.fn(), observe: jest.fn(), set: jest.fn() }),
    };
  }),
}));

jest.mock('y-webrtc', () => ({
  WebrtcProvider: jest.fn(),
}));

const unmockedFetch = global.fetch;

beforeAll(() => {
  global.fetch = () =>
    Promise.resolve({
      json: () => Promise.resolve([]),
    }) as any;
});

afterAll(() => {
  global.fetch = unmockedFetch;
});

describe('<Collection />', () => {
  test('Renders Collection', async () => {
    const data = {
      edges: [
        {
          cursor: 'YXJyYXljb25uZWN0aW9uOjA',
          node: {
            gifUrl: 'url',
            jsonUrl: 'url',
            lottieUrl: 'url',
            name: 'Test',
          },
        },
      ],
    };
    const setGraphqlQueryMockFn = jest.fn();

    const { findByTestId } = render(<Collection data={data} setGraphqlQuery={setGraphqlQueryMockFn} />);
    const gif = await findByTestId('Test');
    expect(gif).toBeInTheDocument();
  });

  test('Passes the correct lottie json url on click', async () => {
    const data = {
      edges: [
        {
          cursor: 'YXJyYXljb25uZWN0aW9uOjA',
          node: {
            gifUrl: 'http://gifurl.com',
            jsonUrl: 'http://jsonrurl.com',
            lottieUrl: 'http://lottieurl.com',
            name: 'Test',
          },
        },
      ],
    };
    const setGraphqlQueryMockFn = jest.fn();

    const callApiSpyFn = jest.spyOn(utils, 'callApi');

    const { findByTestId } = render(<Collection data={data} setGraphqlQuery={setGraphqlQueryMockFn} />);
    const gif = await findByTestId('Test');

    await userEvent.click(gif);

    expect(callApiSpyFn).toHaveBeenCalled();
    expect(callApiSpyFn).toHaveBeenCalledWith(`${data.edges[0].node.jsonUrl}`, { method: 'GET' });
  });
});
