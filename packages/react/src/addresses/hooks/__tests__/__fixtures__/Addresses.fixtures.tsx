import {
  address1,
  address2,
  addressId,
  mockGetAddressSchemaResponse,
  mockPostAddressResponse,
  mockPredictionDetailsResponse,
  mockPredictionResponse,
  mockUpdateAddressResponse,
} from 'tests/__fixtures__/addresses';
import React, { Fragment } from 'react';
import useAddresses from '../../useAddresses';

const booleanToText = (boolean:boolean) => (boolean ? 'yes' : 'no');

type Props = {
  userId:number
}

export const Addresses = ({ userId }: Props) => {
  const {
    addressesError,
    isAddressesLoading,
    deletingStatus,
    deleteAddress,
    createAddress,
    getAddresses,
    updateAddress,
    setDefaultBillingAddress,
    setDefaultContactAddress,
    setDefaultShippingAddress,
    handleSetDefaultShippingAddress,
    handleSetDefaultBillingAddress,
    handleSetDefaultContactAddress,
    handleUpdateAddress,
    handleDeleteAddress,
    handleCreateAddress,
    handleGetAddress,
    handleGetPredictions,
    handleGetPredictionDetails,
    handleGetAddressSchema,
    resetPredictions,
  } = useAddresses(true, userId);

  if (isAddressesLoading) {
    return (
      <span data-test="addresses-loading">
        {booleanToText(isAddressesLoading)}
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
        onClick={() => deleteAddress(userId, addressId)}
      >
        delete addreses request
      </button>
      <button
        data-test="addresses-updateButton"
        onClick={() => updateAddress(userId, mockUpdateAddressResponse)}
      >
        update address request
      </button>
      <button
        data-test="addresses-createButton"
        onClick={() => createAddress(userId, mockPostAddressResponse)}
      >
        create address request
      </button>
      <button
        data-test="addresses-getButton"
        onClick={() => getAddresses(userId)}
      >
        get addresses request
      </button>
      <button
        data-test="addresses-setDefaultShippingButton"
        onClick={() => setDefaultShippingAddress(userId, addressId)}
      >
        set default shipping addresses request
      </button>
      <button
        data-test="addresses-setDefaultBillingButton"
        onClick={() => setDefaultBillingAddress(userId, addressId)}
      >
        set default billing addresses request
      </button>
      <button
        data-test="addresses-setDefaultContactButton"
        onClick={() => setDefaultContactAddress(userId, addressId)}
      >
        set default contact addresses request
      </button>
      <button
        data-test="addresses-handleUpdateAddressButton"
        onClick={() => handleUpdateAddress(addressId)}
      >
        handle update address
      </button>
      <button
        data-test="addresses-handleGetAddressButton"
        onClick={() => handleGetAddress()}
      >
        handle get address
      </button>
      <>
        <button
          data-test="addresses-handleDeleteAddressButton"
          onClick={() => handleDeleteAddress(address2)}
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
          onClick={() => handleDeleteAddress(address1)}
        >
          handle delete address
        </button>
        {deletingStatus[address1.id] ? (
          <span data-test="addresses-deleteInfo-2">Deleting address</span>
        ) : null}
      </>
      <button
        data-test="addresses-handleSetDefaultShippingAddress"
        onClick={() => handleSetDefaultShippingAddress(address2)}
      >
        handle set default shipping address
      </button>
      <button
        data-test="addresses-handleSetDefaultBillingAddress"
        onClick={() => handleSetDefaultBillingAddress(address2)}
      >
        handle set default billing address
      </button>
      <button
        data-test="addresses-handleSetDefaultContactAddress"
        onClick={() => handleSetDefaultContactAddress(address2)}
      >
        handle set default contact address
      </button>
      <button
        data-test="addresses-handleCreateAddress"
        onClick={() => handleCreateAddress(mockPostAddressResponse)}
      >
        handle create address
      </button>
      <button
        data-test="addresses-handleGetPredictions"
        onClick={() => handleGetPredictions(mockPredictionResponse)}
      >
        handle get predictions
      </button>
      <button
        data-test="addresses-handleGetPredictionDetails"
        onClick={() =>
          handleGetPredictionDetails(mockPredictionDetailsResponse)
        }
      >
        handle get predictions details
      </button>
      <button
        data-test="addresses-handleGetAddressSchema"
        onClick={() => handleGetAddressSchema(mockGetAddressSchemaResponse)}
      >
        handle get address schema
      </button>
      <button
        data-test="addresses-resetPredictions"
        onClick={() => resetPredictions()}
      >
        handle reset predictions
      </button>
    </Fragment>
  );
};
/* eslint-enable react/prop-types */
