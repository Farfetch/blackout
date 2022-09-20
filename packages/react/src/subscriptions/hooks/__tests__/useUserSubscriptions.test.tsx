import { cleanup, renderHook } from '@testing-library/react';
import {
  fetchUserSubscriptions,
  resetUserSubscriptions,
  unsubscribeSubscription,
  unsubscribeSubscriptionTopicRecipient,
  updateUserSubscriptions,
} from '@farfetch/blackout-redux';
import {
  mockDeleteSubscription,
  mockGetSubscriptions,
  mockInitialState,
  mockPutSubscriptions,
  mockRecipientId1TopicId1,
  mockState,
  mockSubscriptionId,
  mockTopicId1,
} from 'tests/__fixtures__/subscriptions';
import { withStore } from '../../../../tests/helpers';
import useUserSubscriptions from '../useUserSubscriptions';

jest.mock('@farfetch/blackout-redux', () => ({
  ...jest.requireActual('@farfetch/blackout-redux'),
  fetchUserSubscriptions: jest.fn(() => () => Promise.resolve()),
  resetUserSubscriptions: jest.fn(() => () => Promise.resolve()),
  updateUserSubscriptions: jest.fn(() => () => Promise.resolve()),
  unsubscribeSubscription: jest.fn(() => () => Promise.resolve()),
  unsubscribeSubscriptionTopicRecipient: jest.fn(() => () => Promise.resolve()),
}));

describe('useUserSubscriptions', () => {
  beforeEach(jest.clearAllMocks);
  afterEach(cleanup);

  it('should return values correctly with initial state', () => {
    const {
      result: { current },
    } = renderHook(() => useUserSubscriptions(mockGetSubscriptions.query), {
      wrapper: withStore(mockState),
    });

    expect(current).toStrictEqual({
      error: null,
      isLoading: false,
      isFetched: true,
      data: mockState.subscriptions.user.result,
      actions: {
        fetch: expect.any(Function),
        reset: expect.any(Function),
        update: expect.any(Function),
        unsubscribe: expect.any(Function),
        unsubscribeTopicRecipient: expect.any(Function),
      },
    });
  });

  it('should return loading state', () => {
    const {
      result: {
        current: { isLoading },
      },
    } = renderHook(() => useUserSubscriptions(mockGetSubscriptions.query), {
      wrapper: withStore({
        ...mockState,
        subscriptions: {
          ...mockState.subscriptions,
          user: { ...mockState.subscriptions.user, isLoading: true },
        },
      }),
    });

    expect(isLoading).toBe(true);
  });

  it('should return in error state', () => {
    const errorData = {
      message: 'An awesome, fascinating and incredible error',
      name: 'error',
      code: 400,
    };
    const {
      result: {
        current: { error },
      },
    } = renderHook(() => useUserSubscriptions(mockGetSubscriptions.query), {
      wrapper: withStore({
        ...mockState,
        subscriptions: {
          ...mockState.subscriptions,
          user: { ...mockState.subscriptions.user, error: errorData },
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
    } = renderHook(() => useUserSubscriptions(mockGetSubscriptions.query), {
      wrapper: withStore(mockInitialState),
    });

    expect(isLoading).toBe(false);
    expect(isFetched).toBe(false);
  });

  describe('options', () => {
    it('should call `fetch` action if `enableAutoFetch` option is true', async () => {
      renderHook(() => useUserSubscriptions(mockGetSubscriptions.query), {
        wrapper: withStore(mockInitialState),
      });

      expect(fetchUserSubscriptions).toHaveBeenCalledWith(
        mockGetSubscriptions.query,
        undefined,
      );
    });

    it('should not call `fetch` action if `enableAutoFetch` option is false', async () => {
      renderHook(
        () =>
          useUserSubscriptions(mockGetSubscriptions.query, {
            enableAutoFetch: false,
          }),
        {
          wrapper: withStore(mockInitialState),
        },
      );

      expect(fetchUserSubscriptions).not.toHaveBeenCalled();
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
          useUserSubscriptions(mockGetSubscriptions.query, {
            enableAutoFetch: false,
          }),
        {
          wrapper: withStore(mockInitialState),
        },
      );

      await fetch(mockGetSubscriptions.query);

      expect(fetchUserSubscriptions).toHaveBeenCalledWith(
        mockGetSubscriptions.query,
      );
    });

    it('should call `reset` action', () => {
      const {
        result: {
          current: {
            actions: { reset },
          },
        },
      } = renderHook(() => useUserSubscriptions(mockGetSubscriptions.query), {
        wrapper: withStore(mockInitialState),
      });

      reset();

      expect(resetUserSubscriptions).toHaveBeenCalled();
    });

    it('should call `update` action', async () => {
      const {
        result: {
          current: {
            actions: { update },
          },
        },
      } = renderHook(() => useUserSubscriptions(mockGetSubscriptions.query), {
        wrapper: withStore(mockInitialState),
      });

      await update(mockPutSubscriptions.data);

      expect(updateUserSubscriptions).toHaveBeenCalledWith(
        mockPutSubscriptions.data,
      );
    });

    it('should call `unsubscribe` action', async () => {
      const {
        result: {
          current: {
            actions: { unsubscribe },
          },
        },
      } = renderHook(() => useUserSubscriptions(mockGetSubscriptions.query), {
        wrapper: withStore(mockInitialState),
      });

      await unsubscribe(mockDeleteSubscription.query);

      expect(unsubscribeSubscription).toHaveBeenCalledWith(
        mockDeleteSubscription.query,
      );
    });

    it('should call `unsubscribeTopicRecipient` action', async () => {
      const {
        result: {
          current: {
            actions: { unsubscribeTopicRecipient },
          },
        },
      } = renderHook(() => useUserSubscriptions(mockGetSubscriptions.query), {
        wrapper: withStore(mockInitialState),
      });

      await unsubscribeTopicRecipient(
        mockSubscriptionId,
        mockTopicId1,
        mockRecipientId1TopicId1,
      );

      expect(unsubscribeSubscriptionTopicRecipient).toHaveBeenCalledWith(
        mockSubscriptionId,
        mockTopicId1,
        mockRecipientId1TopicId1,
      );
    });
  });
});
