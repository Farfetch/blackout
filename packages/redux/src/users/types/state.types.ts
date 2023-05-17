import type { AuthenticationState } from '../authentication/types/index.js';
import type { BenefitsState } from '../benefits/types/index.js';
import type {
  BlackoutError,
  User,
  UserAttribute,
} from '@farfetch/blackout-client';
import type { CombinedState } from 'redux';
import type { ContactsState } from '../contacts/types/index.js';
import type {
  CreditMovementsState,
  CreditsState,
} from '../credits/types/index.js';
import type { Nullable, StateWithResult } from '../../types/index.js';
import type {
  PreferencesState,
  UpdatePreferencesState,
} from '../preferences/types/index.js';
import type { TitlesState } from '../titles/types/index.js';
import type { UserAddressesState } from '../addresses/types/index.js';
import type { UserPersonalIdsState } from '../personalIds/types/index.js';
import type { UserReturnsState } from '../returns/types/index.js';

export type UsersState = CombinedState<{
  error: Nullable<BlackoutError>;
  isLoading: boolean;
  id: Nullable<User['id']>;
  addresses: UserAddressesState;
  attributes: StateWithResult<UserAttribute[]>;
  authentication: AuthenticationState;
  benefits: BenefitsState;
  contacts: ContactsState;
  creditMovements: CreditMovementsState;
  credits: CreditsState;
  personalIds: UserPersonalIdsState;
  preferences: PreferencesState;
  returns: UserReturnsState;
  titles: TitlesState;
  updatePreferences: UpdatePreferencesState;
}>;
