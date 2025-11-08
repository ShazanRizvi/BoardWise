/*
  Warnings:

  - You are about to drop the column `userId` on the `project` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "project" DROP CONSTRAINT "project_userId_fkey";

-- AlterTable
ALTER TABLE "project" DROP COLUMN "userId";

-- CreateTable
CREATE TABLE "_UserProjects" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_UserProjects_AB_unique" ON "_UserProjects"("A", "B");

-- CreateIndex
CREATE INDEX "_UserProjects_B_index" ON "_UserProjects"("B");

-- AddForeignKey
ALTER TABLE "_UserProjects" ADD CONSTRAINT "_UserProjects_A_fkey" FOREIGN KEY ("A") REFERENCES "project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserProjects" ADD CONSTRAINT "_UserProjects_B_fkey" FOREIGN KEY ("B") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
