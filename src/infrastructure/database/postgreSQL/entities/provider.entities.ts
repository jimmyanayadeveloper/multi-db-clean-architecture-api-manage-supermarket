import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'providers' })
export class Provider {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column()
    name!: string;

    @Column({ unique: true })
    nit!: string;

    @Column()
    salesman!: string;

    @Column()
    creditBalance!: number;

    @Column()
    withHoldingsTaxes: boolean = false;

    @Column()
    saleWithCredit: boolean = false;

}
