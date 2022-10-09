require("dotenv").config();
const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

let TODOS = [
  {
    id: 123,
    title: "test",
    isComplete: false,
  },
];

app.get("/", (req, res) => {
  res.json({ status: "success", data: TODOS, total: TODOS.length });
});

app.post("/", (req, res) => {
  const { title } = req.body;

  const data = { id: Date.now(), title, isComplete: false };
  TODOS.push(data);
  res.json({ status: "success", data, total: TODOS.length });
});

app.put("/:id", (req, res) => {
  const { id } = req.params;
  const { title, isComplete } = req.body;

  const updated = TODOS.map((todo) => {
    console.log("ada", todo.id == id, todo.id, id);
    if (todo.id == id) {
      console.log("masuk", todo);
      if (title) todo.title = title;
      if (isComplete) todo.isComplete = isComplete;
    }
    return todo;
  });

  TODOS = updated;

  res.json({ status: "success", data: TODOS, total: TODOS.length });
});

app.delete("/:id", (req, res) => {
  const { id } = req.params;

  const updated = TODOS.filter((todo) => todo.id != id);

  TODOS = updated;
  res.json({ status: "success", data: {}, total: TODOS.length });
});

const port = process.env.PORT || 4000;
app.listen(port, () =>
  console.log(`server running on http://localhost:${port}/`)
);
