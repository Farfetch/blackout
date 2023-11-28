import { defaultBaseURL } from '@farfetch/blackout-client';
import { rest, type RestHandler } from 'msw';

const path = `${defaultBaseURL}/account/v1/users/:userId/addresses/preferred/:id`;

const fixtures = {
  success: (): RestHandler =>
    rest.put(path, (_req, res, ctx) => res(ctx.status(204))),
  failure: (): RestHandler =>
    rest.put(path, (_req, res, ctx) =>
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
