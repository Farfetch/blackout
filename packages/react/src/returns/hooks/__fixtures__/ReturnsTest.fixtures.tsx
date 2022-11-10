import React from 'react';
import useReturn from '../useReturn';

const booleanToText = (boolean: boolean) => (boolean ? 'yes' : 'no');

const ReturnTest = ({ returnId, createReturnData }) => {
  const {
    actions: { create },
    isReturnFetched,
    isReturnLoading,
    returnError,
    data: returnData,
  } = useReturn(returnId);

  if (isReturnLoading) {
    return (
      <span data-test="return-loading">{booleanToText(isReturnLoading)}</span>
    );
  }

  if (returnError) {
    return <span data-test="return-error">{`${returnError}`}</span>;
  }

  return (
    <div data-test="return-body">
      <span data-test="return-fetched">{booleanToText(isReturnFetched)}</span>
      <button
        data-test="return-createButton"
        onClick={() => create(createReturnData)}
      >
        Create Return Button
      </button>
      {returnData && <span data-test="return-id">{returnData.id}</span>}
    </div>
  );
};

export default ReturnTest;
