import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateTableUser1675439163054 implements MigrationInterface {

    nameTable: string = 'user';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: this.nameTable,
                columns: [
                    { name: 'id', type: 'int', isPrimary: true, isGenerated: true, generationStrategy: 'increment' },
                    { name: 'email', type: 'varchar(255)', isUnique: true, isNullable: false },
                    { name: 'password', type: 'varchar(255)', isNullable: false },
                    { name: 'name', type: 'varchar(255)', isNullable: true },
                    { name: 'image', type: 'varchar(500)', isNullable: true },
                    { name: 'google_id', type: 'varchar(500)', isNullable: true },
                    { name: 'facebook_id', type: 'varchar(500)', isNullable: true },
                    { name: 'github_id', type: 'varchar(500)', isNullable: true },
                    { name: 'refresh_token', type: 'longtext', isNullable: true },
                    { name: 'active', type: 'boolean', isNullable: false, default: false }
                ],
            }),
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable(this.nameTable);
    }

}