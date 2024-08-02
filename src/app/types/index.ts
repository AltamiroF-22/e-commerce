import { EComerceUser } from "@prisma/client";

export type SafeUser = Omit<EComerceUser , "createdAt | updatedAt"> & {
  createdAt: string;
  updatedAt: string
};
