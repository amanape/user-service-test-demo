import { UserService } from "./src/user.service";

const service = new UserService();

const { id } = service.create({ username: "fulan", name: "Fulan al Fulani" });
const user = service.retrieve(id);

console.log("NEW USER\n" + JSON.stringify(user, null, 2) + "\n");

service.update(id, { name: "John Doe" });
const updatedUser = service.retrieve(id);

console.log("UPDATED USER\n" + JSON.stringify(updatedUser, null, 2) + "\n");

service.delete(id);
const deletedUser = service.retrieve(id);

console.log("DELETED USER\n" + JSON.stringify(deletedUser, null, 2) + "\n");
