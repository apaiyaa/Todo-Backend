const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

let TODOS = [];

app.get("/", (req, res) => {
  res.json({ status: "success", data: TODOS, total: TODOS.length });
});

app.post("/", (req, res) => {
  const { title } = req.body;

  const data = { id: Date.now(), title };
  TODOS.push(data);
  res.json({ status: "success", data: TODOS, total: TODOS.length });
});

app.put("/:id", (req, res) => {
  const { id } = req.params;
  const { title, isComplete } = req.body;

  const updated = TODOS.map((todo) => {
    if (todo.id === id) {
      if (title) todo.title = title;
      if (isComplete) todo.isComplete = isComplete;
    }
  });

  TODOS = updated;

  res.json({ status: "success", data: TODOS, total: TODOS.length });
});

app.delete("/:id", (req, res) => {
  const { id } = req.params;

  const updated = TODOS.filter((todo) => todo.id !== id);

  TODOS = updated;
  res.json({ status: "success", data: TODOS, total: TODOS.length });
});

app.listen(4000, () => console.log("server running on http://localhost:4000/"));
