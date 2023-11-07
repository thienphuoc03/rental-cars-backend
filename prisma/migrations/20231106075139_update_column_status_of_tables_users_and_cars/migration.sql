/*
  Warnings:

  - You are about to alter the column `trang_thai` on the `nguoi_dung` table. The data in that column could be lost. The data in that column will be cast from `TinyInt` to `Enum(EnumId(2))`.
  - You are about to alter the column `trang_thai` on the `xe` table. The data in that column could be lost. The data in that column will be cast from `TinyInt` to `Enum(EnumId(5))`.
  - A unique constraint covering the columns `[slug]` on the table `xe` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `xe` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `nguoi_dung` MODIFY `ten_nguoi_dung` VARCHAR(255) NULL,
    MODIFY `trang_thai` ENUM('hoat_dong', 'khong_hoat_dong') NOT NULL DEFAULT 'hoat_dong';

-- AlterTable
ALTER TABLE `xe` ADD COLUMN `slug` VARCHAR(255) NOT NULL,
    MODIFY `trang_thai` ENUM('san_sang', 'da_thue', 'khong_san_sang') NOT NULL DEFAULT 'san_sang';

-- CreateIndex
CREATE UNIQUE INDEX `xe_slug_key` ON `xe`(`slug`);
