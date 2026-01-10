export const ROUTES = {
  OPTIONS: '/options/for/select',
  SELECTED: '/selected/option',
} as const;

export enum NameSpace {
  Select = 'SELECT',
};

export const BASE_URL = 'http://localhost:5000';

export const REQUEST_TIMEOUT = 5000;
