import { DEFAULT_LIMIT, DEFAULT_PAGE } from './constants';

// check page and limit if <= 0 then return default value else return value and convert to number
const getPagination = (page: any, limit: any) => {
  const _page = page > 0 ? page : DEFAULT_PAGE;
  const _limit = limit > 0 ? limit : DEFAULT_LIMIT;

  return { _page, _limit };
};

export { getPagination };
