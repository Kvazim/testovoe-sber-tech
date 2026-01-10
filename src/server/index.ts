import * as http from 'http';
import { ROUTES } from '@lib/const/const';
import { generateOptions } from '@lib/utils/utils';

const PORT = process.env.PORT || 5000;

const options = generateOptions();

function setCors(res: http.ServerResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

const server = http.createServer((req, res) => {
  setCors(res);

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  if (req.method === 'GET' && req.url === ROUTES.OPTIONS) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(options));
    return;
  }

  if (req.method === 'POST' && req.url === ROUTES.SELECTED) {
    let body = '';

    req.on('data', chunk => (body += chunk));

    req.on('end', () => {
      try {
        const parsed = JSON.parse(body) as { value?: string };

        if (!parsed.value) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ message: 'Неверный формат данных' }));
          return;
        }

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(
          JSON.stringify({
            message: `Выбранная опция ${parsed.value} успешно принята.`,
          })
        );
      } catch {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Ошибка парсинга JSON' }));
      }
    });

    return;
  }

  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end('Not Found');
});

server.listen(PORT, () => {
  console.info(`Server is running on http://localhost:${PORT}`);
});
