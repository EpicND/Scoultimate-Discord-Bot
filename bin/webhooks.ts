import express from "express";

export const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "No endpoint" });
});

app.post("/webhooks/new", (req, res) => {
  console.log(req.body);

  res.status(200).json({ message: "success" });
});

export const PORT = process.env.PORT || 8080;
