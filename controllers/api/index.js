const router = require('express').Router();

const famRoutes = require('./fam-routes.js');
const userRoutes = require('./user-routes.js');
const postRoutes = require('./post-routes');
const commentRoutes = require('./comment-routes');
const uploadRoutes = require('./upload-routes');

router.use('/fams', famRoutes);
router.use('/users', userRoutes);
router.use('/posts', postRoutes);
router.use('/comments', commentRoutes);
router.use('/upload', uploadRoutes);

module.exports = router;
