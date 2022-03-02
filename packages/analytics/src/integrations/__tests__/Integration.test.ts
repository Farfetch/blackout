import { Integration } from '..';
import { LOAD_INTEGRATION_TRACK_TYPE } from '../../utils';
import type {
  EventData,
  IntegrationOptions,
  LoadIntegrationEventData,
  StrippedDownAnalytics,
  TrackTypesValues,
} from '../..';

class MyIntegration extends Integration {
  static createInstance(
    options: IntegrationOptions,
    loadData: LoadIntegrationEventData,
    analytics: StrippedDownAnalytics,
  ) {
    return new MyIntegration(options, loadData, analytics);
  }

  static shouldLoad() {
    return true;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  track(data: EventData<TrackTypesValues>): void {
    // Do nothing
  }
}

describe('Integration', () => {
  const options = {
    endpoint: '/foo',
    data: {
      bar: 'bar',
      foo: 'foo',
    },
  };
  const loadData: LoadIntegrationEventData = {
    type: LOAD_INTEGRATION_TRACK_TYPE,
    event: LOAD_INTEGRATION_TRACK_TYPE,
    user: {},
    properties: {},
    consent: { marketing: false, statistics: false, preferences: false },
    context: { library: 'xxx', version: '1.0.0', event: {} },
    platform: 'web',
    timestamp: 100000000000,
  };
  let integration: Integration;

  beforeEach(() => {
    integration = new MyIntegration(options, loadData, {
      createEvent: type => Promise.resolve({ ...loadData, type }),
    });
  });

  it('Should not be ready to load by default', () => {
    expect(Integration.shouldLoad(loadData.consent)).toEqual(false);
  });

  it('Should set the options passed in the constructor', () => {
    // @ts-ignore
    expect(integration.options).toEqual(options);
  });

  it('Should have a track method', () => {
    expect(integration.track).toBeInstanceOf(Function);
  });

  it('Should have a setConsent method', () => {
    expect(integration.setConsent).toBeInstanceOf(Function);
  });
});
