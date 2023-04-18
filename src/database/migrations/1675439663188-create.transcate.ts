import { MigrationInterface, QueryRunner, Table, TableForeignKey, TableIndex } from 'typeorm';

export class CreateTableTransCate1675439663188 implements MigrationInterface {

    nameTable: string = 'trans_cate';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: this.nameTable,
                columns: [
                    { name: 'id', type: 'int', isPrimary: true, isGenerated: true, generationStrategy: 'increment' },
                    { name: 'type_id', type: 'int', isNullable: false },
                    { name: 'name', type: 'varchar(255)', isNullable: false },
                ],
            }),
        )

        let fk_type_case = new TableForeignKey({
            columnNames: ['type_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'trans_type'
        });

        let cate_index = new TableIndex({
            columnNames: ['type_id', 'name']
        })

        await queryRunner.createForeignKey(this.nameTable, fk_type_case);
        await queryRunner.createIndex(this.nameTable, cate_index);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable(this.nameTable);
    }

}