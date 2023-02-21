import { rest, type RestHandler } from 'msw';
import type { SubmittedFormData } from '../types';

const path = '/api/communication/v1/forms/:schemaCode/data';

const fixtures = {
  success: (response: SubmittedFormData): RestHandler =>
    rest.post(path, (_req, res, ctx) =>
      res(ctx.status(200), ctx.json(response)),
    ),
  failure: (): RestHandler =>
    rest.post(path, (_req, res, ctx) =>
      res(ctx.status(404), ctx.json({ message: 'stub error' })),
    ),
};

export default fixtures;
