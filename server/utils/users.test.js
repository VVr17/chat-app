import { expect } from "expect";
import { Users } from "./users.js";

describe("Users", () => {
  let users;

  beforeEach(() => {
    users = new Users();
    users.users = [
      {
        id: "1",
        name: "Mike",
        room: "Node",
      },
      {
        id: "2",
        name: "Sam",
        room: "HTML",
      },
      {
        id: "3",
        name: "John",
        room: "Node",
      },
    ];
  });

  it("Should add new user", () => {
    const users = new Users();
    const newUser = {
      id: "4",
      name: "Full Name",
      room: "Room name",
    };

    users.addUser(newUser.id, newUser.name, newUser.room);
    expect(users.users).toEqual([newUser]);
  });

  it("Should return names for specified 'Nodejs' room ", () => {
    const filteredUsers = users.getUsersByRoom("Nodejs");
    expect(filteredUsers).toEqual(["Mike", "John"]);
  });

  it("Should return names for specified 'HTML' room ", () => {
    const filteredUsers = users.getUsersByRoom("HTML");
    expect(filteredUsers).toEqual(["Sam"]);
  });

  it("Should find user by id", () => {
    const userId = "2";
    const user = users.getUser(userId);

    expect(user.id).toEqual(userId);
  });

  it("Should not find user by id", () => {
    const userId = "2000";
    const user = users.getUser(userId);

    expect(user).toBeUndefined();
  });

  it("Should remove a user by id", () => {
    const userId = "1";

    const user = users.removeUser(userId);

    expect(user.id).toEqual(userId);
    expect(users.users.length).toBe(2);
  });

  it("Should not remove a user", () => {
    const userId = "1000";

    const user = users.removeUser(userId);

    expect(user).toBeUndefined();
    expect(users.users.length).toBe(3);
  });
});
