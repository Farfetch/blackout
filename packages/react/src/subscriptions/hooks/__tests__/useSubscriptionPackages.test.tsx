import { cleanup, renderHook } from '@testing-library/react';
import {
  fetchSubscriptionPackages,
  resetSubscriptionPackages,
} from '@farfetch/blackout-redux';
import {
  mockInitialState,
  mockState,
  mockSubscriptionPackageHash,
  mockSubscriptionPackageId,
} from 'tests/__fixtures__/subscriptions';
import { withStore } from '../../../../tests/helpers';
import useSubscriptionPackages from '../useSubscriptionPackages';

jest.mock('@farfetch/blackout-redux', () => ({
  ...jest.requireActual('@farfetch/blackout-redux'),
  fetchSubscriptionPackages: jest.fn(() => () => Promise.resolve()),
  resetSubscriptionPackages: jest.fn(() => () => Promise.resolve()),
}));

describe('useSubscriptionPackages', () => {
  beforeEach(jest.clearAllMocks);
  afterEach(cleanup);

  it('should return values correctly with initial state', () => {
    const {
      result: { current },
    } = renderHook(() => useSubscriptionPackages([mockSubscriptionPackageId]), {
      wrapper: withStore(mockState),
    });

    expect(current).toStrictEqual({
      error: null,
      isLoading: false,
      isFetched: true,
      data: [
        mockState.entities.subscriptionPackages[mockSubscriptionPackageId],
      ],
      actions: {
        fetch: expect.any(Function),
        reset: expect.any(Function),
      },
    });
  });

  it('should return loading state', () => {
    const {
      result: {
        current: { isLoading },
      },
    } = renderHook(() => useSubscriptionPackages([mockSubscriptionPackageId]), {
      wrapper: withStore({
        ...mockState,
        subscriptions: {
          ...mockState.subscriptions,
          packages: {
            [mockSubscriptionPackageHash]: {
              ...mockState.subscriptions.packages[mockSubscriptionPackageHash],
              isLoading: true,
            },
          },
        },
      }),
    });

    expect(isLoading).toBe(true);
  });

  it('should return error state', () => {
    const errorData = {
      message: 'An awesome, fascinating and incredible error',
      name: 'error',
      code: 400,
    };
    const {
      result: {
        current: { error },
      },
    } = renderHook(() => useSubscriptionPackages([mockSubscriptionPackageId]), {
      wrapper: withStore({
        ...mockState,
        subscriptions: {
          ...mockState.subscriptions,
          packages: {
            [mockSubscriptionPackageHash]: {
              ...mockState.subscriptions.packages[mockSubscriptionPackageHash],
              error: errorData,
            },
          },
        },
      }),
    });

    expect(error).toMatchObject(errorData);
  });

  it("should not return in loading state while it doesn't begin fetching", () => {
    const {
      result: {
        current: { isLoading, isFetched },
      },
    } = renderHook(() => useSubscriptionPackages([mockSubscriptionPackageId]), {
      wrapper: withStore(mockInitialState),
    });

    expect(isLoading).toBe(undefined);
    expect(isFetched).toBe(false);
  });

  describe('options', () => {
    it('should call `fetch` action if `enableAutoFetch` option is true', async () => {
      renderHook(() => useSubscriptionPackages([mockSubscriptionPackageId]), {
        wrapper: withStore(mockInitialState),
      });

      expect(fetchSubscriptionPackages).toHaveBeenCalledWith(
        { id: [mockSubscriptionPackageId] },
        undefined,
      );
    });

    it('should not call `fetch` action if `enableAutoFetch` option is false', async () => {
      renderHook(
        () =>
          useSubscriptionPackages([mockSubscriptionPackageId], {
            enableAutoFetch: false,
          }),
        {
          wrapper: withStore(mockInitialState),
        },
      );

      expect(fetchSubscriptionPackages).not.toHaveBeenCalled();
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
      } = renderHook(
        () =>
          useSubscriptionPackages([mockSubscriptionPackageId], {
            enableAutoFetch: false,
          }),
        {
          wrapper: withStore(mockInitialState),
        },
      );

      await fetch({ id: [mockSubscriptionPackageId] });

      expect(fetchSubscriptionPackages).toHaveBeenCalledWith({
        id: [mockSubscriptionPackageId],
      });
    });

    it('should call `reset` action', () => {
      const {
        result: {
          current: {
            actions: { reset },
          },
        },
      } = renderHook(
        () => useSubscriptionPackages([mockSubscriptionPackageId]),
        {
          wrapper: withStore(mockInitialState),
        },
      );

      reset();

      expect(resetSubscriptionPackages).toHaveBeenCalled();
    });
  });
});
