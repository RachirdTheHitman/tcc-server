import { ObjectType } from "type-graphql";
import {
  BaseEntity,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";
import { Card } from "./Card";
import { User } from "./User";

@ObjectType()
@Entity()
export class CardUser extends BaseEntity {
  @PrimaryColumn()
  cardId!: number;

  @PrimaryColumn()
  userId!: number;

  @ManyToOne(() => User, (user) => user.cardUsers)
  @JoinColumn({ name: "userId" })
  user: User;

  @ManyToOne(() => Card, (card) => card.cardUsers)
  @JoinColumn({ name: "cardId" })
  card: Card;
}
