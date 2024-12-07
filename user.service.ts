import { v4 as uuid } from "uuid";

export interface User {
  id: string;
  username: string;
  name: string;
}

export class UserService {
  private users: Map<string, User> = new Map();

  create(user: Omit<User, "id">): User {
    const newUser: User = { id: uuid(), ...user };
    this.users.set(newUser.id, newUser);

    return newUser;
  }

  retrieve(id: User["id"]): User | null {
    return this.users.get(id) ?? null;
  }

  update(id: User["id"], user: Partial<Omit<User, "id">>) {
    const existingUser = this.users.get(id);
    if (existingUser) {
      const updatedUser = { ...existingUser, ...user };
      this.users.set(id, updatedUser);
      return updatedUser;
    }
  }

  delete(id: User["id"]) {
    this.users.delete(id);
  }
}
