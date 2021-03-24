const express = require("express");

const db = require("./fakeDb");
const router = new express.Router();

const { NotFoundError } = require("./expressError");

/** GET /users: get list of users */
router.get("/", function (req, res, next) {

  return res.json({items: db.items});
});

router.post("/", function (req, res, next) {
  db.items.push(req.body)
  return res.json({added: req.body});
});

router.get("/:name", function (req, res, next) {

    itemToReturn = db.items.find( el => el.name == req.params.name)
    if (!itemToReturn) {
        throw new NotFoundError();
    }
    return res.json(itemToReturn);
  });

router.patch("/:name", function (req, res, next) {
    let updatedItem = req.body
    let indexToReplace = db.items.findIndex( el => el.name == req.params.name)
    if (indexToReplace == -1) {
        throw new NotFoundError();
    }
    db.items[indexToReplace] = updatedItem
    return res.json({updated: updatedItem});
});

router.delete("/:name", function (req, res, next) {
  let indexToDelete = db.items.findIndex( el => el.name == req.params.name)
  if (indexToDelete == -1) {
    throw new NotFoundError();
  }
  db.items.splice(indexToDelete, 1);
  return res.json({ message: "Deleted" });
});

module.exports = router;