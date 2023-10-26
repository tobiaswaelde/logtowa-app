export type Paginated<T> = {
  items: Array<T>;
  meta: {
    page: number;
    perPage: number;
    itemCount: number;
    pageCount: number;
    hasPrevPage: boolean;
    hasNextPage: boolean;
  };
};
