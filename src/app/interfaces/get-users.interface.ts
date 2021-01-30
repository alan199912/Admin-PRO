import { User } from "../models/user.model";

export interface getUser {
  totalRecord: number;
  users: User[];
}
