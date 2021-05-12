import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import { CardUser } from "./CardUser";
import { User } from "./User";

@ObjectType()
@Entity()
export class Card extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  image!: string;

  @Field()
  @Column()
  name!: string;

  @Field()
  @Column()
  value!: string;

  @Field()
  @Column()
  specialization!: string;

  @Field()
  @Column()
  description!: string;

  @Field(() => [User], {nullable: true})
  users: User[];
  
  @OneToMany(() => CardUser, cardUser => cardUser.card)
  cardUsers: CardUser[];

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
