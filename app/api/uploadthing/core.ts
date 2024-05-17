import { getSelf } from '@/lib/auth-service'
import { db } from '@/lib/db'
import { createUploadthing, type FileRouter } from 'uploadthing/next'

const f = createUploadthing()

export const ourFileRouter = {
  thumbnailUploader: f({
    image: {
      maxFileSize: '4MB', maxFileCount: 1
    }
  })
    .middleware(async (): Promise<{ user: {
      id: string
      username: string
      imageUrl: string
      externalUserId: string
      bio: string | null
      createdAt: Date
      updateAt: Date
    } }> => {
      const self = await getSelf()

      return { user: self }
    })
    .onUploadComplete(async ({ metadata, file }) => {
      await db.stream.update({
        where: {
          userId: metadata.user.id
        },
        data: {
          thumbnailUrl: file.url
        }
      })

      return { fileUrl: file.url }
    })
} satisfies FileRouter

export type OurFileRouter = typeof ourFileRouter
