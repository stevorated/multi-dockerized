import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

export type Action = 'signup' | 'signin' | 'refresh' | 'signout';

@Entity('logs')
export class Log extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('varchar')
  userId!: string;

  @Column('varchar')
  ip!: string;

  @Column('varchar')
  refreshToken!: string;

  @Column('varchar')
  action: Action;

  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: string;
}
