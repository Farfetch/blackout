import React, { useState } from 'react';
import useUserOrders from '../../useUserOrders.js';

export const Orders = () => {
  const [fetchQuery, setFetchQuery] = useState({ page: 1, pageSize: 60 });

  useUserOrders({ fetchQuery });

  return (
    <div data-test="orders-body">
      <button
        data-test="orders-updateFetchQueryButton"
        onClick={() => setFetchQuery({ page: 2, pageSize: 60 })}
      >
        update fetch query
      </button>
      <button
        data-test="orders-updateWithSameFetchQueryButton"
        onClick={() => setFetchQuery({ page: 1, pageSize: 60 })}
      >
        update same fetch query
      </button>
      {fetchQuery.page}
    </div>
  );
};
