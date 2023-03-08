import * as actionTypes from '../../actionTypes.js';
import { INITIAL_STATE } from '../../reducer.js';
import { mockStore } from '../../../../tests/index.js';
import resetCheckoutOrderDeliveryBundleProvisioningState from '../resetCheckoutOrderDeliveryBundleProvisioningState.js';

describe('resetCheckoutOrderDeliveryBundleProvisioningState() action creator', () => {
  const checkoutMockStore = (state = {}) =>
    mockStore({ checkout: INITIAL_STATE }, state);
  let store: ReturnType<typeof checkoutMockStore>;

  beforeEach(() => {
    jest.clearAllMocks();
    store = checkoutMockStore();
  });

  it('should dispatch the correct action for when the reset checkout order delivery bundle provisioning state is called', () => {
    resetCheckoutOrderDeliveryBundleProvisioningState()(store.dispatch);

    const actionResults = store.getActions();

    expect(actionResults).toMatchObject([
      {
        type: actionTypes.RESET_CHECKOUT_ORDER_DELIVERY_BUNDLE_PROVISIONING_STATE,
      },
    ]);
  });
});
