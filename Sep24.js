const express = require("express");
const app = express();
const port = 4321;
const secretKey = 'qwerty';
const usernames = ['duy', 'hehe', 'huhu'];
let champs = [
  {
    champ: "Aatrox",
  },
  {
    champ: "Pyke",
  },
  {
    champ: "Sett",
  },
];

app.use(express.json());
app.use(express.urlencoded());

function reqLog(req, res, next) {
  const time = new Date().toUTCString();
  console.log(`${time} Received a ${req.method} request at http://localhost:${port}${req.url}`);
  next()
}

function loggedInRequired(req, res, next) {
  const { authentication } = req.headers;
  console.log(req.headers);
  
  console.log(authentication);
  
  if (authentication !== secretKey) {
    return next("Authentication did not match the key")
  }
  next()
}

function isAuthor(req, res, next) {
  const { username } = req.headers;
  console.log(username);
  
  if (!usernames.includes(username)) {
    return next("U are not the author")
  }
  next()
}

app.use(reqLog);

app.get("/champs", (req, res) => {
  return res.json(champs);
});

app.post("/champs", loggedInRequired, (req, res) => {
  const { newChamp } = req.body;
  champs = [...champs, { champ: newChamp }];
  // champs.push(newChamp);
  return res.json(champs);
});

app.put("/champs", loggedInRequired, isAuthor, (req, res) => {
  const { oldChamp, newChamp } = req.body;
  console.log(oldChamp, newChamp);

  // const i = champs.indexOf(oldChamp);
  const i = champs.findIndex((champ) => champ.champ === oldChamp);

  champs[i] = { champ: newChamp };
  return res.json(champs);
});

app.delete("/champs", loggedInRequired, isAuthor, (req, res) => {
  // console.log(req.body);

  const { dlChamp } = req.body;
  // console.log(dlChamp);
  // console.log(champs.filter((champ) => champ.champ !== dlChamp));

  champs = champs.filter((champ) => champ.champ !== dlChamp);
  return res.json(champs);
});

app.use((req, res) => {
  res.status(404).send("404 not found");
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
