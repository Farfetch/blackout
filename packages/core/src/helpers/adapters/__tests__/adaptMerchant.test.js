import { adaptMerchant } from '..';
import {
  merchantAdapted,
  merchantNotAdapted,
} from '../__fixtures__/adapters.fixtures';

describe('adaptMerchant()', () => {
  it('should return a valid merchant from a provided data', () => {
    expect(adaptMerchant(merchantNotAdapted)).toEqual(merchantAdapted);
  });

  it('should return undefined if does not receive merchantId', () => {
    expect(adaptMerchant({})).toBeUndefined();
  });
});
