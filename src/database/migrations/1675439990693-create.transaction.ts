import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateTableTransAction1675439990693 implements MigrationInterface {

    nameTable: string = 'transaction';

    public async up (queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: this.nameTable,
                columns: [
                    { name: 'id', type: 'int', isPrimary: true , isGenerated: true, generationStrategy: 'increment'},
                    { name: 'wallet_id', type: 'int', isNullable: false },
                    { name: 'subcategory_id', type: 'int', isNullable: false },
                    { name: 'money', type: 'int', isNullable: false },
                    { name: 'date', type: 'date' , isNullable: false},
                    { name: 'note', type: 'varchar(255)' , isNullable: true},
                    { name: 'image', type: 'nvarchar(500)' , isNullable: true},
                ],
            }),
        )

        let fk_wallet_transaction = new TableForeignKey({
            columnNames: ['wallet_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'wallet',
            onDelete: 'CASCADE'
        });

        let fk_category_transaction = new TableForeignKey({
            columnNames: ['subcategory_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'trans_subcate',
        });

        await queryRunner.createForeignKeys(this.nameTable, [fk_wallet_transaction, fk_category_transaction]);
    }

    public async down (queryRunner: QueryRunner): Promise<void>{
        await queryRunner.dropTable(this.nameTable);
    }

}