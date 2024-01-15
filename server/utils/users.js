/**
 * Represents a collection of users in a chat application.
 */
export class Users {
  /**
   * Initializes a new instance of the Users class.
   * 
   * @param {string} name - The name of the user.
   * @param {string} room - The room in which the user is present.
   */
  constructor(name, room) {
    this.users = []; // Initialize an empty array to store user information
  }

  /**
   * Adds a new user to the collection.
   * 
   * @param {string} id - The unique identifier of the user.
   * @param {string} name - The name of the user.
   * @param {string} room - The room in which the user is present.
   * @returns {Object} - Returns the added user object.
   */
  addUser(id, name, room) {
    const user = { id, name, room };
    this.users.push(user);

    return user;
  }

  /**
   * Retrieves an array of user names belonging to a specific room.
   * 
   * @param {string} room - The room for which user names are to be retrieved.
   * @returns {string[]} - An array of user names in the specified room.
   */
  getUsersByRoom(room) {
    return this.users
      .filter((user) => user.room === room)
      .map((user) => user.name);
  }

    /**
   * Retrieves a user object based on their unique identifier.
   * 
   * @param {string} id - The unique identifier of the user.
   * @returns {Object|undefined} - Returns the user object if found, otherwise undefined.
   */
  getUserById(id) {
    return this.users.find((user) => user?.id === id);
  }

   /**
   * Removes a user from the collection based on their unique identifier.
   * 
   * @param {string} id - The unique identifier of the user to be removed.
   * @returns {Object|undefined} - Returns the removed user object if found, otherwise undefined.
   */
  removeUser(id) {
    const user = this.getUserById(id);

    if (user) {
      this.users = this.users.filter((user) => user.id !== id);
    }

    return user;
  }
}
