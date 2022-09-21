/**
 * Hook to provide all kinds of data for the business logic attached to checkout.
 */
import {
  areCheckoutOrderDeliveryBundleUpgradesLoading,
  areCheckoutOrderDetailsLoading as areCheckoutOrderDetailsLoadingSelector,
  areCollectPointsLoading as areCollectPointsLoadingSelector,
  createCheckoutOrder as createCheckoutOrderAction,
  fetchCheckoutOrder as fetchCheckoutOrderAction,
  fetchCheckoutOrderDeliveryBundleUpgrades as fetchCheckoutOrderDeliveryBundleUpgradesAction,
  fetchCheckoutOrderDetails as fetchCheckoutOrderDetailsAction,
  fetchCollectPoints as fetchCollectPointsAction,
  getBagId,
  getCheckout,
  getCheckoutDeliveryBundles,
  getCheckoutDeliveryBundlesIds,
  getCheckoutError,
  getCheckoutId,
  getCheckoutOrder,
  getCheckoutOrderCollectPoints,
  getCheckoutOrderDetails,
  getCheckoutOrderDetailsError,
  getCheckoutOrderItems,
  getCheckoutOrderItemsIds,
  getCheckoutOrderPromocodeError,
  getCollectPointsError,
  isAuthenticated,
  isBagLoading as isBagLoadingSelector,
  isCheckoutLoading as isCheckoutLoadingSelector,
  isCheckoutOrderPromocodeLoading as isCheckoutOrderPromocodeLoadingSelector,
  isLoginLoading,
  resetCheckout as resetCheckoutAction,
  setCheckoutOrderPromocode as setCheckoutOrderPromocodeAction,
  setCheckoutOrderTags as setCheckoutOrderTagsAction,
  StoreState,
  updateCheckoutOrder as updateCheckoutOrderAction,
  updateCheckoutOrderItems as updateCheckoutOrderItemsAction,
} from '@farfetch/blackout-redux';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import useAction from '../../helpers/useAction';
import type {
  ClickAndCollect,
  ShippingMode,
  StoreAddress,
  UserAddress,
} from '@farfetch/blackout-client';

export interface UseCheckoutOptions {
  guestEmail?: string;
  shippingMode?: ShippingMode;
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
}: UseCheckoutOptions) => {
  // Selectors
  const checkoutData = useSelector((state: StoreState) => getCheckout(state));
  const checkoutDetails = useSelector((state: StoreState) =>
    getCheckoutOrderDetails(state),
  );
  const areCheckoutOrderDetailsLoading = useSelector((state: StoreState) =>
    areCheckoutOrderDetailsLoadingSelector(state),
  );
  const checkoutOrderDetailsError = useSelector((state: StoreState) =>
    getCheckoutOrderDetailsError(state),
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
  const isPromocodeLoading = useSelector((state: StoreState) =>
    isCheckoutOrderPromocodeLoadingSelector(state),
  );
  const promocodeError = useSelector((state: StoreState) =>
    getCheckoutOrderPromocodeError(state),
  );
  const deliveryBundles = useSelector((state: StoreState) =>
    getCheckoutDeliveryBundles(state),
  );
  const deliveryBundlesIds = useSelector((state: StoreState) =>
    getCheckoutDeliveryBundlesIds(state),
  );
  const areUpgradesLoading = useSelector((state: StoreState) =>
    areCheckoutOrderDeliveryBundleUpgradesLoading(state),
  );

  // Actions
  const createCheckoutOrder = useAction(createCheckoutOrderAction);
  const resetCheckout = useAction(resetCheckoutAction);
  const fetchCheckoutOrder = useAction(fetchCheckoutOrderAction);
  const fetchCheckoutOrderDetails = useAction(fetchCheckoutOrderDetailsAction);
  const fetchCollectPoints = useAction(fetchCollectPointsAction);
  const fetchCheckoutOrderDeliveryBundleUpgrades = useAction(
    fetchCheckoutOrderDeliveryBundleUpgradesAction,
  );
  const updateCheckoutOrder = useAction(updateCheckoutOrderAction);
  const setCheckoutOrderPromocode = useAction(setCheckoutOrderPromocodeAction);
  const setCheckoutOrderTags = useAction(setCheckoutOrderTagsAction);
  const updateCheckoutOrderItems = useAction(updateCheckoutOrderItemsAction);

  // State
  const [selectedCollectPoint, setSelectedCollectPoint] = useState<
    ClickAndCollect['collectPointId'] | null
  >(null);
  const [checkoutSelectedShipping, setCheckoutSelectedShipping] = useState<
    UserAddress['id'] | null
  >(null);
  const [checkoutSelectedBilling, setCheckoutSelectedBilling] = useState<
    UserAddress['id'] | null
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
      createCheckoutOrder({
        bagId,
        guestUserEmail: guestEmail,
        usePaymentIntent: true,
        shippingMode: shippingMode,
      });
    }
  }, [
    checkoutId,
    guestEmail,
    bagId,
    isGuest,
    createCheckoutOnMount,
    isAuthLoading,
    isBagLoading,
    isCheckoutLoading,
    createCheckoutOrder,
    shippingMode,
  ]);

  const handleGetCollectPoints = async (checkoutId: number) => {
    await fetchCollectPoints({ orderId: checkoutId });
  };

  const handleSelectCollectPoint = async (
    checkoutId: number,
    clickAndCollect: ClickAndCollect,
    storeAddress: StoreAddress,
  ) => {
    const previousSelectedCollectPoint = selectedCollectPoint;
    try {
      await updateCheckoutOrder(checkoutId, {
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
    address: UserAddress,
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

    if (!checkoutId) {
      return;
    }

    await updateCheckoutOrder(checkoutId, data);
  };

  const handleSetBillingAddress = async (address: UserAddress) => {
    setCheckoutSelectedBilling(address.id);

    if (!checkoutId) {
      return;
    }

    await updateCheckoutOrder(checkoutId, {
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
    areCheckoutOrderDetailsLoading,
    checkoutOrderDetailsError,
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
    isPromocodeLoading,
    promocodeError,
    deliveryBundles,
    deliveryBundlesIds,
    areUpgradesLoading,
    // Actions
    createCheckoutOrder,
    fetchCheckoutOrder,
    fetchCheckoutOrderDetails,
    fetchCheckoutOrderDeliveryBundleUpgrades,
    resetCheckout,
    updateCheckoutOrder,
    updateCheckoutOrderItems,
    setCheckoutOrderPromocode,
    setCheckoutOrderTags,

    handleGetCollectPoints,

    handleSelectCollectPoint,

    handleSetShippingAddress,

    handleSetBillingAddress,
  };
};
export default useCheckout;
