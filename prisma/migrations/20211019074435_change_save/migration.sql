/*
  Warnings:

  - You are about to drop the column `photoId` on the `Save` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Save` table. All the data in the column will be lost.
  - Added the required column `userName` to the `Save` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Save" DROP CONSTRAINT "Save_photoId_fkey";

-- DropForeignKey
ALTER TABLE "Save" DROP CONSTRAINT "Save_userId_fkey";

-- DropIndex
DROP INDEX "Save.photoId_userId_unique";

-- AlterTable
ALTER TABLE "Save" DROP COLUMN "photoId",
DROP COLUMN "userId",
ADD COLUMN     "userName" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "_PhotoToSave" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_PhotoToSave_AB_unique" ON "_PhotoToSave"("A", "B");

-- CreateIndex
CREATE INDEX "_PhotoToSave_B_index" ON "_PhotoToSave"("B");

-- AddForeignKey
ALTER TABLE "Save" ADD FOREIGN KEY ("userName") REFERENCES "User"("username") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PhotoToSave" ADD FOREIGN KEY ("A") REFERENCES "Photo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PhotoToSave" ADD FOREIGN KEY ("B") REFERENCES "Save"("id") ON DELETE CASCADE ON UPDATE CASCADE;
