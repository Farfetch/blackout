import { rest, type RestHandler } from 'msw';
import type { ContentTypes } from '../types/index.js';

const path = '/api/content/v1/spaces/:spaceCode/contentTypes';

const fixtures = {
  success: (response: ContentTypes): RestHandler =>
    rest.get(path, (_req, res, ctx) =>
      res(ctx.status(200), ctx.json(response)),
    ),
  failure: (): RestHandler =>
    rest.get(path, (_req, res, ctx) =>
      res(ctx.status(404), ctx.json({ message: 'stub error' })),
    ),
};

export default fixtures;
