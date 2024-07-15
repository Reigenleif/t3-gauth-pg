import { z } from "zod";
import { v4 as uuidv4 } from "uuid";
import sanitize from "sanitize-filename";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure
} from "~/server/api/trpc";
import { AllowableFileTypeEnum, FolderEnum, zodAllowableFileTypeEnum, zodFolderEnum } from "~/utils/file";
import { bucket } from "~/server/bucket";
import { env } from "~/env.mjs";

export const storageRouter = createTRPCRouter({
  generateURLForDownload: publicProcedure
    .input(
      z.object({
        folder: zodFolderEnum,
        filename: z.string()
      })
    )
    .mutation(async ({ input }) => {
      await bucket.setCorsConfiguration([
        {
          maxAgeSeconds: env.BUCKET_CORS_EXPIRATION_TIME,
          method: ["GET", "PUT", "DELETE"],
          origin: ["*"],
          responseHeader: ["Content-Type"]
        }
      ]);

      const ref = bucket.file(`${input.folder}/${input.filename}`);

      const [url] = await ref.getSignedUrl({
        version: "v4",
        action: "read",
        expires: Date.now() + env.URL_EXPIRATION_TIME
      });

      return {
        url
      };
    }),

  generateURLForUpload: protectedProcedure
    .input(
      z.object({
        folder: zodFolderEnum,
        filename: z.string(),
        contentType: zodAllowableFileTypeEnum
      })
    )
    .mutation(async ({ input }) => {
      // const fileUUID = uuidv4(); // Uncomment this if you want to use UUID for filename
      const sanitizedFileName = sanitize(input.filename);
      const sanitizedFilename = `${sanitizedFileName}`; // Put UUID here if its enabled
      

      await bucket.setCorsConfiguration([
        {
          maxAgeSeconds: env.BUCKET_CORS_EXPIRATION_TIME,
          method: ["GET", "PUT", "DELETE"],
          origin: ["*"],
          responseHeader: ["Content-Type"]
        }
      ]);

      const ref = bucket.file(`${input.folder}/${sanitizedFilename}`);

      const [url] = await ref.getSignedUrl({
        version: "v4",
        action: "write",
        expires: Date.now() + env.URL_EXPIRATION_TIME,
        contentType: input.contentType
      });

      const publicUrl = `https://storage.googleapis.com/${env.BUCKET_NAME}/${input.folder}/${sanitizedFilename}`;

      return {
        publicUrl,
        url,
        sanitizedFilename,
        urlExpires: Date.now() + env.URL_EXPIRATION_TIME
      };
    }),

  generateURLForDelete: protectedProcedure
    .input(
      z.object({
        folder: zodFolderEnum,
        filename: z.string()
      })
    )
    .mutation(async ({ input }) => {
      await bucket.setCorsConfiguration([
        {
          maxAgeSeconds: env.BUCKET_CORS_EXPIRATION_TIME,
          method: ["GET", "PUT", "DELETE"],
          origin: ["*"],
          responseHeader: ["Content-Type"]
        }
      ]);

      const ref = bucket.file(`${input.folder}/${input.filename}`);

      const [url] = await ref.getSignedUrl({
        version: "v4",
        action: "delete",
        expires: Date.now() + env.URL_EXPIRATION_TIME
      });

      return {
        url
      };
    })
});
