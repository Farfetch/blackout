import { rest } from 'msw';

/**
 * Response payloads.
 */
export default {
  get: {
    /**
     * Success msw request.
     *
     * @param {object} response - Content types payload.
     */
    success: response =>
      rest.get(
        '/api/content/v1/spaces/:spaceCode/contentTypes',
        async (req, res, ctx) => res(ctx.status(200), ctx.json(response)),
      ),
    /**
     * Failure msw request.
     */
    failure: () =>
      rest.get(
        '/api/content/v1/spaces/:spaceCode/contentTypes',
        async (req, res, ctx) =>
          res(ctx.status(404), ctx.json({ message: 'stub error' })),
      ),
  },
};
