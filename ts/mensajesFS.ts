import * as fs from "fs";

export const mensajesFS = (() => {
  const messages: Array<string> = [];
  fs.readFile("./messages.txt", "utf8", (error, content: string) => {
    if (error) {
      console.error("Hubo un error con fs.readFile de msj!");
    } else {
      const savedMessages = JSON.parse(content);
      savedMessages.forEach((message: string) => {
        messages.push(message);
      });
    }
  });
  return messages;
})();

export const saveMessages = (messages: Array<string>) => {
  try {
    fs.writeFileSync("./messages.txt", JSON.stringify(messages, null, "\t"));
  } catch (error) {
    console.log("Hubo un error");
  }
};
