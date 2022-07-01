import type { AuthenticationState } from '../authentication/types';
import type { BenefitsState } from '../benefits/types';
import type {
  BlackoutError,
  User,
  UserAttribute,
} from '@farfetch/blackout-client';
import type { CombinedState } from 'redux';
import type { ContactsState } from '../contacts/types';
import type { CreditMovementsState, CreditsState } from '../credits/types';
import type { Nullable, StateWithResult } from '../../types';
import type {
  PreferencesState,
  UpdatePreferencesState,
} from '../preferences/types';
import type { TitlesState } from '../titles/types';
import type { UserAddressesState } from '../addresses/types';

export type UsersState = CombinedState<{
  error: Nullable<BlackoutError>;
  isLoading: boolean;
  id: Nullable<User['id']>;
  addresses: UserAddressesState;
  attributes: StateWithResult<UserAttribute[]>;
  authentication: AuthenticationState;
  benefits: BenefitsState;
  contacts: ContactsState;
  credits: CreditsState;
  creditMovements: CreditMovementsState;
  preferences: PreferencesState;
  titles: TitlesState;
  updatePreferences: UpdatePreferencesState;
}>;
