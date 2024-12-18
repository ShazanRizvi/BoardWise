/*
  Warnings:

  - Added the required column `userRole` to the `InviteToken` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "InviteToken" ADD COLUMN     "userRole" TEXT NOT NULL;
