import type { ITokenData } from '../token-providers/types/TokenData.types.js';
import type { TokenKind } from '../token-providers/index.js';

export type UserToken = {
  kind: TokenKind;
  data: ITokenData | null;
};
