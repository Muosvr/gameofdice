const express = require("express");
const router = express.Router();
const User = require("../../models/User");

// @route POST api/score
router.post("/", (req, res) => {
  User.findOne({ name: req.body.name }).then(user => {
    if (user) {
      // Update
      User.findOneAndUpdate(
        { name: req.body.name },
        {
          $set: {
            diceSet: [{ dice: req.body.dice1 }, { dice: req.body.dice2 }]
          }
        },
        { new: true }
      ).then(user => res.json(user));
    } else {
      res.status(400).json("User does not exist");
    }
  });
  req.body.name;
});

module.exports = router;
