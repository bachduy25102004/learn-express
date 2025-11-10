// import cors from 'cors';
// import fs from 'fs';

const express = require("express");
const fs = require("fs");
const cors = require("cors");


// const cors = require("cors");
const app = express();
const port = 1234;

app.use(cors());

const filePath = fs.readFileSync("./pokemon.json", "utf8")
const pokemons = JSON.parse(filePath);


app.get("/pokemon", (req, res) => {
    try {
        
        return res.json(pokemons);
    } catch (e) {
        res.send(e);
    }
})

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});