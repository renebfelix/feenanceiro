-- CreateTable
CREATE TABLE `billings_info` (
    `idBillingInfo` INTEGER NOT NULL AUTO_INCREMENT,
    `descriptionBillingInfo` VARCHAR(255) NOT NULL,
    `dataBillingInfo` DATE NOT NULL,
    `valueBillingInfo` FLOAT NOT NULL,
    `deletedBillingInfo` DATETIME(0) NULL,
    `typeBillingInfo` VARCHAR(100) NOT NULL,
    `parcelBillingInfo` INTEGER NULL,
    `idUserBillingInfo` INTEGER NULL,
    `divisionBillingInfo` INTEGER NOT NULL,
    `categoryBillingInfo` INTEGER NOT NULL,
    `paymentBillingInfo` INTEGER NOT NULL,
    `valueTypeBillingInfo` VARCHAR(100) NOT NULL,
    `dataCriacaoBillingInfo` DATETIME(0) NULL,

    INDEX `billings_info_FK`(`idUserBillingInfo`),
    INDEX `billings_info_cards_FK`(`paymentBillingInfo`),
    INDEX `billings_info_categories_FK`(`categoryBillingInfo`),
    PRIMARY KEY (`idBillingInfo`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `billings_status` (
    `idBillingStatus` INTEGER NOT NULL AUTO_INCREMENT,
    `idBillingValueBillingStatus` INTEGER NOT NULL,
    `statusBillingStatus` VARCHAR(100) NULL,
    `dateBillingStatus` DATE NULL,
    `responsableBillingStatus` INTEGER NOT NULL,

    INDEX `billings_status_billings_values_FK`(`idBillingValueBillingStatus`),
    PRIMARY KEY (`idBillingStatus`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `billings_values` (
    `idBillingValue` INTEGER NOT NULL AUTO_INCREMENT,
    `valueBillingValue` FLOAT NOT NULL,
    `idBillingInfoBillingValue` INTEGER NOT NULL,
    `dateBillingValue` DATE NULL,
    `responsableBillingValue` INTEGER NOT NULL,
    `numberParcelBillingValue` INTEGER NULL,

    INDEX `billing_values_FK`(`idBillingInfoBillingValue`),
    PRIMARY KEY (`idBillingValue`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cards` (
    `idCard` INTEGER NOT NULL AUTO_INCREMENT,
    `nameCard` VARCHAR(100) NOT NULL,
    `dueDateCard` INTEGER NULL,
    `closingDateCard` INTEGER NULL,
    `limitCard` FLOAT NULL,
    `idUserCard` INTEGER NOT NULL,
    `deletedCard` DATETIME(0) NULL,
    `typeCard` VARCHAR(100) NOT NULL,

    INDEX `cards_FK`(`idUserCard`),
    PRIMARY KEY (`idCard`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `categories` (
    `idCategory` INTEGER NOT NULL AUTO_INCREMENT,
    `nameCategory` VARCHAR(100) NOT NULL,
    `idUserCategory` INTEGER NOT NULL,
    `deletedCategory` DATETIME(0) NULL,
    `limitCategory` FLOAT NULL,

    INDEX `categories_users_FK`(`idUserCategory`),
    PRIMARY KEY (`idCategory`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `icons` (
    `idIcon` INTEGER NOT NULL AUTO_INCREMENT,
    `nameIcon` VARCHAR(100) NOT NULL,
    `fileIcone` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`idIcon`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `reset_password` (
    `idReset` INTEGER NOT NULL AUTO_INCREMENT,
    `idUserReset` INTEGER NOT NULL,
    `dateReset` DATETIME(0) NOT NULL,
    `dateExpirationReset` DATETIME(0) NOT NULL,
    `uuidReset` VARCHAR(100) NOT NULL,
    `finishedReset` BOOLEAN NOT NULL,

    INDEX `reset_password_users_FK`(`idUserReset`),
    PRIMARY KEY (`idReset`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `responsables` (
    `idResponsable` INTEGER NOT NULL AUTO_INCREMENT,
    `nameResponsable` VARCHAR(100) NOT NULL,
    `deletedResponsable` DATETIME(0) NULL,
    `idUserResponsable` INTEGER NOT NULL,
    `isDefaultResponsable` BOOLEAN NOT NULL,
    `uuidResponsable` VARCHAR(100) NOT NULL,

    INDEX `responsables_FK`(`idUserResponsable`),
    PRIMARY KEY (`idResponsable`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `idUser` INTEGER NOT NULL AUTO_INCREMENT,
    `usernameUser` VARCHAR(100) NOT NULL,
    `emailUser` VARCHAR(255) NOT NULL,
    `passwordUser` VARCHAR(255) NOT NULL,
    `fullnameUser` VARCHAR(255) NOT NULL,
    `limitUser` FLOAT NULL,
    `photoUser` VARCHAR(191) NULL,
    `uuidUser` VARCHAR(100) NOT NULL,
    `deletedUser` DATETIME(0) NULL,
    `blockedUser` DATETIME(0) NULL,

    UNIQUE INDEX `users_uuidUser_key`(`uuidUser`),
    PRIMARY KEY (`idUser`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `refresh_token` (
    `idRefresh` VARCHAR(191) NOT NULL,
    `expiresInRefresh` INTEGER NOT NULL,
    `uuidUserRefresh` VARCHAR(191) NULL,

    UNIQUE INDEX `refresh_token_uuidUserRefresh_key`(`uuidUserRefresh`),
    INDEX `refresh_token_users_FK`(`uuidUserRefresh`),
    PRIMARY KEY (`idRefresh`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `billings_info` ADD CONSTRAINT `billings_info_FK` FOREIGN KEY (`idUserBillingInfo`) REFERENCES `users`(`idUser`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `billings_info` ADD CONSTRAINT `billings_info_cards_FK` FOREIGN KEY (`paymentBillingInfo`) REFERENCES `cards`(`idCard`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `billings_info` ADD CONSTRAINT `billings_info_categories_FK` FOREIGN KEY (`categoryBillingInfo`) REFERENCES `categories`(`idCategory`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `billings_status` ADD CONSTRAINT `billings_status_billings_values_FK` FOREIGN KEY (`idBillingValueBillingStatus`) REFERENCES `billings_values`(`idBillingValue`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `billings_values` ADD CONSTRAINT `billing_values_FK` FOREIGN KEY (`idBillingInfoBillingValue`) REFERENCES `billings_info`(`idBillingInfo`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `cards` ADD CONSTRAINT `cards_FK` FOREIGN KEY (`idUserCard`) REFERENCES `users`(`idUser`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `categories` ADD CONSTRAINT `categories_users_FK` FOREIGN KEY (`idUserCategory`) REFERENCES `users`(`idUser`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `reset_password` ADD CONSTRAINT `reset_password_users_FK` FOREIGN KEY (`idUserReset`) REFERENCES `users`(`idUser`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `responsables` ADD CONSTRAINT `responsables_FK` FOREIGN KEY (`idUserResponsable`) REFERENCES `users`(`idUser`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `refresh_token` ADD CONSTRAINT `refresh_token_users_FK` FOREIGN KEY (`uuidUserRefresh`) REFERENCES `users`(`uuidUser`) ON DELETE RESTRICT ON UPDATE RESTRICT;
