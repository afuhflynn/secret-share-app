import { NODE_ENV } from "@/utils/Load_Envs";
import { PrismaClient } from "@prisma/client";

// Declare a global variable that extends the PrismaClient types
declare global {
  var prisma: PrismaClient;
}

export const db = globalThis.prisma || new PrismaClient();

// Used in development env to prevent errors in the console due to HMR
if (NODE_ENV !== "production") globalThis.prisma = db;
