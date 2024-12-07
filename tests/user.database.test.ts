import { describe, expect, it, vi } from "vitest";
import { Database } from "bun:sqlite";
import { UserSQLiteDatabase } from "../src/user.database";

describe("UserSQLiteDatabase", () => {
  it("should instantiate a table if it doesn't exist", () => {
    vi.spyOn(Database.prototype, "exec");
    new UserSQLiteDatabase();
    expect(Database.prototype.exec).toHaveBeenCalledWith(
      "CREATE TABLE IF NOT EXISTS users (id TEXT PRIMARY KEY, username TEXT, name TEXT)"
    );
  });

  it("should insert the user and return true", () => {
    const user = { id: "1", username: "fulan", name: "Fulan al Fulani" };
    const db = new UserSQLiteDatabase();
    expect(db.insert(user)).toEqual(true);
  });

  it("should throw an error when inserting a user with the same id", () => {
    const user = { id: "1", username: "fulan", name: "Fulan al Fulani" };
    const db = new UserSQLiteDatabase();
    db.insert(user);
    expect(() => db.insert(user)).toThrow();
  });

  it("should find the user by id", () => {
    const user = { id: "1", username: "fulan", name: "Fulan al Fulani" };
    const db = new UserSQLiteDatabase();
    db.insert(user);
    expect(db.findById(user.id)).toEqual(user);
  });

  it("should return null when user is not found", () => {
    const db = new UserSQLiteDatabase();
    expect(db.findById("non-existent-id")).toBeNull();
  });

  it("should update the user by id", () => {
    const user = { id: "1", username: "fulan", name: "Fulan al Fulani" };
    const db = new UserSQLiteDatabase();
    db.insert(user);
    const newUser = db.update(user.id, {
      username: "johndoe",
      name: "John Doe",
    });

    expect(newUser).toEqual({
      ...user,
      username: "johndoe",
      name: "John Doe",
    });
  });

  it("should throw an error when updating a non-existent user", () => {
    const db = new UserSQLiteDatabase();
    expect(() => db.update("non-existent-id", { name: "John Doe" })).toThrow();
  });

  it("should delete the user by id", () => {
    const user = { id: "1", username: "fulan", name: "Fulan al Fulani" };
    const db = new UserSQLiteDatabase();
    db.insert(user);
    const success = db.delete(user.id);

    expect(success).toEqual(true);
    expect(db.findById(user.id)).toBeNull();
  });
});
