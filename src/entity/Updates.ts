import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Updates {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({nullable: false})
    user_id: number;

    @Column({nullable: false, type: "float", precision: 18, scale: 15})
    long: number;

    @Column({nullable: false, type: "float", precision: 18, scale: 15})
    lat: number;

    @Column({nullable: false})
    heart_rate: number;

    @Column('timestamp', { nullable: false, default: () => 'CURRENT_TIMESTAMP'})
    updated_on: Date;   
}
