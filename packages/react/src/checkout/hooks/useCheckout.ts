/**
 * Hook to provide all kinds of data for the business logic attached to checkout.
 *
 * @module useCheckout
 * @category Checkout
 * @subcategory Hooks
 */
import * as selectors from '@farfetch/blackout-redux/checkout/selectors';
import {
  createCheckout as createCheckoutAction,
  fetchCheckout as fetchCheckoutAction,
  fetchCheckoutDetails as fetchCheckoutDetailsAction,
  fetchCollectPoints as fetchCollectPointsAction,
  fetchDeliveryBundleUpgrades as fetchDeliveryBundleUpgradesAction,
  resetCheckoutState as resetCheckoutStateAction,
  setPromocode as setPromocodeAction,
  setTags as setTagsAction,
  updateCheckout as updateCheckoutAction,
  updateGiftMessage as updateGiftMessageAction,
} from '@farfetch/blackout-redux/checkout';
import {
  getBagId,
  isBagLoading as isBagLoadingSelector,
} from '@farfetch/blackout-redux/bags/selectors';
import {
  isAuthenticated,
  isLoginLoading,
} from '@farfetch/blackout-redux/authentication/selectors';
import { useAction } from '../../helpers';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export interface MetaData {
  guestEmail?: string;
  shippingMode?: string;
  createCheckoutOnMount?: boolean;
}

/**
 * @typedef {object} MetaData
 *
 * @alias MetaData
 *
 * @property {string} [guestEmail]  - The guest email address.
 * @property {string} [shippingMode]  - The shipping mode for the order, byMerchant (default) or byBundle.
 * @property {boolean} [createCheckoutOnMount]  - List of items to checkout.
 */

/**
 * @function useCheckout
 * @memberof module:checkout/hooks
 *
 * @param {MetaData} data - Object containing the necessary info to use inside the hook.
 *
 * @returns {object} All the handlers, state, actions and relevant data needed to manage checkout.
 */
