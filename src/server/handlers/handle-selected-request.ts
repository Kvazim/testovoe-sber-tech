import { sendJsonResponse } from '@server/utils';
import * as http from 'http';

function handleSelectedRequest(res: http.ServerResponse, req: http.IncomingMessage) {
  let body = '';

  req.on('data', chunk => (body += chunk));

  req.on('end', () => {
    try {
      const parsed = JSON.parse(body) as { value?: string };

      if (!parsed.value) {
        sendJsonResponse(res, 400, { message: 'Неверный формат данных' })
        return;
      }

      sendJsonResponse(res, 200, {
        message: `Выбранная опция ${parsed.value} успешно принята.`,
      })

    } catch {
      sendJsonResponse(res, 400, { message: 'Ошибка парсинга данных' })
    }
  });

  return;
}

export { handleSelectedRequest };
