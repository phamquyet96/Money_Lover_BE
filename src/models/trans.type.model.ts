import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import TransCate from "./trans.cate.model";

@Entity()

export class TransType{

    @PrimaryGeneratedColumn({ name: "id", type: "int" })
    id: number;

    @Column({ name: "name", type: "varchar", length: 255, nullable: false, unique: true})
    name: string;

    @OneToMany(() => TransCate, transCate => transCate.transType)
    transCates: TransCate[]
}

export default TransType;