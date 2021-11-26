export const validateReset = (
  type: string,
  action: { type?: string },
  actionTypes: { [x: string]: string },
): boolean => {
  const resetAction = actionTypes[`${type}_RESET`];
  const isThereAResetAction = !!resetAction;

  return isThereAResetAction && resetAction === action.type;
};

export const createReducerWithResult =
  (
    actionType: any,
    initialState: { error: any; result?: any },
    actionTypes: { [k: string]: any },
    isNormalized = false,
  ) =>
  (
    state = initialState,
    action: { type?: string; payload?: { error: any; result: any } } = {},
  ) => {
    const isActionTypeAnArray = Array.isArray(actionType);
    const actionTypesArray = isActionTypeAnArray ? actionType : [actionType];

    for (const type of actionTypesArray) {
      if (validateReset(type, action, actionTypes)) {
        return {
          error: initialState.error,
          result: initialState?.result,
        };
      }

      switch (action.type) {
        case actionTypes[`${type}_REQUEST`]:
          return {
            error: initialState.error,
            isLoading: true,
          };
        case actionTypes[`${type}_FAILURE`]:
          return {
            error: action.payload?.error,
            isLoading: false,
          };
        case actionTypes[`${type}_SUCCESS`]:
          return {
            error: initialState.error,
            isLoading: false,
            result: isNormalized ? action.payload?.result : action.payload,
          };
        default:
          break;
      }
    }
    return state;
  };

export default (
    actionType: any,
    initialState: { error: any; result?: any },
    actionTypes: { [k: string]: any },
  ) =>
  (
    state = initialState,
    action: { type?: string; payload?: { error: string } } = {},
  ) => {
    const isActionTypeAnArray = Array.isArray(actionType);
    const actionTypesArray = isActionTypeAnArray ? actionType : [actionType];

    for (const type of actionTypesArray) {
      if (validateReset(type, action, actionTypes)) {
        return {
          error: initialState.error,
          result: initialState?.result,
        };
      }

      switch (action.type) {
        case actionTypes[`${type}_REQUEST`]:
          return {
            error: initialState.error,
            isLoading: true,
          };
        case actionTypes[`${type}_FAILURE`]:
          return {
            error: action.payload?.error,
            isLoading: false,
          };
        case actionTypes[`${type}_SUCCESS`]:
          return initialState;
        default:
          break;
      }
    }
    return state;
  };
