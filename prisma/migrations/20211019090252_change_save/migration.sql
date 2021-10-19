/*
  Warnings:

  - A unique constraint covering the columns `[userName]` on the table `Save` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Save.userName_unique" ON "Save"("userName");
