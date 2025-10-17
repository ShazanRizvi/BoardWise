/*
  Warnings:

  - Made the column `columnId` on table `task` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "task" DROP CONSTRAINT "task_columnId_fkey";

-- AlterTable
ALTER TABLE "task" ALTER COLUMN "columnId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "task" ADD CONSTRAINT "task_columnId_fkey" FOREIGN KEY ("columnId") REFERENCES "column"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
