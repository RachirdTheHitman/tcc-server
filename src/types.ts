import { Request, Response } from "express";
import { Session, SessionData } from "express-session";
import { Redis } from "ioredis";
import { createUsersLoader } from "./utils/createUsersLoader";

export type MyContext = {
  req: Request & {
    session: Session & Partial<SessionData> & { userID: number };
  };
  redis: Redis;
  res: Response;
  usersLoader: ReturnType<typeof createUsersLoader>;
};

export enum Values{
  Common,
  Rare,
  Epic,
  Legendary,
  Hard
}
