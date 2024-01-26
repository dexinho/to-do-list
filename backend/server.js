const express = require("express");
const cors = require("cors");
const connectDB = require("./models/mongoConnection");

const app = express();

const tasksRouter = require("./routers/tasksRouter");

app.use(express.json());
app.use(cors());

connectDB();

app.use("/api", tasksRouter);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
