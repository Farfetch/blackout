import {
  type Configuration,
  ConfigurationSchemaFieldType,
} from '@farfetch/blackout-client';
import type { ConfigurationsState } from '@farfetch/blackout-redux';

export const mockConfigurationCode = '1234';
export const mockConfiguration = {
  code: mockConfigurationCode,
  type: 'configuration',
  description: 'sample configuration',
  tenantId: 25000,
  properties: [
    {
      code: '111',
      description: 'sample property',
      value: 'sample',
      schemaFieldType: ConfigurationSchemaFieldType.String,
      security: {
        resources: [
          {
            name: 'sample resource',
            action: 'resource',
          },
        ],
        scopes: ['sample'],
      },
    },
  ],
};

export const mockConfigurations = [mockConfiguration];

export const mockConfigurationsInitialState = {
  settings: {
    configurations: {
      error: null,
      isLoading: false,
      result: null,
      configuration: {
        error: {},
        isLoading: {},
      },
    } as ConfigurationsState,
  },
  entities: {
    configurations: {},
  },
};

export const mockConfigurationsState = {
  settings: {
    configurations: {
      error: null,
      isLoading: false,
      result: mockConfigurations.map(({ code }) => code),
      configuration: {
        error: {
          [mockConfigurationCode]: null,
        },
        isLoading: {
          [mockConfigurationCode]: false,
        },
      },
    },
  },
  entities: {
    configurations: mockConfigurations.reduce(
      (entity: Record<string, Configuration>, configuration) => {
        entity[configuration.code] = configuration;

        return entity;
      },
      {},
    ),
  },
};

export const mockConfigurationsLoadingState = {
  settings: {
    configurations: {
      error: null,
      isLoading: true,
      configuration: {
        error: {},
        isLoading: {},
      },
      result: null,
    },
  },
  entities: {
    configurations: {},
  },
};

export const mockConfigurationLoadingState = {
  settings: {
    configurations: {
      error: null,
      isLoading: true,
      configuration: {
        error: {
          [mockConfigurationCode]: null,
        },
        isLoading: {
          [mockConfigurationCode]: true,
        },
      },
      result: null,
    },
  },
  entities: {
    configurations: {},
  },
};

export const mockConfigurationsErrorState = {
  settings: {
    configurations: {
      error: {
        message: 'An awesome, fascinating and incredible error',
        name: 'Error name',
        code: '501',
      },
      isLoading: false,
      configuration: {
        error: {},
        isLoading: {},
      },
      result: null,
    },
  },
  entities: {
    configurations: {},
  },
};

export const mockConfigurationErrorState = {
  settings: {
    configurations: {
      error: null,
      isLoading: false,
      configuration: {
        error: {
          [mockConfigurationCode]: {
            message: 'An awesome, fascinating and incredible error',
            name: 'Error name',
            code: '501',
          },
        },
        isLoading: {
          [mockConfigurationCode]: false,
        },
      },
      result: null,
    },
  },
  entities: {
    configurations: {},
  },
};

export const mockConfigurationsNormalizedResponse = {
  entities: mockConfigurationsState.entities,
  result: mockConfigurations.map(({ code }) => code),
};

export const mockConfigurationNormalizedResponse = {
  entities: mockConfigurationsState.entities,
  result: mockConfigurationCode,
};
