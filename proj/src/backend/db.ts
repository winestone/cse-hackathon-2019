import {Entity, PrimaryGeneratedColumn, Column, Index, OneToMany, ManyToOne} from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  @Index({ unique: true })
  username!: string;

  @Column()
  password!: string;

  @Column()
  @Index({ unique: true })
  business_name!: string;

  @Column("double")
  latitude!: number;
  @Column("double")
  longitude!: number;

  @OneToMany(type => Food, food => food.user) // note: we will create author property in the Photo class below
  foods!: Food[];
}

@Entity()
export class Food {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  @Index({ unique: true })
  end_time!: Date;

  @Column()
  urgency!: string;

  @Column()
  description!: string;

  @Column()
  image!: string;

  @ManyToOne(type => User, user => user.foods)
  user!: User;
}
