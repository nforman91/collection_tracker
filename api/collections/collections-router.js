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

router.get("/:collection_id", (req, res, next) => {
  Collection.findById(req.params.collection_id)
    .then((collection) => {
      res.json(collection);
    })
    .catch(next);
});

router.post("/", (req, res, next) => {
  Collection.add(req.body)
    .then(({ collection_id }) => {
      return Collection.findById(collection_id);
    })
    .then((newCollection) => {
      res.json(newCollection);
    })
    .catch(next);
});

router.put("/", (req, res, next) => {
  const collection = req.body;
  if (collection) {
    const { collection_id } = collection;
    Collection.findById(collection_id)
      .then(
        Collection.updateCollection(collection_id, collection).then(
          (updatedCollection) => {
            res.json(updatedCollection);
          }
        )
      )
      .catch(next);
  }
});

router.delete("/:collection_id", (req, res, next) => {
  Collection.del(req.params.collection_id)
    .then((collection) => {
      res.json(collection);
    })
    .catch(next);
});

module.exports = router;
