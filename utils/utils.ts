import { DEFAULT_LIMIT, DEFAULT_PAGE } from './constants';

const getPagination = (page: number, limit: number) => {
  const _page = Number(page) > 0 ? Number(page) : DEFAULT_PAGE;
  const _limit = Number(limit) > 0 ? Number(limit) : DEFAULT_LIMIT;

  return { _page, _limit };
};

export { getPagination };
