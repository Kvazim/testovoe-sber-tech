export const ROUTES = {
  OPTIONS: '/options/for/select',
  SELECTED: '/selected/option',
} as const;

export enum NameSpace {
  Select = 'SELECT',
};

export const DIRECTION_SELECT = {
  UP: 'up',
  DOWN: 'down',
} as const;

export const BUTTON_TYPES = {
  BUTTON: 'button',
  SUBMIT: 'submit',
  RESET: 'reset',
} as const;

export const BASE_URL = 'http://localhost:5000';

export const REQUEST_TIMEOUT = 5000;
