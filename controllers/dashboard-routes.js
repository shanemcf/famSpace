const router = require('express').Router();
const { User, Contact } = require('../models');
const withAuth = require('../utils/auth'); // Authenticate user session middleware.

//GET user logged in for dashboard data population
router.get('/', (req, res) => {
  User.findOne({
    where: {
      id: req.session.user_id
    },
    attributes: [
      'id',
      'first_name',
      'last_name',
      'birthdate',
      'email',
      'username',
      'fam_id'
    ],
    include: [
      {
        model: Contact,
        attributes: [
          'id',
          'telephone',
          'address',
          'user_id']
      }
    ]
  })
    .then(dbUserData => {
      // serialize data before passing to template
      const user = dbUserData.get({ plain: false });
      console.log("user: ", user);
      res.render('dashboard', {
        user,
        loggedIn: true
      })
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});




module.exports = router;