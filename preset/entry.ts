import "#internal/nitro/virtual/polyfill";
import { Elysia } from "elysia";


const nitroApp = useNitroApp()

const app = new Elysia()
.all('*', async(request) => {
  const url = new URL(request.request.url)
  let body;
    if (request.body) {
      body = await request.request.arrayBuffer();
    }
  return nitroApp.localFetch(url.pathname + url.search, {
    host: url.hostname,
    protocol: url.protocol,
    headers: request.headers,
    method: request.request.method,
    redirect: request.request.redirect,
    body,
  });
}).listen(process.env.NITRO_PORT || process.env.PORT || 3000)


// @ts-expect-error: Bun global
// const server = Bun.serve({
//   port: process.env.NITRO_PORT || process.env.PORT || 3000,
//   async fetch(request: Request) {
//     const url = new URL(request.url);

//     let body;
//     if (request.body) {
//       body = await request.arrayBuffer();
//     }

//     return nitroApp.localFetch(url.pathname + url.search, {
//       host: url.hostname,
//       protocol: url.protocol,
//       headers: request.headers,
//       method: request.method,
//       redirect: request.redirect,
//       body,
//     });
//   },
// });

console.log(`Listening on http://localhost:${server.port}...`);