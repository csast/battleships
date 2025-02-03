import { ServerResponse } from "http";

//sorry for this, I was getting pretty annoyed to having to write 'content-type.....' on each request so just added it here
export const sendResponse = (res: ServerResponse, statusCode: number, data: object) => {
  res.writeHead(statusCode, { "Content-Type": "application/json" });
  res.end(JSON.stringify(data));
};