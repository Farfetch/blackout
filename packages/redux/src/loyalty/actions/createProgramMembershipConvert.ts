import { createProgramMembershipConvertFactory } from './factories';
import { postProgramMembershipConvert } from '@farfetch/blackout-client/loyalty';

/**
 * Create program membership convert.
 *
 * @memberof module:loyalty/actions
 *
 * @name createProgramMembershipConvert
 *
 * @type {CreateProgramMembershipConvertThunkFactory}
 */
export default createProgramMembershipConvertFactory(
  postProgramMembershipConvert,
);
