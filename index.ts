import * as bodyParser from "body-parser";
import express from "express";
import engineRoutes from "./routes/EngineRoutes";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/game", engineRoutes);

app.get("/", (req, res) => {
  res.send("Jogo da Velha está rodando !");
});

app.listen(port, err => {
  if (err) {
    return console.error(err);
  }
  return console.log(`Servidor está rodando na porta ${port}`);
});
