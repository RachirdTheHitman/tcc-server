import DataLoader from "dataloader";
import { CardUser } from "../entities/CardUser";
import { In } from "typeorm";
import { User } from "../entities/User";

const batchUsers = async (cardIds: any) => {
  const cardUsers = await CardUser.find({
    join: {
      alias: "cardUser",
      innerJoinAndSelect: {
        user: "cardUser.user",
      },
    },
    where: {
      cardId: In(cardIds as number[]),
    },
  });

  const cardIdtoUsers: Record<number, User[]> = {};

  cardUsers.forEach((cu) => {
    if (cu.cardId in cardIdtoUsers) {
      cardIdtoUsers[cu.cardId].push(cu.user);
    } else {
      cardIdtoUsers[cu.cardId] = [cu.user];
    }
  });

  const result = cardIds.map((cardId: number) => cardIdtoUsers[cardId]);
  return result;
};

export const createUsersLoader = () =>
  new DataLoader<number, User[][]>(batchUsers);
