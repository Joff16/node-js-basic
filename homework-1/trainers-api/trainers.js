import path from "node:path";
import { v4 as uuid } from "uuid";
import { fileURLToPath } from "node:url";
import { DataService } from "./services/data.service.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const trainerPath = path.join(__dirname, "data", "trainers.json");

const saveTrainers = async (trainers) => {
  await DataService.saveJSONFile(trainerPath, trainers);
};

export const getAllTrainers = async () => {
  const trainers = await DataService.readJSONFile(trainerPath);
  return trainers;
};

export const getTrainersById = async (trainerId) => {
  const trainers = await getAllTrainers();
  const foundTrainer = trainers.find((trainer) => trainer.id === trainerId);
  if (!foundTrainer) throw new Error("Trainer not found");
  return foundTrainer;
};

export const addTrainer = async (
  firstName,
  lastName,
  email,
  timeEmployed,
  courseFinished
) => {
  const trainers = await getAllTrainers();
  const trainer = {
    id: uuid(),
    firstName,
    lastName,
    email,
    isCurrentlyTeaching: false,
    timeEmployed,
    courseFinished,
  };
  const updatedTrainers = [...trainers, trainer];
  await saveTrainers(updatedTrainers);
  return trainer;
};
export const updateTrainer = async (trainerId, updateData) => {
  const trainers = await getAllTrainers();
  const foundTrainer = await getTrainersById(trainerId);
  const updatedTrainer = {
    ...foundTrainer,
    ...updateData,
  };
  const updatedTrainers = trainers.map((trainer) =>
    trainer.id ? updatedTrainer : trainer
  );
  await saveTrainers(updatedTrainers);
  return updatedTrainer;
};
export const deleteTrainer = async (trainerId) => {
  const trainers = await getAllTrainers();
  const updatedTrainers = trainers.filter(
    (trainer) => trainer.id !== trainerId
  );
  if (updatedTrainers.length === trainers.length)
    throw new Error("Trainer not found");
  await saveTrainers(updatedTrainers);
};
export const deleteAllTrainers = async () => {
  await saveTrainers([]);
};
