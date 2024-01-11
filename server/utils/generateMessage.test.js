import { expect } from "expect";
import { generateLocationMessage, generateMessage } from "./generateMessage.js";

describe("Generate Message", () => {
  it("Should generate correct message object", () => {
    const from = "User Name";
    const text = "Some random text";
    const message = generateMessage(from, text);

    expect(typeof message.createdAt).toBe("number");
    expect(message).toMatchObject({ from, text });
  });
});

describe("Generate Location Message", () => {
  it("Should generate correct location message object", () => {
    const from = "User Name";
    const lat = 51.0;
    const lng = 50.0;
    const url = `https://www.google.com/maps?q=${lat},${lng}`;

    const message = generateLocationMessage(from, { lat, lng });

    expect(typeof message.createdAt).toBe("number");
    expect(message.url).toEqual(url);
    expect(message).toMatchObject({ from, url });
  });
});
