import http from "node:http";
import db from "./database/db.json";
import fs from "node:fs"

const PORT = 8080;

const server = http.createServer((request, response) => {
  //{path: "/user/1"} en el server
  const { url, method } = request;

  //METHODS:
  //GET -> Lectura
  //POST -> Escritura
  //DELETE -> Eliminacion
  //PATCH -> Modificación (SOLAMENTE MODIFICA si el recurso EXISTE, sino no hace nada)
  //PUT -> Modificación (si no existe lo que quiero modificar lo crea)

  if (method == "GET") {
    switch (url) {
      case "/api":
        response.statusCode = 200;
        response.setHeader("Content-Type", "application/json");
        response.end(JSON.stringify(db.description));
        break;
      case "/api/students":
        response.statusCode = 200;
        response.setHeader("Content-Type", "application/json");
        response.end(JSON.stringify(db.students));
        break;
      case "/api/teachers":
        response.statusCode = 200;
        response.setHeader("Content-Type", "application/json");
        response.end(JSON.stringify(db.teachers));
        break;
      default:
        response.statusCode = 400;
        response.end("Invalid URL");
        break;
    }
  } else if (method == "POST") {
    let body = "";
    switch (url) {
      case "/api/students":
        request.on("data", (datagrama) => { //----> o chunk en ingles
          body += datagrama.toString()
        });

        request.on("end", ()=>{
          const data = JSON.parse(body)
          db.students.push(data)

          fs.writeFileSync("./src/database/db.json", JSON.stringify(db))

          response.statusCode = 201
          response.end("Resource created: " + body)                 
        })
        break;

      default:
        response.statusCode = 404;
        response.end("Resource not found");
        break;
    }
  }
});

// ESTO SERÍA LO MISMO QUE USAR POSTMAN
// fetch("http://localhost:8080/api/students", { 
//   method: "POST",
//   body: JSON.stringify({name: "Patricia", age: 55})
// })

server.listen(PORT, () => {
  console.log("Server listening on port: " + PORT);
});
