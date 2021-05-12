import {MigrationInterface, QueryRunner} from "typeorm";

export class Initial1620794289456 implements MigrationInterface {
    name = 'Initial1620794289456'

    public async up(_: QueryRunner): Promise<void> {
        // await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "coin" integer NOT NULL DEFAULT '100', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        // await queryRunner.query(`CREATE TABLE "card_user" ("cardId" integer NOT NULL, "userId" integer NOT NULL, CONSTRAINT "PK_1e1a78a5a3184d0ec97533be211" PRIMARY KEY ("cardId", "userId"))`);
        // await queryRunner.query(`CREATE TABLE "card" ("id" SERIAL NOT NULL, "image" character varying NOT NULL, "name" character varying NOT NULL, "value" character varying NOT NULL, "specialization" character varying NOT NULL, "description" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_9451069b6f1199730791a7f4ae4" PRIMARY KEY ("id"))`);
        // await queryRunner.query(`ALTER TABLE "card_user" ADD CONSTRAINT "FK_25f0f5b818ecefdf04e15aabf8a" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        // await queryRunner.query(`ALTER TABLE "card_user" ADD CONSTRAINT "FK_102c90387df685584145bfa1206" FOREIGN KEY ("cardId") REFERENCES "card"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(_: QueryRunner): Promise<void> {
        // await queryRunner.query(`ALTER TABLE "card_user" DROP CONSTRAINT "FK_102c90387df685584145bfa1206"`);
        // await queryRunner.query(`ALTER TABLE "card_user" DROP CONSTRAINT "FK_25f0f5b818ecefdf04e15aabf8a"`);
        // await queryRunner.query(`DROP TABLE "card"`);
        // await queryRunner.query(`DROP TABLE "card_user"`);
        // await queryRunner.query(`DROP TABLE "user"`);
    }

}
