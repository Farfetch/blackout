const idBenefit = '00000000-0000-0000-0000-000000000000';

export const mockGetBenefitsResponse = [
  {
    id: idBenefit,
    code: 'SummerParty2017',
    isActive: true,
    metadata: {
      'dress-code': 'green',
    },
    benefitType: 'price',
  },
];

export const expectedBenefitsNormalizedPayload = {
  entities: {
    benefits: {
      [idBenefit]: {
        ...mockGetBenefitsResponse[0],
      },
    },
  },
  result: [idBenefit],
};
