import http from "node:http";
import db from "./database/db.json";

const PORT = 8080;

const server = http.createServer((request, response) => {  //{path: "/user/1"} en el server
  const { url, method } = request;
  switch (url) {
    case "/api":
      response.statusCode = 200;
      response.setHeader("Content-Type", "application/json");
      response.end(JSON.stringify(db.description));
      break;
    case "/students":
      response.statusCode = 200;
      response.setHeader("Content-Type", "application/json");
      response.end(JSON.stringify(db.students));
      break;
    case "/teachers":
      response.statusCode = 200;
      response.setHeader("Content-Type", "application/json");
      response.end(JSON.stringify(db.teachers));
      break;
    default:
      response.statusCode = 400;
      response.end("Invalid URL");
      break;
  }
});

server.listen(PORT, () => {
  console.log("Server listening on port: " + PORT);
});
