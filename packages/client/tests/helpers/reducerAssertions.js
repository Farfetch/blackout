import { getInitialState } from '..';

export const defaultProps = {
  error: 'error',
  result: 'result',
  isLoading: 'isLoading',
};

let initialState;

/**
 * Asserts the initial state of the reducer.
 *
 * @param {Function} reducer
 * @param {string} prop
 */
const assertInitialState = (reducer, prop) => {
  it('should return the initial state', () => {
    const state = reducer()[prop];

    expect(state).toBe(initialState[prop]);
    prop === defaultProps.isLoading
      ? expect(state).toBeFalsy()
      : expect(state).toBeNull();
  });
};

/**
 * Asserts the previous state of the reducer.
 *
 * @param {Function} reducer
 * @param {string} prop
 */
const assertPreviousState = (reducer, prop) => {
  it('should handle other actions by returning the previous state', () => {
    const state = {};
    state[prop] = 'foo';

    expect(reducer(state)[prop]).toBe(state[prop]);
  });
};

/**
 * Asserts the current state of the reducer for each action type.
 *
 * @param {Function} reducer
 * @param {object} actionTypes
 * @param {string} prop
 * @param {string} isNormalised
 */
const assertActionTypes = (reducer, actionTypes, prop, isNormalised = true) => {
  it.each(actionTypes)('should handle %s action type', actionType => {
    const payload = {};
    payload[prop] = 'foo';

    expect(
      reducer(undefined, {
        payload: payload,
        type: actionType,
      })[prop],
    ).toBe(isNormalised ? payload[prop] : payload);
  });
};

/**
 * Asserts the reset of the request action types.
 *
 * @param {Function} reducer
 * @param {object} actionTypes
 * @param {string} prop
 */
const assertResetActionTypes = (reducer, actionTypes, prop) => {
  it.each(actionTypes)('should handle %s action type', actionType => {
    const payload = {
      [prop]: 'foo',
    };

    expect(
      reducer(undefined, {
        payload: payload,
        type: actionType,
      })[prop],
    ).toBeNull();
  });
};

/**
 * Asserts the current state of the reducer for each `Loading Request` action type.
 *
 * @param {Function} reducer
 * @param {object} actionTypes
 */
const assertLoadingRequestActionTypes = (reducer, actionTypes) => {
  it.each(actionTypes)('should handle %s action type', actionType => {
    expect(
      reducer(undefined, {
        type: actionType,
      }).isLoading,
    ).toBeTruthy();
  });
};

/**
 * Asserts the current state of the reducer for each `Loading Success` action type.
 *
 * @param {Function} reducer
 * @param {object} actionTypes
 */
const assertLoadingSuccessActionTypes = (reducer, actionTypes) => {
  it.each(actionTypes)('should handle %s action type', actionType => {
    expect(
      reducer(undefined, {
        payload: { result: '' },
        type: actionType,
      }).isLoading,
    ).toBeFalsy();
  });
};

/**
 * Asserts the current state of the reducer for each `Loading Failure` action type.
 *
 * @param {Function} reducer
 * @param {object} actionTypes
 */
const assertLoadingFailureActionTypes = (reducer, actionTypes) => {
  it.each(actionTypes)('should handle %s action type', actionType => {
    expect(
      reducer(undefined, {
        payload: { error: '' },
        type: actionType,
      }).isLoading,
    ).toBeFalsy();
  });
};

/**
 * Asserts the getter functions of the reducer.
 *
 * @param {Function} reducer
 * @param {string} prop
 */
const assertGetter = (reducer, prop) => {
  it(`should return the ${prop} property from a given state`, () => {
    const result = {};
    result[prop] = 'foo';

    switch (prop) {
      case defaultProps.error:
        expect(reducer.getError(result)).toBe(result[prop]);
        break;
      case defaultProps.result:
        expect(reducer.getResult(result)).toBe(result[prop]);
        break;
      case defaultProps.isLoading:
        expect(reducer.getIsLoading(result)).toBe(result[prop]);
        break;
      default:
        break;
    }
  });
};

export const assertErrorReducer = (reducer, actionTypes) => {
  beforeEach(() => {
    initialState = getInitialState(reducer());
  });

  describe('error() reducer', () => {
    assertInitialState(reducer, defaultProps.error);
    assertPreviousState(reducer, defaultProps.error);
    assertActionTypes(reducer, actionTypes.failure, defaultProps.error);
    assertResetActionTypes(reducer, actionTypes.request, defaultProps.error);
  });
};

export const assertResultReducer = (
  reducer,
  actionTypes,
  isNormalised = true,
) => {
  beforeEach(() => {
    initialState = getInitialState(reducer());
  });

  describe('result() reducer', () => {
    assertInitialState(reducer, defaultProps.result);
    assertPreviousState(reducer, defaultProps.result);
    assertActionTypes(
      reducer,
      actionTypes.success,
      defaultProps.result,
      isNormalised,
    );
  });
};

export const assertLoadingReducer = (reducer, actionTypes) => {
  beforeEach(() => {
    initialState = getInitialState(reducer());
  });

  describe('loading() reducer', () => {
    assertInitialState(reducer, defaultProps.isLoading);
    assertPreviousState(reducer, defaultProps.isLoading);
    assertLoadingRequestActionTypes(reducer, actionTypes.request);
    assertLoadingSuccessActionTypes(reducer, actionTypes.success);
    assertLoadingFailureActionTypes(reducer, actionTypes.failure);
  });
};

export const assertGetters = (reducer, props = defaultProps) => {
  describe('getters', () => {
    Object.values(props).map(prop => assertGetter(reducer, prop));
  });
};

/**
 * Tests if the the selectors responsible for obtaining the reducer state
 * (i.e get_subAreaHere()) returns the correct state.
 *
 * @param {*} fromReducer - Object containing all reducers.
 * @param {*} subAreaNames - Array of strings with all the subareas to test.
 * @param {*} subAreasExpectedStates - Object containing each subarea  to test
 * and its expected state, as a result of invoking the selector.
 * @param {*} subAreaCurrentState - Object with the current state for a specific
 * subarea, for example { error: null, isLoading: false }.
 */
export const assertSubAreasReducer = (
  fromReducer,
  subAreaNames,
  subAreasExpectedStates,
  subAreaCurrentState,
) => {
  it.each(subAreaNames)('return the `%s` property subarea state', subArea => {
    const { [`get${subArea}`]: reducerSelector } = fromReducer;
    expect(reducerSelector(subAreasExpectedStates)).toEqual(
      subAreaCurrentState,
    );
  });
};
