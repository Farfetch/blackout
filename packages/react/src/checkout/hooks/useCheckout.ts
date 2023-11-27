import {
  areCheckoutOrderPromocodesLoading as areCheckoutOrderPromocodesLoadingSelector,
  areCheckoutOrderTagsLoading as areCheckoutOrderTagsLoadingSelector,
  createCheckoutOrder,
  fetchCheckoutOrder,
  getCheckoutOrderError,
  getCheckoutOrderPromocodesError,
  getCheckoutOrderResult,
  getCheckoutOrderTagsError,
  isCheckoutOrderAwaitingPayment,
  isCheckoutOrderConfirmed,
  isCheckoutOrderFetched as isCheckoutOrderFetchedSelector,
  isCheckoutOrderLoading as isCheckoutOrderLoadingSelector,
  removeCheckoutOrderPromocodes,
  resetCheckout,
  setCheckoutOrderPromocodes,
  setCheckoutOrderTags,
  updateCheckoutOrder,
  getCheckoutOrderDeliveryBundles,
} from '@farfetch/blackout-redux';
import {
  type CheckoutAddress,
  type CheckoutOrder,
  type Config,
  type CountryAddressSchema,
  type GetCheckoutOrderQuery,
  type GetCollectPointsQuery,
  HttpHeaders,
  type PatchCheckoutOrderData,
  type PaymentInstrument,
  PaymentMethod,
  type PostCheckoutOrderChargeData,
  type PostCheckoutOrderDataWithBag,
  type PostCheckoutOrderDataWithItems,
  type PostPaymentIntentInstrumentData,
  type PutCheckoutOrderPromocodesData,
  type PutPaymentIntentInstrumentData,
} from '@farfetch/blackout-client';
import { useCallback, useEffect, useMemo } from 'react';
import {
  useCountryAddressSchemas,
  validateShippingAddressZipCode,
} from '../../index.js';
import { useSelector } from 'react-redux';
import { useUser } from '../../users/index.js';
import useAction from '../../helpers/useAction.js';
import useCheckoutOrderCharge from './useCheckoutOrderCharge.js';
import useCheckoutOrderDetails from './useCheckoutOrderDetails.js';
import useCollectPoints from './useCollectPoints.js';
import usePaymentIntentInstruments from '../../payments/hooks/usePaymentIntentInstruments.js';
import type { UseCheckoutOptions } from './types/index.js';

/**
 * Provides facilities to manage a checkout order.
 * If the `checkoutOrderId` parameter is not provided,
 * the hook will use the current checkout order instead
 * if available in the redux store.
 */
