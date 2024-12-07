import { Database } from "bun:sqlite";
import type { User } from "./user.service";

export class UserSQLiteDatabase {
  private db: Database;

  constructor() {
    this.db = new Database(":memory:");
    this.db.exec(
      "CREATE TABLE IF NOT EXISTS users (id TEXT PRIMARY KEY, username TEXT, name TEXT)"
    );
  }

  insert(user: User): boolean {
    this.db
      .prepare("INSERT INTO users (id, username, name) VALUES (?, ?, ?)")
      .run(user.id, user.username, user.name);

    return true;
  }

  findById(id: User["id"]): User | null {
    return this.db
      .prepare("SELECT * FROM users WHERE id = ?")
      .get(id) as User | null;
  }

  update(id: User["id"], user: Partial<Omit<User, "id">>): User {
    const existingUser = this.findById(id);

    if (!existingUser) {
      throw new Error("User not found");
    }

    const username = user.username ?? existingUser.username;
    const name = user.name ?? existingUser.name;

    this.db
      .prepare("UPDATE users SET username = ?, name = ? WHERE id = ?")
      .run(username, name, id);

    return { id, username, name };
  }

  delete(id: User["id"]): boolean {
    this.db.prepare("DELETE FROM users WHERE id = ?").run(id);
    return true;
  }
}
