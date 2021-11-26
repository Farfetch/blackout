export type GetOptionsArgument = {
  getOptions: (arg: any) => {
    productImgQueryParam: string;
    [k: string]: unknown;
  };
};
