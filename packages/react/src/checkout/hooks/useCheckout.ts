/**
 * Hook to provide all kinds of data for the business logic attached to checkout.
 */
import {
  areCheckoutDetailsLoading as areCheckoutDetailsLoadingSelector,
  areCollectPointsLoading as areCollectPointsLoadingSelector,
  areDeliveryBundleUpgradesLoading,
  createCheckout as createCheckoutAction,
  fetchCheckout as fetchCheckoutAction,
  fetchCheckoutDetails as fetchCheckoutDetailsAction,
  fetchCollectPoints as fetchCollectPointsAction,
  fetchDeliveryBundleUpgrades as fetchDeliveryBundleUpgradesAction,
  getBagId,
  getCheckout,
  getCheckoutDeliveryBundles,
  getCheckoutDeliveryBundlesIds,
  getCheckoutDetail,
  getCheckoutDetailsError,
  getCheckoutError,
  getCheckoutId,
  getCheckoutOrder,
  getCheckoutOrderCollectPoints,
  getCheckoutOrderItems,
  getCheckoutOrderItemsIds,
  getCollectPointsError,
  getPromoCodeError,
  isAuthenticated,
  isBagLoading as isBagLoadingSelector,
  isCheckoutLoading as isCheckoutLoadingSelector,
  isLoginLoading,
  isPromoCodeLoading as isPromoCodeLoadingSelector,
  resetCheckoutState as resetCheckoutStateAction,
  setPromocode as setPromocodeAction,
  setTags as setTagsAction,
  StoreState,
  updateCheckout as updateCheckoutAction,
  updateGiftMessage as updateGiftMessageAction,
} from '@farfetch/blackout-redux';
import { useAction } from '../../helpers';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export interface MetaData {
  guestEmail?: string;
  shippingMode?: string;
  createCheckoutOnMount?: boolean;
}

/**
 * @param data - Object containing the necessary info to use inside the hook.
 *
 * @returns All the handlers, state, actions and relevant data needed to manage checkout.
 */
const useCheckout = ({
  guestEmail,
  shippingMode,
  createCheckoutOnMount = true,
}: MetaData): any => {
  // Selectors
  const checkoutData = useSelector((state: StoreState) => getCheckout(state));
  const checkoutDetails = useSelector((state: StoreState) =>
    getCheckoutDetail(state),
  );
  const areCheckoutDetailsLoading = useSelector((state: StoreState) =>
    areCheckoutDetailsLoadingSelector(state),
  );
  const checkoutDetailsError = useSelector((state: StoreState) =>
    getCheckoutDetailsError(state),
  );
  const checkoutOrder = useSelector((state: StoreState) =>
    getCheckoutOrder(state),
  );
  const checkoutOrderItems = useSelector((state: StoreState) =>
    getCheckoutOrderItems(state),
  );
  const checkoutOrderItemsIds = useSelector((state: StoreState) =>
    getCheckoutOrderItemsIds(state),
  );
  const checkoutId = useSelector((state: StoreState) => getCheckoutId(state));
  const isCheckoutLoading = useSelector((state: StoreState) =>
    isCheckoutLoadingSelector(state),
  );
  const checkoutError = useSelector((state: StoreState) =>
    getCheckoutError(state),
  );
  const isGuest = useSelector((state: StoreState) => !isAuthenticated(state));
  const isAuthLoading = useSelector((state: StoreState) =>
    isLoginLoading(state),
  );
  const bagId = useSelector((state: StoreState) => getBagId(state));
  const isBagLoading = useSelector((state: StoreState) =>
    isBagLoadingSelector(state),
  );
  const collectPoints = useSelector((state: StoreState) =>
    getCheckoutOrderCollectPoints(state),
  );
  const areCollectPointsLoading = useSelector((state: StoreState) =>
    areCollectPointsLoadingSelector(state),
  );
  const collectPointsError = useSelector((state: StoreState) =>
    getCollectPointsError(state),
  );
  const isPromoCodeLoading = useSelector((state: StoreState) =>
    isPromoCodeLoadingSelector(state),
  );
  const promoCodeError = useSelector((state: StoreState) =>
    getPromoCodeError(state),
  );
  const deliveryBundles = useSelector((state: StoreState) =>
    getCheckoutDeliveryBundles(state),
  );
  const deliveryBundlesIds = useSelector((state: StoreState) =>
    getCheckoutDeliveryBundlesIds(state),
  );
  const areUpgradesLoading = useSelector((state: StoreState) =>
    areDeliveryBundleUpgradesLoading(state),
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
    areCheckoutDetailsLoading,
    checkoutDetailsError,
    checkoutOrder,
    checkoutOrderItems,
    checkoutOrderItemsIds,
    collectPoints,
    areCollectPointsLoading,
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
    areUpgradesLoading,
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

    handleGetCollectPoints,

    handleSelectCollectPoint,

    handleSetShippingAddress,

    handleSetBillingAddress,
  };
};
export default useCheckout;
