const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");

const app = express();

// ✅ Use Render's assigned port OR fallback to 5000 locally
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

const DATA_FILE = "bookings.json";

if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(DATA_FILE, "[]");
}

app.get("/bookings", (req, res) => {
  const data = JSON.parse(fs.readFileSync(DATA_FILE));
  res.json(data);
});

app.post("/bookings", (req, res) => {
  try {
    const booking = req.body;
    const data = JSON.parse(fs.readFileSync(DATA_FILE));
    data.push(booking);
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
    res.status(201).json({ message: "Booking saved successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Failed to save booking" });
  }
});

// ✅ Listen on the Render-assigned port
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});

