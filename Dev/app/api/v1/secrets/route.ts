import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";

import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { name, content, expiryType, expiryTime, maxViews } =
      await req.json();

    // Calculate expiration date based on expiryTime
    const expiresAt = new Date();
    if (expiryTime === "1h") {
      expiresAt.setHours(expiresAt.getHours() + 1);
    } else if (expiryTime === "24h") {
      expiresAt.setHours(expiresAt.getHours() + 24);
    } else if (expiryTime === "7d") {
      expiresAt.setDate(expiresAt.getDate() + 7);
    } else if (expiryTime === "30d") {
      expiresAt.setDate(expiresAt.getDate() + 30);
    } else if (expiryTime === "never") {
      // For "never", set a far future date (1 year)
      expiresAt.setFullYear(expiresAt.getFullYear() + 1);
    }

    // Create the secret
    const secret = await prisma.secret.create({
      data: {
        name,
        content,
        expiresAt,
        maxViews: expiryType === "views" ? Number.parseInt(maxViews) : null,
        userId: session.user.id,
      },
    });

    return NextResponse.json(secret);
  } catch (error) {
    console.error("[SECRETS_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const secrets = await prisma.secret.findMany({
      where: {
        userId: session.user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(secrets);
  } catch (error) {
    console.error("[SECRETS_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
