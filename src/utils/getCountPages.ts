export const getCountPages = (totalCount: number, pageSize: number): number =>
  Math.ceil(totalCount / pageSize);