function useCheckout(
  checkoutOrderId?: CheckoutOrder['id'],
  options: UseCheckoutOptions = {},
) {
  const {
    enableAutoFetch = true,
    fetchConfig,
    fetchQuery,
    createData,
    createConfig,
    enableAutoCreate = false,
  } = options;

  const isCheckoutOrderLoading = useSelector(isCheckoutOrderLoadingSelector);
  const checkoutOrderError = useSelector(getCheckoutOrderError);
  const checkoutOrderResult = useSelector(getCheckoutOrderResult);
  const isCheckoutOrderFetched = useSelector(isCheckoutOrderFetchedSelector);
  const arePromocodesLoading = useSelector(
    areCheckoutOrderPromocodesLoadingSelector,
  );
  const promocodesError = useSelector(getCheckoutOrderPromocodesError);
  const areTagsLoading = useSelector(areCheckoutOrderTagsLoadingSelector);
  const tagsError = useSelector(getCheckoutOrderTagsError);
  const fetchAction = useAction(fetchCheckoutOrder);
  const createAction = useAction(createCheckoutOrder);
  const updateAction = useAction(updateCheckoutOrder);
  const setTagsAction = useAction(setCheckoutOrderTags);
  const setPromocodesAction = useAction(setCheckoutOrderPromocodes);
  const removePromocodesAction = useAction(removeCheckoutOrderPromocodes);
  const resetCheckoutState = useAction(resetCheckout);
  const getDeliveryBundles = useSelector(getCheckoutOrderDeliveryBundles);
  const deliveryBundlesSelect = getDeliveryBundles?.find((item: { isSelected: boolean; }) => item.isSelected);
  const { data: user } = useUser();

  const isAuthorized =
    !!user && ((user.isGuest && !!createData?.guestUserEmail) || !user.isGuest);

  const checkoutOrder = checkoutOrderResult?.checkoutOrder;
  const implicitCheckoutOrderId = checkoutOrderId || checkoutOrderResult?.id;
  const paymentIntentId =
    !checkoutOrderId || checkoutOrderId === checkoutOrderResult?.id
      ? checkoutOrder?.paymentIntentId
      : undefined;

  const {
    data: instrumentsTemp,
    isLoading: areInstrumentsLoadingTemp,
    isFetched: areInstrumentsFetchedTemp,
    error: instrumentsErrorTemp,
    actions: {
      fetch: fetchInstruments,
      create: createInstrumentAction,
      update: updateInstrumentAction,
      remove: removeInstrumentAction,
      reset: resetInstrumentsState,
    },
  } = usePaymentIntentInstruments(paymentIntentId, { enableAutoFetch: false });

  const instruments = instrumentsTemp;
  const areInstrumentsLoading = areInstrumentsLoadingTemp;
  const areInstrumentsFetched = areInstrumentsFetchedTemp;
  const instrumentsError = instrumentsErrorTemp;

  const {
    data: chargeResult,
    isLoading: isChargeLoading,
    isFetched: isChargeFetched,
    error: chargeError,
    actions: {
      create: chargeAction,
      fetch: fetchChargeAction,
      reset: resetChargeState,
    },
  } = useCheckoutOrderCharge(implicitCheckoutOrderId, undefined, {
    enableAutoFetch: false,
  });

  const defaultFetchCollectPointsQuery: GetCollectPointsQuery | undefined =
    useMemo(() => {
      if (!implicitCheckoutOrderId) {
        return undefined;
      }

      return {
        orderId: implicitCheckoutOrderId,
      };
    }, [implicitCheckoutOrderId]);

  const {
    isLoading: areCollectPointsLoading,
    isFetched: areCollectPointsFetched,
    error: collectPointsError,
    data: collectPoints,
    actions: { fetch: fetchCollectPointsAction, reset: resetCollectPoints },
  } = useCollectPoints(defaultFetchCollectPointsQuery, {
    enableAutoFetch: false,
  });

  const {
    isLoading: areDetailsLoading,
    error: detailsError,
    data: checkoutOrderDetails,
    isFetched: areDetailsFetched,
    actions: { fetch: fetchDetails, reset: resetDetailsState },
  } = useCheckoutOrderDetails(implicitCheckoutOrderId, {
    enableAutoFetch: false,
  });

  const checkoutSpecificConfig = useMemo(
    () => ({
      headers: {
        [HttpHeaders.AcceptLanguage]:
          checkoutOrder?.shippingAddress?.country.culture,
        [HttpHeaders.FFCountry]:
          checkoutOrder?.shippingAddress?.country.alpha2Code,
        [HttpHeaders.FFCurrency]: checkoutOrder?.currency,
      },
    }),
    [
      checkoutOrder?.currency,
      checkoutOrder?.shippingAddress?.country.alpha2Code,
      checkoutOrder?.shippingAddress?.country.culture,
    ],
  );

  const fetch = useCallback(
    (
      query: GetCheckoutOrderQuery | undefined = fetchQuery,
      config: Config | undefined = fetchConfig,
    ) => {
      if (!implicitCheckoutOrderId) {
        return Promise.reject(new Error('Missing checkout order id.'));
      }

      return fetchAction(implicitCheckoutOrderId, query, config);
    },
    [fetchQuery, fetchConfig, implicitCheckoutOrderId, fetchAction],
  );

  const update = useCallback(
    (data: PatchCheckoutOrderData, config?: Config) => {
      if (!implicitCheckoutOrderId) {
        return Promise.reject(new Error('Missing checkout order id.'));
      }

      return updateAction(implicitCheckoutOrderId, data, config);
    },
    [implicitCheckoutOrderId, updateAction],
  );

  const setTags = useCallback(
    (data: string[], config?: Config) => {
      if (!implicitCheckoutOrderId) {
        return Promise.reject(new Error('Missing checkout order id.'));
      }

      return setTagsAction(implicitCheckoutOrderId, data, config);
    },
    [implicitCheckoutOrderId, setTagsAction],
  );

  const setPromocodes = useCallback(
    (data: PutCheckoutOrderPromocodesData, config?: Config) => {
      if (!implicitCheckoutOrderId) {
        return Promise.reject(new Error('Missing checkout order id.'));
      }

      return setPromocodesAction(implicitCheckoutOrderId, data, config);
    },
    [implicitCheckoutOrderId, setPromocodesAction],
  );

  const removePromocodes = useCallback(
    (config?: Config) => {
      if (!implicitCheckoutOrderId) {
        return Promise.reject(new Error('Missing checkout order id.'));
      }

      return removePromocodesAction(implicitCheckoutOrderId, config);
    },
    [implicitCheckoutOrderId, removePromocodesAction],
  );

  const create = useCallback(
    (
      createData:
        | PostCheckoutOrderDataWithItems
        | PostCheckoutOrderDataWithBag
        | undefined = options.createData,
      config: Config | undefined = options.createConfig,
    ) => {
      if (!createData) {
        return Promise.reject(
          new Error('Invalid `createData` parameter was provided for `create`'),
        );
      }

      return createAction(createData, config);
    },
    [options.createData, options.createConfig, createAction],
  );

  const charge = useCallback(
    (data: PostCheckoutOrderChargeData, config?: Config) => {
      return chargeAction(data, {
        ...checkoutSpecificConfig,
        ...config,
      });
    },
    [chargeAction, checkoutSpecificConfig],
  );

  const fetchCharge = useCallback(
    (config?: Config) => {
      return fetchChargeAction({
        ...checkoutSpecificConfig,
        ...config,
      });
    },
    [checkoutSpecificConfig, fetchChargeAction],
  );

  const createInstrument = useCallback(
    (data: PostPaymentIntentInstrumentData, config?: Config) => {
      return createInstrumentAction(data, {
        ...checkoutSpecificConfig,
        ...config,
      });
    },
    [createInstrumentAction, checkoutSpecificConfig],
  );

  const updateInstrument = useCallback(
    (
      paymentInstrumentId: PaymentInstrument['id'],
      data: PutPaymentIntentInstrumentData,
      config?: Config,
    ) => {
      return updateInstrumentAction(paymentInstrumentId, data, {
        ...checkoutSpecificConfig,
        ...config,
      });
    },
    [checkoutSpecificConfig, updateInstrumentAction],
  );

  const removeInstrument = useCallback(
    (paymentInstrumentId: PaymentInstrument['id'], config?: Config) => {
      if (!paymentInstrumentId) {
        return Promise.reject(
          new Error(
            'Invalid `paymentInstrumentId` parameter was provided for `removeInstrument`',
          ),
        );
      }

      return removeInstrumentAction(paymentInstrumentId, {
        ...checkoutSpecificConfig,
        ...config,
      });
    },
    [checkoutSpecificConfig, removeInstrumentAction],
  );

  const fetchCollectPoints = useCallback(
    (
      config?: Config,
      query: GetCollectPointsQuery | undefined = defaultFetchCollectPointsQuery,
    ) => {
      return fetchCollectPointsAction(config, query);
    },
    [defaultFetchCollectPointsQuery, fetchCollectPointsAction],
  );

  const reset = useCallback(() => {
    resetCheckoutState();
    resetInstrumentsState();
  }, [resetCheckoutState, resetInstrumentsState]);

  const getUpdateInstrumentData = useCallback(
    (
      overrides?: Partial<PutPaymentIntentInstrumentData> & {
        guestUserEmail?: string;
      },
    ) => {
      if (!checkoutOrder || !user) {
        return undefined;
      }

      // Delete the guestUserEmail property from the
      // overrides object to avoid it polluting the response.
      const overridesCopy = { ...overrides };
      const guestUserEmail = overridesCopy?.guestUserEmail;

      delete overridesCopy?.guestUserEmail;

      const isRegisteredUser = !!user && !user.isGuest;
      const data: PutPaymentIntentInstrumentData = {
        ...overridesCopy,
        amounts: overridesCopy?.amounts || [
          { value: checkoutOrder?.grandTotal },
        ],
        payer: overridesCopy?.payer || {
          id: `${user?.id}`,
          firstName: isRegisteredUser
            ? user.firstName || undefined
            : checkoutOrder.billingAddress.firstName,
          lastName: isRegisteredUser
            ? user.lastName || undefined
            : checkoutOrder.billingAddress.lastName,
          email: isRegisteredUser ? user?.email : guestUserEmail,
          address: checkoutOrder.billingAddress,
        },
      };

      return data;
    },
    [checkoutOrder, user],
  );

  const getCreateInstrumentData = useCallback(
    (
      overrides?: Partial<PostPaymentIntentInstrumentData> & {
        guestUserEmail?: string;
      },
    ) => {
      if (!checkoutOrder || !user) {
        return undefined;
      }

      const method = overrides?.method || PaymentMethod.CreditCard;
      const isRegisteredUser = !!user && !user.isGuest;
      // Delete the guestUserEmail property from the
      // overrides object to avoid it polluting the response.
      const overridesCopy = { ...overrides };
      const guestUserEmail = overridesCopy?.guestUserEmail;

      delete overridesCopy?.guestUserEmail;

      const data: PostPaymentIntentInstrumentData = {
        ...overridesCopy,
        method,
        amounts: overridesCopy?.amounts || [
          { value: checkoutOrder.grandTotal },
        ],
        payer: overridesCopy?.payer || {
          id: `${user.id}`,
          firstName: isRegisteredUser
            ? user.firstName || undefined
            : checkoutOrder.billingAddress.firstName,
          lastName: isRegisteredUser
            ? user.lastName || undefined
            : checkoutOrder.billingAddress.lastName,
          email: isRegisteredUser ? user?.email : guestUserEmail,
          address: checkoutOrder.billingAddress,
        },
        data: {
          creditUserId:
            method === PaymentMethod.CreditCard ? `${user.id}` : undefined,
          ...overridesCopy?.data,
        },
      };

      return data;
    },
    [checkoutOrder, user],
  );

  const isAnythingLoading = useMemo(() => {
    return (
      isCheckoutOrderLoading ||
      isChargeLoading ||
      areDetailsLoading ||
      areInstrumentsLoading ||
      areCollectPointsLoading ||
      areTagsLoading ||
      arePromocodesLoading
    );
  }, [
    areCollectPointsLoading,
    areDetailsLoading,
    areInstrumentsLoading,
    areTagsLoading,
    isChargeLoading,
    isCheckoutOrderLoading,
    arePromocodesLoading,
  ]);

  const data = useMemo(() => {
    if (
      !checkoutOrderResult &&
      !chargeResult &&
      !checkoutOrderDetails &&
      !instruments &&
      !collectPoints
    ) {
      return undefined;
    }

    return {
      checkoutOrder: checkoutOrderResult,
      charge: chargeResult,
      details: checkoutOrderDetails,
      instruments,
      collectPoints,
    };
  }, [
    chargeResult,
    checkoutOrderDetails,
    checkoutOrderResult,
    collectPoints,
    instruments,
  ]);

  const orderStatus = data?.checkoutOrder?.checkoutOrder?.status;
  const checkoutOrderCharge = data?.charge;
  const orderChargeStatus = checkoutOrderCharge?.status;

  const isOrderConfirmed = useCallback(() => {
    return isCheckoutOrderConfirmed(orderChargeStatus, orderStatus);
  }, [orderChargeStatus, orderStatus]);

  const isOrderAwaitingPayment = useCallback(() => {
    return isCheckoutOrderAwaitingPayment(checkoutOrderCharge);
  }, [checkoutOrderCharge]);

  const getSelectedShippingOption = useCallback(() => {
    return (checkoutOrderDetails?.checkoutOrder || checkoutOrder)
      ?.checkoutOrderMerchants?.[0]?.shipping;
  }, [checkoutOrder, checkoutOrderDetails?.checkoutOrder]);

  // If checkoutOrderId parameter was passed and it is different
  // than the current checkoutOrderId in the store, reset all data
  // in redux.
  if (
    checkoutOrderId &&
    checkoutOrderResult?.id &&
    checkoutOrderId !== checkoutOrderResult?.id
  ) {
    reset();
  }

  const {
    data: { countryAddressSchemas },
    actions: { fetch: fetchCountryAddressSchemas },
  } = useCountryAddressSchemas(
    (checkoutOrder?.shippingAddress?.country.alpha2Code as string) || '',
    { enableAutoFetch: false },
  );

  const isShippingAddressZipCodeValid = useCallback(
    async (
      shippingAddress:
        | CheckoutAddress
        | undefined = checkoutOrder?.shippingAddress,
    ) => {
      let addressSchema: CountryAddressSchema[] | undefined =
        countryAddressSchemas;

      if (!shippingAddress) {
        return { isValid: false };
      }

      if (!addressSchema) {
        addressSchema = await fetchCountryAddressSchemas(
          shippingAddress?.country.alpha2Code,
        );
      }

      return validateShippingAddressZipCode(shippingAddress, addressSchema);
    },
    [
      countryAddressSchemas,
      checkoutOrder?.shippingAddress,
      fetchCountryAddressSchemas,
    ],
  );

  useEffect(() => {
    if (
      enableAutoCreate &&
      !isCheckoutOrderLoading &&
      !isCheckoutOrderFetched &&
      !checkoutOrderId &&
      createData &&
      isAuthorized
    ) {
      create(createData, createConfig);
    }
  }, [
    checkoutOrderId,
    createData,
    enableAutoCreate,
    isAuthorized,
    isCheckoutOrderLoading,
    isCheckoutOrderFetched,
    create,
    createConfig,
  ]);

  useEffect(() => {
    if (
      !isCheckoutOrderLoading &&
      !isCheckoutOrderFetched &&
      enableAutoFetch &&
      checkoutOrderId &&
      user
    ) {
      fetch();
    }
  }, [
    checkoutOrderId,
    enableAutoFetch,
    fetch,
    fetchConfig,
    fetchQuery,
    isCheckoutOrderFetched,
    isCheckoutOrderLoading,
    user,
  ]);

  return {
    actions: {
      fetch,
      fetchCharge,
      fetchDetails,
      fetchInstruments,
      fetchCollectPoints,
      create,
      createInstrument,
      update,
      updateInstrument,
      removeInstrument,
      setTags,
      setPromocodes,
      removePromocodes,
      charge,
      reset,
      resetCheckoutState,
      resetChargeState,
      resetCollectPoints,
      resetDetailsState,
      resetInstrumentsState,
    },
    helpers: {
      getCreateInstrumentData,
      getUpdateInstrumentData,
      isOrderConfirmed,
      isOrderAwaitingPayment,
      getSelectedShippingOption,
      getDeliveryBundles,
      deliveryBundlesSelect,
      isShippingAddressZipCodeValid,
    },
    data,
    isAnythingLoading,
    isCheckoutOrderLoading,
    isChargeLoading,
    arePromocodesLoading,
    areDetailsLoading,
    areInstrumentsLoading,
    areCollectPointsLoading,
    areTagsLoading,
    areCollectPointsFetched,
    areDetailsFetched,
    areInstrumentsFetched,
    isChargeFetched,
    isCheckoutOrderFetched,
    collectPointsError,
    checkoutOrderError,
    chargeError,
    detailsError,
    instrumentsError,
    promocodesError,
    tagsError,
  };
}

export default useCheckout;
