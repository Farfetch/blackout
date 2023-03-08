import type { ITokenData } from '../token-providers/types/TokenData.types.js';
import type { TokenKinds } from '../token-providers/index.js';

export interface UserToken {
  kind: TokenKinds;
  data: ITokenData | null;
}
