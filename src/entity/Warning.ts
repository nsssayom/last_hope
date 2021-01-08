import {Entity, PrimaryGeneratedColumn, Column, Index} from "typeorm";

@Entity()
export class Warning {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({nullable: false})
    @Index({ unique: true })
    title: string;

    @Column({nullable: false})
    area_code: number;

    @Column('timestamp', { nullable: false, default: () => 'CURRENT_TIMESTAMP'})
    issued_on: Date;

    @Column('timestamp', { nullable: false})
    eta: Date;

    @Column('timestamp', { nullable: false})
    eta_over: Date;
}