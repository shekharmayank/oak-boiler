import { Application } from "https://deno.land/x/oak@v12.1.0/mod.ts";
import { mainRouter } from "./main-router.ts";
import { renderFile, configure } from "https://deno.land/x/eta@v1.11.0/mod.ts"
import { errorHandler } from "./helpers/errorHandler.ts";

const app = new Application();

/**
 * Registering error handler
 */
app.use(errorHandler);

/**
 * Configuring `eta` engine
 */
const viewPath = `${Deno.cwd()}/views/`;
configure({
  views: viewPath
});

/**
 * Main router
 */
app.use(mainRouter.routes());

/**
 * 404 page
 */
app.use(async (ctx) => {
  ctx.response.body = await renderFile("./error", { 
    status: 404, msg: "Page not found", title: 404 });
  ctx.response.status = 404;
});

/**
 * For uncaught exceptions
 */
app.addEventListener("error", (evt) => {
  console.log(evt.error.message);
});

app.addEventListener('listen', ({ hostname, port, secure }) => {
  console.log(`✨ App running: ${secure ? 'https://' : 'http://'}${hostname ?? 'localhost'}:${port} ✨`)
});
await app.listen({ port: 8000 });