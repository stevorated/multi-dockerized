import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity('values')
export class Value extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: string;

    @Column('int', { width: 11 })
    number!: string;
}
