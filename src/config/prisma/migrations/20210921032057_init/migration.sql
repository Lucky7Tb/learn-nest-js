-- CreateTable
CREATE TABLE `friends` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER UNSIGNED NOT NULL,
    `user_friend_id` INTEGER UNSIGNED NOT NULL,

    INDEX `FK2_FRIENDS_TO_USERS`(`user_friend_id`),
    INDEX `FK_FRIENDS_TO_USERS`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `songs` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER UNSIGNED NOT NULL,
    `song_name` VARCHAR(100),
    `song_url` VARCHAR(255),
    `song_is_recommended` BOOLEAN,
    `created_at` DATETIME(0) DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `user_id`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(80) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `photo_profile` VARCHAR(80),
    `unique_id` VARCHAR(8) NOT NULL,
    `token` VARCHAR(255),
    `created_at` DATETIME(0) DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `username`(`username`),
    UNIQUE INDEX `unique_id`(`unique_id`),
    UNIQUE INDEX `token`(`token`),
    INDEX `token_2`(`token`),
    INDEX `unique_id_2`(`unique_id`),
    INDEX `username_2`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `friends` ADD CONSTRAINT `FK2_FRIENDS_TO_USERS` FOREIGN KEY (`user_friend_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `friends` ADD CONSTRAINT `FK_FRIENDS_TO_USERS` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `songs` ADD CONSTRAINT `FK_SONG_TO_USERS` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
