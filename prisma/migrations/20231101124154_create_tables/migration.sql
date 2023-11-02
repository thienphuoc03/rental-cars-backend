-- CreateTable
CREATE TABLE `vai_tro` (
    `ma_vai_tro` INTEGER NOT NULL AUTO_INCREMENT,
    `ten_vai_tro` ENUM('QUAN_TRI_VIEN', 'CHU_XE', 'NGUOI_THUE_XE') NOT NULL DEFAULT 'NGUOI_THUE_XE',
    `ngay_tao` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `ngay_cap_nhat` DATETIME(3) NOT NULL,

    PRIMARY KEY (`ma_vai_tro`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `ma_nguoi_dung` INTEGER NOT NULL AUTO_INCREMENT,
    `ten_dang_nhap` VARCHAR(100) NOT NULL,
    `mat_khau` VARCHAR(100) NOT NULL,
    `ten_nguoi_dung` VARCHAR(255) NOT NULL,
    `email` VARCHAR(100) NULL,
    `so_dien_thoai` VARCHAR(11) NULL,
    `gioi_tinh` ENUM('nam', 'nu', 'khac') NULL DEFAULT 'khac',
    `dia_chi` VARCHAR(191) NULL,
    `avatar_url` LONGTEXT NULL,
    `ma_vai_tro` INTEGER NOT NULL,
    `ngay_tao` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `ngay_cap_nhat` DATETIME(3) NOT NULL,
    `trang_thai` BOOLEAN NOT NULL DEFAULT true,

    UNIQUE INDEX `User_ten_dang_nhap_key`(`ten_dang_nhap`),
    UNIQUE INDEX `User_email_key`(`email`),
    UNIQUE INDEX `User_so_dien_thoai_key`(`so_dien_thoai`),
    PRIMARY KEY (`ma_nguoi_dung`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `hang_xe` (
    `ma_hang_xe` INTEGER NOT NULL AUTO_INCREMENT,
    `ten_hang_xe` VARCHAR(255) NOT NULL,
    `ngay_tao` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `ngay_cap_nhat` DATETIME(3) NOT NULL,

    UNIQUE INDEX `hang_xe_ten_hang_xe_key`(`ten_hang_xe`),
    PRIMARY KEY (`ma_hang_xe`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `mau_xe` (
    `ma_mau_xe` INTEGER NOT NULL AUTO_INCREMENT,
    `ten_mau_xe` VARCHAR(255) NOT NULL,
    `ma_hang_xe` INTEGER NOT NULL,
    `ngay_tao` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `ngay_cap_nhat` DATETIME(3) NOT NULL,

    UNIQUE INDEX `mau_xe_ten_mau_xe_key`(`ten_mau_xe`),
    PRIMARY KEY (`ma_mau_xe`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `xe` (
    `ma_xe` INTEGER NOT NULL AUTO_INCREMENT,
    `ten_xe` VARCHAR(255) NOT NULL,
    `bien_so_xe` VARCHAR(10) NOT NULL,
    `so_cho` INTEGER NOT NULL,
    `nam_san_xuat` INTEGER NOT NULL,
    `loai_hop_so` ENUM('so_tu_dong', 'so_san') NOT NULL DEFAULT 'so_tu_dong',
    `nhien_lieu` ENUM('xang', 'dau', 'dien') NOT NULL DEFAULT 'xang',
    `mo_ta` TEXT NOT NULL,
    `gia_thue_theo_ngay` DECIMAL(10, 2) NOT NULL,
    `trang_thai` BOOLEAN NOT NULL DEFAULT true,
    `ma_mau_xe` INTEGER NOT NULL,
    `ngay_tao` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `ngay_cap_nhat` DATETIME(3) NOT NULL,
    `ma_mau_sac_xe` INTEGER NULL,

    UNIQUE INDEX `xe_bien_so_xe_key`(`bien_so_xe`),
    PRIMARY KEY (`ma_xe`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `mau_sac_xe` (
    `ma_mau_sac_xe` INTEGER NOT NULL AUTO_INCREMENT,
    `ten_mau_sac_xe` VARCHAR(255) NOT NULL,
    `ngay_tao` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `ngay_cap_nhat` DATETIME(3) NOT NULL,

    UNIQUE INDEX `mau_sac_xe_ten_mau_sac_xe_key`(`ten_mau_sac_xe`),
    PRIMARY KEY (`ma_mau_sac_xe`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `hinh_anh_xe` (
    `ma_hinh_anh_xe` INTEGER NOT NULL AUTO_INCREMENT,
    `url` LONGTEXT NOT NULL,
    `ma_mau_sac_xe` INTEGER NOT NULL,
    `ngay_tao` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `ngay_cap_nhat` DATETIME(3) NOT NULL,

    PRIMARY KEY (`ma_hinh_anh_xe`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tinh_nang` (
    `ma_tinh_nang` INTEGER NOT NULL AUTO_INCREMENT,
    `ten_tinh_nang` ENUM('dieu_hoa', 'radio', 'usb', 'bluetooth', 'gps', 'cam_bien_lui', 'camera', 'cua_so_troi', 'khoa_khong_can_chia_khoa', 'chong_trom', 'tui_khi', 'ho_tro_phanh_khan_cap', 'gat_mua_tu_dong', 'giu_lan', 'canh_bao_diem_mu', 'canh_bao_xe_phia_sau', 'canh_bao_ap_xe', 'ghe_tre_em') NOT NULL,
    `ngay_tao` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `ngay_cap_nhat` DATETIME(3) NOT NULL,

    UNIQUE INDEX `tinh_nang_ten_tinh_nang_key`(`ten_tinh_nang`),
    PRIMARY KEY (`ma_tinh_nang`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tinh_nang_xe` (
    `ma_tinh_nang_xe` INTEGER NOT NULL AUTO_INCREMENT,
    `ma_xe` INTEGER NOT NULL,
    `ma_tinh_nang` INTEGER NOT NULL,
    `ngay_tao` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `ngay_cap_nhat` DATETIME(3) NOT NULL,

    PRIMARY KEY (`ma_tinh_nang_xe`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `don_hang` (
    `ma_don_hang` INTEGER NOT NULL AUTO_INCREMENT,
    `ngay_bat_dau` DATETIME(3) NOT NULL,
    `ngay_ket_thuc` DATETIME(3) NOT NULL,
    `tong_tien` DECIMAL(10, 2) NOT NULL,
    `ma_nguoi_dung` INTEGER NOT NULL,
    `trang_thai` ENUM('cho_xac_nhan', 'da_xac_nhan', 'da_huy', 'da_hoan_thanh') NOT NULL DEFAULT 'cho_xac_nhan',
    `ngay_tao` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `ngay_cap_nhat` DATETIME(3) NOT NULL,

    PRIMARY KEY (`ma_don_hang`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `chi_tiet_don_hang` (
    `ma_chi_tiet_don_hang` INTEGER NOT NULL AUTO_INCREMENT,
    `ma_don_hang` INTEGER NOT NULL,
    `ma_xe` INTEGER NOT NULL,
    `ngay_bat_dau` DATETIME(3) NOT NULL,
    `ngay_ket_thuc` DATETIME(3) NOT NULL,
    `tong_tien` DECIMAL(10, 2) NOT NULL,
    `trang_thai` ENUM('cho_xac_nhan', 'da_xac_nhan', 'da_huy', 'da_hoan_thanh') NOT NULL DEFAULT 'cho_xac_nhan',
    `ngay_tao` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `ngay_cap_nhat` DATETIME(3) NOT NULL,

    PRIMARY KEY (`ma_chi_tiet_don_hang`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `danh_gia` (
    `ma_danh_gia` INTEGER NOT NULL AUTO_INCREMENT,
    `noi_dung` TEXT NOT NULL,
    `danh_gia` INTEGER NOT NULL,
    `ma_xe` INTEGER NOT NULL,
    `ma_nguoi_dung` INTEGER NOT NULL,
    `ngay_tao` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `ngay_cap_nhat` DATETIME(3) NOT NULL,

    PRIMARY KEY (`ma_danh_gia`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_ma_vai_tro_fkey` FOREIGN KEY (`ma_vai_tro`) REFERENCES `vai_tro`(`ma_vai_tro`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `mau_xe` ADD CONSTRAINT `mau_xe_ma_hang_xe_fkey` FOREIGN KEY (`ma_hang_xe`) REFERENCES `hang_xe`(`ma_hang_xe`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `xe` ADD CONSTRAINT `xe_ma_mau_xe_fkey` FOREIGN KEY (`ma_mau_xe`) REFERENCES `mau_xe`(`ma_mau_xe`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `xe` ADD CONSTRAINT `xe_ma_mau_sac_xe_fkey` FOREIGN KEY (`ma_mau_sac_xe`) REFERENCES `mau_sac_xe`(`ma_mau_sac_xe`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `hinh_anh_xe` ADD CONSTRAINT `hinh_anh_xe_ma_mau_sac_xe_fkey` FOREIGN KEY (`ma_mau_sac_xe`) REFERENCES `mau_sac_xe`(`ma_mau_sac_xe`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tinh_nang_xe` ADD CONSTRAINT `tinh_nang_xe_ma_xe_fkey` FOREIGN KEY (`ma_xe`) REFERENCES `xe`(`ma_xe`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tinh_nang_xe` ADD CONSTRAINT `tinh_nang_xe_ma_tinh_nang_fkey` FOREIGN KEY (`ma_tinh_nang`) REFERENCES `tinh_nang`(`ma_tinh_nang`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `don_hang` ADD CONSTRAINT `don_hang_ma_nguoi_dung_fkey` FOREIGN KEY (`ma_nguoi_dung`) REFERENCES `User`(`ma_nguoi_dung`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `chi_tiet_don_hang` ADD CONSTRAINT `chi_tiet_don_hang_ma_don_hang_fkey` FOREIGN KEY (`ma_don_hang`) REFERENCES `don_hang`(`ma_don_hang`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `chi_tiet_don_hang` ADD CONSTRAINT `chi_tiet_don_hang_ma_xe_fkey` FOREIGN KEY (`ma_xe`) REFERENCES `xe`(`ma_xe`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `danh_gia` ADD CONSTRAINT `danh_gia_ma_xe_fkey` FOREIGN KEY (`ma_xe`) REFERENCES `xe`(`ma_xe`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `danh_gia` ADD CONSTRAINT `danh_gia_ma_nguoi_dung_fkey` FOREIGN KEY (`ma_nguoi_dung`) REFERENCES `User`(`ma_nguoi_dung`) ON DELETE RESTRICT ON UPDATE CASCADE;
