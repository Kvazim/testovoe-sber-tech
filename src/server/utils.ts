import * as http from 'http';

export function sendJsonResponse(
  res: http.ServerResponse,
  statusCode: number,
  data?: unknown,
): void {
  res.writeHead(statusCode, { 'Content-Type': 'application/json' });
  res.end(data && JSON.stringify(data));
};

export function setCors(res: http.ServerResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
};

export const generateOptions = () => {
  return Array.from({ length: 1000 }, (_, i) => {
    const value = String(i + 1);
    return { name: value, value };
  });
};
