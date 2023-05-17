import { rest, type RestHandler } from 'msw';
import type { CommercePages } from '../types/index.js';

const path = '/api/content/v2/commercepages';

const fixtures = {
  get: {
    success: (response: CommercePages): RestHandler =>
      rest.get(path, (_req, res, ctx) =>
        res(ctx.status(200), ctx.json(response)),
      ),
    failure: (): RestHandler =>
      rest.get(path, (_req, res, ctx) =>
        res(ctx.status(404), ctx.json({ message: 'stub error' })),
      ),
  },
};

export default fixtures;
