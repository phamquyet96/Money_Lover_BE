import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Index, OneToMany } from "typeorm";
import TransCate from "./trans.cate.model";
import Transaction from "./transaction.model";
import User from "./user.model";

@Entity("trans_subcate")

@Index(["category", "name"], { unique: true })

export class TransSubCate {

    @PrimaryGeneratedColumn({ name: "id", type: "int" })
    id: number;

    @ManyToOne(() => TransCate, transCate => transCate.subCategories)
    @JoinColumn({name: "cate_id"})
    category: TransCate

    @Column({ name: "name", type: "varchar", length: 255, nullable: false })
    name: string;
    @OneToMany(() => Transaction, transaction => transaction.subCategory)
    transactions: Transaction[];

    @ManyToOne(() => User, user => user.transSubCates)
    @JoinColumn({name: "user_id"})
    user: User

}

export default TransSubCate;