/*
  Warnings:

  - You are about to drop the column `userName` on the `Save` table. All the data in the column will be lost.
  - You are about to drop the `_PhotoToSave` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[photoId,userId]` on the table `Save` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `photoId` to the `Save` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Save` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Save" DROP CONSTRAINT "Save_userName_fkey";

-- DropForeignKey
ALTER TABLE "_PhotoToSave" DROP CONSTRAINT "_PhotoToSave_A_fkey";

-- DropForeignKey
ALTER TABLE "_PhotoToSave" DROP CONSTRAINT "_PhotoToSave_B_fkey";

-- DropIndex
DROP INDEX "Save.userName_unique";

-- AlterTable
ALTER TABLE "Save" DROP COLUMN "userName",
ADD COLUMN     "photoId" INTEGER NOT NULL,
ADD COLUMN     "userId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "_PhotoToSave";

-- CreateIndex
CREATE UNIQUE INDEX "Save.photoId_userId_unique" ON "Save"("photoId", "userId");

-- AddForeignKey
ALTER TABLE "Save" ADD FOREIGN KEY ("photoId") REFERENCES "Photo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Save" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
