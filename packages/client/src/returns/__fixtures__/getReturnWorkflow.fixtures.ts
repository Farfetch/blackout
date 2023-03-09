import { rest, type RestHandler } from 'msw';
import type { ReturnWorkflow } from '../types/getReturnWorkflow.types';

const path = '/api/account/v1/returns/:id/workflow';

const fixtures = {
  success: (response: ReturnWorkflow): RestHandler =>
    rest.get(path, (_req, res, ctx) =>
      res(ctx.status(200), ctx.json(response)),
    ),
  failure: (): RestHandler =>
    rest.get(path, (_req, res, ctx) =>
      res(ctx.status(404), ctx.json({ message: 'stub error' })),
    ),
};

export default fixtures;
