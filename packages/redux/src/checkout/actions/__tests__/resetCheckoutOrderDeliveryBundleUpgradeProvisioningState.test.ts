import * as actionTypes from '../../actionTypes.js';
import { INITIAL_STATE } from '../../reducer.js';
import { mockStore } from '../../../../tests/index.js';
import resetCheckoutOrderDeliveryBundleUpgradeProvisioningState from '../resetCheckoutOrderDeliveryBundleUpgradeProvisioningState.js';

describe('resetCheckoutOrderDeliveryBundleUpgradeProvisioningState() action creator', () => {
  const checkoutMockStore = (state = {}) =>
    mockStore({ checkout: INITIAL_STATE }, state);
  let store: ReturnType<typeof checkoutMockStore>;

  beforeEach(() => {
    jest.clearAllMocks();
    store = checkoutMockStore();
  });

  it('should dispatch the correct action for when the reset checkout order delivery bundle upgrade provisioning state is called', () => {
    resetCheckoutOrderDeliveryBundleUpgradeProvisioningState()(store.dispatch);

    const actionResults = store.getActions();

    expect(actionResults).toMatchObject([
      {
        type: actionTypes.RESET_CHECKOUT_ORDER_DELIVERY_BUNDLE_UPGRADE_PROVISIONING_STATE,
      },
    ]);
  });
});
