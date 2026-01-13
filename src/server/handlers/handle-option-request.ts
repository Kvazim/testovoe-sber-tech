import * as http from 'http';
import { generateOptions, sendJsonResponse } from "@server/utils";

function handleOptionRequest(res: http.ServerResponse) {
  try {
    const options = generateOptions();
    sendJsonResponse(res, 200, options);
    return;
  } catch (error) {
    sendJsonResponse(res, 500, { message: 'Ошибка сервера' });
    return;
  }
}

export { handleOptionRequest };
