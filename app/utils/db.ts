import { PrismaClient } from '@prisma/client';

// Add custom type declaration for global.prisma
declare global {
  var prisma: PrismaClient | undefined;
}

let prisma: PrismaClient;

// Check if we are in development mode
if (process.env.NODE_ENV !== 'production') {
  // In development, reuse the PrismaClient instance
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
} else {
  // In production mode, create a new PrismaClient instance
  prisma = new PrismaClient();
}

export default prisma;
