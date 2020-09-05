import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  BeforeInsert,
} from 'typeorm';
import { hash } from 'argon2';

export type Roles = 'admin' | 'user';

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({
    unique: true,
    length: 100,
  })
  email!: string;

  @Column('varchar', {
    length: 30,
  })
  username!: string;

  @Column('varchar', {
    nullable: false,
    length: 200,
  })
  password!: string;

  @Column('boolean', {
    default: true,
  })
  isActive!: boolean;

  @Column('boolean', {
    default: false,
  })
  isConfirmed!: boolean;

  @Column('varchar')
  salt!: string;

  @Column('int', { default: 0 })
  tokenVersion: number;

  @Column()
  role: Roles;

  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: string;

  @BeforeInsert()
  async updateDates() {
    this.password = await hash(this.salt + this.password);
  }

  toJson() {
    const vals = Object.assign({}, this);
    const salty = vals.password + vals.salt;

    return { ...vals, salty };
  }
}
