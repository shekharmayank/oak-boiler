import { isHttpError } from "https://deno.land/std@0.178.0/http/http_errors.ts";
import { renderFile } from "https://deno.land/x/eta@v1.11.0/file-handlers.ts";
import { Context } from "https://deno.land/x/oak@v12.1.0/context.ts";

export async function errorHandler(ctx: Context, next: () => Promise<unknown>) {
  try {
    await next();
  } catch (err) {
    if (isHttpError(err)) {
      const templateResult = await renderFile("./error", { status: err.status, msg: err.message });
      ctx.response.status = err.status;
      ctx.response.body = templateResult;
    } else {
      const templateResult = await renderFile("./error", { status: 'Unknown error', msg: "Not sure what just happened!" });
      ctx.response.body = templateResult;
    }
  }
}