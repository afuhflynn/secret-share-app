// This file is only used in production
// In development, we use a mock adapter for NextAuth

// Function to check if we're in development mode
const isDevelopment = () => {
  return process.env.NODE_ENV === "development"
}

// Only import PrismaClient if we're not in development
let prisma: any

if (!isDevelopment()) {
  try {
    const { PrismaClient } = require("@prisma/client")

    const globalForPrisma = global as unknown as { prisma: any }

    prisma =
      globalForPrisma.prisma ||
      new PrismaClient({
        log: ["query"],
      })

    if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma
  } catch (error) {
    console.warn("Prisma client could not be initialized:", error)
    // Provide a mock prisma client for development
    prisma = {
      user: {
        findFirst: async () => null,
        findUnique: async () => null,
        create: async (data: any) => data.data,
        update: async (data: any) => data.data,
      },
      // Add other models as needed
      secret: {
        findMany: async () => [],
        findUnique: async () => null,
        create: async (data: any) => data.data,
        update: async (data: any) => data.data,
      },
      // ... other models
    }
  }
} else {
  // Mock prisma client for development
  prisma = {
    user: {
      findFirst: async () => null,
      findUnique: async () => null,
      create: async (data: any) => data.data,
      update: async (data: any) => data.data,
    },
    // Add other models as needed
    secret: {
      findMany: async () => [],
      findUnique: async () => null,
      create: async (data: any) => data.data,
      update: async (data: any) => data.data,
    },
    // ... other models
  }
}

export default prisma

