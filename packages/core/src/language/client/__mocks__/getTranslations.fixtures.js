import join from 'proper-url-join';
import moxios from 'moxios';

export default {
  success: (query, response) => {
    moxios.stubRequest(
      join('/api/language/v1/search/translations', {
        query,
      }),
      {
        response,
        status: 200,
      },
    );
  },
  failure: query => {
    moxios.stubRequest(
      join('/api/language/v1/search/translations', {
        query,
      }),
      {
        response: 'stub error',
        status: 404,
      },
    );
  },
};
