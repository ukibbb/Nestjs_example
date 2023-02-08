import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class MedalsTotalModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  gold: number;

  @Column()
  silver: number;

  @Column()
  bronze: number;
}

@Entity()
export class OlimpicResultModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  country: string;

  @Column()
  image: string;

  @Column()
  medalsOverall: number;

  @OneToOne(() => MedalsTotalModel, { onDelete: 'CASCADE' })
  @JoinColumn()
  medals: MedalsTotalModel;
}
