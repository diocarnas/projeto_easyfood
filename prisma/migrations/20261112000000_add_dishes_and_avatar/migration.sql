-- Adiciona foto de perfil sem alterar os dados existentes.
ALTER TABLE `User` ADD COLUMN `avatarUrl` VARCHAR(500) NULL;

-- Novo catálogo de pratos vinculado aos restaurantes existentes.
CREATE TABLE `Dish` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(150) NOT NULL,
    `category` VARCHAR(100) NOT NULL,
    `price` DECIMAL(10, 2) NOT NULL,
    `imageUrl` VARCHAR(500) NULL,
    `description` TEXT NOT NULL,
    `restaurantId` INTEGER NOT NULL,
    INDEX `Dish_restaurantId_idx`(`restaurantId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

ALTER TABLE `Dish` ADD CONSTRAINT `Dish_restaurantId_fkey`
FOREIGN KEY (`restaurantId`) REFERENCES `Restaurant`(`id`)
ON DELETE CASCADE ON UPDATE CASCADE;
