import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import Wallet from "./wallet.model";
import TransCate from "./trans.cate.model";
import TransSubCate from "./trans.subcate.model";

@Entity()

export class Transaction{

    @PrimaryGeneratedColumn({ name: "id", type: "int" })
        //@ts-ignore
    id: int;

    @ManyToOne(() => Wallet, wallet => wallet.transactions, {
        onDelete: "CASCADE"
    })
    @JoinColumn({name: "wallet_id"})
        //@ts-ignore
    wallet: Wallet;

    @ManyToOne(() => TransSubCate, transSubCate => transSubCate.transactions)
    @JoinColumn({name: "subcategory_id"})
        //@ts-ignore
    subCategory: TransSubCate;

    @Column({ name: "money", type: "int", nullable: false })
    money: number;

    @Column({ name: "date", type: "date", nullable: false })
    date: Date;

    @Column({ name: "note", type: "varchar", length: 255, nullable: true })
    note: string;

    @Column({ name: "image", type: "varchar", length: 500, nullable: true })
    image: string;

}

export default Transaction;