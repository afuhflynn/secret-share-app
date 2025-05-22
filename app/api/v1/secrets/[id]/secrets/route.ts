import authConfig from "@/lib/auth.config";
import { prisma } from "@/lib/prisma";
import { sendNotificationEmail } from "@/utils/Emails/send.emails";
import { logger } from "@/utils/logger";
import NextAuth from "next-auth";
import { NextResponse } from "next/server";

/**
 * @description This file handles single secret operations (such as deleting, getting or updating a single secret)
 */

// NOTE: Update a secret
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { content } = await req.json();
  if (!content) {
    return NextResponse.json(
      {
        success: false,
        message: "Can not update a secret with with null values",
      },
      { status: 400 }
    );
  }
  try {
    const { auth } = NextAuth(authConfig);
    const session = await auth();

    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Create the secret
    const foundUser = await prisma.user.findUnique({
      where: { email: session.user.email! },
    });

    if (!foundUser) {
      return NextResponse.json(
        { success: false, message: "User not found." },
        { status: 404 }
      );
    }
    const secret = await prisma.secret.update({
      where: {
        userId: foundUser.id,
        id: params.id,
      },
      data: {
        content,
      },
    });

    if (!secret) {
      logger.error(
        `Error updating user secret: ${session.user.name}, ${session.user.email}`
      );
      if (foundUser.emailNotifications) {
        await sendNotificationEmail(
          "There was an unsuccessful attempt to update one of your secrets.",
          foundUser.email as string,
          (foundUser.username as string) || (foundUser.name as string),
          new Date(Date.now()).toString(),
          `${foundUser.username as string}, ${foundUser.email as string}`,
          {
            "X-Category": "Notification email",
          }
        );
      }
      return NextResponse.json(
        {
          success: false,
          message: "Error updating secret.",
        },
        { status: 500 }
      );
    }
    return NextResponse.json({
      success: true,
      message: "Secret updated successfully.",
    });
    // @ts-expect-error: error is of type 'unknown', casting to 'any' to access properties
  } catch (error: Error) {
    logger.error(`Error updating user secret`, error.message);
    return new NextResponse(
      "Sorry, an unexpected error occurred updating your secret. Try again later.",
      { status: 500 }
    );
  }
}

// Get a single user secrets
export async function GET(_: Request, { params }: { params: { id: string } }) {
  try {
    const { auth } = NextAuth(authConfig);
    const session = await auth();

    if (!session?.user) {
      return new NextResponse(
        "Unauthorized please login into your account to continue",
        { status: 401 }
      );
    }

    // Find the user by email
    const foundUser = await prisma.user.findUnique({
      where: { email: session.user.email! },
    });

    if (!foundUser) {
      return NextResponse.json(
        { success: false, message: "User not found." },
        { status: 404 }
      );
    }
    const secret = await prisma.secret.findUnique({
      where: {
        id: params.id,
        userId: foundUser.id,
      },
    });

    if (!secret) {
      return NextResponse.json(
        { success: false, message: "User secret found." },
        { status: 204 }
      );
    }

    return NextResponse.json({
      secret,
      success: true,
      message: "Secret retrieved successfully.",
    });
    // @ts-expect-error: error is of type 'unknown', casting to 'any' to access properties
  } catch (error: Error) {
    logger.error(`Error creating user secret`, error.message);

    return new NextResponse(
      "Sorry, an unexpected error occurred getting your secret.",
      { status: 500 }
    );
  }
}

// Delete a secret
export async function DELETE(
  _: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { auth } = NextAuth(authConfig);
    const session = await auth();

    if (!session?.user) {
      return new NextResponse(
        "Unauthorized please login into your account to continue",
        { status: 401 }
      );
    }

    const foundUser = await prisma.user.findUnique({
      where: { email: session.user.email! },
    });

    if (!foundUser) {
      return NextResponse.json(
        { success: false, message: "User not found." },
        { status: 404 }
      );
    }
    const secret = await prisma.secret.deleteMany({
      where: {
        userId: foundUser.id,
        id: params.id,
      },
    });

    if (!secret) {
      logger.error(
        `Error deleting user secret: ${session.user.name}, ${session.user.email}`
      );

      if (foundUser.emailNotifications) {
        await sendNotificationEmail(
          `We noticed an unsuccessful attempt to delete one of your secrets: ${session.user.email}`,
          session.user?.email as string,
          session.user?.name as string,
          new Date(Date.now()).toLocaleDateString(),
          session.user?.name as string,
          {
            "X-Category": "Notification Email",
          }
        );
      }
      return NextResponse.json(
        {
          success: false,
          message: "Error deleting secret.",
        },
        { status: 500 }
      );
    }
    if (foundUser.emailNotifications) {
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
    }
    logger.error(
      `User ${session.user.name}, ${session.user.email} secrets deleted successfully`
    );

    return NextResponse.json({
      success: true,
      message: "Secret deleted successfully.",
    });
    // @ts-expect-error: error is of type 'unknown', casting to 'any' to access properties
  } catch (error: Error) {
    logger.error(`Error deleting user secret`, error.message);

    return new NextResponse(
      "Sorry, an unexpected error occurred deleting your secret.",
      { status: 500 }
    );
  }
}
