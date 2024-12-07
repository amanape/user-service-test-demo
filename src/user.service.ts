import { v4 as uuid } from "uuid";
import { UserSQLiteDatabase } from "./user.database";

export interface User {
  id: string;
  username: string;
  name: string;
}

export class UserService {
  private db = new UserSQLiteDatabase();

  create(user: Omit<User, "id">): User {
    const newUser: User = { id: uuid(), ...user };
    this.db.insert(newUser);

    return newUser;
  }

  retrieve(id: User["id"]): User | null {
    return this.db.findById(id);
  }

  update(id: User["id"], user: Partial<Omit<User, "id">>) {
    const updatedUser = this.db.update(id, user);
    return updatedUser;
  }

  delete(id: User["id"]) {
    this.db.delete(id);
  }
}
