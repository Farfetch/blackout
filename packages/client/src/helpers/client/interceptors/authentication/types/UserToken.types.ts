import type { ITokenData } from '../token-providers/types/TokenData.types';
import type { TokenKinds } from '../token-providers';

export default interface UserToken {
  kind: TokenKinds;
  data: ITokenData | null;
}
