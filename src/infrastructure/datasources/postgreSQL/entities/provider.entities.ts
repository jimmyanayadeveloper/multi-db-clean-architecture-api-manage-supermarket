import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'providers' })
export class ProviderDts {
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

    @Column({ default: 0 })
    creditDays!: number;

    @Column({ default: true })
    isActive!: boolean;

}
