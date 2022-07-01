import { rest, RestHandler } from 'msw';
import type { UserAddress } from '../../../types/common/address.types';

const path = '/api/account/v1/users/:userId/addresses/preferred/current';

const fixtures = {
  success: (response: UserAddress): RestHandler =>
    rest.get(path, async (_req, res, ctx) =>
      res(ctx.status(200), ctx.json(response)),
    ),
  failure: (): RestHandler =>
    rest.get(path, async (_req, res, ctx) =>
      res(
        ctx.status(400),
        ctx.json({
          errors: [
            {
              code: 0,
              message: 'error',
              developerMessage: 'This is developer message',
              moreInformation: 'Error more information',
              exception: {},
            },
          ],
        }),
      ),
    ),
};

export default fixtures;
