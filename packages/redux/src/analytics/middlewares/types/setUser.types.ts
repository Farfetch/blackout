import type {
  OPTION_FETCH_USER_ID_SELECTOR,
  OPTION_FETCH_USER_SELECTOR,
  OPTION_TRIGGER_ANONYMIZE_ACTIONS,
  OPTION_TRIGGER_SET_USER_ACTIONS,
  OPTION_USER_TRAITS_PICKER,
} from '../setUser';
import type { StoreState } from '../../../types';
import type { UserData, UserTraits } from '@farfetch/blackout-analytics/';

export type UserType = UserTraits & { id: UserData['id'] };

export type SetUserActionTypes = Set<string> | Array<string>;

export type SetUserActionOptions = {
  [OPTION_TRIGGER_SET_USER_ACTIONS]?: Set<string>;
  [OPTION_TRIGGER_ANONYMIZE_ACTIONS]?: Set<string>;
  [OPTION_FETCH_USER_ID_SELECTOR]?: (user: UserType | null) => UserData['id'];
  [OPTION_FETCH_USER_SELECTOR]?: (state: StoreState) => UserType;
  [OPTION_USER_TRAITS_PICKER]?: (user: UserType) => UserTraits;
};
export type SetUserMiddlewareOptions =
  | SetUserActionOptions
  | SetUserActionTypes;
