const express = require("express");
// const session = require("express-session");
const cookieParser = require("cookie-parser");
const app = express();
const PORT = 1234;
const todos = [];
const secret = '1234';
app.use(express.urlencoded());
app.use(cookieParser(secret));

app.set("view engine", "ejs");
app.set("views", "./templates");

app.get("/", (req, res) => {
  res.cookie('Username', 'ME', { signed: true });
  console.log(req.signedCookies);
  
  res.render("Oct20_template", {
    todos: todos,
  });
});

app.post("/add", (req, res) => {
  console.log(req.body);
  const { textInput } = req.body;
  const todo = {
    id: crypto.randomUUID(),
    content: textInput,
    date: new Date(),
    isCompleted: false,
  };
  todos.push(todo);
  res.redirect("/");
});

app.get("/check/:id", (req, res) => {
  // console.log(req.params);
  const { id } = req.params;

  console.log("id:", id);

  todos.forEach((todo) => {
    if (todo.id === id) {
      console.log("changing", todo.content);

      todo.isCompleted = !todo.isCompleted;
    }
  });

  console.log(todos);

  res.redirect("/");
});

app.get("/sort/name", (req, res) => {
  const { order } = req.query;
  if (order === "desc") {
    todos.sort((a, b) => a.content.localeCompare(b.content));
  } else if (order === "asc") {
    todos.sort((a, b) => b.content.localeCompare(a.content));
  }
  res.redirect("/");
});

app.get("/sort/date", (req, res) => {
  const { order } = req.query;
  if (order === "desc") {
    todos.sort((a, b) => a.date - b.date);
  } else if (order === "asc") {
    todos.sort((a, b) => b.date - a.date);
  }
  res.redirect("/");
});

app.get("/sort/isCompleted", (req, res) => {
  const { order } = req.query;
  if (order === "desc") {
    todos.sort((a, b) => b.isCompleted - a.isCompleted);
  } else if (order === "asc") {
    todos.sort((a, b) => a.isCompleted - b.isCompleted);
  }
  res.redirect("/");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port http://localhost:${PORT}`);
});
