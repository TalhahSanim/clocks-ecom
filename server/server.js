import express from "express";
import morgan from "morgan";

const app = express();

const PORT = 3001;

const users = [
  { id: 1, name: "Daffy Duck", email: "daffy@looney.test", role: "member" },

  { id: 2, name: "Porky Pig", email: "porky@looney.test", role: "member" },

  { id: 3, name: "Bugs Bunny", email: "bugs@looney.test", role: "admin" },
];

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.get("/api/users", (req, res) => {
  const search = String(req.query.search ?? "").toLowerCase();
  const results = users.filter((user) =>
    user.name.toLowerCase().includes(search),
  );
  res.json(results);
});

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`),
);
