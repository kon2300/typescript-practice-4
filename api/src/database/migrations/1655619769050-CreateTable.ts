import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateTable1655619769050 implements MigrationInterface {
    name = 'CreateTable1655619769050'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `users` (`id` varchar(255) NOT NULL, `name` varchar(255) NOT NULL, `age` int NOT NULL, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `articles` (`id` int NOT NULL AUTO_INCREMENT, `user_id` varchar(255) NOT NULL, `title` varchar(255) NOT NULL, `content` text NOT NULL, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `tags` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `articles_tags` (`id` int NOT NULL AUTO_INCREMENT, `article_id` int NOT NULL, `tag_id` int NOT NULL, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`, `article_id`, `tag_id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `articles` ADD CONSTRAINT `FK_87bb15395540ae06337a486a77a` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `articles_tags` ADD CONSTRAINT `FK_0844b8f28aa32ef4bb5885d5003` FOREIGN KEY (`article_id`) REFERENCES `articles`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `articles_tags` ADD CONSTRAINT `FK_82ccd5e9ccf84c6c2445a5331fa` FOREIGN KEY (`tag_id`) REFERENCES `tags`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `articles_tags` DROP FOREIGN KEY `FK_82ccd5e9ccf84c6c2445a5331fa`");
        await queryRunner.query("ALTER TABLE `articles_tags` DROP FOREIGN KEY `FK_0844b8f28aa32ef4bb5885d5003`");
        await queryRunner.query("ALTER TABLE `articles` DROP FOREIGN KEY `FK_87bb15395540ae06337a486a77a`");
        await queryRunner.query("DROP TABLE `articles_tags`");
        await queryRunner.query("DROP TABLE `tags`");
        await queryRunner.query("DROP TABLE `articles`");
        await queryRunner.query("DROP TABLE `users`");
    }

}
