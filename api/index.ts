import { Router } from "https://deno.land/x/oak@v12.1.0/mod.ts";

export const api = new Router();

api.all('/', (ctx) => {
  ctx.response.body = 'Hello from Oak API';
})