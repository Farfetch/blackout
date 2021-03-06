import { cleanup } from '@testing-library/react';
import {
  mockSearchIntentsErrorState,
  mockSearchIntentsInitialState,
  mockSearchIntentsInvalidResponse,
  mockSearchIntentsLoadingState,
  mockSearchIntentsQuery,
  mockSearchIntentsRedirectUrl,
  mockSearchIntentsResponse,
  mockSearchIntentsResponseListing,
  mockSearchIntentsResponseListingWithParameters,
  mockSearchIntentsResponseProduct,
  mockSearchIntentsResponseRedirect,
  mockSearchIntentsState,
} from 'tests/__fixtures__/search';
import { mockStore } from '../../../tests/helpers';
import { Provider } from 'react-redux';
import { renderHook } from '@testing-library/react-hooks';
import { useSearchIntents } from '../../';
import React from 'react';

jest.mock('@farfetch/blackout-core/search/redux', () => {
  const original = jest.requireActual('@farfetch/blackout-core/search/redux');

  return {
    ...original,
    doResetSearchIntents: jest.fn(() => ({ type: 'doResetSearchIntents' })),
    doGetSearchIntents: jest.fn(() => () => ({ type: 'doGetSearchIntents' })),
  };
});

const mockDispatch = jest.fn();

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockDispatch,
}));

const getRenderedHook = (state = mockSearchIntentsInitialState) => {
  const {
    result: { current },
  } = renderHook(() => useSearchIntents(), {
    wrapper: props => <Provider store={mockStore(state)} {...props} />,
  });

  return current;
};

describe('useSearchIntents', () => {
  afterEach(() => cleanup());

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return values correctly with initial state', () => {
    const current = getRenderedHook();

    expect(current).toStrictEqual({
      getSearchIntents: expect.any(Function),
      resetSearchIntents: expect.any(Function),
      isLoading: expect.any(Boolean),
      error: expect.any(Object),
      searchIntents: null,
      searchRedirectUrl: undefined,
    });
  });

  it('should render in loading state', () => {
    const { isLoading } = getRenderedHook(mockSearchIntentsLoadingState);

    expect(isLoading).toBe(
      mockSearchIntentsLoadingState.search.intents.isLoading,
    );
  });

  it('should render in error state', () => {
    const { error } = getRenderedHook(mockSearchIntentsErrorState);

    expect(error).toEqual(mockSearchIntentsErrorState.search.intents.error);
  });

  it('should render the search intents', () => {
    const { searchIntents } = getRenderedHook(mockSearchIntentsState);

    expect(searchIntents).toEqual(mockSearchIntentsResponse);
  });

  describe('actions', () => {
    it('should call `doResetSearchIntents`', () => {
      const { resetSearchIntents } = getRenderedHook();

      resetSearchIntents();

      expect(mockDispatch).toHaveBeenCalledWith({
        type: 'doResetSearchIntents',
      });
    });

    it('should call `doGetSearchIntents`', () => {
      const { getSearchIntents } = getRenderedHook();

      getSearchIntents(mockSearchIntentsQuery);

      expect(mockDispatch).toHaveBeenCalledWith({
        type: 'doGetSearchIntents',
      });
    });
  });

  describe('searchRedirectUrl', () => {
    it('should not have a `searchRedirectUrl` if does not have `searchIntents`', () => {
      const { searchRedirectUrl } = getRenderedHook();

      expect(searchRedirectUrl).toBeUndefined();
    });

    it('should not have a `searchRedirectUrl` if does not recognize the `typeRequest`', () => {
      const { searchRedirectUrl } = getRenderedHook({
        search: {
          intents: {
            ...mockSearchIntentsInitialState,
            result: mockSearchIntentsInvalidResponse,
          },
        },
      });

      expect(searchRedirectUrl).toBeUndefined();
    });

    it('should have a `searchRedirectUrl` if the `typeRequest` is REDIRECT', () => {
      const { searchRedirectUrl } = getRenderedHook({
        search: {
          intents: {
            ...mockSearchIntentsInitialState,
            result: mockSearchIntentsResponseRedirect,
          },
        },
      });

      expect(searchRedirectUrl).toBe(`/${mockSearchIntentsRedirectUrl}`);
    });

    it('should have a `searchRedirectUrl` if the `typeRequest` is PRODUCT', () => {
      const { searchRedirectUrl } = getRenderedHook({
        search: {
          intents: {
            ...mockSearchIntentsInitialState,
            result: mockSearchIntentsResponseProduct,
          },
        },
      });

      expect(searchRedirectUrl).toBe('/shopping/beautiful-dress');
    });

    it('should have a `searchRedirectUrl` if the `typeRequest` is LISTING', () => {
      const { searchRedirectUrl } = getRenderedHook({
        search: {
          intents: {
            ...mockSearchIntentsInitialState,
            result: mockSearchIntentsResponseListing,
          },
        },
      });

      expect(searchRedirectUrl).toBe(
        '/shopping?colors=pink&gender=woman&pageindex=1',
      );
    });

    it('should have a `searchRedirectUrl` if the `typeRequest` is LISTING, has slug and query parameters', () => {
      const { searchRedirectUrl } = getRenderedHook({
        search: {
          intents: {
            ...mockSearchIntentsInitialState,
            result: mockSearchIntentsResponseListingWithParameters,
          },
        },
      });

      expect(searchRedirectUrl).toBe(
        '/shopping/valentino?categories=137520%7C137641&pageindex=1&query=akdksaldkasld',
      );
    });
  });
});
