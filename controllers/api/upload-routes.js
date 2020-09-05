const router = require('express').Router();
const fs = require('fs');
const cors = require('cors');

router.post("/", cors(), (req, res) => {
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

        //send response
        res.send({
          status: 200,
          message: 'File is uploaded',
          data: {
            name:image.name,
            mimetype: image.mimetype,
            size: image.size,
          },
        });
      }
    }
    catch(err){
        res.status(500).json({error: err});
    }
})

module.exports = router;