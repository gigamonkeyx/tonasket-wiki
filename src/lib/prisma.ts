import { PrismaClient } from '@prisma/client';

// PrismaClient is attached to the `global` object in development to prevent
// exhausting your database connection limit.
// Learn more: https://pris.ly/d/help/next-js-best-practices

// Use a simple approach for now to avoid initialization issues
const prisma = new PrismaClient();

export { prisma };
export default prisma;