export default ({
  guestEmail,
  shippingMode,
  createCheckoutOnMount = true,
}: MetaData): any => {
  // Selectors
  const checkoutData = useSelector((state: any) =>
    selectors.getCheckout(state),
  );
  const checkoutDetails = useSelector((state: any) =>
    selectors.getCheckoutDetail(state),
  );
  const isCheckoutDetailsLoading = useSelector((state: any) =>
    selectors.isCheckoutDetailsLoading(state),
  );
  const checkoutDetailsError = useSelector((state: any) =>
    selectors.getCheckoutDetailsError(state),
  );
  const checkoutOrder = useSelector((state: any) =>
    selectors.getCheckoutOrder(state),
  );
  const checkoutOrderItems = useSelector((state: any) =>
    selectors.getCheckoutOrderItems(state),
  );
  const checkoutOrderItemsIds = useSelector((state: any) =>
    selectors.getCheckoutOrderItemsIds(state),
  );
  const checkoutId = useSelector((state: any) =>
    selectors.getCheckoutId(state),
  );
  const isCheckoutLoading = useSelector((state: any) =>
    selectors.isCheckoutLoading(state),
  );
  const checkoutError = useSelector((state: any) =>
    selectors.getCheckoutError(state),
  );
  const isGuest = useSelector((state: any) => !isAuthenticated(state));
  const isAuthLoading = useSelector((state: any) => isLoginLoading(state));
  const bagId = useSelector((state: any) => getBagId(state));
  const isBagLoading = useSelector((state: any) => isBagLoadingSelector(state));
  const collectPoints = useSelector((state: any) =>
    selectors.getCheckoutOrderCollectPoints(state),
  );
  const isCollectPointsLoading = useSelector((state: any) =>
    selectors.isCollectPointsLoading(state),
  );
  const collectPointsError = useSelector((state: any) =>
    selectors.getCollectPointsError(state),
  );
  const isPromoCodeLoading = useSelector((state: any) =>
    selectors.isPromoCodeLoading(state),
  );
  const promoCodeError = useSelector((state: any) =>
    selectors.getPromoCodeError(state),
  );
  const deliveryBundles = useSelector((state: any) =>
    selectors.getCheckoutDeliveryBundles(state),
  );
  const deliveryBundlesIds = useSelector((state: any) =>
    selectors.getCheckoutDeliveryBundlesIds(state),
  );
  const isUpgradesLoading = useSelector((state: any) =>
    selectors.isDeliveryBundleUpgradesLoading(state),
  );

  // Actions
  const createCheckout = useAction(createCheckoutAction);
  const resetCheckoutState = useAction(resetCheckoutStateAction);
  const fetchCheckout = useAction(fetchCheckoutAction);
  const fetchCheckoutDetails = useAction(fetchCheckoutDetailsAction);
  const fetchCollectPoints = useAction(fetchCollectPointsAction);
  const fetchDeliveryBundleUpgrades = useAction(
    fetchDeliveryBundleUpgradesAction,
  );
  const updateCheckout = useAction(updateCheckoutAction);
  const setPromocode = useAction(setPromocodeAction);
  const setTags = useAction(setTagsAction);
  const updateGiftMessage = useAction(updateGiftMessageAction);

  // State
  const [selectedCollectPoint, setSelectedCollectPoint] = useState<any | null>(
    null,
  );
  const [checkoutSelectedShipping, setCheckoutSelectedShipping] = useState<
    any | null
  >(null);
  const [checkoutSelectedBilling, setCheckoutSelectedBilling] = useState<
    any | null
  >(null);

  useEffect(() => {
    if (!createCheckoutOnMount) {
      return;
    }

    const isAuthorized = !isGuest || (isGuest && !!guestEmail);
    if (
      isAuthorized &&
      bagId &&
      !checkoutId &&
      !isAuthLoading &&
      !isBagLoading &&
      !isCheckoutLoading
    ) {
      createCheckout({
        bagId,
        guestUserEmail: guestEmail,
        usePaymentIntent: true,
        shippingMode: shippingMode,
      });
    }
  }, [checkoutId, guestEmail, bagId, isGuest]);

  const handleGetCollectPoints = async (checkoutId: number) => {
    await fetchCollectPoints({ orderId: checkoutId });
  };

  const handleSelectCollectPoint = async (
    checkoutId: number,
    clickAndCollect: { [k: string]: any },
    storeAddress: { [k: string]: any },
  ) => {
    const previousSelectedCollectPoint = selectedCollectPoint;
    try {
      await updateCheckout(checkoutId, {
        clickAndCollect,
        shippingAddress: storeAddress,
      });
      if (clickAndCollect?.collectPointId) {
        setSelectedCollectPoint(clickAndCollect.collectPointId);
      }
    } catch {
      setSelectedCollectPoint(previousSelectedCollectPoint);
    }
  };

  const handleSetShippingAddress = async (
    address: { id: number },
    isSameAsBilling = false,
  ) => {
    const data = isSameAsBilling
      ? {
          shippingAddress: address,
          billingAddress: address,
        }
      : {
          shippingAddress: address,
        };

    setCheckoutSelectedShipping(address.id);
    await updateCheckout(checkoutId, data);
  };

  const handleSetBillingAddress = async (address: { id: number }) => {
    setCheckoutSelectedBilling(address.id);
    await updateCheckout(checkoutId, {
      billingAddress: address,
    });
  };

  return {
    // State
    checkoutId,
    isCheckoutLoading,
    checkoutError,
    checkoutData,
    checkoutDetails,
    isCheckoutDetailsLoading,
    checkoutDetailsError,
    checkoutOrder,
    checkoutOrderItems,
    checkoutOrderItemsIds,
    collectPoints,
    isCollectPointsLoading,
    collectPointsError,
    selectedCollectPoint,
    checkoutSelectedShipping,
    checkoutSelectedBilling,
    setCheckoutSelectedShipping,
    setCheckoutSelectedBilling,
    isPromoCodeLoading,
    promoCodeError,
    deliveryBundles,
    deliveryBundlesIds,
    isUpgradesLoading,
    // Actions
    createCheckout,
    fetchCheckout,
    fetchCheckoutDetails,
    fetchDeliveryBundleUpgrades,
    resetCheckoutState,
    updateCheckout,
    updateGiftMessage,
    setPromocode,
    setTags,
    /**
     * @type {Function}
     * @variation Member
     *
     * @see {@link module:useCheckout~handleGetCollectPoints|handleGetCollectPoints} method
     */
    handleGetCollectPoints,
    /**
     * @type {Function}
     * @variation Member
     *
     * @see {@link module:useCheckout~handleSelectCollectPoint|handleSelectCollectPoint} method
     */
    handleSelectCollectPoint,
    /**
     * @type {Function}
     * @variation Member
     *
     * @see {@link module:useCheckout~handleSetShippingAddress|handleSetShippingAddress} method
     */
    handleSetShippingAddress,
    /**
     * @type {Function}
     * @variation Member
     *
     * @see {@link module:useCheckout~handleSetBillingAddress|handleSetBillingAddress} method
     */
    handleSetBillingAddress,
  };
};
