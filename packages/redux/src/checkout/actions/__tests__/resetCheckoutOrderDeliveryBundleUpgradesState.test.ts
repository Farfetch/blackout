import * as actionTypes from '../../actionTypes';
import { INITIAL_STATE } from '../../reducer';
import { mockStore } from '../../../../tests';
import resetCheckoutOrderDeliveryBundleUpgradesState from '../resetCheckoutOrderDeliveryBundleUpgradesState';

describe('resetCheckoutOrderDeliveryBundleUpgradesState() action creator', () => {
  const checkoutMockStore = (state = {}) =>
    mockStore({ checkout: INITIAL_STATE }, state);
  let store: ReturnType<typeof checkoutMockStore>;

  beforeEach(() => {
    jest.clearAllMocks();
    store = checkoutMockStore();
  });

  it('should dispatch the correct action for when the reset delivery bundle upgrades state is called', () => {
    resetCheckoutOrderDeliveryBundleUpgradesState()(store.dispatch);
    const actionResults = store.getActions();

    expect(actionResults).toMatchObject([
      {
        type: actionTypes.RESET_CHECKOUT_ORDER_DELIVERY_BUNDLE_UPGRADES_STATE,
      },
    ]);
  });
});