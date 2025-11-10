const express = require("express");
// const session = require("express-session");
// const cookieParser = require("cookie-parser");

const app = express();
const PORT = 1234;

const fs = require("fs");

// const en_US = [USAgents];
// const zh_TW = [CNAgents];
// const vi_VN = [VNAgents];
const langData = [
  {
    lang: "en-US",
    data: {
      agents: USAgents,
    },
  },
  {
    lang: "zh-TW",
    data: {
      agents: CNAgents,
    },
  },
  {
    lang: "vi-VN",
    data: {
      agents: VNAgents,
    },
  },
];

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
  if (!lang) {
    req.data = langData[0].data;
  } else {
    for (let i = 0; i < langData.length; i++) {
      if (lang === langData[i].lang) {
        req.data = langData[i].data;
      }
    }
  }
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

app.set("view engine", "ejs");
app.set("views", "./templates");

// app.get("/api/v1/agents", (req, res) => {
  
// });

app.get("/api/v1/agents/:agent", (req, res) => {
  
});

app.listen(PORT, () => {
  console.log(`Example app listening on port http://localhost:${PORT}`);
});
