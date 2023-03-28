import { Router } from "https://deno.land/x/oak@v12.1.0/mod.ts";

export const mainRouter = new Router();

mainRouter.get("/", (ctx) => {
  ctx.response.body = 'Home Page';
})