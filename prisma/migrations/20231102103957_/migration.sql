-- DropForeignKey
ALTER TABLE `chi_tiet_don_hang` DROP FOREIGN KEY `chi_tiet_don_hang_ma_don_hang_fkey`;

-- DropForeignKey
ALTER TABLE `chi_tiet_don_hang` DROP FOREIGN KEY `chi_tiet_don_hang_ma_xe_fkey`;

-- DropForeignKey
ALTER TABLE `danh_gia` DROP FOREIGN KEY `danh_gia_ma_nguoi_dung_fkey`;

-- DropForeignKey
ALTER TABLE `danh_gia` DROP FOREIGN KEY `danh_gia_ma_xe_fkey`;

-- DropForeignKey
ALTER TABLE `don_hang` DROP FOREIGN KEY `don_hang_ma_nguoi_dung_fkey`;

-- DropForeignKey
ALTER TABLE `hinh_anh_xe` DROP FOREIGN KEY `hinh_anh_xe_ma_mau_sac_xe_fkey`;

-- DropForeignKey
ALTER TABLE `mau_xe` DROP FOREIGN KEY `mau_xe_ma_hang_xe_fkey`;

-- DropForeignKey
ALTER TABLE `nguoi_dung` DROP FOREIGN KEY `nguoi_dung_ma_vai_tro_fkey`;

-- DropForeignKey
ALTER TABLE `tinh_nang_xe` DROP FOREIGN KEY `tinh_nang_xe_ma_tinh_nang_fkey`;

-- DropForeignKey
ALTER TABLE `tinh_nang_xe` DROP FOREIGN KEY `tinh_nang_xe_ma_xe_fkey`;

-- DropForeignKey
ALTER TABLE `xe` DROP FOREIGN KEY `xe_ma_mau_sac_xe_fkey`;

-- DropForeignKey
ALTER TABLE `xe` DROP FOREIGN KEY `xe_ma_mau_xe_fkey`;

-- AlterTable
ALTER TABLE `chi_tiet_don_hang` MODIFY `ma_don_hang` INTEGER NULL,
    MODIFY `ma_xe` INTEGER NULL;

-- AlterTable
ALTER TABLE `danh_gia` MODIFY `ma_xe` INTEGER NULL,
    MODIFY `ma_nguoi_dung` INTEGER NULL;

-- AlterTable
ALTER TABLE `don_hang` MODIFY `ma_nguoi_dung` INTEGER NULL;

-- AlterTable
ALTER TABLE `hinh_anh_xe` MODIFY `ma_mau_sac_xe` INTEGER NULL;

-- AlterTable
ALTER TABLE `mau_xe` MODIFY `ma_hang_xe` INTEGER NULL;

-- AlterTable
ALTER TABLE `nguoi_dung` MODIFY `ma_vai_tro` INTEGER NULL;

-- AlterTable
ALTER TABLE `tinh_nang_xe` MODIFY `ma_xe` INTEGER NULL,
    MODIFY `ma_tinh_nang` INTEGER NULL;

-- AlterTable
ALTER TABLE `xe` MODIFY `ma_mau_xe` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `nguoi_dung` ADD CONSTRAINT `nguoi_dung_ma_vai_tro_fkey` FOREIGN KEY (`ma_vai_tro`) REFERENCES `vai_tro`(`ma_vai_tro`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `mau_xe` ADD CONSTRAINT `mau_xe_ma_hang_xe_fkey` FOREIGN KEY (`ma_hang_xe`) REFERENCES `hang_xe`(`ma_hang_xe`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `xe` ADD CONSTRAINT `xe_ma_mau_xe_fkey` FOREIGN KEY (`ma_mau_xe`) REFERENCES `mau_xe`(`ma_mau_xe`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `xe` ADD CONSTRAINT `xe_ma_mau_sac_xe_fkey` FOREIGN KEY (`ma_mau_sac_xe`) REFERENCES `mau_sac_xe`(`ma_mau_sac_xe`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `hinh_anh_xe` ADD CONSTRAINT `hinh_anh_xe_ma_mau_sac_xe_fkey` FOREIGN KEY (`ma_mau_sac_xe`) REFERENCES `mau_sac_xe`(`ma_mau_sac_xe`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tinh_nang_xe` ADD CONSTRAINT `tinh_nang_xe_ma_xe_fkey` FOREIGN KEY (`ma_xe`) REFERENCES `xe`(`ma_xe`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tinh_nang_xe` ADD CONSTRAINT `tinh_nang_xe_ma_tinh_nang_fkey` FOREIGN KEY (`ma_tinh_nang`) REFERENCES `tinh_nang`(`ma_tinh_nang`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `don_hang` ADD CONSTRAINT `don_hang_ma_nguoi_dung_fkey` FOREIGN KEY (`ma_nguoi_dung`) REFERENCES `nguoi_dung`(`ma_nguoi_dung`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `chi_tiet_don_hang` ADD CONSTRAINT `chi_tiet_don_hang_ma_don_hang_fkey` FOREIGN KEY (`ma_don_hang`) REFERENCES `don_hang`(`ma_don_hang`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `chi_tiet_don_hang` ADD CONSTRAINT `chi_tiet_don_hang_ma_xe_fkey` FOREIGN KEY (`ma_xe`) REFERENCES `xe`(`ma_xe`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `danh_gia` ADD CONSTRAINT `danh_gia_ma_xe_fkey` FOREIGN KEY (`ma_xe`) REFERENCES `xe`(`ma_xe`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `danh_gia` ADD CONSTRAINT `danh_gia_ma_nguoi_dung_fkey` FOREIGN KEY (`ma_nguoi_dung`) REFERENCES `nguoi_dung`(`ma_nguoi_dung`) ON DELETE CASCADE ON UPDATE CASCADE;
