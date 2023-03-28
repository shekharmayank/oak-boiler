import { Application } from "https://deno.land/x/oak@v12.1.0/mod.ts";
import { errorHandler } from "./helpers/errorHandler.ts";
import { mainRouter } from "./routes/index.ts";
import { renderFile, configure } from "https://deno.land/x/eta@v1.11.0/mod.ts"

const app = new Application();

const viewPath = `${Deno.cwd()}/views/`

configure({
  views: viewPath
})

app.use(mainRouter.routes());

app.use(async (ctx) => {
  const templateResult = await renderFile("./error", { status: 404, msg: "Page not found"});
  ctx.response.status = 404;
  ctx.response.body = templateResult;
});
app.use(errorHandler);

await app.listen({ port: 8000 });