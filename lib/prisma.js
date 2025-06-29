// lib/prisma.js
import { PrismaClient } from "@prisma/client";

// 为了在开发环境下避免热重载多次 new 出多个实例
const globalForPrisma = globalThis;
const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export default prisma;
