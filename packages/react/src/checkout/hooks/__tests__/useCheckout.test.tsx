import { Checkout } from './__fixtures__/Checkout.fixtures';
import {
  cleanup,
  fireEvent,
  renderHook,
  waitFor,
} from '@testing-library/react';
import {
  createCheckoutOrder as createCheckoutOrderAction,
  fetchCheckoutOrder as fetchCheckoutOrderAction,
  fetchCollectPoints as fetchCollectPointsAction,
  updateCheckoutOrder as updateCheckoutOrderAction,
  updateCheckoutOrderItems as updateCheckoutOrderItemsAction,
} from '@farfetch/blackout-redux';
import {
  expectedNormalizedPayload,
  mockAuthenticationState,
} from 'tests/__fixtures__/authentication';
import { mockInitialState as mockBagState } from 'tests/__fixtures__/bags';
import {
  mockCheckoutState,
  mockErrorState,
  mockLoadingState,
} from 'tests/__fixtures__/checkout';
import { mockStore, wrap } from '../../../../tests/helpers';
import { Provider } from 'react-redux';
import { useCheckout } from '../..';
// import React from 'react';

jest.mock('@farfetch/blackout-redux', () => ({
  ...jest.requireActual('@farfetch/blackout-redux'),
  createCheckoutOrder: jest.fn(() => ({ type: 'create' })),
  updateCheckoutOrder: jest.fn(() => ({ type: 'update' })),
  fetchCheckoutOrder: jest.fn(() => ({ type: 'get' })),
  fetchCheckoutOrderDetails: jest.fn(() => ({ type: 'get_details' })),
  fetchCollectPoints: jest.fn(() => ({ type: 'get_collectpoints' })),
  fetchCheckoutOrderDeliveryBundleUpgrades: jest.fn(() => ({
    type: 'get_upgrades',
  })),
  resetCheckoutState: jest.fn(() => ({ type: 'reset_checkout' })),
  updateCheckoutOrderItems: jest.fn(() => ({
    type: 'update_checkout_order_items',
  })),
  setCheckoutOrderPromocode: jest.fn(() => ({ type: 'set_promocode' })),
  setCheckoutOrderTags: jest.fn(() => ({ type: 'set_tags' })),
}));

