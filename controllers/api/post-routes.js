const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');


// GET all posts by all users
router.get('/', (req, res) => {
  console.log('======================');
  Post.findAll({
    order: [['created_at', 'DESC']],
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
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});



// GET a post by id
router.get('/:id', (req, res) => {
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
          'user',
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
      if (!dbPostData) {
        res.status(404).json({ message: 'Post not found.' });
        return;
      }
      res.json(dbPostData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});



// POST (create) a post
router.post('/', withAuth, (req, res) => {
  Post.create({
    caption: req.body.caption,
    imageURL: req.body.imageURL,
    user_id: req.session.user_id
  })
    .then((newPost) => res.json(newPost))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});



// PUT (update) a post title and/or content
router.put('/:id', withAuth, (req, res) => {
  Post.update(
    {
      caption: req.body.caption
    },
    {
      where: {
        id: req.params.id
      }
    }
  )
    .then((updatedPost) => {
      if (!updatedPost) {
        res.status(404).json({ message: 'Post not found.' });
        return;
      }
      res.json(updatedPost);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});


// DELETE a post
router.delete('/:id', withAuth, (req, res) => {
  Post.destroy({
    where: {
      id: req.params.id
    }
  })
    .then((postDeleted) => {
      if (!postDeleted) {
        res.status(404).json({ message: 'Post not found.' });
        return;
      }
      res.json(postDeleted);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});




module.exports = router;