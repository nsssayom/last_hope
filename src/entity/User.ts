import {Entity, PrimaryGeneratedColumn, Column, OneToMany, Index} from "typeorm";
import {Device} from './Device'

@Entity()
export class User {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({nullable: false})
    id_type: number;
    
    @Column({nullable: false})
    @Index({ unique: true })
    id_number: string;

    @Column({nullable: false})
    name: string;

    @Column()
    @Index({ unique: true })
    email: string;

    @Column({nullable: false})
    @Index({ unique: true })
    phone: string;
    
    @Column({nullable: false})
    user_level: number;

    @OneToMany(()=>Device, device => device.user)
    devices: Device[];
}
