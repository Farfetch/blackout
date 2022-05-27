import { rest, RestHandler } from 'msw';
import urlJoin from 'proper-url-join';
import type {
  GetOperationsQuery,
  GetOperationsResponse,
} from '../types/getOperations.types';

const buildUrl = (id: number, query: GetOperationsQuery) =>
  urlJoin('/api/checkout/v1/orders/', id, 'operations', {
    query,
  });

export default {
  success: (params: {
    id: number;
    query: GetOperationsQuery;
    response: GetOperationsResponse;
  }): RestHandler =>
    rest.get(buildUrl(params.id, params.query), (_, res, ctx) =>
      res(ctx.status(200), ctx.json(params.response)),
    ),
  failure: (params: { id: number; query: GetOperationsQuery }): RestHandler =>
    rest.get(buildUrl(params.id, params.query), (_, res, ctx) =>
      res(ctx.status(404), ctx.json({ message: 'stub error' })),
    ),
};
