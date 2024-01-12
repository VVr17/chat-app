export class Users {
  constructor(name, room) {
    this.users = [];
  }

  addUser(id, name, room) {
    const user = { id, name, room };
    this.users.push(user);

    return user;
  }

  getUsersByRoom(room) {
    return this.users
      .filter((user) => user.room === room)
      .map((user) => user.name);
  }

  getUser(id) {
    return this.users.find((user) => user?.id === id);
  }

  removeUser(id) {
    const user = this.getUser(id);

    if (user) {
      this.users = this.users.filter((user) => user.id !== id);
    }

    return user;
  }
}
