import React, { useState } from 'react';
import useOrders from '../../useOrders';

export const Orders = () => {
  const [fetchQuery, setFetchQuery] = useState({ page: 1 });

  useOrders({ fetchQuery });

  return (
    <div data-test="orders-body">
      <button
        data-test="orders-updateFetchQueryButton"
        onClick={() => setFetchQuery({ page: 2 })}
      >
        update fetch query
      </button>
      <button
        data-test="orders-updateWithSameFetchQueryButton"
        onClick={() => setFetchQuery({ page: 1 })}
      >
        update same fetch query
      </button>
      {fetchQuery.page}
    </div>
  );
};
