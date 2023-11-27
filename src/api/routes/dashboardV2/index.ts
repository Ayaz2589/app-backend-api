import express from "express";
const router = express.Router();

router.get("/status", (req, res) => {
  res.status(200).send("Dashboard V2 API is running");
});

router.get("/get-dummy-data", (req, res) => {

});

export default router;
