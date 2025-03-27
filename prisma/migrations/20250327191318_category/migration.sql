-- CreateEnum
CREATE TYPE "Category" AS ENUM ('Food', 'Sporting_Goods', 'Electronics', 'Other');

-- AlterTable
ALTER TABLE "Stuff" ADD COLUMN     "category" "Category" NOT NULL DEFAULT 'Other';
