import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { logger } from "@/utils/logger";
import authConfig from "@/lib/auth.config";
import NextAuth from "next-auth";

export const GET = async () => {
  const { auth } = NextAuth(authConfig);
  const session = await auth();

  try {
    if (!session?.user) {
      return NextResponse.json(
        {
          message: "Login to continue",
        },
        { status: 401 }
      );
    }

    // Query for user data from db
    const foundUser = await prisma.user.findUnique({
      where: {
        id: session.user?.id as string,
        email: session.user?.email as string,
      },
    });

    if (!foundUser)
      return NextResponse.json(
        {
          error: "Login to continue",
        },
        { status: 401 }
      );

    // Return user data
    return NextResponse.json({
      user: { ...foundUser, password: undefined }, // Hide user password on return.
      message: "User data fetched successfully",
    });
    // @ts-expect-error: error is of type 'unknown', casting to 'any' to access properties
  } catch (error: Error) {
    logger.error(`Error fetching user profile ${error.message}`);
    return NextResponse.json(
      {
        error: `Error fetching user profile: ${error.message}`,
      },
      { status: 500 }
    );
  }
};
