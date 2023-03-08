import { cleanup, renderHook } from '@testing-library/react';
import {
  createPaymentIntentInstrument,
  fetchPaymentIntentInstruments,
  removePaymentIntentInstrument,
  resetPaymentIntentInstrumentsState,
  updatePaymentIntentInstrument,
} from '@farfetch/blackout-redux';
import {
  instrumentId,
  intentId,
  mockInitialState,
  mockInstrumentData,
  mockPaymentInstrumentsErrorState,
  mockPaymentInstrumentsLoadingState,
  mockPaymentInstrumentsWithDataState,
} from 'tests/__fixtures__/payments/index.mjs';
import { PaymentMethod } from '@farfetch/blackout-client';
import { withStore } from '../../../../tests/helpers/index.js';
import usePaymentIntentInstruments from '../usePaymentIntentInstruments.js';

jest.mock('@farfetch/blackout-redux', () => ({
  ...jest.requireActual('@farfetch/blackout-redux'),
  fetchPaymentIntentInstruments: jest.fn(() => () => Promise.resolve()),
  createPaymentIntentInstrument: jest.fn(() => () => Promise.resolve()),
  removePaymentIntentInstrument: jest.fn(() => () => Promise.resolve()),
  resetPaymentIntentInstrumentsState: jest.fn(() => () => Promise.resolve()),
  updatePaymentIntentInstrument: jest.fn(() => () => Promise.resolve()),
}));

const defaultReturn = {
  data: undefined,
  isLoading: false,
  isFetched: false,
  error: null,
  actions: {
    fetch: expect.any(Function),
    create: expect.any(Function),
    update: expect.any(Function),
    remove: expect.any(Function),
    reset: expect.any(Function),
  },
};

