import {
  createReturn as createReturnAction,
  getCreatedReturn,
  getCreateReturnError,
  isCreateReturnFetched,
  isCreateReturnLoading,
  resetCreateReturnState as resetCreateReturnStateAction,
} from '@farfetch/blackout-redux';
import { useSelector } from 'react-redux';
import useAction from '../../helpers/useAction';

/**
 * Manages the creation of a new return.
 */
function useCreateReturn() {
  const isLoading = useSelector(isCreateReturnLoading);
  const error = useSelector(getCreateReturnError);
  const createdReturn = useSelector(getCreatedReturn);
  const isFetched = useSelector(isCreateReturnFetched);
  const create = useAction(createReturnAction);
  const reset = useAction(resetCreateReturnStateAction);

  return {
    actions: {
      create,
      reset,
    },
    data: createdReturn,
    error,
    isLoading,
    isFetched,
  };
}

export default useCreateReturn;
