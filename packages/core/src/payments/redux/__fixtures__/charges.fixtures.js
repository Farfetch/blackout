export const chargeId = '43b059df-898e-4407-8347-b075b645bf6c';
export const mockPostCharges = {
  headers: {
    location: `http://localhost:9699/v1/intents/acb66f64-b2af-4ad5-8d32-d2323cc535f8/charges/${chargeId}`,
  },
  data: {
    status: 'Processing',
    returnUrl: 'string',
    cancelUrl: 'string',
  },
};

export const mockGetCharges = {
  status: 'Processing',
  returnUrl: 'string',
  cancelUrl: 'string',
};
