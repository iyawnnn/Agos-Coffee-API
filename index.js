// index.js
const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static frontend from /public
app.use(express.static(path.join(__dirname, "public")));

// Simple API: GET /api/products
app.get("/api/products", (req, res) => {
  const search = (req.query.search || "").toLowerCase();

  // ✅ Correct path to products.json
  const filePath = path.join(__dirname, "data", "products.json");

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Failed to read products.json:", err);
      return res.status(500).json({ error: "Failed to load products" });
    }

    let products;
    try {
      products = JSON.parse(data);
    } catch (parseErr) {
      console.error("Invalid JSON in products.json:", parseErr);
      return res.status(500).json({ error: "Invalid products file" });
    }

    // Optional search filter
    if (search) {
      products = products.filter((p) => {
        const hay = `${p.name} ${p.desc || ""} ${p.category || ""}`.toLowerCase();
        return hay.includes(search);
      });
    }

    res.json(products);
  });
});

// Route root (/) → index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
