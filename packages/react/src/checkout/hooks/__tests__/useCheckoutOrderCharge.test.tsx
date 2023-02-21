import {
  chargeId,
  checkoutId,
  mockCheckoutState,
  mockErrorState,
  mockInitialState,
  mockLoadingState,
} from 'tests/__fixtures__/checkout';
import { cleanup, renderHook } from '@testing-library/react';
import {
  createCheckoutOrderCharge,
  fetchCheckoutOrderCharge,
  resetCheckoutOrderChargeState,
} from '@farfetch/blackout-redux';
import { withStore } from '../../../../tests/helpers';
import useCheckoutOrderCharge from '../useCheckoutOrderCharge';

jest.mock('@farfetch/blackout-redux', () => ({
  ...jest.requireActual('@farfetch/blackout-redux'),
  createCheckoutOrderCharge: jest.fn(() => ({
    type: 'create_checkout_order_charge',
  })),
  fetchCheckoutOrderCharge: jest.fn(() => ({
    type: 'fetch_checkout_order_charge',
  })),
  resetCheckoutOrderChargeState: jest.fn(() => ({
    type: 'reset_checkout_order_charge_state',
  })),
}));

const defaultReturn = {
  data: null,
  isLoading: false,
  isFetched: false,
  error: null,
  actions: {
    fetch: expect.any(Function),
    create: expect.any(Function),
    reset: expect.any(Function),
  },
};

const fetchConfig = {
  dummy: 'fetch',
};

