/*
  Warnings:

  - You are about to drop the column `chatId` on the `Shapes` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Shapes" DROP CONSTRAINT "Shapes_chatId_fkey";

-- AlterTable
ALTER TABLE "public"."Shapes" DROP COLUMN "chatId";
