"use server"

import { revalidatePath } from "next/cache"
import { getServerSession } from "next-auth/next"

import { authOptions } from "@/lib/auth"
import prisma from "@/lib/prisma"

interface CreateSecretParams {
  name: string
  content: string
  expiryType: string
  expiryTime: string | null
  maxViews: string | null
}

export async function createSecret({ name, content, expiryType, expiryTime, maxViews }: CreateSecretParams) {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    throw new Error("Unauthorized")
  }

  // Calculate expiration date based on expiryTime
  const expiresAt = new Date()
  if (expiryType === "time" && expiryTime) {
    if (expiryTime === "1h") {
      expiresAt.setHours(expiresAt.getHours() + 1)
    } else if (expiryTime === "24h") {
      expiresAt.setHours(expiresAt.getHours() + 24)
    } else if (expiryTime === "7d") {
      expiresAt.setDate(expiresAt.getDate() + 7)
    } else if (expiryTime === "30d") {
      expiresAt.setDate(expiresAt.getDate() + 30)
    } else if (expiryTime === "never") {
      // For "never", set a far future date (1 year)
      expiresAt.setFullYear(expiresAt.getFullYear() + 1)
    }
  } else {
    // Default to 7 days
    expiresAt.setDate(expiresAt.getDate() + 7)
  }

  // Create the secret
  const secret = await prisma.secret.create({
    data: {
      name,
      content,
      expiresAt,
      maxViews: expiryType === "views" && maxViews ? Number(maxViews) : null,
      userId: session.user.id,
    },
  })

  revalidatePath("/dashboard")
  return secret
}

export async function getSecrets() {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    throw new Error("Unauthorized")
  }

  return prisma.secret.findMany({
    where: {
      userId: session.user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  })
}

export async function getSecret(id: string) {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    throw new Error("Unauthorized")
  }

  const secret = await prisma.secret.findUnique({
    where: {
      id,
      userId: session.user.id,
    },
  })

  if (!secret) {
    throw new Error("Secret not found")
  }

  return secret
}

export async function createShareLink(secretId: string, expiryTime: string, emails: string[] | null) {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    throw new Error("Unauthorized")
  }

  // Verify the secret belongs to the user
  const secret = await prisma.secret.findUnique({
    where: {
      id: secretId,
      userId: session.user.id,
    },
  })

  if (!secret) {
    throw new Error("Secret not found")
  }

  // Calculate expiration date based on expiryTime
  const expiresAt = new Date()
  if (expiryTime === "1h") {
    expiresAt.setHours(expiresAt.getHours() + 1)
  } else if (expiryTime === "24h") {
    expiresAt.setHours(expiresAt.getHours() + 24)
  } else if (expiryTime === "7d") {
    expiresAt.setDate(expiresAt.getDate() + 7)
  } else if (expiryTime === "30d") {
    expiresAt.setDate(expiresAt.getDate() + 30)
  } else if (expiryTime === "never") {
    // For "never", set a far future date (1 year)
    expiresAt.setFullYear(expiresAt.getFullYear() + 1)
  }

  // Generate a random token
  const token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)

  // Create the share
  const share = await prisma.share.create({
    data: {
      token,
      secretId,
      expiresAt,
      emails: emails ? emails.join(",") : null,
    },
  })

  return {
    ...share,
    shareUrl: `${process.env.NEXT_PUBLIC_APP_URL}/s/${secretId}/${token}`,
  }
}

