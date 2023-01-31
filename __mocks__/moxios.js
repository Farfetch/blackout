import axios from 'axios';
import moxios from 'moxios';

/**
 * Creates a wrapper for the mock adapter installed by moxios
 * on the axios instance. This wrapper will fix the problem
 * that the baseURL is not being added to the final url of the request
 * as axios does, which would make tests that stub the request url
 * with the baseURL to fail.
 *
 * @param {Function} moxiosMockAdapter - The default moxios adapter that will be installed on the axios instance.
 * @returns {Function} The wrapper to the moxios default adapter.
 */
const getMoxiosMockAdapterWrap = moxiosMockAdapter => {
  return config => {
    // If config contains a baseURL property, append it to the url, because the
    // moxiosMockAdapter will only check the url property when matching requests
    config.url = config.baseURL ? `${config.baseURL}${config.url}` : config.url;

    return moxiosMockAdapter(config);
  };
};

export default {
  ...moxios,
  install: function install() {
    // Retrieves the axios instance to apply the adapter. If passed undefined, will use
    // the axios default export.
    const instance =
      arguments.length <= 0 || arguments[0] === undefined
        ? axios
        : arguments[0];

    moxios.install(instance);

    // After calling moxios.install, the moxios adapter will be installed
    // on the instance.defaults.adapter property.
    const moxiosMockAdapter = instance.defaults.adapter;

    // Set the instance.defaults.adapter property with our wrapper.
    instance.defaults.adapter = getMoxiosMockAdapterWrap(moxiosMockAdapter);
  },
};
