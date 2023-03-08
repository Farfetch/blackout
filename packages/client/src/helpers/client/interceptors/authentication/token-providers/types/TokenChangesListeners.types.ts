import type { ITokenData } from './TokenData.types.js';

export interface TokenChangesListeners {
  id: number;
  callback: (tokenData?: ITokenData | null) => void;
}
