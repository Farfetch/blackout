import { address2, addressId2, userId } from 'tests/__fixtures__/addresses';
import { Addresses } from './__fixtures__/Addresses.fixtures';
import {
  cleanup,
  fireEvent,
  renderHook,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import {
  createUserAddress as createUserAddressAction,
  fetchAddressPredictionDetails,
  fetchAddressPredictions,
  fetchCountryAddressSchemas,
  fetchUserAddresses,
  removeUserAddress,
  resetAddressPredictions,
  setUserDefaultBillingAddress as setUserDefaultBillingAddressAction,
  setUserDefaultContactAddress as setUserDefaultContactAddressAction,
  setUserDefaultShippingAddress as setUserDefaultShippingAddressAction,
  updateUserAddress as updateUserAddressAction,
} from '@farfetch/blackout-redux';
import { mockStore, wrap } from '../../../../tests/helpers';
import { Provider } from 'react-redux';
import { useAddresses } from '../..';

jest.mock('@farfetch/blackout-redux', () => ({
  ...jest.requireActual('@farfetch/blackout-redux'),
  fetchUserAddresses: jest.fn(() => ({ type: 'get' })),
  createUserAddress: jest.fn(() => ({ type: 'create' })),
  removeUserAddress: jest.fn(() => ({ type: 'delete' })),
  updateUserAddress: jest.fn(() => ({ type: 'update' })),
  setUserDefaultBillingAddress: jest.fn(() => ({ type: 'update_billing' })),
  setUserDefaultContactAddress: jest.fn(() => ({ type: 'update_contact' })),
  setUserDefaultShippingAddress: jest.fn(() => ({ type: 'update_shipping' })),
  fetchAddressPredictions: jest.fn(() => ({ type: 'get' })),
  fetchAddressPredictionDetails: jest.fn(() => ({ type: 'get' })),
  fetchCountryAddressSchemas: jest.fn(() => ({ type: 'get' })),
  resetAddressPredictions: jest.fn(() => ({ type: 'reset' })),
}));

describe('useAddresses', () => {
  beforeEach(jest.clearAllMocks);
  afterEach(cleanup);

  const mockInitialState = {
    addresses: {
      error: null,
      isLoading: false,
      result: null,
      predictions: {
        result: null,
        error: null,
        isLoading: false,
      },
      prediction: {
        result: null,
        error: null,
        isLoading: false,
      },
    },
    users: {
      error: null,
      result: null,
      isLoading: false,
      addresses: {
        result: null,
        error: null,
        isLoading: false,
        addresses: {
          error: null,
          isLoading: false,
        },
        address: {
          error: {},
          isLoading: {},
        },
        defaultAddress: {
          error: null,
          isLoading: false,
          result: null,
        },
      },
    },
    locale: {
      countryAddressSchema: {
        error: null,
        isLoading: false,
      },
    },
    entities: {
      addresses: {},
      countryAddressSchema: {},
    },
  };

  const mockLoadingState = {
    addresses: {
      error: null,
      isLoading: true,
      result: null,
      predictions: {
        result: null,
        error: null,
        isLoading: true,
      },
      prediction: {
        result: null,
        error: null,
        isLoading: true,
      },
    },
    users: {
      error: null,
      result: null,
      isLoading: true,
      addresses: {
        result: null,
        error: null,
        isLoading: true,
        addresses: {
          error: null,
          isLoading: false,
        },
        address: {
          error: {},
          isLoading: {
            [addressId2]: true,
          },
        },
        defaultAddress: {
          error: null,
          isLoading: true,
          result: null,
        },
      },
    },
    locale: {
      countryAddressSchema: {
        error: null,
        isLoading: true,
      },
    },
    entities: {
      addresses: {},
      countryAddressSchema: {},
    },
  };

  const mockErrorState = {
    addresses: {
      error: 'Error',
      isLoading: false,
      result: null,
      predictions: {
        result: null,
        error: 'Error',
        isLoading: false,
      },
      prediction: {
        result: null,
        error: 'Error',
        isLoading: false,
      },
    },
    users: {
      error: 'Error',
      result: null,
      isLoading: false,
      addresses: {
        result: null,
        error: 'Error',
        isLoading: false,
        addresses: {
          error: 'Error',
          isLoading: false,
        },
        address: {
          error: {
            [addressId2]: 'Error',
          },
          isLoading: {},
        },
        defaultAddress: {
          error: 'Error',
          isLoading: false,
          result: null,
        },
      },
    },
    locale: {
      countryAddressSchema: {
        error: 'Error',
        isLoading: false,
      },
    },
    entities: {
      addresses: {},
      countryAddressSchema: {},
    },
  };

  const mockCurrentState = {
    ...mockInitialState,
  };

  it('should return values correctly', () => {
    const auto = true;
    const addressId = '123456';
    const isoCode = 'PT';
    const {
      result: { current },
    } = renderHook(() => useAddresses({ auto, userId, addressId, isoCode }), {
      wrapper: props => (
        <Provider store={mockStore(mockInitialState)} {...props} />
      ),
    });

    expect(typeof current.getUserAddresses).toBe('function');
    expect(typeof current.deleteUserAddress).toBe('function');
    expect(typeof current.getUserAddresses).toBe('function');
    expect(typeof current.updateUserAddress).toBe('function');
    expect(typeof current.setUserDefaultBillingAddress).toBe('function');
    expect(typeof current.setUserDefaultContactAddress).toBe('function');
    expect(typeof current.setUserDefaultShippingAddress).toBe('function');
    expect(current.addressesIds).toBeNull();
    expect(current.addressesError).toBeNull();
    expect(current.areUserAddressesLoading).toBeFalsy();
    expect(current.userAddressError).toBeUndefined();
    expect(current.isUserAddressLoading).toBeFalsy();
    expect(current.addressPredictionsError).toBeNull();
    expect(current.areAddressPredictionsLoading).toBeFalsy();
    expect(current.addressPredictionError).toBeNull();
    expect(current.isAddressPredictionLoading).toBeFalsy();
    expect(current.addressPredictions).toBeNull();
    expect(typeof current.handleGetAddressPredictions).toBe('function');
    expect(typeof current.handleGetAddressPrediction).toBe('function');
    expect(typeof current.resetAddressPredictions).toBe('function');
    expect(current.countryAddressSchemas).toBeUndefined();
    expect(current.areCountryAddressSchemasLoading).toBeFalsy();
    expect(current.countryAddressSchemaError).toBeNull();
    expect(typeof current.handleGetCountryAddressSchema).toBe('function');
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

      expect(fetchUserAddresses).toHaveBeenCalledTimes(1);
      expect(queryByTestId('addresses-loading')).toBeNull();
      expect(queryByTestId('addresses-error')).toBeNull();
    });

    it('should call `delete` action', () => {
      const { getByTestId, queryByTestId } = wrap(<Addresses userId={userId} />)
        .withStore(mockInitialState)
        .render();

      fireEvent.click(getByTestId('addresses-deleteButton'));

      expect(removeUserAddress).toHaveBeenCalledTimes(1);
      expect(queryByTestId('addresses-loading')).toBeNull();
      expect(queryByTestId('addresses-error')).toBeNull();
    });

    it('should call `update` action', () => {
      const { getByTestId, queryByTestId } = wrap(<Addresses userId={userId} />)
        .withStore(mockInitialState)
        .render();

      fireEvent.click(getByTestId('addresses-updateButton'));

      expect(updateUserAddressAction).toHaveBeenCalledTimes(1);
      expect(queryByTestId('addresses-loading')).toBeNull();
      expect(queryByTestId('addresses-error')).toBeNull();
    });

    it('should call `create` action', () => {
      const { getByTestId, queryByTestId } = wrap(<Addresses userId={userId} />)
        .withStore(mockInitialState)
        .render();

      fireEvent.click(getByTestId('addresses-createButton'));

      expect(createUserAddressAction).toHaveBeenCalledTimes(1);
      expect(queryByTestId('addresses-loading')).toBeNull();
      expect(queryByTestId('addresses-error')).toBeNull();
    });

    it('should call `get` action', () => {
      const { getByTestId, queryByTestId } = wrap(<Addresses userId={userId} />)
        .withStore(mockInitialState)
        .render();

      fireEvent.click(getByTestId('addresses-getButton'));

      expect(fetchUserAddresses).toHaveBeenCalledTimes(2);
      expect(queryByTestId('addresses-loading')).toBeNull();
      expect(queryByTestId('addresses-error')).toBeNull();
    });

    it('should call `update_shipping` action', () => {
      const { getByTestId, queryByTestId } = wrap(<Addresses userId={userId} />)
        .withStore(mockInitialState)
        .render();

      fireEvent.click(getByTestId('addresses-setDefaultShippingButton'));

      expect(setUserDefaultShippingAddressAction).toHaveBeenCalledTimes(1);
      expect(queryByTestId('addresses-loading')).toBeNull();
      expect(queryByTestId('addresses-error')).toBeNull();
    });

    it('should call `update_billing` action', () => {
      const { getByTestId, queryByTestId } = wrap(<Addresses userId={userId} />)
        .withStore(mockInitialState)
        .render();

      fireEvent.click(getByTestId('addresses-setDefaultBillingButton'));

      expect(setUserDefaultBillingAddressAction).toHaveBeenCalledTimes(1);
      expect(queryByTestId('addresses-loading')).toBeNull();
      expect(queryByTestId('addresses-error')).toBeNull();
    });

    it('should call `update_contact` action', () => {
      const { getByTestId, queryByTestId } = wrap(<Addresses userId={userId} />)
        .withStore(mockInitialState)
        .render();

      fireEvent.click(getByTestId('addresses-setDefaultContactButton'));

      expect(setUserDefaultContactAddressAction).toHaveBeenCalledTimes(1);
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

        expect(updateUserAddressAction).toHaveBeenCalledTimes(1);
      });
    });

    describe('handleGetAddress', () => {
      it('should call fetchAddresses action', () => {
        const { getByTestId } = wrap(<Addresses userId={userId} />)
          .withStore(mockInitialState)
          .render();

        fireEvent.click(getByTestId('addresses-handleGetAddressButton'));

        expect(fetchUserAddresses).toHaveBeenCalledTimes(2);
      });
    });

    describe('handleDeleteAddress', () => {
      it('should call removeAddress action', async () => {
        const { getByTestId } = wrap(<Addresses userId={userId} />)
          .withStore(mockCurrentState)
          .render();

        fireEvent.click(getByTestId('addresses-handleDeleteAddressButton'));
        expect(removeUserAddress).toHaveBeenCalledTimes(1);

        await waitForElementToBeRemoved(() =>
          getByTestId('addresses-deleteInfo'),
        );
      });

      it('should not set any default address when removed address is not default', async () => {
        const { getByTestId } = wrap(<Addresses userId={userId} />)
          .withStore(mockCurrentState)
          .render();

        fireEvent.click(getByTestId('addresses-handleDeleteAddressButton-2'));
        expect(removeUserAddress).toHaveBeenCalledTimes(1);
        expect(setUserDefaultBillingAddressAction).toHaveBeenCalledTimes(0);
        expect(setUserDefaultShippingAddressAction).toHaveBeenCalledTimes(0);
        expect(setUserDefaultContactAddressAction).toHaveBeenCalledTimes(0);

        await waitForElementToBeRemoved(() =>
          getByTestId('addresses-deleteInfo-2'),
        );
      });

      it('should not set any default address when there is just one address', async () => {
        const newMockCurrentState = {
          addresses: {
            error: null,
            isLoading: false,
            result: null,
            predictions: {
              result: null,
              error: null,
              isLoading: false,
            },
            prediction: {
              result: null,
              error: null,
              isLoading: false,
            },
          },
          users: {
            error: null,
            isLoading: false,
            result: [address2.id],
            addresses: {
              result: {
                [address2.id]: address2,
              },
              error: null,
              isLoading: false,
              addresses: {
                error: null,
                isLoading: false,
              },
              address: {
                error: {
                  [address2.id]: 'Error',
                },
                isLoading: {},
              },
            },
          },
          locale: {
            countryAddressSchema: {
              error: null,
              isLoading: false,
            },
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
        expect(removeUserAddress).toHaveBeenCalledTimes(1);
        expect(setUserDefaultBillingAddressAction).toHaveBeenCalledTimes(0);
        expect(setUserDefaultShippingAddressAction).toHaveBeenCalledTimes(0);
        expect(setUserDefaultContactAddressAction).toHaveBeenCalledTimes(0);

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

        expect(setUserDefaultShippingAddressAction).toHaveBeenCalledTimes(1);
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

        expect(setUserDefaultBillingAddressAction).toHaveBeenCalledTimes(1);
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

        expect(setUserDefaultContactAddressAction).toHaveBeenCalledTimes(1);
      });
    });

    describe('handleCreateAddress', () => {
      it('should call CreateAddress action', () => {
        const { getByTestId } = wrap(<Addresses userId={userId} />)
          .withStore(mockInitialState)
          .render();

        fireEvent.click(getByTestId('addresses-handleCreateAddress'));

        expect(createUserAddressAction).toHaveBeenCalledTimes(1);
      });
    });

    describe('handleGetPredictions', () => {
      it('should call getPredictions action', () => {
        const { getByTestId } = wrap(<Addresses userId={userId} />)
          .withStore(mockInitialState)
          .render();

        fireEvent.click(getByTestId('addresses-handleGetPredictions'));

        expect(fetchAddressPredictions).toHaveBeenCalledTimes(1);
      });
    });

    describe('handleGetPredictionDetails', () => {
      it('should call fetchPredictionDetails action', () => {
        const { getByTestId } = wrap(<Addresses userId={userId} />)
          .withStore(mockInitialState)
          .render();

        fireEvent.click(getByTestId('addresses-handleGetPredictionDetails'));

        expect(fetchAddressPredictionDetails).toHaveBeenCalledTimes(1);
      });
    });

    describe('handleGetAddressSchema', () => {
      it('should call fetchCountryAddressSchemas action', () => {
        const { getByTestId } = wrap(<Addresses userId={userId} />)
          .withStore(mockInitialState)
          .render();

        fireEvent.click(getByTestId('addresses-handleGetAddressSchema'));

        expect(fetchCountryAddressSchemas).toHaveBeenCalledTimes(1);
      });
    });

    describe('resetAddressPredictions', () => {
      it('should call resetPredictions action', () => {
        const { getByTestId } = wrap(<Addresses userId={userId} />)
          .withStore(mockInitialState)
          .render();

        fireEvent.click(getByTestId('addresses-resetPredictions'));

        expect(resetAddressPredictions).toHaveBeenCalledTimes(1);
      });
    });
  });
});
