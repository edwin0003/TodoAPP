/*
  Warnings:

  - You are about to alter the column `task` on the `Task` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.

*/
-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "state" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "task" SET DATA TYPE VARCHAR(50);
