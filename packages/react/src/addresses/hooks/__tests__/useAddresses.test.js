import {
  address2,
  mockCurrentState,
  mockErrorState,
  mockInitialState,
  mockLoadingState,
  userId,
} from 'tests/__fixtures__/addresses';
import { Addresses } from './__fixtures__/Adresses.fixtures';
import {
  cleanup,
  fireEvent,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import {
  createAddress as createAddressAction,
  fetchAddresses,
  removeAddress,
  setDefaultBillingAddress as setDefaultBillingAddressAction,
  setDefaultContactAddress as setDefaultContactAddressAction,
  setDefaultShippingAddress as setDefaultShippingAddressAction,
  updateAddress as updateAddressAction,
} from '@farfetch/blackout-redux/addresses';
import { mockStore, wrap } from '../../../../tests/helpers';
import { Provider } from 'react-redux';
import { renderHook } from '@testing-library/react-hooks';
import { useAddresses } from '../../';
import React from 'react';

jest.mock('@farfetch/blackout-redux/addresses', () => ({
  ...jest.requireActual('@farfetch/blackout-redux/addresses'),
  fetchAddresses: jest.fn(() => ({ type: 'get' })),
  createAddress: jest.fn(() => ({ type: 'create' })),
  removeAddress: jest.fn(() => ({ type: 'delete' })),
  updateAddress: jest.fn(() => ({ type: 'update' })),
  setDefaultBillingAddress: jest.fn(() => ({ type: 'update_billing' })),
  setDefaultContactAddress: jest.fn(() => ({ type: 'update_contact' })),
  setDefaultShippingAddress: jest.fn(() => ({ type: 'update_shipping' })),
}));

describe('useAddresses', () => {
  beforeEach(jest.clearAllMocks);
  afterEach(cleanup);

  it('should return values correctly', () => {
    const wrapper = props => (
      <Provider store={mockStore(mockInitialState)} {...props} />
    );
    const {
      result: { current },
    } = renderHook(() => useAddresses({ userId }), {
      wrapper,
    });

    expect(typeof current.deleteAddress).toBe('function');
    expect(typeof current.getAddresses).toBe('function');
    expect(typeof current.updateAddress).toBe('function');
    expect(typeof current.setDefaultBillingAddress).toBe('function');
    expect(typeof current.setDefaultContactAddress).toBe('function');
    expect(typeof current.setDefaultShippingAddress).toBe('function');
    expect(current.addressesIds).toBeNull();
    expect(current.addressesError).toBeNull();
    expect(current.isAddressesLoading).toBeFalsy();
  });

  it('should render in loading state', () => {
    const { container, getByTestId } = wrap(<Addresses userId={userId} />)
      .withStore(mockLoadingState)
      .render();

    expect(getByTestId('addresses-loading').textContent).toBe('yes');

    expect(container).toMatchSnapshot();
  });

  it('should render in error state', () => {
    const { container, getByTestId } = wrap(<Addresses userId={userId} />)
      .withStore(mockErrorState)
      .render();

    expect(getByTestId('addresses-error').textContent).toBe('Error');

    expect(container).toMatchSnapshot();
  });

  describe('actions', () => {
    it('should call `get` action', () => {
      const { queryByTestId } = wrap(<Addresses userId={userId} />)
        .withStore(mockInitialState)
        .render();

      expect(fetchAddresses).toHaveBeenCalledTimes(1);
      expect(queryByTestId('addresses-loading')).toBeNull();
      expect(queryByTestId('addresses-error')).toBeNull();
    });

    it('should call `delete` action', () => {
      const { getByTestId, queryByTestId } = wrap(<Addresses userId={userId} />)
        .withStore(mockInitialState)
        .render();

      fireEvent.click(getByTestId('addresses-deleteButton'));

      expect(removeAddress).toHaveBeenCalledTimes(1);
      expect(queryByTestId('addresses-loading')).toBeNull();
      expect(queryByTestId('addresses-error')).toBeNull();
    });

    it('should call `update` action', () => {
      const { getByTestId, queryByTestId } = wrap(<Addresses userId={userId} />)
        .withStore(mockInitialState)
        .render();

      fireEvent.click(getByTestId('addresses-updateButton'));

      expect(updateAddressAction).toHaveBeenCalledTimes(1);
      expect(queryByTestId('addresses-loading')).toBeNull();
      expect(queryByTestId('addresses-error')).toBeNull();
    });

    it('should call `create` action', () => {
      const { getByTestId, queryByTestId } = wrap(<Addresses userId={userId} />)
        .withStore(mockInitialState)
        .render();

      fireEvent.click(getByTestId('addresses-createButton'));

      expect(createAddressAction).toHaveBeenCalledTimes(1);
      expect(queryByTestId('addresses-loading')).toBeNull();
      expect(queryByTestId('addresses-error')).toBeNull();
    });

    it('should call `get` action', () => {
      const { getByTestId, queryByTestId } = wrap(<Addresses userId={userId} />)
        .withStore(mockInitialState)
        .render();

      fireEvent.click(getByTestId('addresses-getButton'));

      expect(fetchAddresses).toHaveBeenCalledTimes(2);
      expect(queryByTestId('addresses-loading')).toBeNull();
      expect(queryByTestId('addresses-error')).toBeNull();
    });

    it('should call `update_shipping` action', () => {
      const { getByTestId, queryByTestId } = wrap(<Addresses userId={userId} />)
        .withStore(mockInitialState)
        .render();

      fireEvent.click(getByTestId('addresses-setDefaultShippingButton'));

      expect(setDefaultShippingAddressAction).toHaveBeenCalledTimes(1);
      expect(queryByTestId('addresses-loading')).toBeNull();
      expect(queryByTestId('addresses-error')).toBeNull();
    });

    it('should call `update_billing` action', () => {
      const { getByTestId, queryByTestId } = wrap(<Addresses userId={userId} />)
        .withStore(mockInitialState)
        .render();

      fireEvent.click(getByTestId('addresses-setDefaultBillingButton'));

      expect(setDefaultBillingAddressAction).toHaveBeenCalledTimes(1);
      expect(queryByTestId('addresses-loading')).toBeNull();
      expect(queryByTestId('addresses-error')).toBeNull();
    });

    it('should call `update_contact` action', () => {
      const { getByTestId, queryByTestId } = wrap(<Addresses userId={userId} />)
        .withStore(mockInitialState)
        .render();

      fireEvent.click(getByTestId('addresses-setDefaultContactButton'));

      expect(setDefaultContactAddressAction).toHaveBeenCalledTimes(1);
      expect(queryByTestId('addresses-loading')).toBeNull();
      expect(queryByTestId('addresses-error')).toBeNull();
    });
  });

  describe('handle functions', () => {
    describe('handleUpdateAddress', () => {
      it('should call updateAddressAction', () => {
        const { getByTestId } = wrap(<Addresses userId={userId} />)
          .withStore(mockInitialState)
          .render();

        fireEvent.click(getByTestId('addresses-handleUpdateAddressButton'));

        expect(updateAddressAction).toHaveBeenCalledTimes(1);
      });
    });

    describe('handleGetAddress', () => {
      it('should call fetchAddresses action', () => {
        const { getByTestId } = wrap(<Addresses userId={userId} />)
          .withStore(mockInitialState)
          .render();

        fireEvent.click(getByTestId('addresses-handleGetAddressButton'));

        expect(fetchAddresses).toHaveBeenCalledTimes(2);
      });
    });

    describe('handleDeleteAddress', () => {
      it('should call removeAddress action', async () => {
        const { getByTestId } = wrap(<Addresses userId={userId} />)
          .withStore(mockCurrentState)
          .render();

        fireEvent.click(getByTestId('addresses-handleDeleteAddressButton'));
        expect(removeAddress).toHaveBeenCalledTimes(1);

        await waitForElementToBeRemoved(() =>
          getByTestId('addresses-deleteInfo'),
        );
      });

      it('should not set any default address when removed address is nos default', async () => {
        const { getByTestId } = wrap(<Addresses userId={userId} />)
          .withStore(mockCurrentState)
          .render();

        fireEvent.click(getByTestId('addresses-handleDeleteAddressButton-2'));
        expect(removeAddress).toHaveBeenCalledTimes(1);
        expect(setDefaultBillingAddressAction).toHaveBeenCalledTimes(0);
        expect(setDefaultShippingAddressAction).toHaveBeenCalledTimes(0);
        expect(setDefaultContactAddressAction).toHaveBeenCalledTimes(0);

        await waitForElementToBeRemoved(() =>
          getByTestId('addresses-deleteInfo-2'),
        );
      });

      it('should not set any default address when therar are just one address', async () => {
        const newMockCurrentState = {
          addresses: {
            error: null,
            isLoading: false,
            result: [address2.id],
          },
          entities: {
            addresses: {
              [address2.id]: address2,
            },
          },
        };
        const { getByTestId } = wrap(<Addresses userId={userId} />)
          .withStore(newMockCurrentState)
          .render();

        fireEvent.click(getByTestId('addresses-handleDeleteAddressButton'));
        expect(removeAddress).toHaveBeenCalledTimes(1);
        expect(setDefaultBillingAddressAction).toHaveBeenCalledTimes(0);
        expect(setDefaultShippingAddressAction).toHaveBeenCalledTimes(0);
        expect(setDefaultContactAddressAction).toHaveBeenCalledTimes(0);

        await waitForElementToBeRemoved(() =>
          getByTestId('addresses-deleteInfo'),
        );
      });
    });

    describe('handleSetDefaultShippingAddress', () => {
      it('should call setDefaultShippingAddress action', () => {
        const { getByTestId } = wrap(<Addresses userId={userId} />)
          .withStore(mockInitialState)
          .render();

        fireEvent.click(
          getByTestId('addresses-handleSetDefaultShippingAddress'),
        );

        expect(setDefaultShippingAddressAction).toHaveBeenCalledTimes(1);
      });
    });

    describe('handleSetDefaultBillingAddress', () => {
      it('should call setDefaultBillingAddress action', () => {
        const { getByTestId } = wrap(<Addresses userId={userId} />)
          .withStore(mockInitialState)
          .render();

        fireEvent.click(
          getByTestId('addresses-handleSetDefaultBillingAddress'),
        );

        expect(setDefaultBillingAddressAction).toHaveBeenCalledTimes(1);
      });
    });

    describe('handleSetDefaultContactAddress', () => {
      it('should call setDefaultContactAddress action', () => {
        const { getByTestId } = wrap(<Addresses userId={userId} />)
          .withStore(mockInitialState)
          .render();

        fireEvent.click(
          getByTestId('addresses-handleSetDefaultContactAddress'),
        );

        expect(setDefaultContactAddressAction).toHaveBeenCalledTimes(1);
      });
    });

    describe('handleCreateAddress', () => {
      it('should call CreateAddress action', () => {
        const { getByTestId } = wrap(<Addresses userId={userId} />)
          .withStore(mockInitialState)
          .render();

        fireEvent.click(getByTestId('addresses-handleCreateAddress'));

        expect(createAddressAction).toHaveBeenCalledTimes(1);
      });
    });
  });
});
