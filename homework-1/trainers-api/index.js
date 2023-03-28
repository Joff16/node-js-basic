import express from "express";
import {
  addTrainer,
  deleteAllTrainers,
  deleteTrainer,
  getAllTrainers,
  getTrainersById,
  updateTrainer,
} from "./trainers.js";

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "0.0.0.0";

const app = express();

app.use(express.json());

app.listen(PORT, HOST, () => {
  console.log(`Sever online at port ${PORT}`);
});

app.get("/trainers", async (req, res) => {
  try {
    const trainers = await getAllTrainers();
    return res.json(trainers);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error.message);
  }
});

app.get("/trainers/:id", async (req, res) => {
  try {
    const trainerId = req.params.id;
    const foundTrainer = await getTrainersById(trainerId);
    return res.json(foundTrainer);
  } catch (error) {
    console.log(error);
    return res.status(404).send(error.message);
  }
});

app.post("/trainers", async (req, res) => {
  try {
    const { firstName, lastName, email, timeEmployed, courseFinished } =
      req.body;
    if (!firstName || !lastName || !email || !timeEmployed || !courseFinished)
      throw new Error("Invalid trainer data");
    const newTrainer = await addTrainer(
      firstName,
      lastName,
      email,
      timeEmployed,
      courseFinished
    );
    return res.json(newTrainer);
  } catch (error) {
    console.log(error);
    return res.status(400).send(error.message);
  }
});
app.patch("/trainers/:id", async (req, res) => {
  try {
    const updateData = req.body;
    const trainerId = req.params.id;
    if (updateData.id) throw new Error("Invalid update");
    const updatedTrainer = await updateTrainer(trainerId, updateData);
    return res.json(updatedTrainer);
  } catch (error) {
    console.log(error);
    return res.status(400).send(error.message);
  }
});
app.delete("/trainers/all", async (req, res) => {
  try {
    await deleteAllTrainers();
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error.message);
  }
});
app.delete("/trainers/:id", async (req, res) => {
  try {
    const trainerId = req.params.id;
    await deleteTrainer(trainerId);
    return res.sendStatus(204);
  } catch (error) {
    console.log(error);
    return res.status(404).send(error.message);
  }
});
