import { createServer, IncomingMessage, ServerResponse } from 'http';
import { parse, UrlWithParsedQuery } from 'url';
import next from 'next';

const port: number = parseInt(process.env.PORT || '3000', 10);
const dev: boolean = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req: IncomingMessage, res: ServerResponse) => {
    const parsedUrl: UrlWithParsedQuery = parse(req.url || '', true);
    handle(req, res, parsedUrl);
  }).listen(port, () => {
    console.log(
      `> Server listening at http://localhost:${port} in ${
        dev ? 'development' : 'production'
      } mode`
    );
  });
});
