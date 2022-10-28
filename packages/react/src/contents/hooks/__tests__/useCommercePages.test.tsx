import { cleanup, renderHook } from '@testing-library/react';
import {
  commercePageContentPublicationId,
  commercePageQuery,
  mockCommercePagesErrorState,
  mockCommercePagesInitialState,
  mockCommercePagesLoadingState,
  mockCommercePagesState,
} from 'tests/__fixtures__/contents';
import { fetchCommercePages } from '@farfetch/blackout-redux';
import { withStore } from '../../../../tests/helpers';
import useCommercePages from '../useCommercePages';

const mockDispatch = jest.fn();

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockDispatch,
}));

jest.mock('@farfetch/blackout-redux', () => ({
  ...jest.requireActual('@farfetch/blackout-redux'),
  fetchCommercePages: jest.fn(() => () => Promise.resolve()),
}));

describe('useCommercePages', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(cleanup);

  it('should return values correctly with initial state', () => {
    const { result } = renderHook(() => useCommercePages(commercePageQuery), {
      wrapper: withStore(mockCommercePagesState),
    });

    const {
      isLoading,
      error,
      isFetched,
      data: { entries: dataResult, pagination },
    } = result.current;

    expect(isLoading).toBeFalsy();
    expect(error).toBeNull();
    expect(isFetched).toBeTruthy();
    expect(pagination).toMatchObject({
      pageIndex: 1,
      totalPages: 1,
      totalItems: 1,
    });
    expect(dataResult).toMatchObject([
      mockCommercePagesState.entities.contents[
        commercePageContentPublicationId
      ],
    ]);
  });

  it('should return in loading state', () => {
    const { result } = renderHook(() => useCommercePages(commercePageQuery), {
      wrapper: withStore(mockCommercePagesLoadingState),
    });

    const { isLoading, error, isFetched } = result.current;

    expect(isLoading).toBeTruthy();
    expect(error).toBeNull();
    expect(isFetched).toBeFalsy();
  });

  it('should return in error state', () => {
    const { result } = renderHook(() => useCommercePages(commercePageQuery), {
      wrapper: withStore(mockCommercePagesErrorState),
    });

    const { error, isFetched } = result.current;

    expect(error).toBeTruthy();
    expect(isFetched).toBeTruthy();
  });

  describe('options', () => {
    it('should call `fetch` action if `enableAutoFetch` option is true', async () => {
      renderHook(() => useCommercePages(commercePageQuery), {
        wrapper: withStore(mockCommercePagesInitialState),
      });

      expect(fetchCommercePages).toHaveBeenCalledWith(
        {
          brand: commercePageQuery.brand,
          category: commercePageQuery.category,
          contentTypeCode: commercePageQuery.contentTypeCode,
          gender: commercePageQuery.gender,
          type: commercePageQuery.type,
        },
        undefined,
        undefined,
      );
    });

    it('should not call `fetch` action if `enableAutoFetch` option is false', async () => {
      renderHook(
        () =>
          useCommercePages({ ...commercePageQuery, enableAutoFetch: false }),
        {
          wrapper: withStore(mockCommercePagesInitialState),
        },
      );

      expect(fetchCommercePages).not.toHaveBeenCalled();
    });
  });

  describe('actions', () => {
    it('should call `fetch` action', async () => {
      const {
        result: {
          current: {
            actions: { fetch },
          },
        },
      } = renderHook(() => useCommercePages(commercePageQuery), {
        wrapper: withStore(mockCommercePagesInitialState),
      });

      await fetch();

      expect(fetchCommercePages).toHaveBeenCalledWith(
        {
          brand: commercePageQuery.brand,
          category: commercePageQuery.category,
          contentTypeCode: commercePageQuery.contentTypeCode,
          gender: commercePageQuery.gender,
          type: commercePageQuery.type,
        },
        undefined,
        undefined,
      );
    });
  });
});
