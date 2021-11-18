export const createReducerWithResult =
  (actionType, initialState, actionTypes, isNormalized = false) =>
  (state = initialState, action = {}) => {
    const isActionTypeAnArray = Array.isArray(actionType);
    const actionTypesArray = isActionTypeAnArray ? actionType : [actionType];

    for (const type of actionTypesArray) {
      const validateReset = !!actionTypes[`${type}_RESET`];

      switch (action.type) {
        case validateReset && actionTypes[`${type}_RESET`]:
          return {
            error: initialState.error,
            result: initialState?.result,
          };
        case actionTypes[`${type}_REQUEST`]:
          return {
            error: initialState.error,
            isLoading: true,
          };
        case actionTypes[`${type}_FAILURE`]:
          return {
            error: action.payload.error,
            isLoading: false,
          };
        case actionTypes[`${type}_SUCCESS`]:
          return {
            error: initialState.error,
            isLoading: false,
            result: isNormalized ? action.payload.result : action.payload,
          };
        default:
          break;
      }
    }
    return state;
  };

export default (actionType, initialState, actionTypes) =>
  (state = initialState, action = {}) => {
    const isActionTypeAnArray = Array.isArray(actionType);
    const actionTypesArray = isActionTypeAnArray ? actionType : [actionType];

    for (const type of actionTypesArray) {
      const validateReset = !!actionTypes[`${type}_RESET`];

      switch (action.type) {
        case validateReset && actionTypes[`${type}_RESET`]:
          return {
            error: initialState.error,
          };
        case actionTypes[`${type}_REQUEST`]:
          return {
            error: initialState.error,
            isLoading: true,
          };
        case actionTypes[`${type}_FAILURE`]:
          return {
            error: action.payload.error,
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
