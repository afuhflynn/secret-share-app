import { devLog } from "@/utils/devLog";
import { sendNotificationEmail } from "@/utils/Emails/send.emails";
import { logger } from "@/utils/logger";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

const auth = async (req: Request) => {
  devLog(req);
  return { id: "fakeId" };
}; // Fake auth function

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUploader: f({
    image: {
      /**
       * For full list of options and defaults, see the File Route API reference
       * @see https://docs.uploadthing.com/file-routes#route-config
       */
      maxFileSize: "4MB",
      maxFileCount: 1,
    },
  })
    // Set permissions and file types for this FileRoute
    .middleware(async ({ req }) => {
      // This code runs on your server before upload
      const user = await auth(req);

      // If you throw, the user will not be able to upload
      if (!user) {
        logger.error(`Uploadthing error: Unauthorized user`);
        throw new UploadThingError("Unauthorized");
      }

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      devLog("Upload complete for userId:", metadata.userId);
      logger.error(`Upload complete for userId: ${metadata.userId}`);
      devLog("file url", file.ufsUrl);

      // Send admin email to notify about the photos being uploaded from the server
      sendNotificationEmail(
        `A user at SecretShare image upload just got completed with account that has userId: ${metadata.userId}`,
        process.env.NODEMAILER_ADMIN_EMAIL as string,
        "Tembeng Flynn",
        new Date(Date.now()).toLocaleDateString(),
        "SecretShare user",
        {
          "X-Category": "Notification Email",
        }
      );

      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
