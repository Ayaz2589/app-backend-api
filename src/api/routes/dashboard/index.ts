import express from "express";
const router = express.Router();

import { createDummyData } from "../../dashboard/utils";

router.get("/status", (req, res) => {
  res.status(200).send("Dashboard API is running");
});

router.get("/get-dummy-data", (req, res) => {
  const getDummyData = async () => {
    try {
      const response = await createDummyData();
      res.status(200).json(response);
    } catch (error) {
      console.error(error);
    }
  };
  getDummyData();
});

export default router;
