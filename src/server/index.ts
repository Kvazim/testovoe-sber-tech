import * as http from 'http';
import { handleRoutes } from './handlers/hanle-routes';

const PORT = process.env.PORT || 5000;

const server = http.createServer(handleRoutes);

server.listen(PORT, () => {
  console.info(`Server is running on http://localhost:${PORT}`);
});
