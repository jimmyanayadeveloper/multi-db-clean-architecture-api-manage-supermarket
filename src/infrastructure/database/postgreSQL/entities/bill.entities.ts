import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ProviderDts } from "./provider.entities";


@Entity({ name: 'bills' })
export class Bill {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column()
    numberBill!: string;

    @Column('decimal', { precision: 10, scale: 2 })
    amountBill!: number;

    @Column({ type: 'date', nullable: true })
    dateBill!: Date;

    @ManyToOne(() => ProviderDts)
    @JoinColumn({ name: 'providerId' })
    provider!: ProviderDts;

    @Column()
    providerId!: string;

    @Column({ default: false })
    isPaod!: boolean;

}