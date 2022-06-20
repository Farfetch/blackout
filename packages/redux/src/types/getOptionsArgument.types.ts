export type GetOptionsArgument = {
  // Options to manipulate store data.
  getOptions: (arg: any) => {
    productImgQueryParam: string;
    [k: string]: unknown;
  };
};
