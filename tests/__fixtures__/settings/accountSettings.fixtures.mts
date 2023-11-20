export const mockAccountSettingId = 'setting123';
export const mockAccountSetting2 = 'setting456';
export const mockQuery = {
  channelCode: '10000',
  type: 'PasswordRules',
};
export const mockQueryHashed = 'PasswordRules_10000';

export const mockAccountSetting = {
  id: mockAccountSettingId,
  type: 'PasswordRules',
  details: {
    rules: [
      { name: 'ContaisUpperCase', regex: '^(?.*[A-Z])' },
      { name: 'ContaisLowerCase', regex: '^(?.*[a-z])' },
    ],
    differFromLastPass: 3,
  },
};

export const mockAccountSettings = [
  mockAccountSetting,
  { ...mockAccountSetting, id: mockAccountSetting2 },
];

export const mockAccountSettingLoadingState = {
  settings: {
    configurations: {
      error: null,
      isLoading: true,
      result: null,
      configuration: {
        isLoading: {},
        error: {},
      },
    },
    accountSettings: {
      error: null,
      result: null,
      isLoading: {},
    },
    accountSetting: {
      error: { [mockAccountSettingId]: null },
      result: null,
      isLoading: { [mockAccountSettingId]: true },
    },
  },
  entities: {
    configurations: {},
  },
};

export const mockAccountSettingsLoadingState = {
  settings: {
    configurations: {
      error: null,
      isLoading: true,
      result: null,
      configuration: {
        isLoading: {},
        error: {},
      },
    },
    accountSettings: {
      error: null,
      result: null,
      isLoading: { [mockQueryHashed]: true },
    },
    accountSetting: {
      error: null,
      result: null,
      isLoading: {},
    },
  },
  entities: {
    configurations: {},
  },
};

export const mockAccountSettingState = {
  settings: {
    configurations: {
      error: null,
      isLoading: true,
      result: null,
      configuration: {
        isLoading: {},
        error: {},
      },
    },
    accountSettings: {
      error: null,
      result: null,
      isLoading: {},
    },
    accountSetting: {
      error: null,
      result: { [mockAccountSettingId]: mockAccountSetting },
      isLoading: { [mockAccountSettingId]: false },
    },
  },
};

export const mockAccountSettingsState = {
  settings: {
    configurations: {
      error: null,
      isLoading: true,
      result: null,
      configuration: {
        isLoading: {},
        error: {},
      },
    },
    accountSettings: {
      error: null,
      result: { [mockQueryHashed]: mockAccountSettings },
      isLoading: { [mockQueryHashed]: false },
    },
    accountSetting: {
      error: null,
      result: null,
      isLoading: {},
    },
  },
};
