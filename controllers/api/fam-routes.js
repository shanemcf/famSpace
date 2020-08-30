const router = require('express').Router();
const { Fam } = require('../../models');

// POST (create) a post
router.post('/', (req, res) => {
  Fam.create({
    famKey: req.body.famKey
  })
    .then((newFam) => res.json(newFam))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});


module.exports = router;