import React, { Fragment } from 'react';
import usePayments from '../../usePayments';
import type { CheckoutOrder } from '@farfetch/blackout-client/checkout';
import type { User } from '@farfetch/blackout-redux/entities/types';

const intentId = '123';
const instrumentId = '456';
const email = 'some email';
const option = 'PayPalExp';
const booleanToText = (boolean: boolean) => (boolean ? 'yes' : 'no');

export const Payments = ({
  order,
  user,
}: {
  order: CheckoutOrder;
  user: User;
}) => {
  const {
    createInstrument,
    getInstruments,
    deleteInstrument,
    updateInstrument,
    handleCreateInstrument,
    handleDeleteInstrument,
    handleUpdateInstrument,
    isInstrumentsLoading,
    instrumentsError,
  } = usePayments({ order, user });

  if (isInstrumentsLoading) {
    return (
      <span data-test="instruments-loading">
        {booleanToText(isInstrumentsLoading)}
      </span>
    );
  }
  if (instrumentsError) {
    return (
      <span data-test="instruments-error">
        {typeof instrumentsError === 'object'
          ? instrumentsError.code
          : instrumentsError}
      </span>
    );
  }

  const instrumentData = {
    method: 'PayPal',
    option,
    createToken: false,
    payer: {
      id: '123',
      firstName: 'name',
      lastName: 'surname',
      email,
      address: {
        addressLine1: 'abs',
        zipCode: 'abc',
        city: {
          id: 123,
          name: 'abc',
        },
        country: {
          alpha2Code: 'abc',
          culture: 'abc',
          id: 123,
        },
      },
    },
    amounts: [{ value: 102 }],
    token: 'abs',
  };

  return (
    <Fragment>
      <button
        data-test="instruments-createButton"
        onClick={() => createInstrument(intentId, instrumentData)}
      >
        create instrument request
      </button>
      <button
        data-test="instruments-getButton"
        onClick={() => getInstruments(intentId)}
      >
        get instrument request
      </button>
      <button
        data-test="instruments-deleteButton"
        onClick={() => deleteInstrument(intentId, instrumentId)}
      >
        delete instrument request
      </button>
      <button
        data-test="instruments-updateButton"
        onClick={() => updateInstrument(intentId, instrumentId, instrumentData)}
      >
        update instrument request
      </button>
      <button
        data-test="instruments-handleCreateInstrumentButton"
        onClick={() => handleCreateInstrument({ option, tokenId: 'foo' })}
      >
        handle add instrument
      </button>
      <button
        data-test="instruments-handleCreateInstrumentButtonWithoutTokenId"
        onClick={() => handleCreateInstrument({ option })}
      >
        handle add instrument without token id
      </button>
      <button
        data-test="instruments-handleDeleteInstrumentButton"
        onClick={() => handleDeleteInstrument(instrumentId)}
      >
        handle delete instrument
      </button>
      <button
        data-test="instruments-handleUpdateInstrumentButton"
        onClick={() =>
          handleUpdateInstrument(intentId, instrumentId, {
            email,
          })
        }
      >
        handle update instrument
      </button>

      <button
        data-test="instruments-handleUpdateInstrumentButtonWithoutEmail"
        onClick={() => handleUpdateInstrument(intentId, instrumentId, {})}
      >
        handle update instrument without email
      </button>
    </Fragment>
  );
};
