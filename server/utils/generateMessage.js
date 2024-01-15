import moment from "moment";

/**
 * Generates a regular chat message object with sender name, message text, and timestamp.
 * 
 * @param {string} from - The name of the message sender.
 * @param {string} text - The content of the message.
 * @returns {Object} - The generated message object.
 */
export const generateMessage = (from, text) => {
  return {
    from,
    text,
    createdAt: moment().valueOf(),
  };
};

/**
 * Generates a location-based message object with sender name, coordinates, and timestamp.
 * 
 * @param {string} from - The name of the message sender.
 * @param {Object} coords - The object containing latitude and longitude coordinates.
 * @param {number} coords.lat - The latitude coordinate.
 * @param {number} coords.lng - The longitude coordinate.
 * @returns {Object} - The generated location message object.
 */
export const generateLocationMessage = (from, coords) => {
  return {
    from,
    url: `https://www.google.com/maps?q=${coords.lat},${coords.lng}`,
    createdAt: moment().valueOf(),
  };
};
