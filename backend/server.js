const express = require("express");
const cors = require("cors");
const connectDB = require("./models/mongoConnection");

const app = express();

const tasksRouter = require("./routers/tasksRouter");
// const Tasks = require("./models/Tasks");

app.use(express.json());
app.use(cors());

connectDB();

app.use("/api", tasksRouter);
// app.get("/delete", async (req, res) => {
//   try {
//     const result = await Tasks.deleteMany();
//     res.json({
//       message: "All tasks deleted successfully",
//       deletedCount: result.deletedCount,
//     });
//   } catch (error) {
//     console.error("Error deleting tasks:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// });

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
