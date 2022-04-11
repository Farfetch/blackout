import type { ITokenData } from './TokenData.types';

export interface TokenChangesListeners {
  id: number;
  callback: (tokenData?: ITokenData | null) => void;
}
