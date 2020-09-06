const router = require('express').Router();
const { User, Post, Comment, Contact } = require('../models');



// homepage -- display index of all posts
router.get('/', (req, res) => {
  Post.findAll({
    attributes: [
      'id',
      'caption',
      'imageURL',
      'fam_id',
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


// single-post
router.get('/post/:id', (req, res) => {
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
      res.render('single-post', {
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

//sign up
router.get('/sign-up', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('sign-up');
});

// dashboard
router.get('/dashboard', (req, res) => {
  if (!req.session.loggedIn) {
    res.redirect('/login');
    return;
  }
  else{
    console.log(req.session);
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
  }
  
});

// add post
router.get('/add-post', (req, res) => {
  if (!req.session.loggedIn) {
    res.redirect('/login');
    return;
  }
  else{
    res.render('add-post');
  }
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

// events
router.get('/events', (req, res) => {
  if (!req.session.loggedIn) {
    res.redirect('/login');
    return;
  }
  else{
    res.render('events');
  }
});


module.exports = router;