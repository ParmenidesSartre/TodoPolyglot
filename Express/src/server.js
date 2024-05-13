// server.js
const dotenv = require("dotenv");
dotenv.config({ path: "./src/.env" });

const app = require("./app");

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
