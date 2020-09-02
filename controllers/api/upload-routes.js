const router = require('express').Router();
// const withAuth = require('../../utils/auth');
const fs = require('fs');
// var multer  = require('multer')
// var upload = multer({ dest: 'uploads/' })
// const cors = require('cors');

router.post("/", (req, res) => {
    console.log(req.files)
    try{
    if (!req.files) {
        res.status(500).json({
          status: 500,
          message: 'No file uploaded',
        });
      } else {
        //Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
        let displayImage = req.files.displayImage;
  
        //Use the mv() method to place the file in upload directory (i.e. "uploads")
        displayImage.mv('./uploads/' + displayImage.name);
  
        //send response
        res.send({
          status: 200,
          message: 'File is uploaded',
          data: {
            name: displayImage.name,
            mimetype: displayImage.mimetype,
            size: displayImage.size,
          },
        });
      }
    }
    catch(err){
        res.status(500).json({error: err});
    }
})

module.exports = router;