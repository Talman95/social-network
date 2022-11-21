export type ResponseType<D> = {
  data: D;
  messages: string[];
  fieldsErrors: [];
  resultCode: number;
};
