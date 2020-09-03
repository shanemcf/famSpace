const router = require('express').Router();
const { User, Contact } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/:id', (req, res) => {
  Contact.findOne({
    where:{
      id:req.body.id
    },
    
    attributes: [
      'id',
      'telephone',
      'address',
      'user_id']
  })
    .then((dbContactData) => res.json(dbContactData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
  Contact.create({
    telephone: req.body.telephone,
    address: req.body.address,
    user_id: req.session.user_id
  })
    .then((newContact) => res.json(newContact))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put('/', (req, res) => {
  // check the session to verify user is logged in
  if (req.session) {
    Contact.update({
      telephone: req.body.telephone,
      address: req.body.address,
      user_id: req.body.user_id
    })
      .then((dbContactData) => res.json(dbContactData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  }
});

module.exports = router;