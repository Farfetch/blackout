import {
  checkoutId,
  mockCheckoutDetailsEntityDenormalized,
  mockCheckoutState,
  mockErrorState,
  mockInitialState,
  mockLoadingState,
} from 'tests/__fixtures__/checkout/index.mjs';
import { cleanup, renderHook } from '@testing-library/react';
import {
  fetchCheckoutOrderDetails,
  resetCheckoutOrderDetailsState,
} from '@farfetch/blackout-redux';
import { withStore } from '../../../../tests/helpers/index.js';
import useCheckoutOrderDetails from '../useCheckoutOrderDetails.js';

jest.mock('@farfetch/blackout-redux', () => ({
  ...jest.requireActual('@farfetch/blackout-redux'),
  fetchCheckoutOrderDetails: jest.fn(() => ({
    type: 'fetch_checkout_order_details',
  })),
  resetCheckoutOrderDetailsState: jest.fn(() => ({
    type: 'reset_checkout_order_details_state',
  })),
}));

const defaultReturn = {
  data: undefined,
  isLoading: false,
  isFetched: false,
  error: null,
  actions: {
    fetch: expect.any(Function),
    reset: expect.any(Function),
  },
};

const fetchConfig = {
  dummy: 'fetch',
};

describe('useCheckoutOrderDetails', () => {
  beforeEach(jest.clearAllMocks);

  afterEach(cleanup);

  it('should return correctly with initial state', () => {
    const {
      result: { current },
    } = renderHook(() => useCheckoutOrderDetails(checkoutId), {
      wrapper: withStore(mockInitialState),
    });

    expect(current).toStrictEqual(defaultReturn);
  });

  it('should return error state', () => {
    const {
      result: { current },
    } = renderHook(() => useCheckoutOrderDetails(checkoutId), {
      wrapper: withStore(mockErrorState),
    });

    expect(current).toStrictEqual({
      ...defaultReturn,
      isFetched: true,
      error: mockErrorState.checkout.checkoutOrderDetails.error,
    });
  });

  it('should return loading state', () => {
    const {
      result: { current },
    } = renderHook(() => useCheckoutOrderDetails(checkoutId), {
      wrapper: withStore(mockLoadingState),
    });

    expect(current).toStrictEqual({
      ...defaultReturn,
      isLoading: true,
    });
  });

  it('should return correctly when data is fetched', () => {
    const {
      result: { current },
    } = renderHook(() => useCheckoutOrderDetails(), {
      wrapper: withStore(mockCheckoutState),
    });

    expect(current).toStrictEqual({
      ...defaultReturn,
      isFetched: true,
      data: mockCheckoutDetailsEntityDenormalized,
    });
  });

  describe('behaviour', () => {
    it('should call reset if the passed checkoutOrderId differs from the checkoutOrderId that is in state', () => {
      const dummyCheckoutOrderId = checkoutId + 10000;

      renderHook(() => useCheckoutOrderDetails(dummyCheckoutOrderId), {
        wrapper: withStore(mockCheckoutState),
      });

      expect(resetCheckoutOrderDetailsState).toHaveBeenCalled();
    });

    it('should not call reset if the passed checkoutOrderId does not differ from the checkoutOrderId that is in state', () => {
      renderHook(() => useCheckoutOrderDetails(checkoutId), {
        wrapper: withStore(mockCheckoutState),
      });

      expect(resetCheckoutOrderDetailsState).not.toHaveBeenCalled();
    });

    it('should not call reset if the checkoutOrderId hook parameter is passed but there is no checkout details data in state', () => {
      renderHook(() => useCheckoutOrderDetails(checkoutId), {
        wrapper: withStore(mockInitialState),
      });

      expect(resetCheckoutOrderDetailsState).not.toHaveBeenCalled();
    });
  });

  describe('options', () => {
    it('should fetch data if `enableAutoFetch` option is true and checkoutOrderId is passed', () => {
      renderHook(() => useCheckoutOrderDetails(checkoutId, { fetchConfig }), {
        wrapper: withStore(mockInitialState),
      });

      expect(fetchCheckoutOrderDetails).toHaveBeenCalledWith(
        checkoutId,
        fetchConfig,
      );

      jest.clearAllMocks();

      renderHook(
        () =>
          useCheckoutOrderDetails(checkoutId, {
            enableAutoFetch: true,
            fetchConfig,
          }),
        {
          wrapper: withStore(mockInitialState),
        },
      );

      expect(fetchCheckoutOrderDetails).toHaveBeenCalledWith(
        checkoutId,
        fetchConfig,
      );
    });

    it('should not fetch data if `enableAutoFetch` option is true and no checkoutOrderId is passed', () => {
      renderHook(() => useCheckoutOrderDetails(undefined), {
        wrapper: withStore(mockInitialState),
      });

      expect(fetchCheckoutOrderDetails).not.toHaveBeenCalled();

      jest.clearAllMocks();

      renderHook(
        () =>
          useCheckoutOrderDetails(undefined, {
            enableAutoFetch: true,
          }),
        {
          wrapper: withStore(mockInitialState),
        },
      );

      expect(fetchCheckoutOrderDetails).not.toHaveBeenCalled();
    });

    it('should not fetch data if `enableAutoFetch` option is true and checkoutOrderId is not passed', () => {
      renderHook(() => useCheckoutOrderDetails(), {
        wrapper: withStore(mockInitialState),
      });

      expect(fetchCheckoutOrderDetails).not.toHaveBeenCalled();

      jest.clearAllMocks();

      renderHook(
        () =>
          useCheckoutOrderDetails(undefined, {
            enableAutoFetch: true,
          }),
        {
          wrapper: withStore(mockInitialState),
        },
      );

      expect(fetchCheckoutOrderDetails).not.toHaveBeenCalled();
    });

    it('should not fetch data if `enableAutoFetch` option is true, checkoutOrderId is passed and it is loading', () => {
      renderHook(() => useCheckoutOrderDetails(checkoutId), {
        wrapper: withStore(mockLoadingState),
      });

      expect(fetchCheckoutOrderDetails).not.toHaveBeenCalled();

      jest.clearAllMocks();

      renderHook(
        () =>
          useCheckoutOrderDetails(checkoutId, {
            enableAutoFetch: true,
          }),
        {
          wrapper: withStore(mockLoadingState),
        },
      );

      expect(fetchCheckoutOrderDetails).not.toHaveBeenCalled();
    });

    it('should not fetch data if `enableAutoFetch` option is true, checkoutOrderId is passed and it is fetched', () => {
      renderHook(() => useCheckoutOrderDetails(checkoutId), {
        wrapper: withStore(mockCheckoutState),
      });

      expect(fetchCheckoutOrderDetails).not.toHaveBeenCalled();

      jest.clearAllMocks();

      renderHook(
        () =>
          useCheckoutOrderDetails(checkoutId, {
            enableAutoFetch: true,
          }),
        {
          wrapper: withStore(mockCheckoutState),
        },
      );

      expect(fetchCheckoutOrderDetails).not.toHaveBeenCalled();
    });

    it('should not fetch data if `enableAutoFetch` option is false', () => {
      renderHook(
        () =>
          useCheckoutOrderDetails(checkoutId, {
            enableAutoFetch: false,
          }),
        {
          wrapper: withStore(mockInitialState),
        },
      );

      expect(fetchCheckoutOrderDetails).not.toHaveBeenCalled();
    });
  });

  describe('actions', () => {
    describe('fetch', () => {
      it('should call `fetchCheckoutOrderDetails` action with the checkoutOrderId passed to the hook', async () => {
        const {
          result: {
            current: {
              actions: { fetch },
            },
          },
        } = renderHook(
          () =>
            useCheckoutOrderDetails(checkoutId, {
              enableAutoFetch: false,
              fetchConfig,
            }),
          {
            wrapper: withStore(mockInitialState),
          },
        );

        const requestConfig = {
          dummy: 'fetch',
        };

        await fetch(requestConfig);

        expect(fetchCheckoutOrderDetails).toHaveBeenCalledWith(
          checkoutId,
          requestConfig,
        );
      });

      it('should throw an error when checkoutOrderId is not passed to the hook', () => {
        const {
          result: {
            current: {
              actions: { fetch },
            },
          },
        } = renderHook(
          () =>
            useCheckoutOrderDetails(undefined, {
              enableAutoFetch: false,
            }),
          {
            wrapper: withStore(mockInitialState),
          },
        );

        return expect(fetch()).rejects.toThrow('Invalid checkout order id.');
      });
    });

    describe('reset', () => {
      it('should call `resetCheckoutOrderDetailsState` action', async () => {
        const {
          result: {
            current: {
              actions: { reset },
            },
          },
        } = renderHook(() => useCheckoutOrderDetails(), {
          wrapper: withStore(mockInitialState),
        });

        await reset();

        expect(resetCheckoutOrderDetailsState).toHaveBeenCalled();
      });
    });
  });
});