describe('useCheckout', () => {
  beforeEach(jest.clearAllMocks);
  afterEach(cleanup);

  const baseTestState = {
    ...mockAuthenticationState,
    ...mockBagState,
    ...mockCheckoutState,
    entities: {
      ...mockCheckoutState.entities,
      ...expectedNormalizedPayload.entities,
    },
  };

  it('should return functions correctly', () => {
    const {
      result: { current },
    } = renderHook(() => useCheckout({}), {
      wrapper: props => (
        <Provider store={mockStore(baseTestState)} {...props} />
      ),
    });

    expect(typeof current.createCheckoutOrder).toBe('function');
    expect(typeof current.updateCheckoutOrder).toBe('function');
    expect(typeof current.fetchCheckoutOrder).toBe('function');
    expect(typeof current.fetchCheckoutOrderDetails).toBe('function');
    expect(typeof current.fetchCheckoutOrderDeliveryBundleUpgrades).toBe(
      'function',
    );
    expect(typeof current.resetCheckoutState).toBe('function');
    expect(typeof current.updateCheckoutOrderItems).toBe('function');
    expect(typeof current.setCheckoutOrderPromocode).toBe('function');
    expect(typeof current.setCheckoutOrderTags).toBe('function');
  });

  it('should render in loading state', () => {
    const testState = {
      ...mockAuthenticationState,
      ...mockBagState,
      ...mockLoadingState,
    };
    const { container, getByTestId } = wrap(<Checkout />)
      .withStore(testState)
      .render();

    expect(getByTestId('checkout-loading').textContent).toBe('yes');

    expect(container).toMatchSnapshot();
  });

  it('should render in error state', () => {
    const testState = {
      ...mockAuthenticationState,
      ...mockBagState,
      ...mockErrorState,
    };
    const { container, getByTestId } = wrap(<Checkout />)
      .withStore(testState)
      .render();

    expect(getByTestId('checkout-error').textContent).toBe(
      'Error: Checkout with error',
    );

    expect(container).toMatchSnapshot();
  });

  it('useEffect on mount checkout', () => {
    const createCheckoutMock = {
      ...baseTestState,
      checkout: {
        ...baseTestState.checkout,
        id: undefined,
      },
    };

    renderHook(() => useCheckout({}), {
      wrapper: props => (
        <Provider store={mockStore(createCheckoutMock)} {...props} />
      ),
    });
    expect(createCheckoutOrderAction).toHaveBeenCalledTimes(1);
  });

  it('useEffect on mount checkout should not run', () => {
    const createCheckoutMock = {
      ...baseTestState,
      checkout: {
        ...baseTestState.checkout,
        id: undefined,
      },
    };

    renderHook(() => useCheckout({ createCheckoutOnMount: false }), {
      wrapper: props => (
        <Provider store={mockStore(createCheckoutMock)} {...props} />
      ),
    });
    expect(createCheckoutOrderAction).toHaveBeenCalledTimes(0);
  });

  describe('actions', () => {
    it('should call `create` action', () => {
      const createCheckoutMock = {
        ...baseTestState,
        checkout: {
          ...baseTestState.checkout,
          id: null,
        },
      };
      const { queryByTestId } = wrap(<Checkout />)
        .withStore(createCheckoutMock)
        .render();

      expect(createCheckoutOrderAction).toHaveBeenCalledTimes(1);
      expect(queryByTestId('checkout-loading')).toBeNull();
      expect(queryByTestId('checkout-error')).toBeNull();
    });

    it('should call `update` action', () => {
      const { getByTestId, queryByTestId } = wrap(<Checkout />)
        .withStore(baseTestState)
        .render();

      fireEvent.click(getByTestId('checkout-updateButton'));

      expect(updateCheckoutOrderAction).toHaveBeenCalledTimes(1);
      expect(queryByTestId('checkout-loading')).toBeNull();
      expect(queryByTestId('checkout-error')).toBeNull();
    });

    it('should call `get` action', () => {
      const { getByTestId, queryByTestId } = wrap(<Checkout />)
        .withStore(baseTestState)
        .render();

      fireEvent.click(getByTestId('checkout-getButton'));

      expect(fetchCheckoutOrderAction).toHaveBeenCalledTimes(1);
      expect(queryByTestId('checkout-loading')).toBeNull();
      expect(queryByTestId('checkout-error')).toBeNull();
    });

    it('should call `update_checkout_order_items` action', () => {
      const { getByTestId, queryByTestId } = wrap(<Checkout />)
        .withStore(baseTestState)
        .render();

      fireEvent.click(getByTestId('checkout-giftmessage-updateButton'));

      expect(updateCheckoutOrderItemsAction).toHaveBeenCalledTimes(1);
      expect(queryByTestId('checkout-loading')).toBeNull();
      expect(queryByTestId('checkout-error')).toBeNull();
    });
  });

  describe('handle functions', () => {
    describe('handleGetCollectPoints', () => {
      it('should call handleGetCollectPoints', () => {
        const { getByTestId } = wrap(<Checkout />)
          .withStore(baseTestState)
          .render();
        fireEvent.click(getByTestId('checkout-handleGetCollectPointsButton'));

        expect(fetchCollectPointsAction).toHaveBeenCalledTimes(1);
      });
    });

    describe('handleSetShippingAddress', () => {
      it('should call handleSetShippingAddress', () => {
        const { getByTestId } = wrap(<Checkout />)
          .withStore(baseTestState)
          .render();

        fireEvent.click(getByTestId('checkout-handleSetShippingAddressButton'));

        expect(updateCheckoutOrderAction).toHaveBeenCalledTimes(1);
      });
    });

    describe('handleSetBillingAddress', () => {
      it('should call handleSetBillingAddress', () => {
        const { getByTestId } = wrap(<Checkout />)
          .withStore(baseTestState)
          .render();

        fireEvent.click(getByTestId('checkout-handleSetBillingAddressButton'));

        expect(updateCheckoutOrderAction).toHaveBeenCalledTimes(1);
      });
    });

    describe('handleSelectCollectPoint', () => {
      it('should call handleSelectCollectPoint', async () => {
        const { getByTestId } = wrap(<Checkout />)
          .withStore(baseTestState)
          .render();

        fireEvent.click(getByTestId('checkout-handleSelectCollectPointButton'));

        expect(updateCheckoutOrderAction).toHaveBeenCalledTimes(1);

        await waitFor(() => {
          expect(
            getByTestId('checkout-selected-collectPoint').textContent,
          ).toBe('Selected collect point is 4567');
        });
      });
    });
  });
});
