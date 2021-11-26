import React, { Fragment } from 'react';
import usePayments from '../../usePayments';

const intentId = '123';
const instrumentId = '456';
const email = 'some email';
const option = 'PayPalExp';
const booleanToText = boolean => (boolean ? 'yes' : 'no');

export const Payments = ({ order, user }) => {
  const {
    createInstrument,
    getInstruments,
    deleteInstrument,
    updateInstrument,
    handleCreateInstrument,
    handleDeleteInstrument,
    handleUpdateInstrument,
    isInstrumentsLoading,
    isInstrumentsError,
  } = usePayments({ order, user });

  if (isInstrumentsLoading) {
    return (
      <span data-test="instruments-loading">
        {booleanToText(isInstrumentsLoading)}
      </span>
    );
  }

  if (isInstrumentsError) {
    return <span data-test="instruments-error">{isInstrumentsError}</span>;
  }

  return (
    <Fragment>
      <button
        data-test="instruments-createButton"
        onClick={() =>
          createInstrument({
            option,
            email,
          })
        }
      >
        create instrument request
      </button>
      <button
        data-test="instruments-getButton"
        onClick={() => getInstruments()}
      >
        get instrument request
      </button>
      <button
        data-test="instruments-deleteButton"
        onClick={() => deleteInstrument(instrumentId)}
      >
        delete instrument request
      </button>
      <button
        data-test="instruments-updateButton"
        onClick={() =>
          updateInstrument(intentId, instrumentId, {
            email,
          })
        }
      >
        update instrument request
      </button>
      <button
        data-test="instruments-handleCreateInstrumentButton"
        onClick={() =>
          handleCreateInstrument({ option: 'KlarnaPayLater', tokenId: 'foo' })
        }
      >
        handle add instrument
      </button>
      <button
        data-test="instruments-handleCreateInstrumentButtonWithoutTokenId"
        onClick={() => handleCreateInstrument({ option: 'KlarnaPayLater' })}
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
