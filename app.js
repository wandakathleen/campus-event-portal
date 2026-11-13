const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = 3000;

// Middleware to parse JSON data and serve the frontend files
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// POST route to receive registration data and save it to the file
app.post("/register", (req, res) => {
  console.log("New registration received:", req.body);

  // Read the existing saved registrations
  const registrations = JSON.parse(
    fs.readFileSync("registrations.json", "utf8"),
  );

  // Add the new submission to the list
  registrations.push(req.body);

  // Save the updated list back to the file
  fs.writeFileSync(
    "registrations.json",
    JSON.stringify(registrations, null, 2),
  );

  // Send a success response back to the frontend
  res.json({ message: "Registration saved successfully!" });
});

// Start the server
app.listen(PORT, () => {
  console.log(
    `Campus Event Portal backend running on http://localhost:${PORT}`,
  );
});
