/* eslint-disable testing-library/prefer-screen-queries */
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

import Pagination, { Metadata } from './Pagination';

describe('<Pagination />', () => {
  test('Renders Topbar', async () => {
    const mockData: Metadata = {
      startCursor: '123',
      endCursor: '456',
      hasPrevPage: false,
      hasNextPage: true,
    };

    const setGraphqlQueryMockFn = jest.fn();

    const { getAllByRole } = render(<Pagination data={mockData} setGraphqlQuery={setGraphqlQueryMockFn} />);

    const paginationBtns = getAllByRole('button');

    expect(paginationBtns).toHaveLength(2);
  });

  test('Invokes setGraphqlQuery setter if next page available', async () => {
    const mockData: Metadata = {
      startCursor: '123',
      endCursor: '456',
      hasPrevPage: false,
      hasNextPage: true,
    };

    const setGraphqlQueryMockFn = jest.fn();

    const { getAllByRole } = render(<Pagination data={mockData} setGraphqlQuery={setGraphqlQueryMockFn} />);

    const nextBtn = getAllByRole('button');
    userEvent.click(nextBtn[1]);

    expect(setGraphqlQueryMockFn).toHaveBeenCalled();
  });

  test('Does not invoke setGraphqlQuery setter if next page not available', async () => {
    const mockData: Metadata = {
      startCursor: '123',
      endCursor: '456',
      hasPrevPage: false,
      hasNextPage: false,
    };

    const setGraphqlQueryMockFn = jest.fn();

    const { getAllByRole } = render(<Pagination data={mockData} setGraphqlQuery={setGraphqlQueryMockFn} />);

    const nextBtn = getAllByRole('button');
    userEvent.click(nextBtn[1]);

    expect(setGraphqlQueryMockFn).toHaveBeenCalledTimes(0);
  });

  test('Invokes setGraphqlQuery setter if prev page available', async () => {
    const mockData: Metadata = {
      startCursor: '123',
      endCursor: '456',
      hasPrevPage: true,
      hasNextPage: true,
    };

    const setGraphqlQueryMockFn = jest.fn();

    const { getAllByRole } = render(<Pagination data={mockData} setGraphqlQuery={setGraphqlQueryMockFn} />);

    const nextBtn = getAllByRole('button');
    userEvent.click(nextBtn[0]);

    expect(setGraphqlQueryMockFn).toHaveBeenCalled();
  });

  test('Does not invoke setGraphqlQuery setter if prev page not available', async () => {
    const mockData: Metadata = {
      startCursor: '123',
      endCursor: '456',
      hasPrevPage: false,
      hasNextPage: true,
    };

    const setGraphqlQueryMockFn = jest.fn();

    const { getAllByRole } = render(<Pagination data={mockData} setGraphqlQuery={setGraphqlQueryMockFn} />);

    const nextBtn = getAllByRole('button');
    userEvent.click(nextBtn[0]);

    expect(setGraphqlQueryMockFn).toHaveBeenCalledTimes(0);
  });
});
