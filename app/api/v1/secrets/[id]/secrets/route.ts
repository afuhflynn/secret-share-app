import authConfig from "@/lib/auth.config";
import { prisma } from "@/lib/prisma";
import { sendNotificationEmail } from "@/utils/Emails/send.emails";
import { logger } from "@/utils/logger";
import NextAuth from "next-auth";
import { NextResponse } from "next/server";

// NOTE: Create a new user secret
export async function POST(req: Request) {
  try {
    const { auth } = NextAuth(authConfig);
    const session = await auth();

    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { name, content, expiryType, expiryTime, maxViews } =
      await req.json();

    // Calculate expiration date based on expiryTime
    const expiresAt = new Date();
    // NOTE: Create a new expiry time based on user request body
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
    if (!secret) {
      logger.error(
        `Error creating user secret: ${session.user.name}, ${session.user.email}`
      );
      return NextResponse.json(
        {
          success: false,
          message: "Error creating secret.",
        },
        { status: 500 }
      );
    }
    return NextResponse.json({
      success: true,
      message: "Secret created successfully.",
    });
    // @ts-expect-error: error is of type 'unknown', casting to 'any' to access properties
  } catch (error: Error) {
    logger.error(`Error creating user secret`, error.message);
    return new NextResponse(
      "Sorry, an unexpected error occurred creating your secrets. Try again later.",
      { status: 500 }
    );
  }
}

// Get user's secrets
export async function GET(_: Request) {
  try {
    const { auth } = NextAuth(authConfig);
    const session = await auth();

    if (!session?.user) {
      return new NextResponse(
        "Unauthorized please login into your account to continue",
        { status: 401 }
      );
    }

    const secrets = await prisma.secret.findMany({
      where: {
        userId: session.user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({
      secrets: secrets,
      success: true,
      message: "Secret retrieved successfully.",
    });
    // @ts-expect-error: error is of type 'unknown', casting to 'any' to access properties
  } catch (error: Error) {
    logger.error(`Error creating user secret`, error.message);

    return new NextResponse(
      "Sorry, an unexpected error occurred getting your secrets.",
      { status: 500 }
    );
  }
}

// Delete user's secrets
export async function DELETE(_: Request) {
  try {
    const { auth } = NextAuth(authConfig);
    const session = await auth();

    if (!session?.user) {
      return new NextResponse(
        "Unauthorized please login into your account to continue",
        { status: 401 }
      );
    }

    const secrets = await prisma.secret.deleteMany({
      where: {
        userId: session.user.id,
      },
    });

    if (!secrets) {
      logger.error(
        `Error deleting user secrets: ${session.user.name}, ${session.user.email}`
      );
      await sendNotificationEmail(
        `We noticed an unsuccessful secrets deletion attempt for your account with email: ${session.user.email}`,
        session.user?.email as string,
        session.user?.name as string,
        new Date(Date.now()).toLocaleDateString(),
        session.user?.name as string,
        {
          "X-Category": "Notification Email",
        }
      );
      return NextResponse.json(
        {
          success: false,
          message: "error deleting secrets.",
        },
        { status: 500 }
      );
    }
    await sendNotificationEmail(
      `We noticed an you made a request to delete all of your secrets from our severs for your account with email: ${session.user.email}`,
      session.user?.email as string,
      session.user?.name as string,
      new Date(Date.now()).toLocaleDateString(),
      session.user?.name as string,
      {
        "X-Category": "Notification Email",
      }
    );
    logger.error(
      `User ${session.user.name}, ${session.user.email} secrets deleted successfully`
    );

    return NextResponse.json({
      success: true,
      message: "Secrets deleted successfully.",
    });
    // @ts-expect-error: error is of type 'unknown', casting to 'any' to access properties
  } catch (error: Error) {
    logger.error(`Error deleting user secrets`, error.message);

    return new NextResponse(
      "Sorry, an unexpected error occurred deleting your secrets.",
      { status: 500 }
    );
  }
}
