import express from "express";
import { RelationshipController } from "../controllers/relationship.controller.js";

const router = express.Router();

router.get("/", RelationshipController.getRealationship);
router.post("/", RelationshipController.addRealationship);
router.delete("/", RelationshipController.deleteRealationship);

export const RelationshipRoute = router;
