import {
  address1,
  address2,
  addressId,
  mockAddressPredictionResponse,
  mockAddressPredictionsResponse,
} from 'tests/__fixtures__/addresses';
import { mockGetAddressSchemaResponse } from 'tests/__fixtures__/locale';
import {
  mockPostUserAddressResponse,
  mockUpdateAddressResponse,
} from 'tests/__fixtures__/users';
import React, { Fragment } from 'react';
import useAddresses from '../../useAddresses';

const booleanToText = (boolean: boolean) => (boolean ? 'yes' : 'no');

type Props = {
  userId: number;
};

export const Addresses = ({ userId }: Props) => {
  const auto = true;
  const {
    addressesError,
    areUserAddressesLoading,
    deletingStatus,
    deleteUserAddress,
    createUserAddress,
    getUserAddresses,
    updateUserAddress,
    setUserDefaultBillingAddress,
    setUserDefaultContactAddress,
    setUserDefaultShippingAddress,
    handleSetUserDefaultShippingAddress,
    handleSetUserDefaultBillingAddress,
    handleSetUserDefaultContactAddress,
    handleUpdateUserAddress,
    handleDeleteUserAddress,
    handleCreateUserAddress,
    handleGetUserAddress,
    handleGetAddressPredictions,
    handleGetAddressPrediction,
    handleGetCountryAddressSchema,
    resetAddressPredictions,
  } = useAddresses({ auto, userId });

  if (areUserAddressesLoading) {
    return (
      <span data-test="addresses-loading">
        {booleanToText(areUserAddressesLoading)}
      </span>
    );
  }

  if (addressesError) {
    return <span data-test="addresses-error">{addressesError}</span>;
  }

  return (
    <Fragment>
      <button
        data-test="addresses-deleteButton"
        onClick={() => deleteUserAddress(userId, addressId)}
      >
        delete addreses request
      </button>
      <button
        data-test="addresses-updateButton"
        onClick={() => updateUserAddress(userId, mockUpdateAddressResponse)}
      >
        update address request
      </button>
      <button
        data-test="addresses-createButton"
        onClick={() => createUserAddress(userId, mockPostUserAddressResponse)}
      >
        create address request
      </button>
      <button
        data-test="addresses-getButton"
        onClick={() => getUserAddresses(userId)}
      >
        get addresses request
      </button>
      <button
        data-test="addresses-setDefaultShippingButton"
        onClick={() => setUserDefaultShippingAddress(userId, addressId)}
      >
        set default shipping addresses request
      </button>
      <button
        data-test="addresses-setDefaultBillingButton"
        onClick={() => setUserDefaultBillingAddress(userId, addressId)}
      >
        set default billing addresses request
      </button>
      <button
        data-test="addresses-setDefaultContactButton"
        onClick={() => setUserDefaultContactAddress(userId, addressId)}
      >
        set default contact addresses request
      </button>
      <button
        data-test="addresses-handleUpdateAddressButton"
        onClick={() => handleUpdateUserAddress(addressId)}
      >
        handle update address
      </button>
      <button
        data-test="addresses-handleGetAddressButton"
        onClick={() => handleGetUserAddress()}
      >
        handle get address
      </button>
      <>
        <button
          data-test="addresses-handleDeleteAddressButton"
          onClick={() => handleDeleteUserAddress(address2)}
        >
          handle delete address
        </button>
        {deletingStatus[address2.id] ? (
          <span data-test="addresses-deleteInfo">Deleting address</span>
        ) : null}
      </>
      <>
        <button
          data-test="addresses-handleDeleteAddressButton-2"
          onClick={() => handleDeleteUserAddress(address1)}
        >
          handle delete address
        </button>
        {deletingStatus[address1.id] ? (
          <span data-test="addresses-deleteInfo-2">Deleting address</span>
        ) : null}
      </>
      <button
        data-test="addresses-handleSetDefaultShippingAddress"
        onClick={() => handleSetUserDefaultShippingAddress(address2.id)}
      >
        handle set default shipping address
      </button>
      <button
        data-test="addresses-handleSetDefaultBillingAddress"
        onClick={() => handleSetUserDefaultBillingAddress(address2.id)}
      >
        handle set default billing address
      </button>
      <button
        data-test="addresses-handleSetDefaultContactAddress"
        onClick={() => handleSetUserDefaultContactAddress(address2.id)}
      >
        handle set default contact address
      </button>
      <button
        data-test="addresses-handleCreateAddress"
        onClick={() => handleCreateUserAddress(mockPostUserAddressResponse)}
      >
        handle create address
      </button>
      <button
        data-test="addresses-handleGetPredictions"
        onClick={() =>
          handleGetAddressPredictions(mockAddressPredictionsResponse)
        }
      >
        handle get predictions
      </button>
      <button
        data-test="addresses-handleGetPredictionDetails"
        onClick={() =>
          handleGetAddressPrediction(mockAddressPredictionResponse)
        }
      >
        handle get predictions details
      </button>
      <button
        data-test="addresses-handleGetAddressSchema"
        onClick={() =>
          handleGetCountryAddressSchema(mockGetAddressSchemaResponse)
        }
      >
        handle get address schema
      </button>
      <button
        data-test="addresses-resetPredictions"
        onClick={() => resetAddressPredictions()}
      >
        handle reset predictions
      </button>
    </Fragment>
  );
};
/* eslint-enable react/prop-types */
