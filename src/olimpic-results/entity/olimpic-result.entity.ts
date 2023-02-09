import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

import { MedalsTotalEntity } from './medals-total.entity';

@Entity()
export class OlimpicResultEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    unique: true,
  })
  country!: string;

  @Column()
  image!: string;

  @Column()
  medalsOverall!: number;

  @OneToOne(() => MedalsTotalEntity, {
    eager: true,
    onDelete: 'CASCADE',
    cascade: true,
  })
  @JoinColumn()
  medals!: MedalsTotalEntity;
}
