import * as defaults from '../defaults.js';
import { PACKAGE_VERSION } from '../constants.js';

describe('Defaults', () => {
  // Try to match object instead of snapshot. We have a reference to `version` from package.json
  // This way we don't have outdated snapshots on every release
  it('Should export getContextDefaults', () => {
    const result = {
      library: {
        name: '@farfetch/blackout-analytics',
        version: PACKAGE_VERSION,
      },
    };
    const data = defaults.getContextDefaults();

    expect(data).toMatchObject(result);
  });
});
