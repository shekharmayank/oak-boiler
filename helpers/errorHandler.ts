import { isHttpError } from "https://deno.land/std@0.178.0/http/http_errors.ts";
import { Context } from "https://deno.land/x/oak@v12.1.0/context.ts";
import { Status } from "https://deno.land/x/oak@v12.1.0/deps.ts";

export async function errorHandler(ctx: Context, next: () => Promise<unknown>) {
  try {
    await next();
  } catch (err) {
    if (isHttpError(err)) {
      switch (err.status) {
        case Status.InternalServerError:
          ctx.response.status = 500;
          ctx.response.body = '500 Internal Server Error';
          break;
        default:
          // handle other statuses
      }
    } else {
      // rethrow if you can't handle the error
      throw err;
    }
  }
}