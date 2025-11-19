/*
  Warnings:

  - You are about to drop the column `ulrImage1` on the `schools` table. All the data in the column will be lost.
  - You are about to drop the column `ulrImage2` on the `schools` table. All the data in the column will be lost.
  - You are about to drop the column `ulrImage3` on the `schools` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `schools` DROP COLUMN `ulrImage1`,
    DROP COLUMN `ulrImage2`,
    DROP COLUMN `ulrImage3`;

-- CreateTable
CREATE TABLE `Images` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `url` VARCHAR(191) NOT NULL,
    `schoolId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Images` ADD CONSTRAINT `Images_schoolId_fkey` FOREIGN KEY (`schoolId`) REFERENCES `Schools`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
