import { Router } from "express";
import { TrainerController } from "../controllers/trainers.controller.js";

export const trainerRouter = Router();

// 1. Get all trainers
trainerRouter.get("/", TrainerController.getAllTrainers);

// 2. Get trainer by id
trainerRouter.get("/:id", TrainerController.getTrainersById);

// 3. Add trainer
trainerRouter.post("/", TrainerController.addTrainer);

// 4. Update trainer info
trainerRouter.patch("/:id", TrainerController.updateTrainer);

// 5. Delete all trainers
trainerRouter.delete("/all", TrainerController.deleteAllTrainers);

// 6. Delete trainer
trainerRouter.delete("/:id", TrainerController.deleteTrainer);
