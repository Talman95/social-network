export type ResponseType<D> = {
  data: D;
  messages: Array<string>;
  fieldsErrors: [];
  resultCode: number;
};
