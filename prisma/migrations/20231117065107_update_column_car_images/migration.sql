/*
  Warnings:

  - You are about to drop the column `ma_mau_sac_xe` on the `hinh_anh_xe` table. All the data in the column will be lost.
  - The values [ho_tro_phanh_khan_cap,giu_lan,canh_bao_ap_xe] on the enum `tinh_nang_ten_tinh_nang` will be removed. If these variants are still used in the database, this will fail.

*/
-- DropForeignKey
ALTER TABLE `hinh_anh_xe` DROP FOREIGN KEY `hinh_anh_xe_ma_mau_sac_xe_fkey`;

-- DropIndex
DROP INDEX `hang_xe_ten_hang_xe_key` ON `hang_xe`;

-- DropIndex
DROP INDEX `mau_xe_ten_mau_xe_key` ON `mau_xe`;

-- AlterTable
ALTER TABLE `hinh_anh_xe` DROP COLUMN `ma_mau_sac_xe`,
    ADD COLUMN `ma_xe` INTEGER NULL;

-- AlterTable
ALTER TABLE `tinh_nang` MODIFY `ten_tinh_nang` ENUM('dieu_hoa', 'radio', 'usb', 'bluetooth', 'gps', 'cam_bien_lui', 'camera', 'cua_so_troi', 'khoa_khong_can_chia_khoa', 'chong_trom', 'tui_khi', 'phanh_tu_dong', 'gat_mua_tu_dong', 'giu_lan_duong', 'canh_bao_diem_mu', 'canh_bao_xe_phia_sau', 'canh_bao_ap_suat_lop', 'ghe_tre_em') NOT NULL;

-- AddForeignKey
ALTER TABLE `hinh_anh_xe` ADD CONSTRAINT `hinh_anh_xe_ma_xe_fkey` FOREIGN KEY (`ma_xe`) REFERENCES `xe`(`ma_xe`) ON DELETE CASCADE ON UPDATE CASCADE;
