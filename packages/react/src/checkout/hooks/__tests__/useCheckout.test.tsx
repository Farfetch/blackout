import {
  checkoutId,
  checkoutOrderEntity,
  mockCheckoutDetailsEntityDenormalized,
  mockCheckoutOrderResultDenormalized,
  mockCheckoutState,
  mockCheckoutStateWithGuestUser,
  mockCheckoutStateWithoutDetails,
  mockErrorState,
  mockInitialState,
  mockInitialStateWithGuestUser,
  mockInitialStateWithoutUser,
  mockLoadingState,
} from 'tests/__fixtures__/checkout/index.mjs';
import { cleanup, renderHook } from '@testing-library/react';
import { cloneDeep } from 'lodash-es';
import {
  createCheckoutOrder,
  createCheckoutOrderCharge,
  createPaymentIntentInstrument,
  fetchCheckoutOrder,
  fetchCheckoutOrderCharge,
  fetchCollectPoints as fetchCollectPointsAction,
  fetchCountryAddressSchemas,
  isCheckoutOrderAwaitingPayment,
  isCheckoutOrderConfirmed,
  removePaymentIntentInstrument,
  resetCheckout,
  resetCheckoutOrderChargeState,
  resetCheckoutOrderDetails,
  resetCollectPoints,
  resetPaymentIntentInstruments,
  setCheckoutOrderPromocodes,
  setCheckoutOrderTags,
  updateCheckoutOrder,
  updatePaymentIntentInstrument,
} from '@farfetch/blackout-redux';
import { HttpHeaders, PaymentMethod } from '@farfetch/blackout-client';
import { withStore } from '../../../../tests/helpers/index.js';
import useCheckout from '../useCheckout.js';
import useCheckoutOrderCharge from '../useCheckoutOrderCharge.js';
import useCheckoutOrderDetails from '../useCheckoutOrderDetails.js';
import useCollectPoints from '../useCollectPoints.js';
import useCountryAddressSchemas from '../../../locale/hooks/useCountryAddressSchemas.js';
import usePaymentIntentInstruments from '../../../payments/hooks/usePaymentIntentInstruments.js';

jest.mock('@farfetch/blackout-redux', () => ({
  ...jest.requireActual('@farfetch/blackout-redux'),
  createCheckoutOrder: jest.fn(() => ({ type: 'create_checkout' })),
  createCheckoutOrderCharge: jest.fn(() => ({
    type: 'create_checkout_order_charge',
  })),
  createPaymentIntentInstrument: jest.fn(() => ({
    type: 'create_payment_intent_instrument',
  })),
  fetchCheckoutOrder: jest.fn(() => ({ type: 'fetch_checkout_order' })),
  fetchCheckoutOrderCharge: jest.fn(() => ({
    type: 'fetch_checkout_order_charge',
  })),
  fetchCheckoutOrderDetails: jest.fn(() => ({
    type: 'fetch_checkout_order_details',
  })),
  fetchCollectPoints: jest.fn(() => ({ type: 'fetch_collect_points' })),
  removePaymentIntentInstrument: jest.fn(() => ({
    type: 'remove_payment_intent_instrument',
  })),
  resetCheckout: jest.fn(() => ({ type: 'reset_checkout' })),
  resetCheckoutOrderChargeState: jest.fn(() => ({
    type: 'reset_checkout_order_charge_state',
  })),
  resetCheckoutOrderDetails: jest.fn(() => ({
    type: 'reset_checkout_order_details_state',
  })),
  resetCollectPoints: jest.fn(() => ({
    type: 'reset_collect_points_state',
  })),
  resetPaymentIntentInstruments: jest.fn(() => ({
    type: 'reset_payment_intent_instruments_state',
  })),
  setCheckoutOrderPromocodes: jest.fn(() => ({
    type: 'set_checkout_order_promocodes',
  })),
  setCheckoutOrderTags: jest.fn(() => ({ type: 'set_checkout_order_tags' })),
  updateCheckoutOrder: jest.fn(() => ({ type: 'update_checkout_order' })),
  updatePaymentIntentInstrument: jest.fn(() => ({
    type: 'update_payment_intent_instrument',
  })),
  isCheckoutOrderConfirmed: jest.fn(),
  isCheckoutOrderAwaitingPayment: jest.fn(),
  fetchCountryAddressSchemas: jest.fn(() => ({
    type: 'fetch_country_address_schemas',
  })),
}));

jest.mock('../useCheckoutOrderCharge', () => ({
  __esModule: true,
  default: jest.fn(jest.requireActual('../useCheckoutOrderCharge').default),
}));

jest.mock('../useCollectPoints', () => ({
  __esModule: true,
  default: jest.fn(jest.requireActual('../useCollectPoints').default),
}));

jest.mock('../useCheckoutOrderDetails', () => ({
  __esModule: true,
  default: jest.fn(jest.requireActual('../useCheckoutOrderDetails').default),
}));

jest.mock('../../../locale/hooks/useCountryAddressSchemas', () => ({
  __esModule: true,
  default: jest.fn(
    jest.requireActual('../../../locale/hooks/useCountryAddressSchemas')
      .default,
  ),
}));

jest.mock('../../../payments/hooks/usePaymentIntentInstruments', () => ({
  __esModule: true,
  default: jest.fn(
    jest.requireActual('../../../payments/hooks/usePaymentIntentInstruments')
      .default,
  ),
}));

const defaultReturn = {
  data: undefined,
  isAnythingLoading: false,
  isCheckoutOrderLoading: false,
  isChargeLoading: false,
  arePromocodesLoading: false,
  areDetailsLoading: false,
  areInstrumentsLoading: false,
  areCollectPointsLoading: false,
  areTagsLoading: false,
  areCollectPointsFetched: false,
  areDetailsFetched: false,
  areInstrumentsFetched: false,
  isChargeFetched: false,
  isCheckoutOrderFetched: false,
  collectPointsError: null,
  checkoutOrderError: null,
  chargeError: null,
  detailsError: null,
  instrumentsError: null,
  promocodesError: null,
  tagsError: null,
  actions: {
    fetch: expect.any(Function),
    fetchCharge: expect.any(Function),
    fetchDetails: expect.any(Function),
    fetchInstruments: expect.any(Function),
    fetchCollectPoints: expect.any(Function),
    create: expect.any(Function),
    createInstrument: expect.any(Function),
    update: expect.any(Function),
    updateInstrument: expect.any(Function),
    removeInstrument: expect.any(Function),
    setTags: expect.any(Function),
    setPromocodes: expect.any(Function),
    charge: expect.any(Function),
    reset: expect.any(Function),
    resetCheckoutState: expect.any(Function),
    resetChargeState: expect.any(Function),
    resetCollectPoints: expect.any(Function),
    resetDetailsState: expect.any(Function),
    resetInstrumentsState: expect.any(Function),
  },
  helpers: {
    getCreateInstrumentData: expect.any(Function),
    getUpdateInstrumentData: expect.any(Function),
    isOrderConfirmed: expect.any(Function),
    isOrderAwaitingPayment: expect.any(Function),
    getSelectedShippingOption: expect.any(Function),
    isShippingAddressZipCodeValid: expect.any(Function),
  },
};

