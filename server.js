const express = require("express");
const app = express();
const port = 1234;
const menu = [
  {
    id: "1",
    name: "com tam",
    price: 45000,
  },
  {
    id: "2",
    name: "bun bo",
    price: 65000,
  },
  {
    id: "3",
    name: "pho",
    price: 60000,
  },
];

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/menu", (req, res) => {
  res.json(menu);
});

app.get("/menu/add", (req, res) => {
  console.log("hello");

  const { name, price } = req.query;
  const newFood = {
    id: (menu.length + 1).toString(),
    name: name,
    price: price,
  };
  console.log(newFood);

  menu.push(newFood);
  res.send(menu);
});


app.get("/menu/search", (req, res) => {
  const { name } = req.query;
  if (!name) {
    return res.send("No search query");
  }
  return res.send(menu.filter((food) => food.name.toLowerCase().includes(name.toLowerCase())));
});

app.get("/menu/:id", (req, res) => {
  const { id } = req.params;
  if (!!menu.filter((food) => food.id === id)[0]) {
    return res.json(menu.filter((food) => food.id === id)[0])
  } else {
    return res.json("No matched food")
  }
  // res.json(menu.filter((food) => food.id === id)[0]); // todo: return a single object
});



app.get("/hello", (req, res) => {
  const { name } = req.query;

  if (!name) {
    return res.send("Hello world :D");
  }

  return res.send(`Hello ${name}!`);
});


// app.use((req, res, next) => {
//   console.log("Incoming request:", req.method, req.url);
//   next();
// });

// app.get("/menu/add", (req, res) => {
//   res.send("HELLO FROM ADD");
// });

// app.get("/menu/search", (req, res) => {
//   res.send("HELLO FROM SEARCH");
// });

app.get("/cal/:a/:b", (req, res) => {
  const { a, b } = req.params;
  const { op } = req.query;

  console.log(op);
  

  if (op === ' ') {
    return res.send(parseInt(a) + parseInt(b));
  } else if (op === '-') {
    return res.send(Number(a) - parseInt(b));
  } else if (op === '*') {
    return res.send(a*b);
  } else if (op === '/') {
    return res.send(a/b);
  } else {
    return res.send(`${op} is not a valid operator. Choose 1 from +-*/`)
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
