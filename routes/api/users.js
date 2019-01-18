const express = require("express");
const router = express.Router();
const User = require("../../models/User");

// @route GET api/users/
router.post("/", (req, res) => {
  User.findOne({ name: req.body.name }).then(user => {
    if (user) {
      return res.status(400).json({ name: "name already exist" });
    } else {
      const newUser = new User({
        name: req.body.name
      });
      newUser
        .save()
        .then(user => res.json(user))
        .catch(err => console.log(err));
    }
  });
});

module.exports = router;
