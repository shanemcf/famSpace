const router = require('express').Router();
const { User, Post, Comment } = require('../models');



// homepage -- display index of all posts
router.get('/', (req, res) => {
  Post.findAll({
    attributes: [
      'id',
      'caption',
      'imageURL',
      'created_at'
    ],
    order: [['created_at', 'DESC']],
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
    .then((dbPostData) => {
      const posts = dbPostData.map((Post) => Post.get({ plain: true }));
      res.render('homepage', {
        posts,
        loggedIn: req.session.loggedIn
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});


// single-Post
router.get('/Post/:id', (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'id',
      'caption',
      'imageURL',
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
    .then((dbPostData) => {
      if (!dbPostData) {
        res.status(404).json({ message: 'No Post found with this id' });
        return;
      }

      // serialize the data
      const post = dbPostData.get({ plain: true });

      // pass data to template
      res.render('post', {
        post,
        loggedIn: req.session.loggedIn
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// login
router.get('/login', (req, res) => {
  // check session variable...if user is logged in redirect to homepage
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  // otherwise render login page
  res.render('login');
});

// sign up
router.get('/sign-up', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('sign-up');
});



// fam up
router.get('/fam-up', (req, res) => {
  if (!req.session.loggedIn) {
    res.redirect('/login');
    return;
  }
  else{
    res.render('fam-up');
  }
});


module.exports = router;