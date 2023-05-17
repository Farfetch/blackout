export type UserPreferencePayload = Record<string, unknown>;

export type UserPreference = {
  code: string;
  values?: string[];
  payload?: UserPreferencePayload;
  groupId?: string;
  updatedDate: string;
};
