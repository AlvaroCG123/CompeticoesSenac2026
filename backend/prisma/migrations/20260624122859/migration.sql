/*
  Warnings:

  - You are about to drop the column `mesa` on the `convidado` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `convidado` DROP COLUMN `mesa`,
    ADD COLUMN `mesaId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Convidado` ADD CONSTRAINT `Convidado_mesaId_fkey` FOREIGN KEY (`mesaId`) REFERENCES `Mesa`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
