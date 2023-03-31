import { Router } from "https://deno.land/x/oak@v12.1.0/mod.ts";
import { renderFile } from "https://deno.land/x/eta@v1.11.0/mod.ts"

export const mainRouter = new Router();

mainRouter.get("/", async (ctx) => {
  ctx.response.body = await renderFile("index", {
    title: 'Home'
  });
});

mainRouter.get("/pricing", async (ctx) => {
  ctx.response.body = await renderFile('pricing', {
    title: 'Pricing'
  });
})