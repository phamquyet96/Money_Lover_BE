import { MigrationInterface, QueryRunner, Table, TableForeignKey, TableIndex } from 'typeorm';

export class CreateTableWallet1675439879870 implements MigrationInterface {

    nameTable: string = 'wallet';

    public async up (queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: this.nameTable,
                columns: [
                    { name: 'id', type: 'int', isPrimary: true, isGenerated: true, generationStrategy: 'increment' },
                    { name: 'user_id', type: 'int',  isNullable: false },
                    { name: 'name', type: 'varchar(255)', isNullable: false },
                    { name: 'balance', type: 'int', isNullable: false },
                    { name: 'initial_balance', type: 'int', isNullable: false},
                    { name: 'include_total', type: 'int' },
                    { name: 'active', type: 'boolean', default: true },
                ],
            }),
        )

        let fk_user_wallet = new TableForeignKey({
            columnNames: ['user_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'user'
        });

        let wallet_index = new TableIndex({
            columnNames: ['user_id', 'name']
        });

        await queryRunner.createForeignKey(this.nameTable, fk_user_wallet);
        await queryRunner.createIndex(this.nameTable, wallet_index);
    }

    public async down (queryRunner: QueryRunner): Promise<void>{
        await queryRunner.dropTable(this.nameTable);
    }

}