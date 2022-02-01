export type OrderDocuments = {
  id: string;
  fileId: string;
  type: Type[];
  createdAt: string;
  updatedAt: string;
};

enum Type {
  ComercialInvoice,
}
