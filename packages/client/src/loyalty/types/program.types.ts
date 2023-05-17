export type Program = {
  id: string;
  name: string;
};

export enum ProgramMembershipStatus {
  Unverified = 'Unverified',
  Activated = 'Activated',
  Invalid = 'Invalid',
  Canceled = 'Canceled',
}

export type ProgramMembership = {
  id: string;
  externalId: string;
  userId: number;
  rewardPoints: number;
  cashBalance: number;
  status: ProgramMembershipStatus;
  createdDate?: string;
  updatedDate?: string;
};

export enum ProgramMembershipStatementCategory {
  Purchase = 'Purchase',
  Misc = 'Misc',
  Transfer = 'Transfer',
  Bonus = 'Bonus',
  Partner = 'Partner',
  Convert = 'Convert',
}

export type ProgramMembershipStatement = {
  id: string;
  points: number;
  category: ProgramMembershipStatementCategory;
  referenceDate: string;
};

export enum ProgramMembershipReplacementReason {
  Lost = 'Lost',
  Stolen = 'Stolen',
  Damage = 'Damage',
  NameChanged = 'NameChanged',
}

export type ProgramMembershipReplacement = {
  id: string;
  reason: ProgramMembershipReplacementReason;
  createdDate?: string;
};

export type ProgramMembershipConvert = {
  id: string;
  createdDate?: string;
};
