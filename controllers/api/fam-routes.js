const router = require('express').Router();
const { Fam } = require('../../models');

// POST (create) a fam
router.post('/', (req, res) => {
  console.log('POST/fams - create a fam route.')
  Fam.create({
    famKey: req.body.generatedFamKey
  })
    .then((newFam) => res.json(newFam))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});


module.exports = router;