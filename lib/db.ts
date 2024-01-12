/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
import { PrismaClient } from '@prisma/client'

declare global {
  var prisma: PrismaClient | undefined
}

// eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
export const db = globalThis.prisma || new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalThis.prisma = db
