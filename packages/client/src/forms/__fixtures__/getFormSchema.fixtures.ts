import { rest, RestHandler } from 'msw';
import type { FormSchema } from '../types';

const path = '/api/communication/v1/forms/:schemaCode';

export default {
  success: (response: FormSchema): RestHandler =>
    rest.get(path, async (_req, res, ctx) =>
      res(ctx.status(200), ctx.json(response)),
    ),
  failure: (): RestHandler =>
    rest.get(path, async (_req, res, ctx) =>
      res(ctx.status(404), ctx.json({ message: 'stub error' })),
    ),
};
