import { MyContext } from "src/types";
import {
  Arg,
  Ctx,
  Field,
  FieldResolver,
  Int,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  Root,
  UseMiddleware,
} from "type-graphql";
import { getConnection } from "typeorm";
import { Card } from "../entities/Card";
import { CardUser } from "../entities/CardUser";
import { User } from "../entities/User";
import { isAuth } from "../middleware/isAuth";
import dayjs from "dayjs";

@ObjectType()
class PaginatedCards {
  @Field(() => [Card])
  cards: Card[];
  @Field()
  hasMore: boolean;
}

@Resolver(Card)
export class CardResolver {
  @FieldResolver(() => [User])
  async users(@Root() card: Card, @Ctx() { usersLoader }: MyContext) {
    return usersLoader.load(card.id);
  }

  @Query(() => PaginatedCards)
  async cards(
    @Arg("limit", () => Int) limit: number,
    @Arg("cursor", () => String, { nullable: true }) cursor: string | null
  ): Promise<PaginatedCards> {
    const realLimit = Math.min(50, limit);
    const realLimitPlusOne = realLimit + 1;

    const replacements: any[] = [realLimitPlusOne];

    if (cursor) {
      replacements.push(new Date(parseInt(cursor)));
    }

    const cards = await getConnection().query(
      `
    select c.*
    from card c
    ${cursor ? `where c."createdAt" < $2` : ""}
    order by c."createdAt" DESC
    limit $1
    `,
      replacements
    );

    return {
      cards: cards.slice(0, realLimit),
      hasMore: cards.length === realLimitPlusOne,
    };
  }

  @Query(() => Card, { nullable: true })
  card(@Arg("id", () => Int) id: number): Promise<Card | undefined> {
    return Card.findOne(id);
  }

  @Mutation(() => Boolean, { nullable: true })
  @UseMiddleware(isAuth)
  async buyCard(
    @Arg("id", () => Int) id: number,
    @Ctx() { req }: MyContext
  ): Promise<Boolean> {
    const card = await Card.findOne({ id });
    const userID = req.session.userID;
    const valueToCoinMap: Record<string, number> = {
      common: 20,
      rare: 30,
      epic: 40,
      legendary: 50,
      hard: 60,
    };

    const cardUser = await CardUser.findOne({ where: { cardId: id, userId: userID } });
    if (cardUser) {
      return false;
    } else {
      await getConnection().transaction(async (tm) => {
        await tm.query(
          `
        insert into card_user("cardId", "userId")
        values ($1, $2)
        `,
          [id, userID]
        );
  
        await tm.query(
          `
          update "user"
          set coin = coin - $1
          where id = $2
          `,
          [valueToCoinMap[card!.value], userID]
        );
      });

      return true;
    }
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async sellCard(
    @Arg("id", () => Int) id: number,
    @Ctx() { req }: MyContext
  ): Promise<Boolean> {
    const card = await Card.findOne({ id });
    const userID = req.session.userID;
    const valueToCoinMap: Record<string, number> = {
      common: 10,
      rare: 20,
      epic: 30,
      legendary: 40,
      hard: 50,
    };

    await getConnection().transaction(async (tm) => {
      await tm.query(
        `
        delete from card_user
        where "cardId" = $1 and "userId" = $2
      `,
        [id, userID]
      );

      await tm.query(
        `
        update "user"
        set coin = coin + $1
        where id = $2
        `,
        [valueToCoinMap[card!.value], userID]
      );
    });
    return true;
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async returnCard(
    @Arg("id", () => Int) id: number,
    @Ctx() { req }: MyContext
  ): Promise<Boolean> {
    const card = await Card.findOne({ id });
    const ft = dayjs(card?.createdAt);
    const tt = dayjs();
    const daysPast = tt.diff(ft, "day");

    if (daysPast >= 60) {
      return false;
    }

    const userID = req.session.userID;
    const valueToCoinMap: Record<string, number> = {
      common: 20,
      rare: 30,
      epic: 40,
      legendary: 50,
      hard: 60,
    };

    await getConnection().transaction(async (tm) => {
      await tm.query(
        `
        delete from card_user
        where "cardId" = $1 and "userId" = $2
      `,
        [id, userID]
      );

      await tm.query(
        `
        update "user"
        set coin = coin + $1
        where id = $2
        `,
        [valueToCoinMap[card!.value], userID]
      );
    });
    return true;
  }
}
