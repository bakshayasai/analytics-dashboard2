const express = require("express");
const cors = require("cors");
const pool = require("./db");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("Analytics Dashboard Backend is Running!");
});

// Get analytics data
app.get("/analytics", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM analytics");
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
app.post("/analytics", async (req, res) => {
  try {
    const { month, users_count, revenue, orders_count, growth } = req.body;

    await pool.query(
      `INSERT INTO analytics (month, users_count, revenue, orders_count, growth)
       VALUES ($1, $2, $3, $4, $5)`,
      [month, users_count, revenue, orders_count, growth]
    );

    res.send("Record Added Successfully");
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});