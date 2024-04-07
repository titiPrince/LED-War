import router from "./api.js";

import express from "express";
import path from "path";
const app = express();
const port = 3000;

import * as url from "url";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

app.use(express.json());
app.use("/api", router);

// const frontDirectory = path.resolve(new URL('.', import.meta.url).pathname, '../front');
//
// // Serve static files from the 'front' directory
// app.use('/style', express.static(frontDirectory));

app.get("/style", (req, res) => {
  res.sendFile(__dirname + "/front/style.css");
});
app.get("/reset", (req, res) => {
  res.sendFile(__dirname + "/front/reset.css");
});
app.get("/Screen.js", (req, res) => {
  res.sendFile(__dirname + "/front/Screen/screen.js");
});
app.get("/Grid.js", (req, res) => {
  res.sendFile(__dirname + "/Engine/grid.js");
});
app.get("/displayHistory.js", (req, res) => {
  res.sendFile(__dirname + "/front/displayHistory.js");
});

app.get("/fetch.js", (req, res) => {
  res.sendFile(__dirname + "/front/fetch.js");
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/front/index.html");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
