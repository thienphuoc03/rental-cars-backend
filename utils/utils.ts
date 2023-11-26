import { DEFAULT_LIMIT, DEFAULT_PAGE } from './constants';

const getPagination = (page: number, limit: number) => {
  const _page = Number(page) > 0 ? Number(page) : DEFAULT_PAGE;
  const _limit = Number(limit) > 0 ? Number(limit) : DEFAULT_LIMIT;

  return { _page, _limit };
};

const generateSlug = (name: string): string => {
  const ran = Math.floor(Math.random() * 1000000).toString();

  return `${name
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '')}-${ran}`;
};

export { getPagination, generateSlug };
