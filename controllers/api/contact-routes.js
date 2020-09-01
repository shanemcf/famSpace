const router = require('express').Router();
const { Contact } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', (req, res) => {
  Contact.findOne({
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