import {Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne} from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Index({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column()
  @Index({ unique: true })
  business_name: string;

  @Column("Decimal(9,6)")
  latitude: number;
  @Column("Decimal(9,6)")
  longitude: number;

  @OneToMany(type => Food, food => food.user_id) // note: we will create author property in the Photo class below
  foods: Food[];
}

@Entity()
export class Food {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Index({ unique: true })
  start_time: Date;

  @Column()
  description: string;

  @Column()
  image: string;

  @ManyToOne(type => User, user => user.foods)
  user: User;
}
