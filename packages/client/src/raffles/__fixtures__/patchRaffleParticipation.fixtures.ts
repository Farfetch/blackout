import { rest, type RestHandler } from 'msw';

const path =
  '/api/checkout/v1/raffles/:raffleId/participations/:participationId';
const fixtures = {
  success: (): RestHandler =>
    rest.patch(path, (_req, res, ctx) => res(ctx.status(204))),
  failure: (): RestHandler =>
    rest.patch(path, (_req, res, ctx) =>
      res(ctx.status(404), ctx.json({ message: 'stub error' })),
    ),
};

export default fixtures;
