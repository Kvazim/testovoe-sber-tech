import * as http from 'http';
import { setCors } from '../utils';
import { sendJsonResponse } from '@server/utils';
import { handleSelectedRequest } from './handle-selected-request';
import { handleOptionRequest } from './handle-option-request';
import { ROUTES } from '@lib/const/const';

function handleRoutes (req: http.IncomingMessage, res: http.ServerResponse): void {
  setCors(res);

  if (req.method === 'OPTIONS') {
    sendJsonResponse(res, 204);
    return;
  }

  if (req.method === 'GET' && req.url === ROUTES.OPTIONS) {
    handleOptionRequest(res);
    return;
  }

  if (req.method === 'POST' && req.url === ROUTES.SELECTED) {
    handleSelectedRequest(res, req);
    return;
  }

  sendJsonResponse(res, 404, { message: 'Not Found' })
}

export { handleRoutes };
