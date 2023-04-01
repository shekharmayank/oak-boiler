import { load } from "https://deno.land/std@0.182.0/dotenv/mod.ts";
import { PrismaClient, Prisma } from "../generated/client/index.js";

const env = await load();

const prisma = new PrismaClient({
  datasource: {
    db: {
      url: env.DATABASE_URL
    }
  }
});

