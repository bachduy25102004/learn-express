const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = 1234;

const accounts = [
  {
    username: "duy",
    password: "123abc",
  },
  {
    username: "hoang",
    password: "zesty",
  },
  {
    username: "unknown",
    password: "qwerty",
  },
];

app.use(express.urlencoded());

const secret = "1234";
app.use(cookieParser(secret));

app.use(
  session({
    secret: "Nuh uh",
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,
      maxAge: 1000 * 60 , // 5s
    },
  })
);

app.set("view engine", "ejs");
app.set("views", "./templates");

app.get("/", (req, res) => {
  //   res.cookie('Username', 'ME', { signed: true });
  //   console.log(req.signedCookies);

  if (!req.session.isLoggedIn) {
    return res.render("Nov04_index.ejs");
  } else {
    return res.render("Nov05_template.ejs");
  }
});

app.post("/", (req, res) => {
  const { usr, psw } = req.body;
  console.log(usr);
  console.log(psw);

  accounts.forEach((account) => {
    if (usr.toLowerCase() === account.username && psw === account.password) {
      req.session.isLoggedIn = true;
      return res.redirect("/");
    }
  });
  // return res.redirect("/");
});

app.post("/logout", (req, res, next) => {
  req.session.destroy((err) => {
    if (err) return next(err);
    res.clearCookie("connect.sid");
    res.redirect("/");
  });
});

app.listen(PORT, () => {
  console.log(`Example app listening on port http://localhost:${PORT}`);
});
