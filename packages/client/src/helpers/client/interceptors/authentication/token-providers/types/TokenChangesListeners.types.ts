import type { ITokenData } from './TokenData.types.js';

export type TokenChangesListeners = {
  id: number;
  callback: (tokenData?: ITokenData | null) => void;
};
