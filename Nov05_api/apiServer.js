const express = require("express");
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const YAML = require('yamljs');
const swaggerDocumentYAML = YAML.load('./swagger.yaml');
const path = require('path');


// const session = require("express-session");
// const cookieParser = require("cookie-parser");

const app = express();
const PORT = 1234;
const agentsRouter = require("./routes/agents");
const mapsRouter = require('./routes/maps');
const { router: weaponsRouter } = require('./routes/weapons');
const skinsRouter = require('./routes/skins');
// const en_US = [USAgents];
// const zh_TW = [CNAgents];
// const vi_VN = [VNAgents];

// const required_API_KEY = "secrethehe";
// app.use((req, res, next) => {
//   console.log(req.headers);

//   const APIKey = req.headers['valorant-api-key'];
//   console.log(APIKey);

//   if (!APIKey) {
//     res.status(401).json("Who r u??");
//   }
//   if (APIKey === required_API_KEY) {
//     next();
//   } else {
//     return res.status(403).send("U cannot access!!");
//   }
// });
// let data = [{}];

function languageSelect(req, res, next) {
  const { lang } = req.query;
  // if (!lang) {
  //   req.selectedLanguage = "en-US";
  // } else {
  //   req.selectedLanguage = lang;
  // }

  req.selectedLanguage = lang ?? "en-US";
  // console.log(req.selectedLanguage);
  
  next();
}

app.use(languageSelect);
// langData[0]['en-US']

// app.use(express.urlencoded());

// const secret = "1234";
// app.use(cookieParser(secret));

// app.use(
//   session({
//     secret: "Nuh uh",
//     resave: false,
//     saveUninitialized: true,
//     cookie: {
//       secure: false,
//       maxAge: 1000 * 60, // 5s
//     },
//   })
// );

// app.set("view engine", "ejs");
// app.set("views", "./templates");

// app.get("/api/v1/agents", (req, res) => {

// });
app.use(express.static(path.join(__dirname, 'static')));

app.use("/api/v1", agentsRouter);
app.use('/api/v1', mapsRouter);
app.use('/api/v1', skinsRouter);
app.use('/api/v1', weaponsRouter);

// app.use('/', swaggerUi.serve);
// app.get('/', swaggerUi.setup(swaggerDocument));

app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocumentYAML));
// app.get("/api/v1/agents/:agent", (req, res) => {});

app.listen(PORT, () => {
  console.log(`Example app listening on port http://localhost:${PORT}`);
});
