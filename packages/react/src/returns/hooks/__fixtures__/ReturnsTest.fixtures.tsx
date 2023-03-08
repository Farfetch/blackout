import React from 'react';
import useReturn from '../useReturn.js';
import type { PostReturnData, Return } from '@farfetch/blackout-client';

const booleanToText = (boolean: boolean | null) => (boolean ? 'yes' : 'no');

const ReturnTest = ({
  returnId,
  createReturnData,
}: {
  returnId?: Return['id'];
  createReturnData?: PostReturnData;
}) => {
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
        onClick={() => create(createReturnData!)}
      >
        Create Return Button
      </button>
      {returnData && <span data-test="return-id">{returnData.id}</span>}
    </div>
  );
};

export default ReturnTest;
