/*
  Warnings:

  - You are about to alter the column `ten_mau_sac_xe` on the `mau_sac_xe` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `Enum(EnumId(6))`.

*/
-- AlterTable
ALTER TABLE `mau_sac_xe` MODIFY `ten_mau_sac_xe` ENUM('den', 'trang', 'do', 'xanh_duong', 'vang', 'cam', 'xanh_la', 'tim', 'hong', 'nau', 'xam', 'bac', 'vang_nhat') NOT NULL;

-- AlterTable
ALTER TABLE `nguoi_dung` ADD COLUMN `ngay_sinh` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `xe` ADD COLUMN `ma_nguoi_dung` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `xe` ADD CONSTRAINT `xe_ma_nguoi_dung_fkey` FOREIGN KEY (`ma_nguoi_dung`) REFERENCES `nguoi_dung`(`ma_nguoi_dung`) ON DELETE CASCADE ON UPDATE CASCADE;
