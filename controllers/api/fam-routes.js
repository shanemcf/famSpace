const router = require('express').Router();
const { User, Fam } = require('../../models');

//GET /api/fam (retrieve all fams)
router.get('/', (req, res) => {

  // Access our Fam model and run .findAll() method)
  Fam.findAll()
    .then((dbFamData) => {
      console.log(dbFamData)
      res.json(dbFamData)})
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// GET /api/fam/famKey (retrieve one fam by famKey)
router.get('/:famKey', (req, res) => {
  Fam.findOne({
    where: {
      famKey: req.params.famKey
    }
  })
    .then((dbFamData) => {
      //console.log('dbFamData:', dbFamData);
      if (!dbFamData) {
        res.status(404).json({ message: 'Family not found.' });
        return;
      }
      return dbFamData.get({ plain: true })
    }).then((famObj) => {
      //console.log('famObj: ', famObj);
      return User.update({
        fam_id: famObj.id
      }, 
      {
        where: {
          id: req.session.user_id
        },
      })
    }).then((dbUserData) => {
      req.session.save(() => {
        console.log("req.session.fam_id pre:", req.session.fam_id)
        req.session.fam_id = dbUserData.fam_id;
        console.log("req.session.fam_id post:", req.session.fam_id)
        res.json(dbUserData);
      })
    }).then(() => res.status(200))
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
    }).then((dbUserData) => {
      req.session.save(() => {
        req.session.fam_id = dbUserData.fam_id;
        res.json(dbUserData);
      })
    }).then(() => res.status(200))

  
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});


module.exports = router;