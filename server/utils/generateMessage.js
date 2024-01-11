import moment from "moment";

export const generateMessage = (from, text) => {
  return {
    from,
    text,
    createdAt: moment().valueOf(),
  };
};

export const generateLocationMessage = (from, coords) => {
  return {
    from,
    url: `https://www.google.com/maps?q=${coords.lat},${coords.lng}`,
    createdAt: moment().valueOf(),
  };
};
