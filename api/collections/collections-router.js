const express = require("express");
const Collection = require("./collections-model");
const router = express.Router();

router.get("/", (req, res, next) => {
  Collection.find()
    .then((collections) => {
      res.json(collections);
    })
    .catch(next);
});

router.get("/:id", (req, res, next) => {
  Collection.findById(req.params.id)
    .then((collections) => {
      res.json(collections);
    })
    .catch(next);
});

module.exports = router;
