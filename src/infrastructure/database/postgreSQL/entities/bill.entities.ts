import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Provider } from "./provider.entities";

@Entity({ name: 'bills' })
export class Bill {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column()
    numberBill!: string;

    @Column('decimal', { precision: 10, scale: 2 })
    amountBill!: number;

    @Column({ type: 'date' })
    dateBill!: Date;

    @ManyToOne(() => Provider)
    @JoinColumn({ name: 'providerId' })
    provider!: Provider;

    @Column()
    providerId!: string;
}