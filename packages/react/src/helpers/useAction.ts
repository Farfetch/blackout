import { AnyAction, bindActionCreators } from 'redux';
import { useDispatch } from 'react-redux';
import { useMemo } from 'react';
import type { ThunkAction } from 'redux-thunk';

/**
 * Memoizes the action received and binds the dispatch.
 *
 * @param action - Action to be wrapped by a dispatch.
 *
 * @returns Memoized version of the action, with a dispatch.
 */
const useAction = <
  ActionCreator extends (
    ...args: any[]
  ) => ThunkAction<any, any, any, AnyAction> | AnyAction,
>(
  action: ActionCreator,
) => {
  const dispatch = useDispatch();

  return useMemo(
    () => bindActionCreators(action, dispatch),
    [action, dispatch],
  ) as ReturnType<ActionCreator> extends ThunkAction<any, any, any, AnyAction>
    ? (
        ...args: Parameters<ActionCreator>
      ) => ReturnType<ReturnType<ActionCreator>>
    : ActionCreator;
};
export default useAction;
