import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { devLog } from "@/utils/devLog";

export async function GET(
  req: Request,
  { params }: { params: { id: string; token: string } }
) {
  devLog(req);
  try {
    const { token } = await params;

    // Find the share
    const share = await prisma.share.findUnique({
      where: {
        token,
      },
      include: {
        secret: true,
      },
    });

    if (!share) {
      return new NextResponse("Not found", { status: 404 });
    }

    // Check if the share is expired
    if (new Date() > share.expiresAt) {
      return new NextResponse("Share expired", { status: 410 });
    }

    // Check if max views is reached
    if (share.maxViews && share.views >= share.maxViews) {
      return new NextResponse("Max views reached", { status: 410 });
    }

    // Increment views
    await prisma.share.update({
      where: {
        id: share.id,
      },
      data: {
        views: {
          increment: 1,
        },
      },
    });

    // Also increment views on the secret if it has maxViews
    if (share.secret.maxViews) {
      await prisma.secret.update({
        where: {
          id: share.secret.id,
        },
        data: {
          currentViews: {
            increment: 1,
          },
        },
      });
    }

    return NextResponse.json({
      name: share.secret.name,
      content: share.secret.content,
      expires: share.expiresAt,
    });
  } catch (error) {
    console.error("[SECRET_SHARE_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
