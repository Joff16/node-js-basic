import path from "node:path";
import { v4 as uuid } from "uuid";
import { fileURLToPath } from "node:url";
import { DataService } from "../services/data.service.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const trainersPath = path.join(__dirname, "..", "data", "trainers.json");

export class TrainertModel {
  static async saveTrainers(trainers) {
    await DataService.saveJSONFile(trainersPath, trainers);
  }

  static async getAllTrainers() {
    const trainers = await DataService.readJSONFile(trainersPath);

    return trainers;
  }

  static async getTrainersById(trainerId) {
    const trainers = await this.getAllTrainers();

    const foundTrainer = trainers.find((trainer) => trainer.id === trainerId);

    if (!foundTrainer) throw new Error("Trainer not Found");

    return foundTrainer;
  }

  static async addTrainer(trainerData) {
    const trainers = await this.getAllTrainers();

    const emailExists = trainers.some(
      (trainer) => trainer.email === trainerData.email
    );

    if (emailExists) throw new Error("Email already exists!");

    const trainer = {
      id: uuid(),
      ...trainerData,
    };

    const updatedTrainers = [...trainers, trainer];

    await this.saveTrainers(updatedTrainers);
    return trainer;
  }

  static async updateTrainer(trainerId, updateData) {
    const trainers = await this.getAllTrainers();
    const foundTrainer = await this.getTrainersById(trainerId);

    const updatedTrainer = {
      ...foundTrainer,
      ...updateData,
    };

    const updatedTrainers = trainers.map((trainer) =>
      trainer.id === updatedTrainer.id ? updatedTrainer : trainer
    );

    await this.saveTrainers(updatedTrainers);

    return updatedTrainer;
  }

  static async deleteAllTrainers() {
    await this.saveTrainers([]);
  }

  static async deleteTrainer(trainerId) {
    const trainers = await this.getAllTrainers();

    const updatedTrainers = trainers.filter(
      (trainer) => trainer.id !== trainerId
    );

    if (updatedTrainers.length === trainers.length)
      throw new Error("Trainer not found!");

    await this.saveTrainers(updatedTrainers);
  }
}
