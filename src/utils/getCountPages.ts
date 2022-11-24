export const getCountPages = (totalCount: number, pageSize: number) =>
  Math.ceil(totalCount / pageSize);