describe('useCheckout', () => {
  beforeEach(jest.clearAllMocks);

  afterEach(cleanup);

  it('should return correctly with initial state', () => {
    const {
      result: { current },
    } = renderHook(() => useCheckout(), {
      wrapper: withStore(mockInitialState),
    });

    expect(current).toStrictEqual(defaultReturn);
  });

  it('should return error state', () => {
    const {
      result: { current },
    } = renderHook(() => useCheckout(), {
      wrapper: withStore(mockErrorState),
    });

    expect(current).toStrictEqual({
      ...defaultReturn,
      isCheckoutOrderFetched: true,
      checkoutOrderError: mockErrorState.checkout.error,
      areCollectPointsFetched: true,
      collectPointsError: mockErrorState.checkout.collectPoints[''].error,
      isChargeFetched: true,
      chargeError: mockErrorState.checkout.checkoutOrderCharge.error,
      areDetailsFetched: true,
      detailsError: mockErrorState.checkout.checkoutOrderDetails.error,
      promocodesError: mockErrorState.checkout.checkoutOrderPromocodes.error,
    });
  });

  it('should return loading state', () => {
    const {
      result: { current },
    } = renderHook(() => useCheckout(), {
      wrapper: withStore(mockLoadingState),
    });

    expect(current).toStrictEqual({
      ...defaultReturn,
      isAnythingLoading: true,
      isCheckoutOrderLoading: true,
      areCollectPointsLoading: true,
      areDetailsLoading: true,
      isChargeLoading: true,
      arePromocodesLoading: true,
    });
  });

  it('should return correctly when there is a checkoutOrder in state and no checkoutOrderId parameter is passed to the hook', () => {
    const {
      result: { current },
    } = renderHook(() => useCheckout(), {
      wrapper: withStore(mockCheckoutState),
    });

    expect(current).toStrictEqual({
      ...defaultReturn,
      isCheckoutOrderFetched: true,
      areCollectPointsFetched: true,
      areDetailsFetched: true,
      isChargeFetched: true,
      areInstrumentsFetched: true,
      data: {
        charge: mockCheckoutState.checkout.checkoutOrderCharge.result,
        checkoutOrder: mockCheckoutOrderResultDenormalized,
        details: mockCheckoutDetailsEntityDenormalized,
        instruments: [],
        collectPoints:
          mockCheckoutState.checkout.collectPoints[`${checkoutId}|false|false`]
            ?.result,
      },
    });
  });

  describe('behaviour', () => {
    it('should reset data if the passed checkoutOrderId to the hook does not match the order id that is in the redux store', () => {
      renderHook(() => useCheckout(checkoutId + 1), {
        wrapper: withStore(mockCheckoutState),
      });

      expect(resetCheckout).toHaveBeenCalled();
      expect(resetPaymentIntentInstruments).toHaveBeenCalled();
    });

    describe('should call all hook dependencies with the correct arguments', () => {
      it('when checkoutOrderId parameter is passed', () => {
        const checkoutOrderIdDifferentThanStore = checkoutId + 1;

        renderHook(() => useCheckout(checkoutOrderIdDifferentThanStore), {
          wrapper: withStore(mockCheckoutState),
        });

        expect(usePaymentIntentInstruments).toHaveBeenCalledWith(undefined, {
          enableAutoFetch: false,
        });

        expect(useCheckoutOrderCharge).toHaveBeenCalledWith(
          checkoutOrderIdDifferentThanStore,
          undefined,
          { enableAutoFetch: false },
        );

        expect(useCollectPoints).toHaveBeenCalledWith(
          { orderId: checkoutOrderIdDifferentThanStore },
          {
            enableAutoFetch: false,
          },
        );

        expect(useCheckoutOrderDetails).toHaveBeenCalledWith(
          checkoutOrderIdDifferentThanStore,
          {
            enableAutoFetch: false,
          },
        );
      });

      it('when checkoutOrderId parameter is not passed', () => {
        renderHook(() => useCheckout(), {
          wrapper: withStore(mockCheckoutState),
        });

        // All hooks will use the checkout id that is present in the store
        // (if any) when the checkoutOrderId parameter passed to the useCheckout
        // hook is undefined.
        expect(usePaymentIntentInstruments).toHaveBeenCalledWith(
          checkoutOrderEntity.paymentIntentId,
          { enableAutoFetch: false },
        );

        expect(useCheckoutOrderCharge).toHaveBeenCalledWith(
          checkoutId,
          undefined,
          { enableAutoFetch: false },
        );

        expect(useCollectPoints).toHaveBeenCalledWith(
          { orderId: checkoutId },
          {
            enableAutoFetch: false,
          },
        );

        expect(useCheckoutOrderDetails).toHaveBeenCalledWith(checkoutId, {
          enableAutoFetch: false,
        });
      });
    });
  });

  describe('options', () => {
    describe('enableAutoFetch', () => {
      it('should fetch data if `enableAutoFetch` option is true, checkoutOrderId parameter is passed and user data is set', () => {
        const fetchConfig = {
          dummy: 'fetch',
        };

        renderHook(() => useCheckout(checkoutId, { fetchConfig }), {
          wrapper: withStore(mockInitialState),
        });

        expect(fetchCheckoutOrder).toHaveBeenCalledWith(
          checkoutId,
          undefined,
          fetchConfig,
        );

        jest.clearAllMocks();

        renderHook(
          () => useCheckout(checkoutId, { enableAutoFetch: true, fetchConfig }),
          {
            wrapper: withStore(mockInitialState),
          },
        );

        expect(fetchCheckoutOrder).toHaveBeenCalledWith(
          checkoutId,
          undefined,
          fetchConfig,
        );
      });

      it('should not fetch data if `enableAutoFetch` option is true but no checkoutOrderId parameter is passed', () => {
        renderHook(() => useCheckout(), {
          wrapper: withStore(mockInitialState),
        });

        expect(fetchCheckoutOrder).not.toHaveBeenCalled();

        jest.clearAllMocks();

        renderHook(() => useCheckout(undefined, { enableAutoFetch: true }), {
          wrapper: withStore(mockInitialState),
        });

        expect(fetchCheckoutOrder).not.toHaveBeenCalled();
      });

      it('should not fetch data if `enableAutoFetch` option is true, checkoutOrderId parameter is passed but the user is not loaded', () => {
        renderHook(() => useCheckout(checkoutId), {
          wrapper: withStore(mockInitialStateWithoutUser),
        });

        expect(fetchCheckoutOrder).not.toHaveBeenCalled();

        jest.clearAllMocks();

        renderHook(() => useCheckout(checkoutId, { enableAutoFetch: true }), {
          wrapper: withStore(mockInitialStateWithoutUser),
        });

        expect(fetchCheckoutOrder).not.toHaveBeenCalled();
      });

      it('should not fetch data if `enableAutoFetch` option is true but checkoutOrder is loading', () => {
        renderHook(() => useCheckout(checkoutId), {
          wrapper: withStore(mockLoadingState),
        });

        expect(fetchCheckoutOrder).not.toHaveBeenCalled();

        jest.clearAllMocks();

        renderHook(() => useCheckout(checkoutId, { enableAutoFetch: true }), {
          wrapper: withStore(mockLoadingState),
        });

        expect(fetchCheckoutOrder).not.toHaveBeenCalled();

        jest.clearAllMocks();

        renderHook(() => useCheckout(), {
          wrapper: withStore(mockLoadingState),
        });

        expect(fetchCheckoutOrder).not.toHaveBeenCalled();

        jest.clearAllMocks();

        renderHook(() => useCheckout(undefined, { enableAutoFetch: true }), {
          wrapper: withStore(mockLoadingState),
        });

        expect(fetchCheckoutOrder).not.toHaveBeenCalled();
      });

      it('should not fetch data if `enableAutoFetch` option is true but checkoutOrder is fetched', () => {
        renderHook(() => useCheckout(checkoutId), {
          wrapper: withStore(mockCheckoutState),
        });

        expect(fetchCheckoutOrder).not.toHaveBeenCalled();

        jest.clearAllMocks();

        renderHook(() => useCheckout(checkoutId, { enableAutoFetch: true }), {
          wrapper: withStore(mockCheckoutState),
        });

        expect(fetchCheckoutOrder).not.toHaveBeenCalled();

        jest.clearAllMocks();

        renderHook(() => useCheckout(), {
          wrapper: withStore(mockCheckoutState),
        });

        expect(fetchCheckoutOrder).not.toHaveBeenCalled();

        jest.clearAllMocks();

        renderHook(() => useCheckout(undefined, { enableAutoFetch: true }), {
          wrapper: withStore(mockCheckoutState),
        });

        expect(fetchCheckoutOrder).not.toHaveBeenCalled();
      });

      it('should not fetch data if `enableAutoFetch` option is false', () => {
        renderHook(() => useCheckout(checkoutId, { enableAutoFetch: false }), {
          wrapper: withStore(mockInitialState),
        });

        expect(fetchCheckoutOrder).not.toHaveBeenCalled();
      });
    });

    describe('enableAutoCreate', () => {
      const createConfig = {
        dummy: 'create',
      };

      const createData = {
        bagId: 'dummyBagId',
        guestUserEmail: 'guest@dummy.com',
        metadata: {
          someKey: 'someValue',
          anotherKey: 'anotherValue',
        },
      };

      it('should create a checkout order if checkoutId is not passed, the user is guest and createData is passed and its guestUserEmail property is set', () => {
        renderHook(
          () =>
            useCheckout(undefined, {
              createConfig,
              createData,
              enableAutoCreate: true,
            }),
          {
            wrapper: withStore(mockInitialStateWithGuestUser),
          },
        );

        expect(createCheckoutOrder).toHaveBeenCalledWith(
          createData,
          createConfig,
        );
      });

      it('should create a checkout order if checkoutId is not passed, the user is not guest and createData is passed', () => {
        renderHook(
          () =>
            useCheckout(undefined, {
              createConfig,
              createData,
              enableAutoCreate: true,
            }),
          {
            wrapper: withStore(mockInitialState),
          },
        );

        expect(createCheckoutOrder).toHaveBeenCalledWith(
          createData,
          createConfig,
        );
      });

      it('should not create a checkout order if checkoutId is passed', () => {
        renderHook(
          () =>
            useCheckout(checkoutId, {
              createConfig,
              createData,
              enableAutoCreate: true,
            }),
          {
            wrapper: withStore(mockInitialState),
          },
        );

        expect(createCheckoutOrder).not.toHaveBeenCalledWith();
      });

      it('should not create a checkout order if createData is not passed', () => {
        renderHook(
          () =>
            useCheckout(checkoutId, {
              createConfig,
              enableAutoCreate: true,
            }),
          {
            wrapper: withStore(mockInitialState),
          },
        );

        expect(createCheckoutOrder).not.toHaveBeenCalledWith();
      });

      it('should not create a checkout order if checkoutId is not passed, the user is guest and createData is passed but its guestUserEmail property is not set', () => {
        const createDataWithoutGuestEmail = {
          bagId: 'dummyBagId',
        };

        renderHook(
          () =>
            useCheckout(undefined, {
              createConfig,
              createData: createDataWithoutGuestEmail,
              enableAutoCreate: true,
            }),
          {
            wrapper: withStore(mockInitialStateWithGuestUser),
          },
        );

        expect(createCheckoutOrder).not.toHaveBeenCalledWith();
      });

      it('should not create a checkout order if checkoutId and createData are passed but the user is not set', () => {
        renderHook(
          () =>
            useCheckout(checkoutId, {
              createConfig,
              createData,
              enableAutoCreate: true,
            }),
          {
            wrapper: withStore(mockInitialStateWithoutUser),
          },
        );

        expect(createCheckoutOrder).not.toHaveBeenCalledWith();
      });

      it('should not create a checkout order if a checkout order is fetched', () => {
        renderHook(
          () =>
            useCheckout(undefined, {
              createConfig,
              createData,
              enableAutoCreate: true,
            }),
          {
            wrapper: withStore(mockCheckoutState),
          },
        );

        expect(createCheckoutOrder).not.toHaveBeenCalledWith();
      });

      it('should not create a checkout order if a checkout order is loading', () => {
        renderHook(
          () =>
            useCheckout(undefined, {
              createConfig,
              createData,
              enableAutoCreate: true,
            }),
          {
            wrapper: withStore(mockLoadingState),
          },
        );

        expect(createCheckoutOrder).not.toHaveBeenCalledWith();
      });

      it('should not create a checkout order if enableAutoCreate is false', () => {
        renderHook(
          () =>
            useCheckout(undefined, {
              createConfig,
              createData,
              enableAutoCreate: false,
            }),
          {
            wrapper: withStore(mockInitialState),
          },
        );

        expect(createCheckoutOrder).not.toHaveBeenCalledWith();

        jest.clearAllMocks();

        // by default, enableAutoCreate should be false
        renderHook(
          () =>
            useCheckout(undefined, {
              createConfig,
              createData,
            }),
          {
            wrapper: withStore(mockInitialState),
          },
        );

        expect(createCheckoutOrder).not.toHaveBeenCalledWith();
      });
    });
  });

  describe('actions', () => {
    describe('fetch', () => {
      it('should call `fetchCheckoutOrder` action when checkoutOrderId is passed to the hook', async () => {
        const fetchQuery = {
          fields: 'checkoutOrder',
        };

        const {
          result: {
            current: {
              actions: { fetch },
            },
          },
        } = renderHook(
          () => useCheckout(checkoutId, { enableAutoFetch: false, fetchQuery }),
          {
            wrapper: withStore(mockInitialState),
          },
        );

        const requestConfig = {
          dummy: 'fetch',
        };

        await fetch(undefined, requestConfig);

        expect(fetchCheckoutOrder).toHaveBeenCalledWith(
          checkoutId,
          fetchQuery,
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
          () => useCheckout(undefined, { enableAutoFetch: false }),
          {
            wrapper: withStore(mockInitialState),
          },
        );

        return expect(fetch()).rejects.toThrow('Missing checkout order id.');
      });
    });

    describe('create', () => {
      const createData = {
        bagId: 'dummyBagId',
      };

      const createConfig = {
        dummy: 'create',
      };

      it('should call `createCheckoutOrder` action with the hook parameters if the function is invoked without arguments', async () => {
        const {
          result: {
            current: {
              actions: { create },
            },
          },
        } = renderHook(
          () =>
            useCheckout(undefined, {
              enableAutoFetch: false,
              createData,
              createConfig,
            }),
          {
            wrapper: withStore(mockInitialState),
          },
        );

        await create();

        expect(createCheckoutOrder).toHaveBeenCalledWith(
          createData,
          createConfig,
        );
      });

      it('should call `createCheckoutOrder` action with the parameters passed to the function, overriding the ones from the hook', async () => {
        const {
          result: {
            current: {
              actions: { create },
            },
          },
        } = renderHook(
          () =>
            useCheckout(undefined, {
              enableAutoFetch: false,
              createData,
              createConfig,
            }),
          {
            wrapper: withStore(mockInitialState),
          },
        );

        const requestData = {
          bagId: 'anotherBagId',
        };

        const requestConfig = {
          dummy: 'create',
        };

        await create(requestData, requestConfig);

        expect(createCheckoutOrder).toHaveBeenCalledWith(
          requestData,
          requestConfig,
        );
      });

      it('should throw an error if no createData is passed to the hook or the function', () => {
        const {
          result: {
            current: {
              actions: { create },
            },
          },
        } = renderHook(
          () =>
            useCheckout(undefined, {
              enableAutoFetch: false,
              createConfig,
            }),
          {
            wrapper: withStore(mockInitialState),
          },
        );

        return expect(create()).rejects.toThrow(
          'Invalid `createData` parameter was provided for `create`',
        );
      });
    });

    describe('update', () => {
      const updateData = {
        email: 'email@dummy.com',
      };

      it('should call `updateCheckoutOrder` action with the passed in arguments if checkoutOrderId is passed', async () => {
        const anotherCheckoutId = checkoutId + 1;

        const {
          result: {
            current: {
              actions: { update },
            },
          },
        } = renderHook(
          () =>
            useCheckout(anotherCheckoutId, {
              enableAutoFetch: false,
            }),
          {
            wrapper: withStore(mockInitialState),
          },
        );

        const requestConfig = {
          dummy: 'update',
        };

        await update(updateData, requestConfig);

        expect(updateCheckoutOrder).toHaveBeenCalledWith(
          anotherCheckoutId,
          updateData,
          requestConfig,
        );
      });

      it('should call `updateCheckoutOrder` action with the implicit order id if checkoutOrderId parameter is not passed and there is a checkout order in redux state', async () => {
        const {
          result: {
            current: {
              actions: { update },
            },
          },
        } = renderHook(
          () =>
            useCheckout(undefined, {
              enableAutoFetch: false,
            }),
          {
            wrapper: withStore(mockCheckoutState),
          },
        );

        const requestConfig = {
          dummy: 'update',
        };

        await update(updateData, requestConfig);

        expect(updateCheckoutOrder).toHaveBeenCalledWith(
          checkoutId,
          updateData,
          requestConfig,
        );
      });

      it('should throw an error if checkoutOrderId parameter is not passed to the hook and there is not a checkout order available in redux state', () => {
        const {
          result: {
            current: {
              actions: { update },
            },
          },
        } = renderHook(
          () =>
            useCheckout(undefined, {
              enableAutoFetch: false,
            }),
          {
            wrapper: withStore(mockInitialState),
          },
        );

        return expect(update(updateData)).rejects.toThrow(
          'Missing checkout order id.',
        );
      });
    });

    describe('setTags', () => {
      const setTagsData = ['tag1'];

      it('should call `setCheckoutOrderTags` action with the passed in arguments if checkoutOrderId is passed', async () => {
        const anotherCheckoutId = checkoutId + 1;

        const {
          result: {
            current: {
              actions: { setTags },
            },
          },
        } = renderHook(
          () =>
            useCheckout(anotherCheckoutId, {
              enableAutoFetch: false,
            }),
          {
            wrapper: withStore(mockInitialState),
          },
        );

        const requestConfig = {
          dummy: 'setTags',
        };

        await setTags(setTagsData, requestConfig);

        expect(setCheckoutOrderTags).toHaveBeenCalledWith(
          anotherCheckoutId,
          setTagsData,
          requestConfig,
        );
      });

      it('should call `setCheckoutOrderTags` action with the implicit order id if checkoutOrderId parameter is not passed and there is a checkout order in redux state', async () => {
        const {
          result: {
            current: {
              actions: { setTags },
            },
          },
        } = renderHook(
          () =>
            useCheckout(undefined, {
              enableAutoFetch: false,
            }),
          {
            wrapper: withStore(mockCheckoutState),
          },
        );

        const requestConfig = {
          dummy: 'setTags',
        };

        await setTags(setTagsData, requestConfig);

        expect(setCheckoutOrderTags).toHaveBeenCalledWith(
          checkoutId,
          setTagsData,
          requestConfig,
        );
      });

      it('should throw an error if checkoutOrderId parameter is not passed to the hook and there is not a checkout order available in redux state', () => {
        const {
          result: {
            current: {
              actions: { setTags },
            },
          },
        } = renderHook(
          () =>
            useCheckout(undefined, {
              enableAutoFetch: false,
            }),
          {
            wrapper: withStore(mockInitialState),
          },
        );

        return expect(setTags(setTagsData)).rejects.toThrow(
          'Missing checkout order id.',
        );
      });
    });

    describe('setPromocodes', () => {
      const setPromocodesData = { promocodes: ['code1'] };

      it('should call `setCheckoutOrderPromocodes` action with the passed in arguments if checkoutOrderId is passed', async () => {
        const anotherCheckoutId = checkoutId + 1;

        const {
          result: {
            current: {
              actions: { setPromocodes },
            },
          },
        } = renderHook(
          () =>
            useCheckout(anotherCheckoutId, {
              enableAutoFetch: false,
            }),
          {
            wrapper: withStore(mockInitialState),
          },
        );

        const requestConfig = {
          dummy: 'setPromocodes',
        };

        await setPromocodes(setPromocodesData, requestConfig);

        expect(setCheckoutOrderPromocodes).toHaveBeenCalledWith(
          anotherCheckoutId,
          setPromocodesData,
          requestConfig,
        );
      });

      it('should call `setCheckoutOrderPromocodes` action with the implicit order id if checkoutOrderId parameter is not passed and there is a checkout order in redux state', async () => {
        const {
          result: {
            current: {
              actions: { setPromocodes },
            },
          },
        } = renderHook(
          () =>
            useCheckout(undefined, {
              enableAutoFetch: false,
            }),
          {
            wrapper: withStore(mockCheckoutState),
          },
        );

        const requestConfig = {
          dummy: 'setPromocodes',
        };

        await setPromocodes(setPromocodesData, requestConfig);

        expect(setCheckoutOrderPromocodes).toHaveBeenCalledWith(
          checkoutId,
          setPromocodesData,
          requestConfig,
        );
      });

      it('should throw an error if checkoutOrderId parameter is not passed to the hook and there is not a checkout order available in redux state', () => {
        const {
          result: {
            current: {
              actions: { setPromocodes },
            },
          },
        } = renderHook(
          () =>
            useCheckout(undefined, {
              enableAutoFetch: false,
            }),
          {
            wrapper: withStore(mockInitialState),
          },
        );

        return expect(setPromocodes(setPromocodesData)).rejects.toThrow(
          'Missing checkout order id.',
        );
      });
    });

    describe('charge', () => {
      const chargeData = {
        returnUrl: 'http://test.com',
        cancelUrl: 'http://test.com',
      };

      it('should call `createCheckoutOrderCharge` action with config parameter containing the current checkout order values in store', async () => {
        const {
          result: {
            current: {
              actions: { charge },
            },
          },
        } = renderHook(
          () =>
            useCheckout(undefined, {
              enableAutoFetch: false,
            }),
          {
            wrapper: withStore(mockCheckoutState),
          },
        );

        const requestConfig = {
          dummy: 'charge',
        };

        await charge(chargeData, requestConfig);

        expect(createCheckoutOrderCharge).toHaveBeenCalledWith(
          checkoutId,
          chargeData,
          {
            ...requestConfig,
            headers: {
              [HttpHeaders.AcceptLanguage]:
                checkoutOrderEntity.shippingAddress.country.culture,
              [HttpHeaders.FFCountry]:
                checkoutOrderEntity.shippingAddress.country.alpha2Code,
              [HttpHeaders.FFCurrency]: checkoutOrderEntity.currency,
            },
          },
        );
      });
    });

    describe('fetchCharge', () => {
      it('should call `fetchCheckoutOrderCharge` action with the current order id, current charge id and with the config parameter containing the current checkout order values in store', async () => {
        const {
          result: {
            current: {
              actions: { fetchCharge },
            },
          },
        } = renderHook(
          () =>
            useCheckout(undefined, {
              enableAutoFetch: false,
            }),
          {
            wrapper: withStore(mockCheckoutState),
          },
        );

        const requestConfig = {
          dummy: 'fetchCharge',
        };

        await fetchCharge(requestConfig);

        expect(fetchCheckoutOrderCharge).toHaveBeenCalledWith(
          checkoutId,
          mockCheckoutState.checkout.checkoutOrderCharge.result.id,
          {
            ...requestConfig,
            headers: {
              [HttpHeaders.AcceptLanguage]:
                checkoutOrderEntity.shippingAddress.country.culture,
              [HttpHeaders.FFCountry]:
                checkoutOrderEntity.shippingAddress.country.alpha2Code,
              [HttpHeaders.FFCurrency]: checkoutOrderEntity.currency,
            },
          },
        );
      });
    });

    describe('createInstrument', () => {
      const createInstrumentData = {
        method: PaymentMethod.CreditCard,
        amounts: [{ value: 1 }],
      };

      it('should call `createPaymentIntentInstrument` action with the current order payment intent id and with the config parameter containing the current checkout order values in store', async () => {
        const {
          result: {
            current: {
              actions: { createInstrument },
            },
          },
        } = renderHook(
          () =>
            useCheckout(undefined, {
              enableAutoFetch: false,
            }),
          {
            wrapper: withStore(mockCheckoutState),
          },
        );

        const requestConfig = {
          dummy: 'createInstrument',
        };

        await createInstrument(createInstrumentData, requestConfig);

        expect(createPaymentIntentInstrument).toHaveBeenCalledWith(
          checkoutOrderEntity.paymentIntentId,
          createInstrumentData,
          {
            ...requestConfig,
            headers: {
              [HttpHeaders.AcceptLanguage]:
                checkoutOrderEntity.shippingAddress.country.culture,
              [HttpHeaders.FFCountry]:
                checkoutOrderEntity.shippingAddress.country.alpha2Code,
              [HttpHeaders.FFCurrency]: checkoutOrderEntity.currency,
            },
          },
        );
      });
    });

    describe('updateInstrument', () => {
      const updateInstrumentData = {
        amounts: [{ value: 1 }],
      };

      it('should call `updatePaymentIntentInstrument` action with the current order payment intent id and with the config parameter containing the current checkout order values in store', async () => {
        const {
          result: {
            current: {
              actions: { updateInstrument },
            },
          },
        } = renderHook(
          () =>
            useCheckout(undefined, {
              enableAutoFetch: false,
            }),
          {
            wrapper: withStore(mockCheckoutState),
          },
        );

        const requestConfig = {
          dummy: 'updateInstrument',
        };

        const instrumentId = 'dummy-id';

        await updateInstrument(
          instrumentId,
          updateInstrumentData,
          requestConfig,
        );

        expect(updatePaymentIntentInstrument).toHaveBeenCalledWith(
          checkoutOrderEntity.paymentIntentId,
          instrumentId,
          updateInstrumentData,
          {
            ...requestConfig,
            headers: {
              [HttpHeaders.AcceptLanguage]:
                checkoutOrderEntity.shippingAddress.country.culture,
              [HttpHeaders.FFCountry]:
                checkoutOrderEntity.shippingAddress.country.alpha2Code,
              [HttpHeaders.FFCurrency]: checkoutOrderEntity.currency,
            },
          },
        );
      });
    });

    describe('removeInstrument', () => {
      it('should call `removePaymentIntentInstrument` action with the current order payment intent id and with the config parameter containing the current checkout order values in store', async () => {
        const {
          result: {
            current: {
              actions: { removeInstrument },
            },
          },
        } = renderHook(
          () =>
            useCheckout(undefined, {
              enableAutoFetch: false,
            }),
          {
            wrapper: withStore(mockCheckoutState),
          },
        );

        const requestConfig = {
          dummy: 'removeInstrument',
        };

        const instrumentId = 'dummy-id';

        await removeInstrument(instrumentId, requestConfig);

        expect(removePaymentIntentInstrument).toHaveBeenCalledWith(
          checkoutOrderEntity.paymentIntentId,
          instrumentId,
          {
            ...requestConfig,
            headers: {
              [HttpHeaders.AcceptLanguage]:
                checkoutOrderEntity.shippingAddress.country.culture,
              [HttpHeaders.FFCountry]:
                checkoutOrderEntity.shippingAddress.country.alpha2Code,
              [HttpHeaders.FFCurrency]: checkoutOrderEntity.currency,
            },
          },
        );
      });
    });

    describe('fetchCollectPoints', () => {
      it('should call `fetchCollectPoints` action with a default query containing current order id if no query is passed to the function', async () => {
        const {
          result: {
            current: {
              actions: { fetchCollectPoints },
            },
          },
        } = renderHook(
          () =>
            useCheckout(undefined, {
              enableAutoFetch: false,
            }),
          {
            wrapper: withStore(mockCheckoutState),
          },
        );

        const requestConfig = {
          dummy: 'fetchCollectPoints',
        };

        await fetchCollectPoints(requestConfig, undefined);

        expect(fetchCollectPointsAction).toHaveBeenCalledWith(
          {
            orderId: checkoutId,
          },
          requestConfig,
        );
      });
    });

    describe('reset', () => {
      it('should call the appropriate reset actions', () => {
        const {
          result: {
            current: {
              actions: { reset },
            },
          },
        } = renderHook(
          () =>
            useCheckout(undefined, {
              enableAutoFetch: false,
            }),
          {
            wrapper: withStore(mockCheckoutState),
          },
        );

        reset();

        expect(resetCheckout).toHaveBeenCalled();
        expect(resetPaymentIntentInstruments).toHaveBeenCalled();
        expect(resetCheckoutOrderChargeState).not.toHaveBeenCalled();
        expect(resetCheckoutOrderDetails).not.toHaveBeenCalled();
        expect(resetCollectPoints).not.toHaveBeenCalled();
      });
    });
  });

  describe('helpers', () => {
    describe('getUpdateInstrumentData', () => {
      it('should return update instrument data containing some defaults from the order/user when no overrides are passed and there is checkout order data and user data in the store', () => {
        const {
          result: {
            current: {
              helpers: { getUpdateInstrumentData },
            },
          },
        } = renderHook(
          () => useCheckout(undefined, { enableAutoFetch: false }),
          {
            wrapper: withStore(mockCheckoutState),
          },
        );

        const data = getUpdateInstrumentData();
        const userEntity = mockCheckoutState.entities.user;

        expect(data).toStrictEqual({
          amounts: [{ value: 102 }],
          payer: {
            id: `${userEntity?.id}`,
            firstName: userEntity.firstName,
            lastName: userEntity.lastName,
            email: userEntity?.email,
            address: checkoutOrderEntity.billingAddress,
          },
        });
      });

      it('should allow overrides', () => {
        const {
          result: {
            current: {
              helpers: { getUpdateInstrumentData },
            },
          },
        } = renderHook(
          () => useCheckout(undefined, { enableAutoFetch: false }),
          {
            wrapper: withStore(mockCheckoutState),
          },
        );

        const overrides = {
          amounts: [{ value: 10 }],
          payer: {
            id: '1000',
            firstName: 'John',
            lastName: 'Doe',
            email: 'email@dummy.com',
            address: {
              addressLine1: 'dummy',
              city: {
                id: 1,
                name: 'dummy city',
              },
              country: {
                id: 1,
                name: 'dummy',
                nativeName: 'dummy',
                alpha2Code: 'dummy',
                alpha3Code: 'dummy',
                culture: 'en-US',
                region: 'dummy',
                continentId: 100,
              },
              zipCode: 'dummy',
            },
          },
        };

        const data = getUpdateInstrumentData(overrides);

        expect(data).toStrictEqual(overrides);
      });

      it('should allow override of only the guest user email info in payer structure when the user is guest', () => {
        const {
          result: {
            current: {
              helpers: { getUpdateInstrumentData },
            },
          },
        } = renderHook(
          () => useCheckout(undefined, { enableAutoFetch: false }),
          {
            wrapper: withStore(mockCheckoutStateWithGuestUser),
          },
        );

        const overrides = {
          guestUserEmail: 'dummy@email.com',
        };

        const data = getUpdateInstrumentData(overrides);
        const userEntity = mockCheckoutStateWithGuestUser.entities.user;

        expect(data).toStrictEqual({
          amounts: [{ value: 102 }],
          payer: {
            id: `${userEntity?.id}`,
            firstName: checkoutOrderEntity.billingAddress.firstName,
            lastName: checkoutOrderEntity.billingAddress.lastName,
            email: overrides.guestUserEmail,
            address: checkoutOrderEntity.billingAddress,
          },
        });
      });

      it('should return undefined if there is no checkout order data in state', () => {
        const {
          result: {
            current: {
              helpers: { getUpdateInstrumentData },
            },
          },
        } = renderHook(
          () => useCheckout(undefined, { enableAutoFetch: false }),
          {
            wrapper: withStore(mockInitialState),
          },
        );

        const overrides = {
          guestUserEmail: 'dummy@email.com',
        };

        const data = getUpdateInstrumentData(overrides);

        expect(data).toBeUndefined();
      });

      it('should return undefined if there is no user data in state', () => {
        const {
          result: {
            current: {
              helpers: { getUpdateInstrumentData },
            },
          },
        } = renderHook(
          () => useCheckout(undefined, { enableAutoFetch: false }),
          {
            wrapper: withStore(mockInitialStateWithoutUser),
          },
        );

        const overrides = {
          guestUserEmail: 'dummy@email.com',
        };

        const data = getUpdateInstrumentData(overrides);

        expect(data).toBeUndefined();
      });
    });

    describe('getCreateInstrumentData', () => {
      it('should return create instrument data containing some defaults from the order/user when no overrides are passed and there is checkout order data and user data in the store', () => {
        const {
          result: {
            current: {
              helpers: { getCreateInstrumentData },
            },
          },
        } = renderHook(
          () => useCheckout(undefined, { enableAutoFetch: false }),
          {
            wrapper: withStore(mockCheckoutState),
          },
        );

        const data = getCreateInstrumentData();
        const userEntity = mockCheckoutState.entities.user;

        expect(data).toStrictEqual({
          amounts: [{ value: 102 }],
          payer: {
            id: `${userEntity?.id}`,
            firstName: userEntity.firstName,
            lastName: userEntity.lastName,
            email: userEntity?.email,
            address: checkoutOrderEntity.billingAddress,
          },
          data: {
            creditUserId: `${userEntity?.id}`,
          },
          method: PaymentMethod.CreditCard,
        });
      });

      it('should allow overrides', () => {
        const {
          result: {
            current: {
              helpers: { getCreateInstrumentData },
            },
          },
        } = renderHook(
          () => useCheckout(undefined, { enableAutoFetch: false }),
          {
            wrapper: withStore(mockCheckoutState),
          },
        );

        const overrides = {
          amounts: [{ value: 10 }],
          payer: {
            id: '1000',
            firstName: 'John',
            lastName: 'Doe',
            email: 'email@dummy.com',
            address: {
              addressLine1: 'dummy',
              city: {
                id: 1,
                name: 'dummy city',
              },
              country: {
                id: 1,
                name: 'dummy',
                nativeName: 'dummy',
                alpha2Code: 'dummy',
                alpha3Code: 'dummy',
                culture: 'en-US',
                region: 'dummy',
                continentId: 100,
              },
              zipCode: 'dummy',
            },
          },
          method: PaymentMethod.Credit,
          data: {
            creditUserId: '10000',
          },
        };

        const data = getCreateInstrumentData(overrides);

        expect(data).toStrictEqual(overrides);
      });

      it('should allow override of only the guest user email info in payer structure when the user is guest', () => {
        const {
          result: {
            current: {
              helpers: { getCreateInstrumentData },
            },
          },
        } = renderHook(
          () => useCheckout(undefined, { enableAutoFetch: false }),
          {
            wrapper: withStore(mockCheckoutStateWithGuestUser),
          },
        );

        const overrides = {
          guestUserEmail: 'dummy@email.com',
        };

        const data = getCreateInstrumentData(overrides);
        const userEntity = mockCheckoutStateWithGuestUser.entities.user;

        expect(data).toStrictEqual({
          amounts: [{ value: 102 }],
          payer: {
            id: `${userEntity?.id}`,
            firstName: checkoutOrderEntity.billingAddress.firstName,
            lastName: checkoutOrderEntity.billingAddress.lastName,
            email: overrides.guestUserEmail,
            address: checkoutOrderEntity.billingAddress,
          },
          data: {
            creditUserId: `${userEntity?.id}`,
          },
          method: PaymentMethod.CreditCard,
        });
      });

      it('should return undefined if there is no checkout order data in state', () => {
        const {
          result: {
            current: {
              helpers: { getCreateInstrumentData },
            },
          },
        } = renderHook(
          () => useCheckout(undefined, { enableAutoFetch: false }),
          {
            wrapper: withStore(mockInitialState),
          },
        );

        const overrides = {
          guestUserEmail: 'dummy@email.com',
        };

        const data = getCreateInstrumentData(overrides);

        expect(data).toBeUndefined();
      });

      it('should return undefined if there is no user data in state', () => {
        const {
          result: {
            current: {
              helpers: { getCreateInstrumentData },
            },
          },
        } = renderHook(
          () => useCheckout(undefined, { enableAutoFetch: false }),
          {
            wrapper: withStore(mockInitialStateWithoutUser),
          },
        );

        const overrides = {
          guestUserEmail: 'dummy@email.com',
        };

        const data = getCreateInstrumentData(overrides);

        expect(data).toBeUndefined();
      });
    });

    describe('isOrderConfirmed', () => {
      it('should call `isCheckoutOrderConfirmed` helper with the order status and order charge status', () => {
        const {
          result: {
            current: {
              helpers: { isOrderConfirmed },
            },
          },
        } = renderHook(
          () => useCheckout(undefined, { enableAutoFetch: false }),
          {
            wrapper: withStore(mockCheckoutState),
          },
        );

        isOrderConfirmed();

        expect(isCheckoutOrderConfirmed).toHaveBeenCalledWith(
          mockCheckoutState.checkout.checkoutOrderCharge.result.status,
          checkoutOrderEntity.status,
        );
      });
    });

    describe('isOrderAwaitingPayment', () => {
      it('should call `isCheckoutOrderAwaitingPayment` helper with the order charge status and redirect url', () => {
        const {
          result: {
            current: {
              helpers: { isOrderAwaitingPayment },
            },
          },
        } = renderHook(
          () => useCheckout(undefined, { enableAutoFetch: false }),
          {
            wrapper: withStore(mockCheckoutState),
          },
        );

        isOrderAwaitingPayment();

        expect(isCheckoutOrderAwaitingPayment).toHaveBeenCalledWith(
          mockCheckoutState.checkout.checkoutOrderCharge.result,
        );
      });
    });

    describe('getSelectedShippingOption', () => {
      it('should return the selected shipping option of a checkout order when checkout details is not available', () => {
        const {
          result: {
            current: {
              helpers: { getSelectedShippingOption },
            },
          },
        } = renderHook(
          () => useCheckout(undefined, { enableAutoFetch: false }),
          {
            wrapper: withStore(mockCheckoutStateWithoutDetails),
          },
        );

        expect(getSelectedShippingOption()).toEqual(
          mockCheckoutOrderResultDenormalized.checkoutOrder
            .checkoutOrderMerchants[0]?.shipping,
        );
      });

      it('should return the selected shipping option of the checkout order details when it is available', () => {
        const {
          result: {
            current: {
              helpers: { getSelectedShippingOption },
            },
          },
        } = renderHook(
          () => useCheckout(undefined, { enableAutoFetch: false }),
          {
            wrapper: withStore(mockCheckoutState),
          },
        );

        expect(getSelectedShippingOption()).toEqual(
          mockCheckoutDetailsEntityDenormalized.checkoutOrder
            .checkoutOrderMerchants[0]?.shipping,
        );
      });

      it('should return undefined if there is no checkout order or checkout details in state', () => {
        const {
          result: {
            current: {
              helpers: { getSelectedShippingOption },
            },
          },
        } = renderHook(
          () => useCheckout(undefined, { enableAutoFetch: false }),
          {
            wrapper: withStore(mockInitialState),
          },
        );

        expect(getSelectedShippingOption()).toBeUndefined();
      });
    });

    describe('isShippingAddressZipCodeValid', () => {
      /**
       * Validating for Ireland (IE) use case
       */
      const zipCodeIrelandRegex =
        '^(?=.{7,8}$)^([AC-FHKNPRTV-Y]{1}[0-9]{2}|D6W)[ ]?[0-9AC-FHKNPRTV-Y]{4}$';
      const mockIrelandAddressSchema = [
        {
          addressSchemaLines: [
            {
              id: '9a24c613-18c5-4b0d-a789-d79369777262',
              parentId: '00000000-0000-0000-0000-000000000000',
              name: 'Postal Code',
              position: 0,
              type: 'FreeText',
              validationRegex: zipCodeIrelandRegex,
              apiMapping: 'ZipCode',
              isMandatory: true,
              maxLength: 45,
              minLength: 1,
              column: 0,
              row: 0,
            },
          ],
          addressType: 'Shipping',
        },
      ];

      it('should return false if there is no shipping address', async () => {
        const cloneMockState = cloneDeep(mockCheckoutState);

        // @ts-expect-error mocking purpose
        delete cloneMockState.entities.checkoutOrders[checkoutId]
          .shippingAddress;

        const {
          result: {
            current: {
              helpers: { isShippingAddressZipCodeValid },
            },
          },
        } = renderHook(
          () =>
            useCheckout(undefined, {
              enableAutoFetch: false,
              isoCodesToValidate: ['IE'],
            }),
          {
            wrapper: withStore(cloneMockState),
          },
        );

        expect(await isShippingAddressZipCodeValid()).toEqual({
          isValid: false,
        });
      });

      it('should fetch the addressSchema if does not exist', async () => {
        const cloneMockState = cloneDeep(mockCheckoutState);

        // @ts-expect-error mocking purpose
        delete cloneMockState.entities.countriesAddressSchemas;

        const {
          result: {
            current: {
              helpers: { isShippingAddressZipCodeValid },
            },
          },
        } = renderHook(
          () =>
            useCheckout(undefined, {
              enableAutoFetch: false,
              isoCodesToValidate: ['IE'],
            }),
          {
            wrapper: withStore(cloneMockState),
          },
        );

        await isShippingAddressZipCodeValid();

        expect(fetchCountryAddressSchemas).toHaveBeenCalledWith(
          cloneMockState.entities.checkoutOrders[checkoutId].shippingAddress
            .country.alpha2Code,
        );
      });

      it('should return isValid true if country shipping of a checkout order is not included in the isoCodesToValidate', async () => {
        const {
          result: {
            current: {
              helpers: { isShippingAddressZipCodeValid },
            },
          },
        } = renderHook(
          () =>
            useCheckout(undefined, {
              enableAutoFetch: false,
              isoCodesToValidate: ['IE'],
            }),
          {
            wrapper: withStore(mockCheckoutState),
          },
        );

        expect(useCountryAddressSchemas).toHaveBeenCalledWith(
          mockCheckoutState.entities.checkoutOrders[checkoutId].shippingAddress
            .country.alpha2Code,
          { enableAutoFetch: false },
        );
        expect(await isShippingAddressZipCodeValid()).toEqual({
          isValid: false,
          error: 'ER01',
        });
      });

      it('should return isValid true if country shipping of a checkout order is in isoCodesToValidate array and zip code is valid', async () => {
        const cloneMockState = cloneDeep(mockCheckoutState);

        // change alpha2Code from 'PT' to 'IE'
        cloneMockState.entities.checkoutOrders[
          checkoutId
        ].shippingAddress.country.alpha2Code = 'IE';
        // set a valid Ireland zip code format
        cloneMockState.entities.checkoutOrders[
          checkoutId
        ].shippingAddress.zipCode = 'D02 N725';

        // @ts-expect-error mocking purpose
        // add Ireland(IE) addressSchema
        cloneMockState.entities.countriesAddressSchemas['IE'] =
          mockIrelandAddressSchema;

        const {
          result: {
            current: {
              helpers: { isShippingAddressZipCodeValid },
            },
          },
        } = renderHook(
          () =>
            useCheckout(undefined, {
              enableAutoFetch: false,
              isoCodesToValidate: ['IE'],
            }),
          {
            wrapper: withStore(cloneMockState),
          },
        );

        expect(useCountryAddressSchemas).toHaveBeenCalledWith(
          cloneMockState.entities.checkoutOrders[checkoutId].shippingAddress
            .country.alpha2Code,
          { enableAutoFetch: false },
        );
        expect(await isShippingAddressZipCodeValid()).toEqual({
          isValid: true,
        });
      });

      it('should return isValid false if country shipping of a checkout order is in isoCodesToValidate array and zip code is not valid', async () => {
        const cloneMockState = cloneDeep(mockCheckoutState);

        // change alpha2Code from 'PT' to 'IE'
        cloneMockState.entities.checkoutOrders[
          checkoutId
        ].shippingAddress.country.alpha2Code = 'IE';

        // set an invalid ireland zip code format
        cloneMockState.entities.checkoutOrders[
          checkoutId
        ].shippingAddress.zipCode = 'D025';

        // @ts-expect-error mocking purpose
        cloneMockState.entities.countriesAddressSchemas['IE'] =
          mockIrelandAddressSchema;

        const {
          result: {
            current: {
              helpers: { isShippingAddressZipCodeValid },
            },
          },
        } = renderHook(
          () =>
            useCheckout(undefined, {
              enableAutoFetch: false,
              isoCodesToValidate: ['IE'],
            }),
          {
            wrapper: withStore(cloneMockState),
          },
        );

        expect(useCountryAddressSchemas).toHaveBeenCalledWith(
          cloneMockState.entities.checkoutOrders[checkoutId].shippingAddress
            .country.alpha2Code,
          { enableAutoFetch: false },
        );
        expect(await isShippingAddressZipCodeValid()).toEqual({
          isValid: false,
          error: 'ER03',
        });
      });
    });
  });
});
