import reducerFactory, { createReducerWithResult } from '../reducerFactory.js';
import type { BlackoutError } from '@farfetch/blackout-client';

describe('reducerFactory', () => {
  const actionType = 'ACTION_FACTORY';
  const actionTypes = {
    RESET_ACTION_FACTORY: '@farfetch/blackout-redux/RESET_ACTION_FACTORY',
    ACTION_FACTORY_REQUEST: '@farfetch/blackout-redux/ACTION_FACTORY_REQUEST',
    ACTION_FACTORY_SUCCESS: '@farfetch/blackout-redux/ACTION_FACTORY_SUCCESS',
    ACTION_FACTORY_FAILURE: '@farfetch/blackout-redux/ACTION_FACTORY_FAILURE',
    LOGOUT_SUCCESS: '@farfetch/blackout-redux/LOGOUT_SUCCESS',
  };
  const initialState = {
    error: null,
    id: null,
    isLoading: false,
  };
  const state = { foo: 'bar' };

  let reducer: ReturnType<typeof reducerFactory>;

  beforeAll(() => {
    reducer = reducerFactory(actionType, initialState, actionTypes);
  });

  it('should handle a *_REQUEST action successfully', () => {
    const action = {
      type: actionTypes.ACTION_FACTORY_REQUEST,
    };
    const response = reducer(state, action);

    expect(response.error).toBe(initialState.error);
    expect(response.isLoading).toBe(true);
  });

  it('should handle a *_FAILURE action response successfully', () => {
    const error = new Error(
      'ACTION_FACTORY_FAILURE error response',
    ) as BlackoutError;
    const action = {
      type: actionTypes.ACTION_FACTORY_FAILURE,
      payload: { error },
    };
    const response = reducer(state, action);

    expect(response.error).toBe(error);
    expect(response.isLoading).toBe(false);
  });

  it('should handle a *_SUCCESS action response successfully', () => {
    const action = { type: actionTypes.ACTION_FACTORY_SUCCESS };

    expect(reducer(state, action)).toEqual(initialState);
  });

  it('should handle a not recognizable action successfully', () => {
    const action = { type: 'OTHER_ACTION' };

    expect(reducer(state, action)).toEqual(state);
  });

  it('should handle a LOGOUT_SUCCESS action response successfully', () => {
    const shouldResetState = true;
    const action = {
      type: actionTypes.LOGOUT_SUCCESS,
    };
    const reducerThatShouldResetState = reducerFactory(
      actionType,
      initialState,
      actionTypes,
      shouldResetState,
    );

    const response = reducerThatShouldResetState(state, action);

    expect(response.error).toBeNull();
    expect(response.isLoading).toBe(false);
  });
});

describe('createReducerWithResult', () => {
  const actionType = ['ACTION_FACTORY', 'ACTION_FACTORY_2'];
  const actionTypes = {
    RESET_ACTION_FACTORY: '@farfetch/blackout-redux/RESET_ACTION_FACTORY',
    ACTION_FACTORY_REQUEST: '@farfetch/blackout-redux/ACTION_FACTORY_REQUEST',
    ACTION_FACTORY_SUCCESS: '@farfetch/blackout-redux/ACTION_FACTORY_SUCCESS',
    ACTION_FACTORY_FAILURE: '@farfetch/blackout-redux/ACTION_FACTORY_FAILURE',
    RESET_ACTION_FACTORY_2: '@farfetch/blackout-redux/RESET_ACTION_FACTORY_2',
    ACTION_FACTORY_2_REQUEST:
      '@farfetch/blackout-redux/ACTION_FACTORY_2_REQUEST',
    ACTION_FACTORY_2_SUCCESS:
      '@farfetch/blackout-redux/ACTION_FACTORY_2_SUCCESS',
    ACTION_FACTORY_2_FAILURE:
      '@farfetch/blackout-redux/ACTION_FACTORY_2_FAILURE',
    LOGOUT_SUCCESS: '@farfetch/blackout-redux/LOGOUT_SUCCESS',
  };
  const initialState = {
    error: null,
    result: 'mockResult',
    isLoading: false,
  };
  const state = { foo: 'bar' };

  let reducer: ReturnType<typeof createReducerWithResult>;

  beforeAll(() => {
    reducer = createReducerWithResult(actionType, initialState, actionTypes);
  });

  it('should handle a *_REQUEST action successfully', () => {
    const action = {
      type: actionTypes.ACTION_FACTORY_2_REQUEST,
    };
    const response = reducer(state, action);

    expect(response.error).toBe(initialState.error);
    expect(response.isLoading).toBe(true);
  });

  it('should handle a *_FAILURE action response successfully', () => {
    const error = new Error(
      'ACTION_FACTORY_FAILURE error response',
    ) as BlackoutError;
    const action = {
      type: actionTypes.ACTION_FACTORY_2_FAILURE,
      payload: { error },
    };
    const response = reducer(state, action);

    expect(response.error).toBe(error);
    expect(response.isLoading).toBe(false);
  });

  it('should handle a *_SUCCESS action response successfully', () => {
    const action = {
      type: actionTypes.ACTION_FACTORY_2_SUCCESS,
      payload: 'mockResult',
    };

    expect(reducer(state, action)).toEqual(initialState);
  });

  it('should handle a LOGOUT_SUCCESS action response successfully', () => {
    const shouldResetState = true;
    const action = {
      type: actionTypes.LOGOUT_SUCCESS,
    };
    const reducerThatShouldResetState = reducerFactory(
      actionType,
      initialState,
      actionTypes,
      shouldResetState,
    );

    expect(reducerThatShouldResetState(state, action)).toEqual(initialState);
  });

  it('should handle a not recognizable action successfully', () => {
    const action = { type: 'OTHER_ACTION' };

    expect(reducer(state, action)).toEqual(state);
  });
});
