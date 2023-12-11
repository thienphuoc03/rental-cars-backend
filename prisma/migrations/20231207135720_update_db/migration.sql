/*
  Warnings:

  - You are about to drop the column `ngay_bat_dau` on the `don_hang` table. All the data in the column will be lost.
  - You are about to drop the column `ngay_ket_thuc` on the `don_hang` table. All the data in the column will be lost.
  - The values [dau] on the enum `xe_nhien_lieu` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `gia_thue_theo_ngay` to the `chi_tiet_don_hang` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tien_dat_coc` to the `don_hang` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dia_chi` to the `xe` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `chi_tiet_don_hang` ADD COLUMN `gia_thue_theo_ngay` DECIMAL(10, 2) NOT NULL;

-- AlterTable
ALTER TABLE `don_hang` DROP COLUMN `ngay_bat_dau`,
    DROP COLUMN `ngay_ket_thuc`,
    ADD COLUMN `tien_dat_coc` DECIMAL(10, 2) NOT NULL;

-- AlterTable
ALTER TABLE `hang_xe` MODIFY `ngay_cap_nhat` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `hinh_anh_xe` MODIFY `ngay_cap_nhat` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `mau_sac_xe` MODIFY `ngay_cap_nhat` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `mau_xe` MODIFY `ngay_cap_nhat` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `nguoi_dung` MODIFY `dia_chi` VARCHAR(255) NULL,
    MODIFY `ngay_sinh` DATE NULL;

-- AlterTable
ALTER TABLE `tinh_nang` MODIFY `ten_tinh_nang` ENUM('dieu_hoa', 'radio', 'usb', 'bluetooth', 'gps', 'cam_bien_lui', 'camera', 'cua_so_troi', 'khoa_khong_can_chia_khoa', 'chong_trom', 'tui_khi', 'phanh_tu_dong', 'gat_mua_tu_dong', 'giu_lan_duong', 'canh_bao_diem_mu', 'canh_bao_xe_phia_sau', 'canh_bao_ap_suat_lop', 'ghe_tre_em', 'ban_do') NOT NULL;

-- AlterTable
ALTER TABLE `tinh_nang_xe` MODIFY `ngay_cap_nhat` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `vai_tro` MODIFY `ngay_cap_nhat` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `xe` ADD COLUMN `dia_chi` VARCHAR(255) NOT NULL,
    MODIFY `nhien_lieu` ENUM('xang', 'dau_diesel', 'dien') NOT NULL DEFAULT 'xang',
    MODIFY `mo_ta` LONGTEXT NOT NULL,
    MODIFY `trang_thai` ENUM('san_sang', 'da_thue', 'khong_san_sang') NOT NULL DEFAULT 'khong_san_sang';
