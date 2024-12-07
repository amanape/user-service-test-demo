import { beforeEach, describe, expect, it } from "vitest";
import { UserService, type User } from "./user.service";

describe("UserService", () => {
  let service: UserService;

  beforeEach(() => {
    service = new UserService();
  });

  it("should create a user", () => {
    const expectedUser: User = {
      id: expect.any(String),
      username: "fulan",
      name: "Fulan al Fulani",
    };

    const user = service.create({ username: "fulan", name: "Fulan al Fulani" });
    expect(user).toEqual(expectedUser);
  });

  it("should retrieve a user by id", () => {
    const expectedUser: User = {
      id: expect.any(String),
      username: "fulan",
      name: "Fulan al Fulani",
    };

    const user = service.create({ username: "fulan", name: "Fulan al Fulani" });
    expect(service.retrieve(user.id)).toEqual(expectedUser);
  });

  it("should return null when retrieving a non-existent user", () => {
    expect(service.retrieve("non-existent-id")).toBeNull();
  });

  it("should update and return a user", () => {
    const expectedUser: User = {
      id: expect.any(String),
      username: "fulan",
      name: "John Doe",
    };

    const user = service.create({ username: "fulan", name: "Fulan al Fulani" });
    const updatedUser = service.update(user.id, { name: "John Doe" });

    expect(updatedUser).toEqual(expectedUser);
    expect(service.retrieve(user.id)).toEqual(expectedUser);
  });

  it("should return undefined when updating a non-existent user", () => {
    expect(
      service.update("non-existent-id", { name: "John Doe" })
    ).toBeUndefined();
  });

  it("should delete a user", () => {
    const user = service.create({ username: "fulan", name: "Fulan al Fulani" });
    service.delete(user.id);
    expect(service.retrieve(user.id)).toBeNull();
  });
});
