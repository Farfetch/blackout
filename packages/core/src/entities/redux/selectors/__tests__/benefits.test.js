import { getBenefit } from '../';

const mockBenefitId = '00000000-0000-0000-0000-000000000000';
const mockBenefitDetails = {
  id: mockBenefitId,
  code: 'SummerParty2017',
  isActive: true,
  metadata: {
    'dress-code': 'green',
  },
  benefitType: 'price',
};

describe('getBenefit()', () => {
  it('should return the specified benefit details from entities', () => {
    const state = {
      entities: {
        benefits: {
          [mockBenefitId]: {
            ...mockBenefitDetails,
          },
        },
      },
    };

    expect(getBenefit(state, mockBenefitId)).toEqual(mockBenefitDetails);
  });
});