describe('usePaymentIntentInstruments', () => {
  beforeEach(jest.clearAllMocks);

  afterEach(cleanup);

  it('should return correctly with initial state', () => {
    const {
      result: { current },
    } = renderHook(() => usePaymentIntentInstruments(intentId), {
      wrapper: withStore(mockInitialState),
    });

    expect(current).toStrictEqual(defaultReturn);
  });

  it('should return error state', () => {
    const {
      result: { current },
    } = renderHook(() => usePaymentIntentInstruments(intentId), {
      wrapper: withStore(mockPaymentInstrumentsErrorState),
    });

    expect(current).toStrictEqual({
      ...defaultReturn,
      isFetched: true,
      error:
        mockPaymentInstrumentsErrorState.payments.paymentIntentInstruments
          .error,
    });
  });

  it('should return loading state', () => {
    const {
      result: { current },
    } = renderHook(() => usePaymentIntentInstruments(intentId), {
      wrapper: withStore(mockPaymentInstrumentsLoadingState),
    });

    expect(current).toStrictEqual({
      ...defaultReturn,
      isLoading: true,
    });
  });

  it('should return correctly when data is fetched', () => {
    const {
      result: { current },
    } = renderHook(() => usePaymentIntentInstruments(intentId), {
      wrapper: withStore(mockPaymentInstrumentsWithDataState),
    });

    expect(current).toStrictEqual({
      ...defaultReturn,
      isFetched: true,
      data: [mockInstrumentData],
    });
  });

  describe('options', () => {
    it('should fetch data if `enableAutoFetch` option is true and intentId is passed', () => {
      renderHook(() => usePaymentIntentInstruments(intentId), {
        wrapper: withStore(mockInitialState),
      });

      expect(fetchPaymentIntentInstruments).toHaveBeenCalledWith(
        intentId,
        undefined,
      );

      jest.clearAllMocks();

      renderHook(
        () => usePaymentIntentInstruments(intentId, { enableAutoFetch: true }),
        {
          wrapper: withStore(mockInitialState),
        },
      );

      expect(fetchPaymentIntentInstruments).toHaveBeenCalledWith(
        intentId,
        undefined,
      );
    });

    it('should not fetch data if `enableAutoFetch` option is true and no intentId is passed', () => {
      renderHook(() => usePaymentIntentInstruments(), {
        wrapper: withStore(mockInitialState),
      });

      expect(fetchPaymentIntentInstruments).not.toHaveBeenCalled();

      jest.clearAllMocks();

      renderHook(
        () => usePaymentIntentInstruments(undefined, { enableAutoFetch: true }),
        {
          wrapper: withStore(mockInitialState),
        },
      );

      expect(fetchPaymentIntentInstruments).not.toHaveBeenCalled();
    });

    it('should not fetch data if `enableAutoFetch` option is true, intentId is passed and it is loading', () => {
      renderHook(() => usePaymentIntentInstruments(), {
        wrapper: withStore(mockPaymentInstrumentsLoadingState),
      });

      expect(fetchPaymentIntentInstruments).not.toHaveBeenCalled();

      jest.clearAllMocks();

      renderHook(
        () => usePaymentIntentInstruments(undefined, { enableAutoFetch: true }),
        {
          wrapper: withStore(mockPaymentInstrumentsLoadingState),
        },
      );

      expect(fetchPaymentIntentInstruments).not.toHaveBeenCalled();
    });

    it('should not fetch data if `enableAutoFetch` option is true, intentId is passed and it is fetched', () => {
      renderHook(() => usePaymentIntentInstruments(), {
        wrapper: withStore(mockPaymentInstrumentsWithDataState),
      });

      expect(fetchPaymentIntentInstruments).not.toHaveBeenCalled();

      jest.clearAllMocks();

      renderHook(
        () => usePaymentIntentInstruments(undefined, { enableAutoFetch: true }),
        {
          wrapper: withStore(mockPaymentInstrumentsWithDataState),
        },
      );

      expect(fetchPaymentIntentInstruments).not.toHaveBeenCalled();
    });

    it('should not fetch data if `enableAutoFetch` option is false', () => {
      renderHook(
        () => usePaymentIntentInstruments(intentId, { enableAutoFetch: false }),
        {
          wrapper: withStore(mockInitialState),
        },
      );

      expect(fetchPaymentIntentInstruments).not.toHaveBeenCalled();
    });
  });

  describe('actions', () => {
    describe('fetch', () => {
      it('should call `fetchPaymentIntentInstruments` action when intentId is passed to the hook', async () => {
        const {
          result: {
            current: {
              actions: { fetch },
            },
          },
        } = renderHook(
          () =>
            usePaymentIntentInstruments(intentId, { enableAutoFetch: false }),
          {
            wrapper: withStore(mockInitialState),
          },
        );

        const requestConfig = {
          dummy: 'fetch',
        };

        await fetch(requestConfig);

        expect(fetchPaymentIntentInstruments).toHaveBeenCalledWith(
          intentId,
          requestConfig,
        );
      });

      it('should throw an error when intentId is not passed to the hook', () => {
        const {
          result: {
            current: {
              actions: { fetch },
            },
          },
        } = renderHook(
          () =>
            usePaymentIntentInstruments(undefined, { enableAutoFetch: false }),
          {
            wrapper: withStore(mockInitialState),
          },
        );

        return expect(fetch()).rejects.toThrow('Missing payment intent id.');
      });
    });

    describe('create', () => {
      const createInstrumentData = {
        amounts: [{ value: 1 }],
        method: PaymentMethod.CreditCard,
      };

      it('should call `createPaymentIntentInstrument` action when intentId is passed to the hook', async () => {
        const {
          result: {
            current: {
              actions: { create },
            },
          },
        } = renderHook(
          () =>
            usePaymentIntentInstruments(intentId, { enableAutoFetch: false }),
          {
            wrapper: withStore(mockInitialState),
          },
        );

        const requestConfig = {
          dummy: 'create',
        };

        await create(createInstrumentData, requestConfig);

        expect(createPaymentIntentInstrument).toHaveBeenCalledWith(
          intentId,
          createInstrumentData,
          requestConfig,
        );
      });

      it('should throw an error when intentId is not passed to the hook', () => {
        const {
          result: {
            current: {
              actions: { create },
            },
          },
        } = renderHook(
          () =>
            usePaymentIntentInstruments(undefined, { enableAutoFetch: false }),
          {
            wrapper: withStore(mockInitialState),
          },
        );

        return expect(create(createInstrumentData)).rejects.toThrow(
          'Missing payment intent id.',
        );
      });
    });

    describe('remove', () => {
      it('should call `removePaymentIntentInstrument` action when intentId is passed to the hook and instrumentId is passed to the function', async () => {
        const {
          result: {
            current: {
              actions: { remove },
            },
          },
        } = renderHook(() => usePaymentIntentInstruments(intentId), {
          wrapper: withStore(mockInitialState),
        });

        const requestConfig = {
          dummy: 'remove',
        };

        await remove(instrumentId, requestConfig);

        expect(removePaymentIntentInstrument).toHaveBeenCalledWith(
          intentId,
          instrumentId,
          requestConfig,
        );
      });

      it('should throw an error when intentId is not passed to the hook', () => {
        const {
          result: {
            current: {
              actions: { remove },
            },
          },
        } = renderHook(() => usePaymentIntentInstruments(), {
          wrapper: withStore(mockInitialState),
        });

        return expect(remove(instrumentId)).rejects.toThrow(
          'Missing payment intent id.',
        );
      });

      it('should throw an error when intentId is passed to the hook but no instrumentId is passed to the function', () => {
        const {
          result: {
            current: {
              actions: { remove },
            },
          },
        } = renderHook(() => usePaymentIntentInstruments(intentId), {
          wrapper: withStore(mockInitialState),
        });

        // @ts-expect-error Force instrumentId parameter as undefined for test
        return expect(remove()).rejects.toThrow(
          'Invalid `paymentInstrumentId` parameter was provided for `removeInstrument`',
        );
      });
    });

    describe('update', () => {
      const updatePaymentIntentInstrumentData = { amounts: [{ value: 2 }] };

      it('should call `updatePaymentIntentInstrument` action when intentId is passed to the hook and instrumentId is passed to the function', async () => {
        const {
          result: {
            current: {
              actions: { update },
            },
          },
        } = renderHook(() => usePaymentIntentInstruments(intentId), {
          wrapper: withStore(mockInitialState),
        });

        const requestConfig = {
          dummy: 'update',
        };

        await update(
          instrumentId,
          updatePaymentIntentInstrumentData,
          requestConfig,
        );

        expect(updatePaymentIntentInstrument).toHaveBeenCalledWith(
          intentId,
          instrumentId,
          updatePaymentIntentInstrumentData,
          requestConfig,
        );
      });

      it('should throw an error when intentId is not passed to the hook', () => {
        const {
          result: {
            current: {
              actions: { update },
            },
          },
        } = renderHook(() => usePaymentIntentInstruments(), {
          wrapper: withStore(mockInitialState),
        });

        return expect(
          update(instrumentId, updatePaymentIntentInstrumentData),
        ).rejects.toThrow('Missing payment intent id.');
      });

      it('should throw an error when intentId is passed to the hook but no instrumentId is passed to the function', () => {
        const {
          result: {
            current: {
              actions: { update },
            },
          },
        } = renderHook(() => usePaymentIntentInstruments(intentId), {
          wrapper: withStore(mockInitialState),
        });

        // @ts-expect-error Force instrumentId parameter as undefined for test
        return expect(update()).rejects.toThrow(
          'Invalid `paymentInstrumentId` parameter was provided for `updateInstrument`',
        );
      });
    });

    describe('reset', () => {
      it('should call `resetPaymentIntentInstrumentsState` action', async () => {
        const {
          result: {
            current: {
              actions: { reset },
            },
          },
        } = renderHook(() => usePaymentIntentInstruments(intentId), {
          wrapper: withStore(mockInitialState),
        });

        await reset();

        expect(resetPaymentIntentInstrumentsState).toHaveBeenCalled();
      });
    });
  });
});
