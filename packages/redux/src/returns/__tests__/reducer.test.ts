import * as actionTypes from '../actionTypes';
import * as fromReducer from '../reducer';
import {
  FETCH_USER_SUCCESS,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
} from '../../users/authentication/actionTypes';
import {
  mockState,
  pickupDay,
  returnId,
  returnPickupCapabilityId,
} from 'tests/__fixtures__/returns';
import { toBlackoutError } from '@farfetch/blackout-client';
import omit from 'lodash/omit';
import reducer, { entitiesMapper } from '../reducer';
import type { ReturnsState } from '../types';
import type { StoreState } from '../../types';

let initialState: ReturnsState;
const randomAction = { type: 'this_is_a_random_action' };

describe('returns reducer', () => {
  beforeEach(() => {
    initialState = fromReducer.INITIAL_STATE;
  });

  describe('reset handling', () => {
    it.each([
      actionTypes.RESET_RETURNS,
      LOGOUT_SUCCESS,
      LOGIN_SUCCESS,
      FETCH_USER_SUCCESS,
      REGISTER_SUCCESS,
    ])('should return initial state on %s action', actionType => {
      expect(
        reducer(mockState, { type: actionType, payload: {} }),
      ).toMatchObject(initialState);
    });
  });

  describe('returnDetails() reducer', () => {
    it('should return the initial state', () => {
      const state = reducer(undefined, randomAction).returnDetails;

      expect(state).toEqual(initialState.returnDetails);
      expect(state).toEqual({ error: {}, isLoading: {} });
    });

    it.each([
      actionTypes.FETCH_RETURN_REQUEST,
      actionTypes.UPDATE_RETURN_REQUEST,
    ])('should handle %s action type', actionType => {
      expect(
        reducer(undefined, {
          meta: { returnId },
          type: actionType,
        }).returnDetails,
      ).toEqual({
        error: { [returnId]: null },
        isLoading: { [returnId]: true },
      });
    });

    it.each([
      actionTypes.FETCH_RETURN_FAILURE,
      actionTypes.UPDATE_RETURN_FAILURE,
    ])('should handle %s action type', actionType => {
      expect(
        reducer(undefined, {
          meta: { returnId },
          type: actionType,
          payload: { error: toBlackoutError(new Error('dummy error')) },
        }).returnDetails,
      ).toEqual({
        error: { [returnId]: expect.any(Error) },
        isLoading: { [returnId]: false },
      });
    });

    it.each([
      actionTypes.FETCH_RETURN_SUCCESS,
      actionTypes.UPDATE_RETURN_SUCCESS,
    ])('should handle %s action type', actionType => {
      expect(
        reducer(undefined, {
          meta: { returnId },
          type: actionType,
        }).returnDetails,
      ).toEqual({ error: {}, isLoading: { [returnId]: false } });
    });

    describe('should handle RESET_RETURN_STATE action type', () => {
      const anotherReturnId = returnId + 1;

      const state = {
        ...mockState.returns,
        returnDetails: {
          error: {
            [returnId]: toBlackoutError(new Error('dummy_error')),
            [anotherReturnId]: toBlackoutError(new Error('dummy_error')),
          },
          isLoading: { [returnId]: true, [anotherReturnId]: true },
        },
      };

      it('should reset the state of all entries when payload is empty', () => {
        expect(
          reducer(state, {
            type: actionTypes.RESET_RETURN_STATE,
            payload: [],
          }).returnDetails,
        ).toEqual(initialState.returnDetails);
      });

      it('should reset the state of the selected entries in payload only', () => {
        const expectedResult = {
          error: {
            [anotherReturnId]: expect.any(Error),
          },
          isLoading: {
            [anotherReturnId]: true,
          },
        };

        expect(
          reducer(state, {
            type: actionTypes.RESET_RETURN_STATE,
            payload: [returnId],
          }).returnDetails,
        ).toEqual(expectedResult);
      });
    });

    it('should handle other actions by returning the previous state', () => {
      const state = {
        ...initialState,
        returnDetails: { error: {}, isLoading: { [returnId]: false } },
      };

      expect(reducer(state, randomAction).returnDetails).toEqual(
        state.returnDetails,
      );
    });
  });

  describe('returnPickupCapability() reducer', () => {
    it('should return the initial state', () => {
      const state = reducer(undefined, randomAction).returnPickupCapabilities;

      expect(state).toEqual(initialState.returnPickupCapabilities);
      expect(state).toEqual({ error: {}, isLoading: {} });
    });

    it('should handle FETCH_RETURN_PICKUP_CAPABILITY_REQUEST action type', () => {
      expect(
        reducer(undefined, {
          meta: { hash: returnPickupCapabilityId },
          type: actionTypes.FETCH_RETURN_PICKUP_CAPABILITY_REQUEST,
        }).returnPickupCapabilities,
      ).toEqual({
        error: { [returnPickupCapabilityId]: null },
        isLoading: { [returnPickupCapabilityId]: true },
      });
    });

    it('should handle FETCH_RETURN_PICKUP_CAPABILITY_FAILURE action type', () => {
      expect(
        reducer(undefined, {
          meta: { hash: returnPickupCapabilityId },
          type: actionTypes.FETCH_RETURN_PICKUP_CAPABILITY_FAILURE,
          payload: { error: toBlackoutError(new Error('dummy error')) },
        }).returnPickupCapabilities,
      ).toEqual({
        error: { [returnPickupCapabilityId]: expect.any(Error) },
        isLoading: { [returnPickupCapabilityId]: false },
      });
    });

    it('should handle FETCH_RETURN_PICKUP_CAPABILITY_SUCCESS action type', () => {
      expect(
        reducer(undefined, {
          meta: { hash: returnPickupCapabilityId },
          type: actionTypes.FETCH_RETURN_PICKUP_CAPABILITY_SUCCESS,
        }).returnPickupCapabilities,
      ).toEqual({
        error: {},
        isLoading: { [returnPickupCapabilityId]: false },
      });
    });

    describe('should handle RESET_RETURN_PICKUP_CAPABILITY_STATE action type', () => {
      const anotherReturnPickupCapabilityId = returnPickupCapabilityId.replace(
        '2020',
        '2022',
      );

      const state = {
        ...mockState.returns,
        returnPickupCapabilities: {
          error: {
            [returnPickupCapabilityId]: toBlackoutError(
              new Error('dummy_error'),
            ),
            [anotherReturnPickupCapabilityId]: toBlackoutError(
              new Error('dummy_error'),
            ),
          },
          isLoading: {
            [returnPickupCapabilityId]: true,
            [anotherReturnPickupCapabilityId]: true,
          },
        },
      };

      it('should reset the state of all entries when payload is empty', () => {
        expect(
          reducer(state, {
            type: actionTypes.RESET_RETURN_PICKUP_CAPABILITY_STATE,
            payload: [],
          }).returnPickupCapabilities,
        ).toEqual(initialState.returnPickupCapabilities);
      });

      it('should reset the state of the selected entries in payload only', () => {
        const expectedResult = {
          error: {
            [anotherReturnPickupCapabilityId]: expect.any(Error),
          },
          isLoading: {
            [anotherReturnPickupCapabilityId]: true,
          },
        };

        expect(
          reducer(state, {
            type: actionTypes.RESET_RETURN_PICKUP_CAPABILITY_STATE,
            payload: [{ returnId, pickupDay }],
          }).returnPickupCapabilities,
        ).toEqual(expectedResult);
      });
    });

    it('should handle other actions by returning the previous state', () => {
      const state = {
        ...initialState,
        returnPickupCapabilities: {
          error: {},
          isLoading: { [returnId]: false },
        },
      };

      expect(reducer(state, randomAction).returnPickupCapabilities).toEqual(
        state.returnPickupCapabilities,
      );
    });
  });

  describe('createReturn() reducer', () => {
    it('should return the initial state', () => {
      const state = reducer(undefined, randomAction).createReturn;

      expect(state).toEqual(initialState.createReturn);
      expect(state).toEqual({ error: null, isLoading: false, result: null });
    });

    it('should handle CREATE_RETURN_REQUEST action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.CREATE_RETURN_REQUEST,
        }).createReturn,
      ).toEqual({
        error: null,
        isLoading: true,
        result: null,
      });
    });

    it('should handle CREATE_RETURN_FAILURE action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.CREATE_RETURN_FAILURE,
          payload: { error: toBlackoutError(new Error('dummy error')) },
        }).createReturn,
      ).toEqual({
        error: expect.any(Error),
        isLoading: false,
        result: null,
      });
    });

    it('should handle CREATE_RETURN_SUCCESS action type', () => {
      expect(
        reducer(undefined, {
          payload: { result: returnId },
          type: actionTypes.CREATE_RETURN_SUCCESS,
        }).createReturn,
      ).toEqual({
        error: null,
        isLoading: false,
        result: returnId,
      });
    });

    it('should handle RESET_CREATE_RETURN_STATE action type', () => {
      const state = {
        ...mockState.returns,
        createReturn: {
          error: toBlackoutError(new Error('dummy_error')),
          isLoading: true,
        },
      };

      expect(
        reducer(state, {
          type: actionTypes.RESET_CREATE_RETURN_STATE,
          payload: [],
        }).createReturn,
      ).toEqual(initialState.createReturn);
    });

    it('should handle other actions by returning the previous state', () => {
      const state = {
        ...initialState,
        createReturn: { error: {}, isLoading: { [returnId]: false } },
      };

      expect(reducer(state, randomAction).createReturn).toEqual(
        state.createReturn,
      );
    });
  });

  describe('entitiesMapper()', () => {
    const state = mockState.entities as NonNullable<StoreState['entities']>;

    describe('update return logic', () => {
      it('should handle UPDATE_RETURN_SUCCESS action', () => {
        const returnPickupSchedule = {
          start: 1641553200,
          end: 1641556800,
        };

        const newState = entitiesMapper[actionTypes.UPDATE_RETURN_SUCCESS](
          state,
          {
            meta: { returnId },
            payload: {
              pickupSchedule: returnPickupSchedule,
            },
            type: actionTypes.RESET_RETURNS,
          },
        );

        expect(newState.returns?.[returnId]?.pickupSchedule).toEqual(
          returnPickupSchedule,
        );
      });
    });

    describe('reset logic', () => {
      const expectedResult = omit(state, ['returns', 'returnItems']);

      it('should handle RESET_RETURNS action WITH reset entities flag ', () => {
        expect(
          entitiesMapper[actionTypes.RESET_RETURNS](state, {
            meta: { resetEntities: true },
            type: actionTypes.RESET_RETURNS,
          }),
        ).toEqual(expectedResult);
      });

      it('should handle RESET_RETURNS action WITHOUT reset entities flag ', () => {
        expect(
          entitiesMapper[actionTypes.RESET_RETURNS](state, {
            meta: { resetEntities: false },
            type: actionTypes.RESET_RETURNS,
          }),
        ).toEqual(state);
      });

      describe('other actions reset handling', () => {
        it.each([
          LOGOUT_SUCCESS,
          LOGIN_SUCCESS,
          FETCH_USER_SUCCESS,
          REGISTER_SUCCESS,
        ])('should return initial state on %s action', actionType => {
          expect(
            entitiesMapper[actionType as keyof typeof entitiesMapper](state, {
              type: actionType,
            }),
          ).toEqual(expectedResult);
        });
      });
    });
  });

  describe('getReturnDetails() selector', () => {
    it('should return the `returnDetails` property from a given state', () => {
      expect(fromReducer.getReturnDetails(initialState)).toBe(
        initialState.returnDetails,
      );
    });
  });

  describe('getReturnPickupCapabilities() selector', () => {
    it('should return the `returnPickupCapabilities` property from a given state', () => {
      expect(fromReducer.getReturnPickupCapabilities(initialState)).toBe(
        initialState.returnPickupCapabilities,
      );
    });
  });

  describe('getCreateReturn() selector', () => {
    it('should return the `createReturn` property from a given state', () => {
      expect(fromReducer.getCreateReturn(initialState)).toBe(
        initialState.createReturn,
      );
    });
  });
});
