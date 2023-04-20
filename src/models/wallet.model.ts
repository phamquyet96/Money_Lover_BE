import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany, Index } from "typeorm";
import User from "./user.model";
import Transaction from "./transaction.model";

@Entity()

@Index(["user", "name"], { unique: true })

export class Wallet {

    @PrimaryGeneratedColumn({ name: "id", type: "int" })
    //@ts-ignore
    id: number;

    @ManyToOne(() => User, user => user.wallets, {
        onDelete: "CASCADE"
    })
    @JoinColumn({ name: "user_id" })
    //@ts-ignore
    user: User;

    @Column({ name: "name", type: "varchar", length: 255, nullable: false })
    //@ts-ignore
    name: string;

    @Column({ name: "balance", type: "int", nullable: false })
    //@ts-ignore
    balance: number;

    @Column({ name: "initial_balance", type: "int", nullable: false })
    //@ts-ignore
    initialBalance: number;

    @Column({ name: "include_total", type: "int"})
    //@ts-ignore
    includeTotal: number;

    @Column({ name: "active", type: "boolean", default: true })
    //@ts-ignore
    active: boolean;

    @OneToMany(() => Transaction, transaction => transaction.wallet, {
        cascade: true
    })
    //@ts-ignore
    transactions: Transaction[];
}

export default Wallet;