export type OrderDocument = {
  id: string;
  fileId: string;
  type: OrderDocumentType;
  createdAt: string;
  updatedAt: string;
};

export enum OrderDocumentType {
  ComercialInvoice = 'ComercialInvoice',
}
