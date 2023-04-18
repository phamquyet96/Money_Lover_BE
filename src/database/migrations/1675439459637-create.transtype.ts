import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateTableTransType1675439459637 implements MigrationInterface {

    nameTable: string = 'trans_type';

    public async up (queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: this.nameTable,
                columns: [
                    { name: 'id', type: 'int', isPrimary: true , isGenerated: true, generationStrategy: 'increment'},
                    { name: 'name', type: 'varchar(255)', isNullable: false, isUnique: true },
                ],
            }),
        )
    }

    public async down (queryRunner: QueryRunner): Promise<void>{
        await queryRunner.dropTable(this.nameTable);
    }

}