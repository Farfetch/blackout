import type * as actionTypes from '../actionTypes';
import type { Action } from 'redux';
import type { RaffleEntity } from '../../entities';

/**
 * Action dispatched when the reset raffles request is made.
 */
export interface ResetRafflesStateAction extends Action {
  type: typeof actionTypes.RESET_RAFFLES_STATE;
  payload: Array<RaffleEntity['id']> | undefined;
}
