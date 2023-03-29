import { Router } from "express";
import { trainerRouter } from "../routes/trainers.routes.js";

export const globalRouter = Router();

globalRouter.use("/trainers", trainerRouter);
