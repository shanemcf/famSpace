const router = require('express').Router();
const { User, Contact } = require('../../models');
const withAuth = require('../../utils/auth');
const session = require('express-session');

router.get('/', (req, res) => {
  Contact.findOne({
    where: {
      user_id: req.session.user_id
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


//PUT route to update user phone number
router.put('/', (req, res) => {
  Contact.update(req.body,{
    where: {
      user_id: req.session.user_id
    }
  })
    .then(() => res.status(200))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;