describe('useCheckoutOrderCharge', () => {
  beforeEach(jest.clearAllMocks);

  afterEach(cleanup);

  it('should return correctly with initial state', () => {
    const {
      result: { current },
    } = renderHook(() => useCheckoutOrderCharge(checkoutId, chargeId), {
      wrapper: withStore(mockInitialState),
    });

    expect(current).toStrictEqual(defaultReturn);
  });

  it('should return error state', () => {
    const {
      result: { current },
    } = renderHook(() => useCheckoutOrderCharge(checkoutId, chargeId), {
      wrapper: withStore(mockErrorState),
    });

    expect(current).toStrictEqual({
      ...defaultReturn,
      isFetched: true,
      error: mockErrorState.checkout.checkoutOrderCharge.error,
    });
  });

  it('should return loading state', () => {
    const {
      result: { current },
    } = renderHook(() => useCheckoutOrderCharge(checkoutId, chargeId), {
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
    } = renderHook(() => useCheckoutOrderCharge(), {
      wrapper: withStore(mockCheckoutState),
    });

    expect(current).toStrictEqual({
      ...defaultReturn,
      isFetched: true,
      data: mockCheckoutState.checkout.checkoutOrderCharge.result,
    });
  });

  describe('behaviour', () => {
    it('should call reset if the passed chargeId differs from the chargeId that is in state', () => {
      const dummyChargeId = 'dummy';

      renderHook(() => useCheckoutOrderCharge(checkoutId, dummyChargeId), {
        wrapper: withStore(mockCheckoutState),
      });

      expect(resetCheckoutOrderChargeState).toHaveBeenCalled();
    });

    it('should not call reset if the passed chargeId does not differ from the chargeId that is in state', () => {
      renderHook(() => useCheckoutOrderCharge(checkoutId, chargeId), {
        wrapper: withStore(mockCheckoutState),
      });

      expect(resetCheckoutOrderChargeState).not.toHaveBeenCalled();
    });

    it('should not call reset if the chargeId hook parameter is passed but there is no charge in state', () => {
      renderHook(() => useCheckoutOrderCharge(checkoutId, chargeId), {
        wrapper: withStore(mockInitialState),
      });

      expect(resetCheckoutOrderChargeState).not.toHaveBeenCalled();
    });
  });

  describe('options', () => {
    it('should fetch data if `enableAutoFetch` option is true and both checkoutOrderId and chargeId are passed', () => {
      renderHook(
        () => useCheckoutOrderCharge(checkoutId, chargeId, { fetchConfig }),
        {
          wrapper: withStore(mockInitialState),
        },
      );

      expect(fetchCheckoutOrderCharge).toHaveBeenCalledWith(
        checkoutId,
        chargeId,
        fetchConfig,
      );

      jest.clearAllMocks();

      renderHook(
        () =>
          useCheckoutOrderCharge(checkoutId, chargeId, {
            enableAutoFetch: true,
            fetchConfig,
          }),
        {
          wrapper: withStore(mockInitialState),
        },
      );

      expect(fetchCheckoutOrderCharge).toHaveBeenCalledWith(
        checkoutId,
        chargeId,
        fetchConfig,
      );
    });

    it('should not fetch data if `enableAutoFetch` option is true and no checkoutOrderId is passed', () => {
      renderHook(() => useCheckoutOrderCharge(undefined, chargeId), {
        wrapper: withStore(mockInitialState),
      });

      expect(fetchCheckoutOrderCharge).not.toHaveBeenCalled();

      jest.clearAllMocks();

      renderHook(
        () =>
          useCheckoutOrderCharge(undefined, chargeId, {
            enableAutoFetch: true,
          }),
        {
          wrapper: withStore(mockInitialState),
        },
      );

      expect(fetchCheckoutOrderCharge).not.toHaveBeenCalled();
    });

    it('should not fetch data if `enableAutoFetch` option is true and no chargeId is passed', () => {
      renderHook(() => useCheckoutOrderCharge(checkoutId, undefined), {
        wrapper: withStore(mockInitialState),
      });

      expect(fetchCheckoutOrderCharge).not.toHaveBeenCalled();

      jest.clearAllMocks();

      renderHook(
        () =>
          useCheckoutOrderCharge(checkoutId, undefined, {
            enableAutoFetch: true,
          }),
        {
          wrapper: withStore(mockInitialState),
        },
      );

      expect(fetchCheckoutOrderCharge).not.toHaveBeenCalled();
    });

    it('should not fetch data if `enableAutoFetch` option is true and both checkoutOrderId and chargeId are not passed', () => {
      renderHook(() => useCheckoutOrderCharge(), {
        wrapper: withStore(mockInitialState),
      });

      expect(fetchCheckoutOrderCharge).not.toHaveBeenCalled();

      jest.clearAllMocks();

      renderHook(
        () =>
          useCheckoutOrderCharge(undefined, undefined, {
            enableAutoFetch: true,
          }),
        {
          wrapper: withStore(mockInitialState),
        },
      );

      expect(fetchCheckoutOrderCharge).not.toHaveBeenCalled();
    });

    it('should not fetch data if `enableAutoFetch` option is true, both checkoutOrderId and chargeId are passed and it is loading', () => {
      renderHook(() => useCheckoutOrderCharge(checkoutId, chargeId), {
        wrapper: withStore(mockLoadingState),
      });

      expect(fetchCheckoutOrderCharge).not.toHaveBeenCalled();

      jest.clearAllMocks();

      renderHook(
        () =>
          useCheckoutOrderCharge(checkoutId, chargeId, {
            enableAutoFetch: true,
          }),
        {
          wrapper: withStore(mockLoadingState),
        },
      );

      expect(fetchCheckoutOrderCharge).not.toHaveBeenCalled();
    });

    it('should not fetch data if `enableAutoFetch` option is true, both checkoutOrderId and chargeId are passed and it is fetched', () => {
      renderHook(() => useCheckoutOrderCharge(checkoutId, chargeId), {
        wrapper: withStore(mockCheckoutState),
      });

      expect(fetchCheckoutOrderCharge).not.toHaveBeenCalled();

      jest.clearAllMocks();

      renderHook(
        () =>
          useCheckoutOrderCharge(checkoutId, chargeId, {
            enableAutoFetch: true,
          }),
        {
          wrapper: withStore(mockCheckoutState),
        },
      );

      expect(fetchCheckoutOrderCharge).not.toHaveBeenCalled();
    });

    it('should not fetch data if `enableAutoFetch` option is false', () => {
      renderHook(
        () =>
          useCheckoutOrderCharge(checkoutId, chargeId, {
            enableAutoFetch: false,
          }),
        {
          wrapper: withStore(mockInitialState),
        },
      );

      expect(fetchCheckoutOrderCharge).not.toHaveBeenCalled();
    });
  });

  describe('actions', () => {
    describe('fetch', () => {
      it('should call `fetchCheckoutOrderCharge` action with the checkoutOrderId and chargeId passed to the hook', async () => {
        const {
          result: {
            current: {
              actions: { fetch },
            },
          },
        } = renderHook(
          () =>
            useCheckoutOrderCharge(checkoutId, chargeId, {
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

        expect(fetchCheckoutOrderCharge).toHaveBeenCalledWith(
          checkoutId,
          chargeId,
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
            useCheckoutOrderCharge(undefined, chargeId, {
              enableAutoFetch: false,
            }),
          {
            wrapper: withStore(mockInitialState),
          },
        );

        return expect(fetch()).rejects.toThrow('Missing checkout order id.');
      });

      it('should throw an error when chargeId is not passed to the hook', () => {
        const {
          result: {
            current: {
              actions: { fetch },
            },
          },
        } = renderHook(
          () =>
            useCheckoutOrderCharge(checkoutId, undefined, {
              enableAutoFetch: false,
            }),
          {
            wrapper: withStore(mockInitialState),
          },
        );

        return expect(fetch()).rejects.toThrow('Missing charge id');
      });
    });

    describe('create', () => {
      const createData = {
        returnUrl: 'http://return.url',
        cancelUrl: 'http://cancel.url',
      };

      it('should call `createCheckoutOrderCharge` action with the checkoutOrderId passed to the hook', async () => {
        const {
          result: {
            current: {
              actions: { create },
            },
          },
        } = renderHook(
          () =>
            useCheckoutOrderCharge(checkoutId, undefined, {
              enableAutoFetch: false,
              fetchConfig,
            }),
          {
            wrapper: withStore(mockInitialState),
          },
        );

        const requestConfig = {
          dummy: 'create',
        };

        await create(createData, requestConfig);

        expect(createCheckoutOrderCharge).toHaveBeenCalledWith(
          checkoutId,
          createData,
          requestConfig,
        );
      });

      it('should throw an error when checkoutOrderId is not passed to the hook', () => {
        const {
          result: {
            current: {
              actions: { create },
            },
          },
        } = renderHook(
          () =>
            useCheckoutOrderCharge(undefined, undefined, {
              enableAutoFetch: false,
            }),
          {
            wrapper: withStore(mockInitialState),
          },
        );

        return expect(create(createData)).rejects.toThrow(
          'Missing checkout order id.',
        );
      });
    });

    describe('reset', () => {
      it('should call `resetCheckoutOrderChargeState` action', async () => {
        const {
          result: {
            current: {
              actions: { reset },
            },
          },
        } = renderHook(() => useCheckoutOrderCharge(), {
          wrapper: withStore(mockInitialState),
        });

        await reset();

        expect(resetCheckoutOrderChargeState).toHaveBeenCalled();
      });
    });
  });
});
