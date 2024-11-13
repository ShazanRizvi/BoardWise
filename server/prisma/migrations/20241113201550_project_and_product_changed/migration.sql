/*
  Warnings:

  - You are about to drop the `_ProductProjects` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `productId` to the `project` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_ProductProjects" DROP CONSTRAINT "_ProductProjects_A_fkey";

-- DropForeignKey
ALTER TABLE "_ProductProjects" DROP CONSTRAINT "_ProductProjects_B_fkey";

-- AlterTable
ALTER TABLE "project" ADD COLUMN     "productId" TEXT NOT NULL;

-- DropTable
DROP TABLE "_ProductProjects";

-- AddForeignKey
ALTER TABLE "project" ADD CONSTRAINT "project_productId_fkey" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
