const router = require('express').Router();
const { User, Fam } = require('../../models');

//GET /api/fam (retrieve all fams)
router.get('/', (req, res) => {

  // Access our Fam model and run .findAll() method)
  Fam.findAll()
    .then((dbFamData) => res.json(dbFamData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});


// // GET /api/fam/1 (retrieve one fam by id)
// router.get('/:id', (req, res) => {
//   User.findOne({
//     where: {
//       id: req.params.id
//     }
//   })
//     .then((dbFamData) => {
//       if (!dbFamData) {
//         res.status(404).json({ message: 'Family not found.' });
//         return;
//       }
//       res.json(dbFamData);
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json(err);
//     });
// });

// GET /api/fam/name (retrieve one id by fam)
router.get('/:fam', (req, res) => {
  Fam.findOne({
    where: {
      famKey: req.params.fam
    }
  })
    .then((dbFamData) => {
      if (!dbFamData) {
        res.status(404).json({ message: 'Family not found.' });
        return;
      }
      res.json(dbFamData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// POST (create) a fam
router.post('/', (req, res) => {
  console.log('POST/fams - create a fam route.')
  Fam.create({
    famKey: req.body.generatedFamKey,
  })
    .then((newFam) =>{
      console.log('newFam:', newFam.get({ plain: true }))
      
      return newFam.get({ plain: true })
    })
    .then((famObj) => {
      return User.update({
        fam_id: famObj.id
      }, 
      {
        where: {
          id: req.session.user_id
        },
      })
    }).then(() => res.status(200))

  
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});


module.exports = router;