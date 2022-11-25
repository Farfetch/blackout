import { getInitialState } from '..';
import type { AnyAction } from 'redux';

export const defaultProps = {
  error: 'error',
  result: 'result',
  isLoading: 'isLoading',
};

let initialState: Record<string, unknown>;

/**
 * Asserts the initial state of the reducer.
 *
 * @param reducer -
 * @param prop    -
 */
const assertInitialState = (
  reducer: () => Record<string, unknown>,
  prop: string,
) => {
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
 * @param reducer -
 * @param prop    -
 */
const assertPreviousState = (
  reducer: (state: Record<string, unknown>) => Record<string, unknown>,
  prop: string,
) => {
  it('should handle other actions by returning the previous state', () => {
    const state: Record<string, unknown> = {};
    state[prop] = 'foo';

    expect(reducer(state)[prop]).toBe(state[prop]);
  });
};

/**
 * Asserts the current state of the reducer for each action type.
 *
 * @param reducer      -
 * @param actionTypes  -
 * @param prop         -
 * @param isNormalised -
 */
const assertActionTypes = (
  reducer: (
    state: Record<string, unknown> | undefined,
    action: AnyAction,
  ) => Record<string, unknown>,
  actionTypes: string[],
  prop: string,
  isNormalised = true,
) => {
  it.each(actionTypes)('should handle %s action type', actionType => {
    const payload: Record<string, unknown> = {};
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
 * @param reducer     -
 * @param actionTypes -
 * @param prop        -
 */
const assertResetActionTypes = (
  reducer: (
    state: Record<string, unknown> | undefined,
    action: AnyAction,
  ) => Record<string, unknown>,
  actionTypes: string[],
  prop: string,
) => {
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
 * @param reducer     -
 * @param actionTypes -
 */
const assertLoadingRequestActionTypes = (
  reducer: (
    state: Record<string, unknown> | undefined,
    action: AnyAction,
  ) => Record<string, unknown>,
  actionTypes: string[],
) => {
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
 * @param reducer     -
 * @param actionTypes -
 */
const assertLoadingSuccessActionTypes = (
  reducer: (
    state: Record<string, unknown> | undefined,
    action: AnyAction,
  ) => Record<string, unknown>,
  actionTypes: string[],
) => {
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
 * @param reducer     -
 * @param actionTypes -
 */
const assertLoadingFailureActionTypes = (
  reducer: (
    state: Record<string, unknown> | undefined,
    action: AnyAction,
  ) => Record<string, unknown>,
  actionTypes: string[],
) => {
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
 * @param reducer -
 * @param prop    -
 */
const assertGetter = (
  reducer: {
    getError?: (state: Record<string, unknown>) => unknown;
    getResult?: (state: Record<string, unknown>) => unknown;
    getIsLoading?: (state: Record<string, unknown>) => unknown;
  },
  prop: string,
) => {
  it(`should return the ${prop} property from a given state`, () => {
    const result: Record<string, unknown> = {};
    result[prop] = 'foo';

    switch (prop) {
      case defaultProps.error:
        expect(reducer.getError!(result)).toBe(result[prop]);
        break;
      case defaultProps.result:
        expect(reducer.getResult!(result)).toBe(result[prop]);
        break;
      case defaultProps.isLoading:
        expect(reducer.getIsLoading!(result)).toBe(result[prop]);
        break;
      default:
        break;
    }
  });
};

export const assertErrorReducer = (
  reducer: (
    state?: Record<string, unknown> | undefined,
    action?: AnyAction,
  ) => Record<string, unknown>,
  actionTypes: {
    failure: string[];
    request: string[];
  },
) => {
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
  reducer: (
    state?: Record<string, unknown> | undefined,
    action?: AnyAction,
  ) => Record<string, unknown>,
  actionTypes: {
    success: string[];
  },
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

export const assertLoadingReducer = (
  reducer: (
    state?: Record<string, unknown>,
    action?: AnyAction,
  ) => Record<string, unknown>,
  actionTypes: {
    request: string[];
    success: string[];
    failure: string[];
  },
) => {
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

export const assertGetters = (
  reducer: {
    getError?: (state: Record<string, unknown>) => unknown;
    getResult?: (state: Record<string, unknown>) => unknown;
    getIsLoading?: (state: Record<string, unknown>) => unknown;
  },
  props = defaultProps,
) => {
  describe('getters', () => {
    Object.values(props).map(prop => assertGetter(reducer, prop));
  });
};

/**
 * Tests if the the selectors responsible for obtaining the reducer state (i.e
 * get_subAreaHere()) returns the correct state.
 *
 * @param fromReducer            - Object containing all reducers.
 * @param subAreaNames           - Array of strings with all the subareas to test.
 * @param subAreasExpectedStates - Object containing each subarea to test and its expected state, as a
 *                                 result of invoking the selector.
 * @param subAreaCurrentState    - Object with the current state for a specific subarea,
 *                                 for example \{ error: null, isLoading: false \}.
 */
export const assertSubAreasReducer = (
  fromReducer: Record<string, unknown>,
  subAreaNames: string[],
  subAreasExpectedStates: Record<string, unknown>,
  subAreaCurrentState: Record<string, unknown>,
) => {
  it.each(subAreaNames)('return the `%s` property subarea state', subArea => {
    const { [`get${subArea}`]: reducerSelector } = fromReducer;
    const reducerSelectorFunc = reducerSelector as (
      state: Record<string, unknown>,
    ) => Record<string, unknown>;

    expect(reducerSelectorFunc(subAreasExpectedStates)).toEqual(
      subAreaCurrentState,
    );
  });
};
