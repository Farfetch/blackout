import { rest, type RestHandler } from 'msw';
import type { Translations } from '../types';

const path = '/api/language/v1/search/translations';

const fixtures = {
  success: (response: Translations): RestHandler =>
    rest.get(path, (_req, res, ctx) =>
      res(ctx.status(200), ctx.json(response)),
    ),
  failure: (): RestHandler =>
    rest.get(path, (_req, res, ctx) =>
      res(ctx.status(404), ctx.json({ message: 'stub error' })),
    ),
};

export default fixtures;
