import { Checkout } from './__fixtures__/Checkout.fixtures';
import {
  cleanup,
  fireEvent,
  renderHook,
  waitFor,
} from '@testing-library/react';
import {
  createCheckout as createCheckoutAction,
  fetchCheckout as fetchCheckoutAction,
  fetchCollectPoints as fetchCollectPointsAction,
  updateCheckout as updateCheckoutAction,
  updateGiftMessage as updateGiftMessageAction,
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
  createCheckout: jest.fn(() => ({ type: 'create' })),
  updateCheckout: jest.fn(() => ({ type: 'update' })),
  fetchCheckout: jest.fn(() => ({ type: 'get' })),
  fetchCheckoutDetails: jest.fn(() => ({ type: 'get_details' })),
  fetchCollectPoints: jest.fn(() => ({ type: 'get_collectpoints' })),
  fetchDeliveryBundleUpgrades: jest.fn(() => ({ type: 'get_upgrades' })),
  resetCheckoutState: jest.fn(() => ({ type: 'reset_checkout' })),
  updateGiftMessage: jest.fn(() => ({ type: 'update_giftmessage' })),
  setPromocode: jest.fn(() => ({ type: 'set_promocode' })),
  setTags: jest.fn(() => ({ type: 'set_tags' })),
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

    expect(typeof current.createCheckout).toBe('function');
    expect(typeof current.updateCheckout).toBe('function');
    expect(typeof current.fetchCheckout).toBe('function');
    expect(typeof current.fetchCheckoutDetails).toBe('function');
    expect(typeof current.fetchDeliveryBundleUpgrades).toBe('function');
    expect(typeof current.resetCheckoutState).toBe('function');
    expect(typeof current.updateGiftMessage).toBe('function');
    expect(typeof current.setPromocode).toBe('function');
    expect(typeof current.setTags).toBe('function');
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
    expect(createCheckoutAction).toHaveBeenCalledTimes(1);
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
    expect(createCheckoutAction).toHaveBeenCalledTimes(0);
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

      expect(createCheckoutAction).toHaveBeenCalledTimes(1);
      expect(queryByTestId('checkout-loading')).toBeNull();
      expect(queryByTestId('checkout-error')).toBeNull();
    });

    it('should call `update` action', () => {
      const { getByTestId, queryByTestId } = wrap(<Checkout />)
        .withStore(baseTestState)
        .render();

      fireEvent.click(getByTestId('checkout-updateButton'));

      expect(updateCheckoutAction).toHaveBeenCalledTimes(1);
      expect(queryByTestId('checkout-loading')).toBeNull();
      expect(queryByTestId('checkout-error')).toBeNull();
    });

    it('should call `get` action', () => {
      const { getByTestId, queryByTestId } = wrap(<Checkout />)
        .withStore(baseTestState)
        .render();

      fireEvent.click(getByTestId('checkout-getButton'));

      expect(fetchCheckoutAction).toHaveBeenCalledTimes(1);
      expect(queryByTestId('checkout-loading')).toBeNull();
      expect(queryByTestId('checkout-error')).toBeNull();
    });

    it('should call `update_giftmessage` action', () => {
      const { getByTestId, queryByTestId } = wrap(<Checkout />)
        .withStore(baseTestState)
        .render();

      fireEvent.click(getByTestId('checkout-giftmessage-updateButton'));

      expect(updateGiftMessageAction).toHaveBeenCalledTimes(1);
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

        expect(updateCheckoutAction).toHaveBeenCalledTimes(1);
      });
    });

    describe('handleSetBillingAddress', () => {
      it('should call handleSetBillingAddress', () => {
        const { getByTestId } = wrap(<Checkout />)
          .withStore(baseTestState)
          .render();

        fireEvent.click(getByTestId('checkout-handleSetBillingAddressButton'));

        expect(updateCheckoutAction).toHaveBeenCalledTimes(1);
      });
    });

    describe('handleSelectCollectPoint', () => {
      it('should call handleSelectCollectPoint', async () => {
        const { getByTestId } = wrap(<Checkout />)
          .withStore(baseTestState)
          .render();

        fireEvent.click(getByTestId('checkout-handleSelectCollectPointButton'));

        expect(updateCheckoutAction).toHaveBeenCalledTimes(1);

        await waitFor(() => {
          expect(
            getByTestId('checkout-selected-collectPoint').textContent,
          ).toBe('Selected collect point is 4567');
        });
      });
    });
  });
});
