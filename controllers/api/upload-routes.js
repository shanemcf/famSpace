const router = require('express').Router();
const fs = require('fs');
const cors = require('cors');
const { Post, User, ProfilePic } = require('../../models');

router.post("/profilePic", cors(), (req, res) => {
  console.log(req.files)
  try{
  if (!req.files) {

      res.status(500).json({
        status: 500,
        message: 'No file uploaded',
      });
    } else {

      let image = req.files.file;
      let imageName = req.files.file.name;

      let photoAddress = './uploads/' + imageName

      //Use the mv() method to place the file in upload directory (i.e. "uploads")
      image.mv(photoAddress);

      ProfilePic.create({
        url: photoAddress,
        user_id: req.session.user_id
      })
      
    }
  }
  catch(err){
    console.log('HERE')
      res.status(500).json({error: err});
  }
})

router.post("/newPost", cors(), (req, res) => {
  try {
    if (!req.files) {
      res.status(500).json({
        status: 500,
        message: 'No file uploaded',
      });
    } else {

      let image = req.files.file;
      let imageName = req.files.file.name;

      let photoAddress = './uploads/' + imageName

      //Use the mv() method to place the file in upload directory (i.e. "uploads")
      image.mv(photoAddress)
    }
    User.get({
      fam_id
    },
      {
        where: {
          id: req.session.user_id
        }
        
      }
    ).then((fam_id, photoAddress)=>{
      Post.create({
        imageURL: photoAddress,
        user_id: req.session.user_id,
        fam_id: fam_id
      })
    })
      .then(() => res.status(200))
  }
  catch (err) {
    res.status(500).json({ error: err });
  }
})

module.exports = router;