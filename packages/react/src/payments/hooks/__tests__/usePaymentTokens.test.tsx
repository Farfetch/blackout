import { cleanup, renderHook } from '@testing-library/react';
import {
  expectedPaymentTokensNormalizedPayload,
  mockInitialState,
  paymentTokenId,
  paymentTokenId2,
} from 'tests/__fixtures__/payments';
import {
  fetchPaymentTokens,
  removePaymentToken,
  type StoreState,
} from '@farfetch/blackout-redux';
import { withStore } from '../../../../tests/helpers';
import usePaymentTokens from '../usePaymentTokens';
import type { BlackoutError } from '@farfetch/blackout-client';

const paymentTokens =
  expectedPaymentTokensNormalizedPayload.entities.paymentTokens;

const stateMockData: StoreState = {
  payments: {
    ...mockInitialState.payments,
    paymentTokens: {
      ...mockInitialState.payments.paymentTokens,
      result: [paymentTokenId, paymentTokenId2],
    },
  },
  entities: {
    ...expectedPaymentTokensNormalizedPayload.entities,
  },
};

jest.mock('@farfetch/blackout-redux', () => ({
  ...jest.requireActual('@farfetch/blackout-redux'),
  fetchPaymentTokens: jest.fn(() => () => Promise.resolve()),
  removePaymentToken: jest.fn(() => () => Promise.resolve()),
}));

describe('usePaymentTokens', () => {
  beforeEach(jest.clearAllMocks);

  afterEach(cleanup);

  it('should return correctly with initial state', () => {
    const {
      result: { current },
    } = renderHook(() => usePaymentTokens(), {
      wrapper: withStore(stateMockData),
    });

    expect(current).toStrictEqual({
      error: null,
      isLoading: false,
      isFetched: true,
      data: {
        items: [paymentTokens[paymentTokenId], paymentTokens[paymentTokenId2]],
      },
      actions: {
        fetch: expect.any(Function),
        remove: expect.any(Function),
      },
    });
  });

  it('should return error state', () => {
    const mockError = new Error('This is an error message') as BlackoutError;

    const {
      result: {
        current: { error },
      },
    } = renderHook(() => usePaymentTokens(), {
      wrapper: withStore({
        ...stateMockData,
        payments: {
          ...stateMockData.payments!,
          paymentTokens: {
            ...stateMockData.payments!.paymentTokens,
            error: mockError,
          },
        },
      }),
    });

    expect(error).toEqual(mockError);
  });

  it('should return loading state', () => {
    const {
      result: {
        current: { isLoading },
      },
    } = renderHook(() => usePaymentTokens(), {
      wrapper: withStore({
        ...stateMockData,
        payments: {
          ...stateMockData.payments!,
          paymentTokens: {
            ...stateMockData.payments!.paymentTokens,
            isLoading: true,
          },
        },
      }),
    });

    expect(isLoading).toBe(true);
  });

  it('should return correctly if not fetched', () => {
    const {
      result: {
        current: { isLoading, isFetched, error },
      },
    } = renderHook(() => usePaymentTokens(), {
      wrapper: withStore(mockInitialState),
    });

    expect(error).toBeNull();
    expect(isLoading).toBe(false);
    expect(isFetched).toBe(false);
  });

  describe('options', () => {
    it('should call fetch data if `enableAutoFetch` option is true', () => {
      renderHook(() => usePaymentTokens(), {
        wrapper: withStore(mockInitialState),
      });

      expect(fetchPaymentTokens).toHaveBeenCalled();
    });

    it('should not fetch data if `enableAutoFetch` option is false', () => {
      renderHook(() => usePaymentTokens({ enableAutoFetch: false }), {
        wrapper: withStore(mockInitialState),
      });

      expect(fetchPaymentTokens).not.toHaveBeenCalled();
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
      } = renderHook(() => usePaymentTokens({ enableAutoFetch: false }), {
        wrapper: withStore(mockInitialState),
      });

      await fetch();

      expect(fetchPaymentTokens).toHaveBeenCalled();
    });

    it('should call `remove` action', async () => {
      const tokenId = '123';

      const {
        result: {
          current: {
            actions: { remove },
          },
        },
      } = renderHook(() => usePaymentTokens(), {
        wrapper: withStore(stateMockData),
      });

      await remove(tokenId);

      expect(removePaymentToken).toHaveBeenCalledWith(tokenId);
    });
  });
});
