import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class MedalsTotalEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  gold: number;

  @Column()
  silver: number;

  @Column()
  bronze: number;
}
