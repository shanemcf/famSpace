const router = require('express').Router();
const { User, Contact } = require('../models');
const withAuth = require('../utils/auth'); // Authenticate user session middleware.

/*
router.get('/', (req, res) => {
  Post.findAll({
    where: {
      // use the ID from the session
      user_id: req.session.user_id
    },
    attributes: [
      'id',
      'caption',
      'imageURL',
      'fam_id',
      'created_at'
    ],
    include: [
      {
        model: Comment,
        attributes: [
          'id', 
          'comment_text', 
          'post_id', 
          'user_id', 
          'created_at'
        ],
        include: {
          model: User,
          attributes: ['username']
        }
      },
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then(dbPostData => {
      // serialize data before passing to template
      const posts = dbPostData.map(Post => Post.get({ plain: true }));
      res.render('dashboard-self', {
        posts,
        loggedIn: true
      })
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/edit/:id', (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'id',
      'caption',
      'imageURL',
      'fam_id',
      'created_at'
    ],
    include: [
      {
        model: Comment,
        attributes: [
          'id', 
          'comment_text', 
          'post_id', 
          'user_id', 
          'created_at'],
        include: {
          model: User,
          attributes: ['username']
        }
      },
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then(dbPostData => {
      // serialize data before passing to template
      const post = dbPostData.get({ plain: true });
      res.render('edit-post', {
        post,
        loggedIn: true
      })
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});
*/

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
      const user = dbUserData.get({ plain: true });
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