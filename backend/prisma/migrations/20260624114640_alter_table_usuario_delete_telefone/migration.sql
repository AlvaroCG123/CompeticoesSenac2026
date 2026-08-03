/*
  Warnings:

  - You are about to drop the column `telefone` on the `usuario` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `Usuario_telefone_key` ON `usuario`;

-- AlterTable
ALTER TABLE `usuario` DROP COLUMN `telefone`;
