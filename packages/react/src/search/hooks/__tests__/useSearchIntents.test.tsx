import { cleanup, fireEvent } from '@testing-library/react';
import {
  fetchSearchIntents as fetchSearchIntentsAction,
  resetSearchIntents as resetSearchIntentsAction,
} from '@farfetch/blackout-redux/search';
import {
  mockSearchIntentsErrorState,
  mockSearchIntentsInitialState,
  mockSearchIntentsInvalidResponse,
  mockSearchIntentsLoadingState,
  mockSearchIntentsRedirectUrl,
  mockSearchIntentsResponse,
  mockSearchIntentsResponseListing,
  mockSearchIntentsResponseListingWithParameters,
  mockSearchIntentsResponseProduct,
  mockSearchIntentsResponseRedirect,
} from 'tests/__fixtures__/search';
import { Search } from './__fixtures__/Search.fixtures';
import { wrap } from '../../../../tests/helpers';
import React from 'react';

jest.mock('@farfetch/blackout-redux/search', () => ({
  ...jest.requireActual('@farfetch/blackout-redux/search'),
  resetSearchIntents: jest.fn(() => ({ type: 'foo-bar' })),
  fetchSearchIntents: jest.fn(() => ({ type: 'bar-biz' })),
}));

describe('useSearchIntents', () => {
  afterEach(() => cleanup());

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render with the initial state', () => {
    const { container, queryByTestId } = wrap(<Search />)
      .withStore(mockSearchIntentsInitialState)
      .render();

    expect(queryByTestId('searchIntents-loading')).toBeNull();
    expect(queryByTestId('searchIntents-error')).toBeNull();
    expect(container).toMatchSnapshot();
  });

  it('should render in loading state', () => {
    const { container, getByTestId } = wrap(<Search />)
      .withStore(mockSearchIntentsLoadingState)
      .render();

    expect(getByTestId('searchIntents-loading').textContent).toBe('yes');

    expect(container).toMatchSnapshot();
  });

  it('should render in error state', () => {
    const { container, getByTestId } = wrap(<Search />)
      .withStore(mockSearchIntentsErrorState)
      .render();

    expect(getByTestId('searchIntents-error').textContent).toBe(
      mockSearchIntentsErrorState.search.intents.error,
    );

    expect(container).toMatchSnapshot();
  });

  it('should call `reset`', () => {
    const { getByTestId, queryByTestId } = wrap(<Search />)
      .withStore(mockSearchIntentsInitialState)
      .render();

    const resetSearchStateButton = getByTestId('searchIntents-resetButton');

    fireEvent.click(resetSearchStateButton);

    expect(resetSearchIntentsAction).toHaveBeenCalledTimes(1);
    expect(queryByTestId('searchIntents-loading')).toBeNull();
    expect(queryByTestId('searchIntents-error')).toBeNull();
  });

  it('should call `fetchSearchIntents` and have the correct intents', () => {
    const { getByTestId } = wrap(<Search />)
      .withStore({
        search: {
          intents: {
            ...mockSearchIntentsInitialState,
            result: mockSearchIntentsResponse,
          },
        },
      })
      .render();

    const fetchSearchIntentsButton = getByTestId('searchIntents-getButton');

    fireEvent.click(fetchSearchIntentsButton);

    expect(fetchSearchIntentsAction).toHaveBeenCalledTimes(1);
    expect(getByTestId('searchIntents-result').textContent).toBe(
      JSON.stringify(mockSearchIntentsResponse),
    );
  });

  it('should not have a `searchRedirectUrl` if does not have `searchIntents`', () => {
    const { getByTestId } = wrap(<Search />)
      .withStore(mockSearchIntentsInitialState)
      .render();

    expect(getByTestId('searchIntents-redirectUrl').innerText).toBeUndefined();
  });

  it('should not have a `searchRedirectUrl` if does not recognize the `typeRequest`', () => {
    const { getByTestId } = wrap(<Search />)
      .withStore({
        search: {
          intents: {
            ...mockSearchIntentsInitialState,
            result: mockSearchIntentsInvalidResponse,
          },
        },
      })
      .render();

    expect(getByTestId('searchIntents-redirectUrl').innerText).toBeUndefined();
  });

  it('should have a `searchRedirectUrl` if the `typeRequest` is REDIRECT', () => {
    const { getByTestId } = wrap(<Search />)
      .withStore({
        search: {
          intents: {
            ...mockSearchIntentsInitialState,
            result: mockSearchIntentsResponseRedirect,
          },
        },
      })
      .render();

    expect(getByTestId('searchIntents-redirectUrl').textContent).toBe(
      `/${mockSearchIntentsRedirectUrl}`,
    );
  });

  it('should have a `searchRedirectUrl` if the `typeRequest` is PRODUCT', () => {
    const { getByTestId } = wrap(<Search />)
      .withStore({
        search: {
          intents: {
            ...mockSearchIntentsInitialState,
            result: mockSearchIntentsResponseProduct,
          },
        },
      })
      .render();

    expect(getByTestId('searchIntents-redirectUrl').textContent).toBe(
      '/shopping/beautiful-dress',
    );
  });

  it('should have a `searchRedirectUrl` if the `typeRequest` is LISTING', () => {
    const { getByTestId } = wrap(<Search />)
      .withStore({
        search: {
          intents: {
            ...mockSearchIntentsInitialState,
            result: mockSearchIntentsResponseListing,
          },
        },
      })
      .render();

    expect(getByTestId('searchIntents-redirectUrl').textContent).toBe(
      '/shopping?colors=pink&gender=woman&pageindex=1',
    );
  });

  it('should have a `searchRedirectUrl` if the `typeRequest` is LISTING, has slug and query parameters', () => {
    const { getByTestId } = wrap(<Search />)
      .withStore({
        search: {
          intents: {
            ...mockSearchIntentsInitialState,
            result: mockSearchIntentsResponseListingWithParameters,
          },
        },
      })
      .render();

    expect(getByTestId('searchIntents-redirectUrl').textContent).toBe(
      '/shopping/valentino?categories=137520%7C137641&pageindex=1&query=akdksaldkasld',
    );
  });
});
